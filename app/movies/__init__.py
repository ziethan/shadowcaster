from __future__ import absolute_import, print_function

from flask import Blueprint

movies = Blueprint('movies', __name__)

from . import views