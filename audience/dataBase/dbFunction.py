# Import dependecies
from flask import Flask, jsonify, render_template
import psycopg2
from sqlalchemy import create_engine, func
from dataBase.config import *

# Get app
app = Flask(__name__)

# Connect to Database,
engine = create_engine(f'postgresql://{username}:{password}@{host}:{port}/{dbName}')

# Function purpose: Get tweet User details
def tweetsUser():
    try:
        # Establish DB connection - All parameters are available as environment variables
        result_prox = engine.execute('SELECT  "Date", "Matched Keywords", "User","Followers","Friends","Favorite" FROM  "public"."tweetUser" ORDER BY "Date"')
        tweetUser = []
        for r in result_prox:
            row = {"Date":r[0],"Matched Keywords":r[1],"User":r[2],"Followers":r[3],"Friends":r[4],"Favorite":r[5]}
            tweetUser.append(row)
        return tweetUser
    except:
        print("Failed to get database result for tweetsData table.")


# Function purpose: Get tweet Data details
def tweetsData():
    try:
        # Establish DB connection - All parameters are available as environment variables
        result_prox = engine.execute('SELECT "Date", "Matched Keywords", "Tweet", "Prediction" FROM public."tweetsData" ORDER BY "Date" ASC')
        tweetData = []
        for r in result_prox:
            row = {"Date":r[0],"Matched Keywords":r[1],"Tweet":r[2],"Prediction":r[3]}
            tweetData.append(row)
        return tweetData
    except:
        print("Failed to get database result for tweetsData table.")


# Function purpose: Get tweet Source details
def tweetSource():
    try:
        # Establish DB connection - All parameters are available as environment variables
        result_prox = engine.execute('SELECT "Date", "Matched Keywords", "Source" FROM public."twitterSource" ORDER BY "Date" ASC LIMIT 1000')
        tweetSource = []
        for r in result_prox:
            row = {"Date":r[0],"Matched Keywords":r[1],"Source":r[2]}
            tweetSource.append(row)
        return tweetSource
    except:
        print("Failed to get database result for tweetSource table.")


# Function purpose: Get tweet Data details
def tweetsCleanData():
    try:
        # Establish DB connection - All parameters are available as environment variables
        result_prox = engine.execute('SELECT "Date", "Matched Keywords", "CleanedTweet" FROM public."tweetsCleanData" ORDER BY "Date" ASC LIMIT 1000')
        tweetCleanData = []
        for r in result_prox:
            row = {"Date":r[0],"Matched Keywords":r[1],"Tweet":r[2],"CleanedTweet":r[3]}
            tweetCleanData.append(row)
        return tweetCleanData
    except:
        print("Failed to get database result for tweetCleanData table.")

# Function purpose: Get tweet Prediction Data details
def tweetsPredictData():
    try:
        # Establish DB connection - All parameters are available as environment variables
        result_prox = engine.execute('SELECT "Date", "Matched Keywords", "predTweet", "Prediction" FROM public."tweetsPredictData" ORDER BY "Date" ASC LIMIT 1000')
        tweetsPredict = []
        for r in result_prox:
            row = {"Date":r[0],"Matched Keywords":r[1],"predTweet":r[2],"Prediction":r[3]}
            tweetsPredict.append(row)
        return tweetsPredict
    except:
        print("Failed to get database result for tweetsPredictData table.")
