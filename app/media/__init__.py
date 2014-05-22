from __future__ import absolute_import, print_function

from flask import Blueprint

media = Blueprint('media', __name__)

from . import views