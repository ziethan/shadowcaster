from __future__ import absolute_import, print_function

from flask import Blueprint

pictures = Blueprint('pictures', __name__)

from . import views