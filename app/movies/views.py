from __future__ import absolute_import, print_function

import os
import re
import time
from bson import json_util, objectid

from converter import Converter
from flask import request, jsonify

from . import movies
from app import db


@movies.route('/setdir', methods=["POST"])
def set_movie_dir():
    if not request.data.__len__():
        return jsonify({
            'status': 400,
            'error': 'No file path was provided',
            'result': {
                'message': 'No file path was provided.'
            }
        }), 400
    
    data = json_util.loads(request.data)
    fp = os.sep+os.path.join(*data['filepath'].split(os.sep))
    
    for root, dirs, files in os.walk(fp):
        print('********************************************************************************')
        print(root)
        print(dirs)
        print(files)
        print('********************************************************************************')
    
    return jsonify({
        'status': 200,
        'error': None,
        'result': {
            'message': 'File path was successfully updated to {0}'.format(fp)
        }
    }), 200

@movies.route('/status')
def movie_list_status():
    return jsonify({
        'status': 200,
        'error': None,
        'result': {
            'message': 'Here is a filler response.'
        }
    }), 200