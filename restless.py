import flask
import flask_sqlalchemy
import datetime
import sqlite3

from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
# from json import dumps
from flask_jsonpify import jsonify

conn = sqlite3.connect('timetable.db')
db_connect = create_engine('sqlite:///timetable.db')
conn.text_factory = str
cur = conn.cursor()
app = Flask(__name__)
api = Api(app)

class Namaz(Resource):
    def get(self):
        today_long_date = datetime.datetime.now().strftime("%d/%m/%y")  # this shows the date with the year
        today_date = datetime.datetime.now().strftime("%d/%m")
        rows = cur.execute("SELECT imsaak, sobh, sunrise, afternoon, sunset, maghrib, midnight FROM manchester where date = ? ", (today_date,))
        rows = cur.fetchall()
        # rows = {'data': [dict(zip(tuple (query.keys()) ,i)) for i in query.cursor]}
        return jsonify(rows)

class Prayer(Resource):
    def get(self):
        today_long_date = datetime.datetime.now().strftime("%d/%m/%y")  # this shows the date with the year
        today_date = datetime.datetime.now().strftime("%d/%m")
        rows = cur.execute("SELECT imsaak, sobh, sunrise, afternoon, sunset, maghrib, midnight FROM manchester where date = ? ", (today_date,))
        rows = cur.fetchall()
        for i in rows:
            zaman = {}
            zaman['Imsaak   : '] = i[0]
            zaman['Sobh     : '] = i[1]
            zaman["Sunrise  : "] = i[2]
            zaman["Afternoon: "] = i[3]
            zaman["Sunset   : "] = i[4]
            zaman["Maghrib  : "] = i[5]
            zaman["Midnight : "] = i[6]
        return jsonify(zaman)

api.add_resource(Prayer, '/prayertimetable')
api.add_resource(Namaz, '/namaz')

if __name__ == '__main__':
     app.run(port='5002')
