import sys
from twilio.rest import TwilioRestClient
import twilio.twiml
import bitlyapi

from flask import Flask, render_template, url_for, redirect, request

import datetime
from sqlalchemy import create_engine, MetaData, exc, Table
from os import environ
import re

# twilio credentials
account_sid = "AC200ee2c03615800f854247cdce4085f5"
auth_token = "2d43126af5d69246efc69c083ace9357"

# bit.ly credentials
btly_user = 'o_mrpi7r3qb'
btly_key ='R_39770af704cc31c0c526191109214e79'
fromnum = "+13474721195"

# create new url entry
def addURL(u):
	engine = create_engine(environ['OPENSHIFT_MYSQL_DB_URL'] + environ['OPENSHIFT_APP_NAME'], convert_unicode=True, echo=True)
	metadata = MetaData(bind=engine)

	now = datetime.datetime.now()
	d = now.strftime('%Y-%m-%d %H:%M:%S')
	
	log_table = Table('url_table', metadata, autoload=True)	
	con = engine.connect()	
	con.execute( log_table.insert(), date=d, url=u, ip = request.remote_addr)
	con.close()

# bit.ly shortening
def bitly(url):	
	b = bitlyapi.BitLy(btly_user, btly_key)
	shortURL = b.shorten(longUrl=url)
	return shortURL['url']

app = Flask(__name__)

@app.route('/')
def landing():
	return render_template('landing.html')

@app.route('/view/', defaults={'path': ''})
@app.route('/view/<path:path>')
def view(path=None):
	if (path==''):
		return redirect(url_for('landing'))
	else:
		# log URL in MySQL
		#addURL(path)
		
		# find http:// | https:// and remove it
		# replace w/ http via javascript - but, this does break https & still fails on CORS problems 
		path = re.sub(r'^(https?:\/\/)?', '', path)
		return render_template('view.html', path=path)
		
@app.route('/sms/', methods=['POST'])
def sms():
	url = re.sub(r'^(https?:\/\/)?', '', request.form['url'])
	to = request.form['to']
		
	if (url==None or url=='' or to=='' or to==None):
		return redirect(url_for('landing'))
	else:
		# log URL in MySQL & shorten it
		#addURL(url)
		shortURL = bitly('http://dev.skrol.la/view/'+url)
		
		# construct & send txt message
		try:
			client = TwilioRestClient(account_sid, auth_token)
			msg = client.sms.messages.create(
        body= "Skrolla-way: "+shortURL,
        to= to,
        from_= fromnum
      )
		except twilio.TwilioRestException as e:
			print e
    
		# display a confirmation page w/ short link. 
		return render_template('sms.html', url=url, surl=shortURL )
		#return shortURL +' -- ' + url + '-- ' + 'http://dev.skrol.la/view/'+url
	
if __name__ == '__main__':
    app.debug = True
    app.run()

# 	To Do list:    
## 	need better URL validation, checking, and error handling + webform for shortening URL & SMSing it to client
#### validate URL (200/300 http code acceptable + valid US phone #) & THEN we can shorten & text it.
#[x] 	create a template / landing page for / route &  explain what skrolla is
#[x]	create url shortener that returns skrol.la/URL
##	text articles to myself via twilio & a desktop browser widget
#[x]	move app to openshift & activate domain forwarding via cname (dev.skrol.la/URL)

##	smoother scrolling (futz with polling & increment parameters)
## 	resize iframe on window change (currently reloads on rotation change)
##	detect user agents and direct tablet users to a "skrol.la is for phones only" right now + 5 s delay + autodirect to desired URL. 

## 	make all links from iframe open in new window with javascript
##	create a modal / graphic that shows you how to use it -- maybe use use session.js to determine age of session/how new user is?
#	make exit button go to current page in iframe - not just originally openeded page.
##	find a way to catch x-frame exceptions
