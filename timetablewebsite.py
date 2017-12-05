from flask import Flask, render_template
import datetime
import sqlite3

app = Flask(__name__)
conn = sqlite3.connect('timetable.db') # connection to the database
conn.text_factory = str
cur = conn.cursor()

today_long_date = datetime.datetime.now().strftime("%d/%m/%y")  # this shows the date with the year
today_date = datetime.datetime.now().strftime("%d/%m")
# This gets the current time, to be used in the future development. simply comment it out
# current_time = datetime.datetime.now().strftime("%H:%M")
# All times are saved in rows
rows = cur.execute("SELECT imsaak, sobh, sunrise, afternoon, sunset, maghrib, midnight FROM manchester where date = ? ", (today_date,))
rows = cur.fetchall()
# This creates a dictionary called zaman so that the time is easier to read and prints all the information

for i in rows:
    zaman = {}
    zaman['Imsaak   : '] = i[0]
    zaman['Sobh     : '] = i[1]
    zaman["Sunrise  : "] = i[2]
    zaman["Afternoon: "] = i[3]
    zaman["Sunset   : "] = i[4]
    zaman["Maghrib  : "] = i[5]
    zaman["Midnight : "] = i[6]
    for k,v in zaman.items():
        print (k, v)

imsaak = zaman['Imsaak   : ']
sobh = zaman['Sobh     : ']
sunrise = zaman["Sunrise  : "]
afternoon = zaman["Afternoon: "]
sunset = zaman["Sunset   : "]
# print ("today date is: ", today_long_date)
# print (zaman())

@app.route("/")
def homepage():
    return render_template('index.html', im=imsaak, so=sobh, af=afternoon)

if __name__ == '__main__':
    app.run()
