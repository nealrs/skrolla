import sys
import re
from flask import Flask, render_template, url_for, redirect, request, g, session, flash
from flask_oauthlib.client import OAuth
from os import environ

######
app = Flask(__name__)
app.secret_key = 'development'
oauth = OAuth(app)
twitter = oauth.remote_app(
    'twitter',
    consumer_key='fQIeAvlVlMH5o5Z61hEI1Q',
    consumer_secret='mH8loyXopwa1hdUe1SRfflSbEemwFcED93AEJry9U',
    base_url='https://api.twitter.com/1.1/',
    request_token_url='https://api.twitter.com/oauth/request_token',
    access_token_url='https://api.twitter.com/oauth/access_token',
    authorize_url='https://api.twitter.com/oauth/authenticate',
)

@twitter.tokengetter
def get_twitter_token():
    if 'twitter_oauth' in session:
        resp = session['twitter_oauth']
        return resp['oauth_token'], resp['oauth_token_secret']

@app.before_request
def before_request():
    g.user = None
    if 'twitter_oauth' in session:
        g.user = session['twitter_oauth']

@app.route('/')
def landing():
	if g.user is not None:
		return render_template('dash.html')
		#print g.user
	else:
		return render_template('anon.html')

@app.route('/about')
def about():
	return render_template('about.html')
	
@app.route('/login')
def login():
    callback_url = url_for('oauthorized', next=request.args.get('next'))
    return twitter.authorize(callback=callback_url or request.referrer or None)

@app.route('/logout')
def logout():
    session.pop('twitter_oauth', None)
    return redirect(url_for('landing'))

@app.route('/oauthorized')
@twitter.authorized_handler
def oauthorized(resp):
    if resp is None:
        flash('You denied the request to sign in.')
    else:
        session['twitter_oauth'] = resp
    return redirect(url_for('landing'))	

@app.route('/view/', defaults={'path': ''})
@app.route('/view/<path:path>')
def view(path=None):
	if (path==''):
		return redirect(url_for('landing'))
	else:
		# find http:// | https:// and remove it
		# replace w/ http via javascript - but, this does break https & still fails on CORS problems 
		path = re.sub(r'^(https?:\/\/)?', '', path)
		return render_template('view.html', path=path)
		
@app.route('/ext/', defaults={'path': ''})
@app.route('/ext/<path:path>')
def extension(path=None):
	path = re.sub(r'^(https?:\/\/)?', '', path)
	if g.user is not None:
		return render_template('ext.html', path=path)
	else:
		return redirect(url_for('ext_auth'))

@app.route('/ext_auth')		
def ext_auth():
	return render_template('extauth.html')	

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
