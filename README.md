# Twitter Sentiment Analysis of Presidential Candidates US Election 2020
Project link : https://tweet-sentiments-analysis.herokuapp.com/

![home](static/images/home.png)

## Motivation
Using social media for political discourse is a common practice for good now, especially around election time. One interesting aspect of this trend is the possibility of pulsing the public’s opinion about the elections, and that has attracted the interest of many researchers and the press. 

Users from different cultures and backgrounds post large volumes of textual comments reflecting their opinion in different aspect of life and make them available to everyone. In particular, we study the case of Twitter and focus on the 2020 US presidential elections.

US elections have a global impact and hence the elections are observed not only by the residents of the country but world.

## What is Sentiment Analysis?
Sentiment analysis is the automated mining of attitudes, opinions, and emotions from text.
The key aspect is to analyze a body of text for understanding the opinion expressed by it. Typically, we quantify this sentiment with a positive or negative value, called polarity.
The overall sentiment is often inferred as positive, neutral or negative from the sign of the polarity score ranging from -1 to 1.

## Why Twitter?
There are about 330 million monthly and 145 million daily active users on Twitter, sending accross 500 million tweets per day. A research has also found that 40 percent of users carried out a purchase after seeing it on Twitter, that's the kind of influence Twitter has on people.

## Methodology
### I. Corpus Collection and Preparation
Twitter API and Twitter data streaming methods were used extract tweet data. We used an hour window every day for seven days to extract tweet data.

### II. Pre-processing and Data Normalization
Preprocessing a Twitter dataset involves a series of tasks like removing all types of irrelevant information like emojis, special characters and links, then Tokenizing. It can also involve making format improvements or Stop Words Removal.

### III. Database management
Normalized data was then loaded into a Postgres development database prior to being converted into a Heroku database.

### IV. Machine Learning Model for Prediction
A number of models were tested like ---- and the model with most accurate results was selected with Test score of --- 

### V. Analysis and visualization
Visualizations were built using variety of JS libraries like Chart.js, Plotly.js, D3.js.

### VI. Dashboard and website
The dashboard function of the website was built around the interactive visualizations.

## Limitations
* **Data Volume**
Volume of tweets per minute is huge. Due to limitation of hardware, storage and practicality on volume of Data, team decided to retrieve ~10K tweets per day for 11 days.

* **Population Representation** The twitter user population is not an ideal representation of the country as about only 20% of US internet users access Twitter once per month. Also 63 percent of all Twitter users worldwide are between ages 35 to 65 and the ratio of female to male Twitter users is roughly one to two.

* **Data Retrieval** Standard Twitter API allows searches against a sampling of recent Tweets published in the past 7 days only.

* **Word Classification**
Too many techniques are available to classify tweet though none shows accuracy to classify tweets correctly over 80%.

## Group Members
* Ajay Patil
* Akshita Parasrampuria
* Archna Ashish
* Aslam Momin
* Hasti Patel

## Declaration
The authors declare and solemnly affirm that this research has neither been funded by any political or religious groups nor are the authors in any way affiliated to any institutions with direct or indirect access to groups with biased interests. This research work has been carried out in the interests of technology and academics.