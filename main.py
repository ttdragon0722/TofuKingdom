from flask import Flask,render_template,request  

app = Flask(__name__,template_folder="templates")

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/setting")
def setting():
    return render_template("setting.html")


@app.route("/question")
def about():
    return render_template("question.html")


@app.route("/play")
def play():
    return render_template("play.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=81,debug=True)