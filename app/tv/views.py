from __future__ import absolute_import, print_function

import os
import re
import time
from bson import json_util, objectid

from converter import Converter
from flask import request, jsonify, make_response

from . import tv
from app import db


mimetype_whitelist = ['mp4', 'm4v']

@tv.route('/path', methods=["GET"])
def get_tv_dir():
    settings = db['settings'].find_one({'title':'tv'})
    
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

@tv.route('/path', methods=["POST"])
def set_tv_dir():
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
    
    db['settings'].update({'title':'tv'}, {'$set': {'path':fp}}, upsert=True)
    
    db['tv'].drop()
    for root, dirs, files in os.walk(fp):
        for f in files:
            if f.split('.').pop() in mimetype_whitelist:
                db['tv'].insert({
                    'name': f.split('.')[0],
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

@tv.route('/list', methods=["GET"])
def get_tv_all():
    shows = db['tv'].find()
    
    if shows is None:
        return jsonify({
            'status': 404,
            'error': 'No TV Shows available.',
            'result': {
                'message': 'No TV Shows available.'
            }
        }), 404
    
    return json_util.dumps({
        'status': 200,
        'error': None,
        'result': {
            'data': shows,
            'message': 'TV Show list returned successfully.'
        }
    }), 200

@tv.route('/<tv_id>', methods=["GET"])
def get_tv_one(tv_id=None):
    if tv_id is None:
        return jsonify({
            'status': 400,
            'error': 'No tv show id provided.',
            'result': {
                'message': 'No tv show id provided.'
            }
        }), 400
    
    show = db['tv'].find_one({'_id': objectid.ObjectId(tv_id)})
    filepath = '{0}.{1}'.format(os.path.join(show['path'], show['name']), show['mimeType'])
    
    try:
        response = make_response()
#         response.headers['Content-Description'] = 'Media stream'
#         response.headers['Cache-Control'] = 'no-cache'
#         response.headers['Content-Type'] = 'application/octet-stream'
#         response.headers['Content-Type'] = 'application/download'
        response.headers['Content-Length'] = os.path.getsize(filepath)
        response.headers['Content-Type'] = ''
        response.headers['X-Accel-Redirect'] = '/media'+filepath
        return response
    except (OSError, IOError) as e:
        return jsonify({
            'status': 404,
            'error': 'TV Show does not exist. Please update your tv shows path in settings.',
            'result': {
                'message': 'TV Show does not exist. Please update your tv shows path in settings.'
            }
        }), 404