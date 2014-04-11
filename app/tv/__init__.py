from __future__ import absolute_import, print_function

from flask import Blueprint

tv = Blueprint('tv', __name__)

from . import views