from flask import Flask, render_template, json, request, make_response
app = Flask(__name__)

@app.route('/')
def main():
    name = "Courtney"
    return render_template(
        'index.html',**locals())
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug = True)
