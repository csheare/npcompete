from flask import Flask, render_template, json, request, make_response
from firebase import firebase
#from .forms import FirePut
app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://npcompete-54f8f.firebaseio.com', None)

result_dict = dict()
recipe_dict = dict()
with open("recipes.json") as f:
    recipe_dict = json.load(f)

@app.route('/')
def main():
    name = "Courtney"
    return render_template('index.html', **locals())


@app.route('/recipes')
def index():
    result = firebase.get('/recipes/', None)
    print(result)
    return json.dumps(result)

@app.route('/recipes/<string:recipe>')
def getRecipe(recipe):
    #create recipe key map

    if not recipe in recipe_dict:
        return json.dumps("No Recipe Found")
    else:
        recipe_num = recipe_dict[recipe]
        related = firebase.get('/recipes/'+ str(recipe_num) + "/related", None)
        ids = list()
        for k in related:
            ids.append(k)
        result_dict['directions'] = firebase.get('/recipes/' + str(recipe_num) + "/directions", None)
        result_dict['ingredients'] = firebase.get('/recipes/' + str(recipe_num)+"/ingredients", None)
        result_dict['image'] = firebase.get('/recipes/' + str(recipe_num)+"/image-ref", None)
        result_dict['r1'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[0]), None)
        result_dict['r2'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[1]), None)
        result_dict['r3'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[2]), None)
        result_dict['r4'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[3]), None)
        result_dict['r5'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[4]), None)
        result_dict['r6'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[5]), None)
        result_dict['r7'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[6]), None)
        result_dict['r8'] = firebase.get('/recipes/' + str(recipe_num) + "/related/" + str(ids[7]), None)
        return json.dumps(result_dict)

if __name__ == "__main__":
    app.run(debug = True)
