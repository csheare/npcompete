import urllib

with open('recipeTitles.txt') as f:
	titles = f.readlines()

titles = [urllib.parse.quote_plus(tit.strip()) for tit in titles]


