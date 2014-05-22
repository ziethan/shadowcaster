from __future__ import absolute_import, print_function

import os
import re
import time
from bson import json_util, objectid

from converter import Converter
from flask import request, jsonify

from . import movies
from app import db

mimetype_whitelist = ['mp4', 'm4v']

@movies.route('/path', methods=["GET"])
def get_movie_dir():
    settings = db['settings'].find_one({'title':'movies'})
    
    if settings is None:
        return jsonify({
            'status': 404,
            'error': 'No path was found for movies.',
            'result': {
                'message': 'No file path was provided.'
            }
        }), 404
    
    return jsonify({
        'status': 200,
        'error': None,
        'result': {
            'data': {
                'path': settings['path']
            },
            'message': 'Successfully returned filepath.'
        }
    }), 200

@movies.route('/path', methods=["POST"])
def set_movie_dir():
    data = json_util.loads(request.data)
    
    if not data.get('filepath'):
        return jsonify({
            'status': 400,
            'error': 'No file path was provided',
            'result': {
                'message': 'No file path was provided.'
            }
        }), 400
    
    fp = os.sep+os.path.join(*data['filepath'].split(os.sep))
    
    db['settings'].update({'title':'movies'}, {'$set': {'path':fp}}, upsert=True)
    
    db['movies'].drop()
    for root, dirs, files in os.walk(fp):
        for f in files:
            if f.split('.').pop() in mimetype_whitelist:
                db['movies'].insert({
                    'name': f,
                    'path': root,
                    'mimeType': f.split('.').pop()
                })
    
    return jsonify({
        'status': 200,
        'error': None,
        'result': {
            'message': 'File path was successfully updated to {0}'.format(fp)
        }
    }), 200