# Team nameSpace@HINT2017

# This script contains a function which takes a URL as input
# and returns the content of the content in the webpage

# 'newspaper' library is used here to extract only the main
# content in a webpage


import urllib
from newspaper import Article

def getContentFromURL(url):
	article = Article(url)
	article.download()
	article.parse()
	# article.nlp()
	# article.summary
	return article.text

