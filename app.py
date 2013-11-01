import os    
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def main_app(path=None):
    #return 'url: ' + path
		return render_template('app.html', path=path)
	
if __name__ == '__main__':
    app.debug = True
    app.run()    