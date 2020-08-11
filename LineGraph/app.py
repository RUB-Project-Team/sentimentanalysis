from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/line-data")
def line_data():
    df=pd.read_csv("../Resources/outputData/tweetPredData.csv")
    df_line=df[["Date", "Matched Keywords", "Prediction"]]
    output=df_line.to_json(orient="records")
    #print(output)
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
