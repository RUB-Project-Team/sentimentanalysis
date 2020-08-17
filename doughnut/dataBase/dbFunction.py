# Import dependecies
from flask import Flask, jsonify, render_template
import psycopg2
from sqlalchemy import create_engine, func
from dataBase.config import *

# Constants for DB Connections
db_host = host
db_name = dbName
db_user = username
db_password = password
db_port = port

# Get app
app = Flask(__name__)

# Connect to Database,
engine = create_engine(f'postgresql://xabryudwvbzxhe:{db_password}@ec2-50-16-198-4.compute-1.amazonaws.com:5432/d2jeraar7ndna5')

# Function purpose: Establish connection with database
def dbConnection(db_host, db_name, db_user, db_password):
    try:
        conn = psycopg2.connect(host=db_host, database=db_name, user=db_user, password=db_password)
        return conn
    except:
        print("DB Connection could not be established. Please check DB settings including URL, ID and Password.")
        print("Please do not excute subsequent code as it is dependent on database connectivity.")
    else:
        print("DB Connection was successfully established")


# Function purpose: Get tweet User details
def tweetUser():
    try:
        # Establish DB connection - All parameters are available as environment variables
        conn = dbConnection(db_host, db_name, db_user, db_password)
        cur = conn.cursor()
        cur.execute('SELECT * FROM  "public"."tweetUser"')
        data = [col for col in cur]
        cur.close()
        conn.close()
        return data
    except:
        print("Failed to get database result for tweetUser table.")


# Function purpose: Get tweet Data details
def tweetsData():
    try:
        # Establish DB connection - All parameters are available as environment variables
        result_prox = engine.execute('SELECT "Date", "Matched Keywords", "Tweet", "Prediction" FROM public."tweetsData" ORDER BY id ASC')
        tweetData = []
        for r in result_prox:
            row = {"Date":r[0],"Matched Keywords":r[1],"Tweet":r[2],"Prediction":r[3]}
            tweetData.append(row)
        return tweetData
    except:
        print("Failed to get database result for tweetsData table.")


# Function purpose: Get tweet Source details
def twitterSource():
    try:
        # Establish DB connection - All parameters are available as environment variables
        conn = dbConnection(db_host, db_name, db_user, db_password)
        cur = conn.cursor()
        cur.execute('SELECT * FROM  "public"."twitterSource"')
        data = [col for col in cur]
        cur.close()
        conn.close()
        return data
    except:
        print("Failed to get database result for twitterSource table.")


# Function purpose: Get tweet Data details
def tweetsCleanData():
    try:
        # Establish DB connection - All parameters are available as environment variables
        conn = dbConnection(db_host, db_name, db_user, db_password)
        cur = conn.cursor()
        cur.execute('SELECT * FROM  "public"."tweetsCleanData"')
        data = [col for col in cur]
        cur.close()
        conn.close()
        return data
    except:
        print("Failed to get database result for tweetsCleanData table.")

    # Function purpose: Get tweet Prediction Data details


def tweetsPredictData():
    try:
        # Establish DB connection - All parameters are available as environment variables
        conn = dbConnection(db_host, db_name, db_user, db_password)
        cur = conn.cursor()
        cur.execute('SELECT * FROM  "public"."tweetsPredictData"')
        data = [col for col in cur]
        cur.close()
        conn.close()
        return data
    except:
        print("Failed to get database result for tweetsPredictData table.")
