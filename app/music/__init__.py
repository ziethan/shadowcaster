from __future__ import absolute_import, print_function

from flask import Blueprint

music = Blueprint('music', __name__)

from . import views