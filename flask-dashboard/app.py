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
    result = firebase.get('/recipes', None)
    print(result)
    return json.dumps(result)

@app.route('/recipes/<string:recipe>')
def getRecipe(recipe):
    #things
    pass
    return json.dumps("pretend this is a recipe named " + recipe)

if __name__ == "__main__":
    app.run(debug = True)
