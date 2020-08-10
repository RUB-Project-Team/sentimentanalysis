from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/line-data")
def line_data():
    df=pd.read_csv("../Resources/data/outputData/tweetPredData.csv")
    df[df.columns[df.columns.isin(["Date", "Matched Keywords", "Prediction"])]]
   # df=df.drop(["Favorite", "predTweet", "CleanedTweet", "Source"],axis=1)
    output=df.to_json(orient="records")
    return  output

@app.route("/tools")
def sources():
    return render_template("tools.html")


@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/mlmodels")
def mlmodels():
    return render_template("mlmodels.html")

if __name__ == "__main__":
    app.run(debug=True)
