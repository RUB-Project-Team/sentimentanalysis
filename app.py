from flask import Flask, jsonify, render_template

@app.route("/")
def welcome():
    return render_template("index.html")


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
