#import os    
from flask import Flask, render_template, url_for, redirect
from twilio.rest import TwilioRestClient

#twilio shit
tSid = "AC200ee2c03615800f854247cdce4085f5"
tToken = "2d43126af5d69246efc69c083ace9357"
fSMS = "+13474721195"
tClient = TwilioRestClient(tSid, tToken)
def smsURL(tNum, lURL):
	message = tClient.messages.create(to=tNum, from_=fSMS, body="Skrolla-way! "+lURL)

app = Flask(__name__)

@app.route('/')
def landing():
	#return render_template('main.html')
	return render_template('main2.html')

@app.route('/view/', defaults={'path': ''})
@app.route('/view/<path:path>')
def view(path=None):
	if (path==''):
		return redirect(url_for('landing'))
	else:
		#smsURL("+13093978751", "http://dev.skrol.la/view/"+path)
		return render_template('app.html', path=path)
	
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
