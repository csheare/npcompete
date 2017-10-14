# 20,000 ** 2 = 400,000,000

"""
data format

recipesToTopics = [ "recipeName", [.3, .5, .7] ]

"""

import heapq

topicCount = 0;

def lnormDistance(aVec, bVec):
    distanceSq = 0
    for i in range(topicCount):
        distanceSq += (aVec[i] - bVec[i]) ** 2
    return distanceSq
    



def getNearestNeighbors(currentRecipe = "recipeName", currentVector = [.3, .1, .4], recipesToTopics = [ ("recipeName", [.3, .5, .7]) ], k):
    pqueue = []
    for (recipeName, topicVector) in currentReciperecipesToTopics:
        if currentRecipe == recipeName: continue
        # we want the things that are the closest, so we replace if we are smaller than the largest distance
        d = lnormDistance(currentVector, topicVector)
        # make it max sorted from min sorted, so insert negative numbers
        if len(pqueue) < k: 
            heapq.heappush(pqueue, (-d, recipeName))
        else:
            # if we are smaller than the largest (flipped), then insert
            if (-pqueue[0]) > d:
                heapq.heappushpop(pqueue, (-d, recipeName))

    return pqueue
        

def getAllNearestNeighbors(recipesToTopics = [("recipeName", [.3, .5, .7])]):
    result = []
    for (currentRecipe, currentVector) in recipesToTopics:
        result.append((currentRecipe, getNearestNeighbors(currentRecipe, currentVector, recipesToTopics)))
    return result;