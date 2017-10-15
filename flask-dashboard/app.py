from flask import Flask, render_template, json, request, make_response
from firebase import firebase
#from .forms import FirePut

app = Flask(__name__)
firebase = firebase.FirebaseApplication('https://npcompete-54f8f.firebaseio.com', None)

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
    recipe_dict = dict()
    result_dict = dict()
    recipes = firebase.get('/recipes/', None)
    for k in recipes:
        recipe_dict[recipes[k]['name']] = k;
    if not recipe in recipe_dict:
        return json.dumps("No Recipe Found")
    else:
        recipe_num = recipe_dict[recipe]
        result_dict['directions'] = firebase.get('/recipes/' + str(recipe_num) + "/directions", None)
        result_dict['ingredients'] = firebase.get('/recipes/' + str(recipe_num)+"/ingredients", None)
        result_dict['image'] = firebase.get('/recipes/' + str(recipe_num)+"/image-ref", None)
        return json.dumps(result_dict)

if __name__ == "__main__":
    app.run(debug = True)
