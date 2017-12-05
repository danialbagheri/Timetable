import datetime
import sqlite3
# connection to the database
conn = sqlite3.connect('timetable.db')

conn.text_factory = str
cur = conn.cursor()
# Below collects all data from the database, shall only be used for testing the connection to the database
# cur.execute("SELECT date FROM manchester")
# date = cur.fetchall()
today_long_date = datetime.datetime.now().strftime("%d/%m/%y")  # this shows the date with the year
today_date = datetime.datetime.now().strftime("%d/%m")
# This gets the current time, to be used in the future development. simply comment it out
# current_time = datetime.datetime.now().strftime("%H:%M")
# All times are saved in rows
rows = cur.execute("SELECT imsaak, sobh, sunrise, afternoon, sunset, maghrib, midnight FROM manchester where date = ? ", (today_date,))
rows = cur.fetchall()
# This creates a dictionary called zaman so that the time is easier to read and prints all the information
def zaman():
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

print ("today date is: ", today_long_date)
print (zaman())
