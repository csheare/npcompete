
listOfIngredients = []

with open("ingredients.txt") as ingredients:
    for ingredient in ingredients:
        for word in ingredient.split( ):
            listOfIngredients.append(word)

print (listOfIngredients)

with open("finalIngredients.txt", 'w') as finalList:
    for ingredient in listOfIngredients:
        finalList.write(ingredient + '\n')

