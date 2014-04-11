from __future__ import absolute_import, print_function

from flask import Blueprint

settings = Blueprint('settings', __name__)

from . import views