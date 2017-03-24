# Team nameSpace@HINT2017

#
# This script contains a function which takes a URL as input
# and returns the content of the content in the webpage

# 'newspaper' library is used here to extract only the main
# content in a webpage
from flask import Flask,render_template
import urllib
from newspaper import Article

app = Flask(__name__)

@app.route('/<name>')
def failurl(name):
	return "Please enter a valid url"
	
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def getContentFromURL(path):
	article = Article(path)
	article.download()
	article.parse()
	article.nlp()
	article.summary
	return article.summary 



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

