# timetable
This is a simple python app that exports today's Namaaz(salaat) timetable as JSON and renders HTML template using Flask.
This is my first python development due to my inexperiance at the time I assume it could have been coded much simpler.
Please free to contribute to this repository or fork it for your own development. :+1:

## To use this code
* simply clone it to your server using 
```git
git clone
```
* create your own sqlite prayter time database and rename it to timetable.db
* create a virtual environment in the directory - you would need to have root ssh access to your server
* Read online about how to deploy Flask/Flask restless

## Wordpress Plugin

In the new version I have included a simple wordpress plugin written in PHP. Please note this Plugin is currently set to use a SQLite database and I will add setting for MySQL in the next update. It is great for any one with VPS website but some Shared hosting wont allow you to use SQLite for PHP. 


