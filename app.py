# Import libraries
from flask import Flask, render_template, request, jsonify
import pickle

from numpy.core.defchararray import strip
from sklearn.linear_model import LogisticRegression
from dataBase.dbFunction import *
from model import *

# Model File Path
model_file_name = 'final_model.pickle'
tfidf_model_file_name = 'tfidf_model.pickle'

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

                # Get Google sentiment
                gScore= googleSentiment(text)
                gSentiment = {"Score": float("{:.2f}".format((gScore.score) * 100)),
                              "Magnitude" : float("{:.2f}".format(gScore.magnitude))}
                
                # Get Sentiment
                if gScore.score > 0:
                    gSentimentT ="Positive"
                elif gScore.score < 0:
                    gSentimentT ="Negative"
                else:
                    gSentimentT ="Netural"

                # Get Veder sentiment
                sVeder= vaderSentiment(text)
                print(sVeder)
                vSentiment= {"Positive" : float("{:.2f}".format((sVeder['pos']) * 100)),
                             "Netural": float("{:.2f}".format((sVeder['neu']) * 100)),
                             "Negative": float("{:.2f}".format((sVeder['neg']) * 100)),
                             "Compound": float("{:.2f}".format((sVeder['compound']) * 100))
                             }

                # Get Sentiment
                if sVeder['compound'] >= 0.05:
                    vSentimenT ="Positive"
                elif sVeder['compound'] <= - 0.05:
                    vSentimenT ="Negative"
                else:
                    vSentimenT ="Netural"                

                # Get textBlob sentiment
                tScore= textBlobSentiment(text)
                tSentiment = {"Polarity": float("{:.2f}".format((tScore.polarity)* 100)),
                              "Subjectivity": float("{:.2f}".format((tScore.subjectivity)* 100))}
                
                # Get Sentiment
                if tScore.polarity > 0:
                    tSentimentT ="Positive"
                elif tScore.polarity < 0:
                    tSentimentT ="Negative"
                else:
                    tSentimentT ="Netural"   

                # Loading the model file
                loaded_model = pickle.load(open(model_file_name, 'rb'))
                tfidf_model = pickle.load(open(tfidf_model_file_name, "rb"))

                # Transform input value
                pred_data = tfidf_model.transform([text])

                # Predict sentiment - 3 models for 3 sentiments
                positive = (float("{:.1f}".format(loaded_model[0].predict_proba(pred_data)[0][1])) * 100)
                negative = (float("{:.1f}".format(loaded_model[1].predict_proba(pred_data)[0][1])) * 100)
                neutral = (float("{:.1f}".format(loaded_model[2].predict_proba(pred_data)[0][1])) * 100)

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
                return render_template('demo.html', prediction=prediction,
                                       gSentiment= gSentiment,vSentiment=vSentiment,tSentiment=tSentiment,
                                       gSentimentT= gSentimentT,vSentimentT=vSentimenT,tSentimentT=tSentimentT,
                                       sText=text, sentText=sentText)
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
