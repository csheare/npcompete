import gensim
import logging
logging.basicConfig(
    format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

import json
from nltk.stem import WordNetLemmatizer
import re
import math


pairs = [x.split() for x in open("ingredientDict.txt", "r").read().split('\n')]

id2word = dict()
for index in range(len(pairs)):
    if len(pairs[index]) < 2:
        print("broke on line " + str(index + 1))
    else:
        id2word[int(pairs[index][0])] = pairs[index][1]


vecs = [re.sub(r"[^0-9]", " ", x).split()
        for x in open("recipeVecs.txt", "r").read().split("\n")]
corpus = []
for i in range(len(vecs)):
    if len(vecs) > 0:
        corpus.append([])
        for j in range(0, len(vecs[i]), 2):
            corpus[i].append((int(vecs[i][j]), int(vecs[i][j + 1])))


#print(corpus)

# LDA MODEL

Lda = gensim.models.ldamodel.LdaModel
ldamodel = Lda(corpus, num_topics=15, id2word=id2word, passes=16)
ldamodel.print_topics(num_topics=15, num_words=5)
#ldamodel = gensim.models.ldamodel.LdaModel.load('LDA_MODEL')

# get dictionary mapping from document
number_of_ingredients = ldamodel.num_terms
ingredientId_to_probabilities = {}
for ingredient_index in range(number_of_ingredients):
    ingredientId_to_probabilities[ingredient_index] = ldamodel.get_term_topics(ingredient_index)


def insertTopicIdIntoVector(topicId, prob, c):
    for i in range(len(c)):
        if (c[i][0] == topicId):
            c[i] = (c[i][0], c[i][1] + prob)
            return
    c.append((topicId, prob))
    

def addTopicProbabilityVectors(a, b):
    c = a[:]
    for (topicId, prob) in b:
        insertTopicIdIntoVector(topicId, prob, c)
    return c

# for every document, compute it's topic probabilities average per word 
number_of_documents = len(corpus)
documentId_to_roughTopicApprox = {}
for document_index in range(number_of_documents):
    # for each word, sum it up and divide by the total number of words --- NOTE: try scaling by word counts? 
    topicProbabilities = []
    for (wordId, count) in corpus[document_index]:
        topicProbabilities = addTopicProbabilityVectors(topicProbabilities, ingredientId_to_probabilities[wordId])

    # take the average by words
    total_words = len(corpus[document_index])    
    for index in range(len(topicProbabilities)):
        topicProbabilities[index] = (topicProbabilities[index][0], topicProbabilities[index][1] / total_words)

    documentId_to_roughTopicApprox[document_index] = dict(topicProbabilities) # convert to topic dictionary


import heapq
def lnorm2Distance(pMap1 = {14 : .30} , pMap2 = {14, .31}):
    distanceSq = 0
    for (topicId, probability) in pMap1.items():
        if not topicId in pMap1:
            distanceSq += probability ** 2
        else:
            distanceSq += (probability - pMap1[topicId]) ** 2
    
    for (topicId, probability) in pMap2.items():
        # get the things that are in map 2 but not in map 1
        if not topicId in pMap1: 
            distanceSq += probability ** 2
   
    return distanceSq

K = 8

adjacencies = []
outAdjacencies = open("adjacencyResults15.txt", "w")
# for every document (recipe)  - 20,000
print(len(documentId_to_roughTopicApprox))
count = 0;
for (id, probs) in documentId_to_roughTopicApprox.items():
    if count % 100 == 0: print(count)
    count += 1;
    pqueue = []
    # for every other document (recipe) - 20,000 => 400,000,000
    for (otherId, otherProbs) in documentId_to_roughTopicApprox.items():
        if id == otherId: continue
        # get the distance 
        d = lnorm2Distance(probs, otherProbs)
        if len(pqueue) < K: 
            heapq.heappush(pqueue, (-d, otherId))
        elif -pqueue[0][0] > d: # is the farthest thing farther than us
            heapq.heappushpop(pqueue, (-d, otherId))
    outAdjacencies.write(str(id) + " " + " ".join([str(otherId) for distance, otherId in pqueue]) + "\n")
outAdjacencies.close()