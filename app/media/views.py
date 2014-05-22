from __future__ import absolute_import, print_function

import os
import re
import time
from bson import json_util, objectid

from converter import Converter
from flask import request, jsonify, send_file

from . import media
from app import db


mimetype_whitelist = ['mp4', 'm4v']

@media.route('/<m_type>/<m_id>', methods=["GET"])
def get_media_file(m_type=None, m_id=None):
    if m_type is None:
        return jsonify({
            'status': 400,
            'error': 'No media type provided.',
            'result': {
                'message': 'No media type provided.'
            }
        }), 400
    
    if m_id is None:
        return jsonify({
            'status': 400,
            'error': 'No media id provided.',
            'result': {
                'message': 'No media id provided.'
            }
        }), 400
    
    m = db[m_type].find_one({'_id': objectid.ObjectId(m_id)})
    filepath = '{0}.{1}'.format(os.path.join(m['path'], m['name']), m['mimeType'])
    
    try:
        return send_file(filepath, mimetype='video/'+m['mimeType'])
    except (OSError, IOError) as e:
        return jsonify({
            'status': 404,
            'error': 'TV Show does not exist. Please update your tv shows path in settings.',
            'result': {
                'message': 'TV Show does not exist. Please update your tv shows path in settings.'
            }
        }), 404