#!/usr/bin/python2.7

import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask.ext.script import Manager, Server

from app import app

manager = Manager(app)

"""Run the server"""
manager.add_command("server", Server(
    use_debugger = True,
    use_reloader = True,
    host = '0.0.0.0',
    port = 5000
))

if __name__ == "__main__":
    manager.run()
