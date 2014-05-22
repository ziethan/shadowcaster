from __future__ import absolute_import, print_function

from pymongo import Connection
from flask import Flask, render_template, g, request

app = Flask(__name__, static_folder='static/dev', static_url_path='')
# app.use_x_sendfile = True

db_conn = Connection(host="mongodb://localhost")
db = db_conn['shadowcaster']

from app.movies import movies
from app.tv import tv
from app.music import music
from app.pictures import pictures
from app.settings import settings

app.register_blueprint(movies, url_prefix="/movies")
app.register_blueprint(tv, url_prefix="/tv")
app.register_blueprint(music, url_prefix="/music")
app.register_blueprint(pictures, url_prefix="/pictures")
app.register_blueprint(settings, url_prefix="/settings")

@app.route("/")
def index():
    g.debug = app.debug
    return render_template("index.html")