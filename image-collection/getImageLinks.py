import time
import urllib
import json
from py_ms_cognitive import PyMsCognitiveImageSearch

myAPIkey = '20aa099b97a840bbb7676dc41be01672'
bigDict = {}

with open('recipeTitles.txt', 'r') as f:
	titles = f.readlines()

titles = [tit.strip() for tit in titles]

for tit in titles:
	search_service = PyMsCognitiveImageSearch(myAPIkey, tit)
	search_result = search_service.search(limit=1, format='json')
	bigDict[tit] = search_result[0].content_url
	time.sleep(0.03)

#print(bigDict)
with open('recipeImageURLs.json', 'w') as f:
	json.dump(bigDict, f)
