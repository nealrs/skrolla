#import os    
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def main_app(path=None):
	if (path==""):
		return "Sorry bro, you forgot to add a URL"
	else:
		return render_template('app.html', path=path)
	
if __name__ == '__main__':
    app.debug = True
    app.run()

# 	To Do list:    
## 	need better URL validation, checking, and error handling 
## 	create a template / landing page for / route &  explain what skrolla is
##	create url shortener that returns skrol.la/URL
##	text articles to myself via twilio & a desktop browser widget
##	move app to openshift & activate domain forwarding via cname (dev.skrol.la/URL)

##	smoother scrolling (futz with polling & increment parameters)
## 	resize iframe on window change (currently reloads on rotation change)
##	detect user agents and direct tablet users to a "skrol.la is for phones only" right now + 5 s delay + autodirect to desired URL. 

## 	make all links from iframe open in new window with javascript
##	create a modal / graphic that shows you how to use it -- maybe use use session.js to determine age of session/how new user is?
##	make exit button go to current page in iframe - not originally openeded page.
##	find a way to catch x-frame exceptions
##	maybe add noise to header (css/base64 png)
