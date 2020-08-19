# Import libraries
from flask import Flask, render_template, request, jsonify
import pickle

from numpy.core.defchararray import strip
from sklearn.linear_model import LogisticRegression
from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import RegexpTokenizer
from dataBase.dbFunction import *
from model import tokenize

# Model File Path
model_file_name = 'final_model.pickle'
tfidf_model_file_name = 'tfidf_model.pickle'

# Function for ML Model
# stemmer = SnowballStemmer("english")
# tokenizer = RegexpTokenizer("[a-z']+")

app = Flask(__name__)


# Take care of page not found
@app.errorhandler(404)
# Use inbuilt function which takes error as parameter
def not_found(e):
    # redirect to home page - we can always show custom page
    return render_template("index.html", title="Tweeter Sentiment Analysis")


@app.route("/")
@app.route("/sentimentAnalysis")
def sentimentAnalysis():
    return render_template("index.html", data="")


@app.route("/tweetData")
def tweetData():
    return jsonify(tweetsData())


@app.route("/tweetUser")
def tweetUser():
    return jsonify(tweetsUser())

@app.route("/tweetsSource")
def tweetsSource():
    return jsonify(tweetSource())

@app.route("/predictSentiment", methods=['POST', 'GET'])
def predictSentiment():
    if request.method == 'POST':
        try:
            prediction = ""
            # Reading the inputs given by the user
            text = request.form['tweetText']

            if strip(text) != "":

                # def tokenText(text):
                #     tokens = tokenizer.tokenize(text)
                #     return [stemmer.stem(t) for t in tokens]

                # Loading the model file
                loaded_model = pickle.load(open(model_file_name, 'rb'))
                tfidf_model = pickle.load(open(tfidf_model_file_name, "rb"))

                # Transform input value
                pred_data = tfidf_model.transform([text])

                # Predict sentiment - 3 models for 3 sentiments
                positive = float("{:.2f}".format((loaded_model[0].predict_proba(pred_data)[0][1]) * 100))
                negative = float("{:.2f}".format((loaded_model[1].predict_proba(pred_data)[0][1]) * 100))
                neutral = float("{:.2f}".format((loaded_model[2].predict_proba(pred_data)[0][1]) * 100))

                if positive > 50:
                    sentText = "Positive"
                elif negative > 50:
                    sentText = "Negative"
                else:
                    sentText = "Neutral"

                # Build a dictionary to return values
                prediction = {"Positive": positive, "Negative": negative, "Neutral": neutral}

                # Print prediction
                print('prediction is', prediction)

                # Show the prediction results in a UI
                return render_template('demo.html', prediction=prediction, sText=text, sentText=sentText)
            else:
                return render_template('demo.html', prediction='', sText='')

        except Exception as e:
            print('The Exception message is: ', e)
            return render_template('demo.html', prediction='')
    else:
        return render_template('demo.html')


# #Application set to debug mode - update debug flag = False once testing is done
if __name__ == '__main__':
    app.run(debug=True)
