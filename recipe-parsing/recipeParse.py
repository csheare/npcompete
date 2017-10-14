import gensim
import logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

import json
from nltk.stem import WordNetLemmatizer
import re
import math

recipeTitles = []
ingredientList = []

def getMaybeFraction(s=""):
    res = re.match(r'([0-9]+)/([0-9]+)', s)
    if res == None: return int(re.match(r'([0-9]+)', s).group(1))
    else: 
        return float(res.group(1)) / float(res.group(2))

def getNumber(s=[]):
    num = getMaybeFraction(s[0])
    if (len(s) > 1 and s[1][0].isnumeric()):
        num += getMaybeFraction(s[1])
    return math.ceil(num)

count = 0
with open('full_format_recipes.json') as input_file:

    output_file = open('recipeTitles.txt', 'w')
    finalIngredients = open('finalIngredients.txt', 'r')  

    dictionary = {}
    id2word = {}
    i = 0 # dict id
    # Generate dictionary maping and list of unique ingredients
    for ingredient in finalIngredients:
        ing = ingredient.strip('\n')
        ingredientList.append(ing)

        if ing not in dictionary:
            dictionary[ing] = i
            i = i + 1

    print (dictionary)
    #print (len(dictionary))
    recipes = json.load(input_file)

    corpus = []
    for recipe in recipes:
        if 'title' in recipe and len(recipe['title'].strip()) > 0:
            vec = []
            for ingredient in recipe['ingredients']:
                
                s = ingredient.lower()
                s = re.sub(r"[^0-9a-z]", " ", s) # replace things that are not known with space

                # get Quantity
                ing = s.split( )
                if ing[0].isnumeric():
                    qty = getNumber(ing)
                else: 
                    qty = 1

                # Clean some stuff
                wordnet_lemmatizer = WordNetLemmatizer()
                for word in s.split():
                    newWord = wordnet_lemmatizer.lemmatize(word)

                    # get Ingredients
                    if newWord in ingredientList:
                        #print (newWord + ' - ' + str(qty))   
                        # Stuff bag of ingredients
                        cid = dictionary[newWord]    
                        vec.append((cid, qty))
            if not vec:
                #print (recipe['title'].strip('\n'))
                pass
            else:
                corpus.append(vec)
                output_file.write(recipe['title'].replace('\n', ' ') + '\n')
                count += 1

print (count)

recipeVecs = open('recipeVecs.txt', 'w')
id2wordDict = open('ingredientDict.txt', 'w')

# Write preprocessed recipes vectors to file
for vecs in corpus:
    for vec in vecs:
        recipeVecs.write('%s %s, ' % vec)
    recipeVecs.write('\n')

# Write assocaited dictionary references to file
for key, value in dictionary.items():
    id2wordDict.write('%s %s\n' % (str(value), key))

recipeVecs.close()
id2wordDict.close()
finalIngredients.close()


# Reverse ingredient dict references
for key, value in dictionary.items():
    id2word[value] = key

# LDA MODEL
Lda = gensim.models.ldamodel.LdaModel
ldamodel = Lda(corpus, num_topics=40, id2word = id2word, passes=16)
print(ldamodel.print_topics(num_topics=40, num_words=5))
