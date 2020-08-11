
function selTrump(d){
    return d["Matched Keywords"]=="Trump"
  };
  function selBiden(d){
    return d["Matched Keywords"]=="Biden"
  };
  function selPositive(d){
    return d.Prediction=="Positive"
};
function selNeutral(d){
    return d.Prediction=="Neutral"
};
function selNegative(d){
    return d.Prediction=="Negative"
};
    // var dropdownMenu = d3.select("#selDataset");
    // // // Assign the value of the dropdown menu option to a variable
    // var value = dropdownMenu.property("value");
    d3.select("#doughnut-chart").html("");
    // d3.select("#doughnut-chart3").html("");
    var url = `/doughnut-data`;
    d3.json(url).then(function (data) {
    var trump_data=data.filter(selTrump);
    var biden_data=data.filter(selBiden);
    var positiveTrump=trump_data.filter(selPositive);
    var positiveBiden=biden_data.filter(selPositive);   
    var negativeTrump=trump_data.filter(selNegative);
    var negativeBiden=biden_data.filter(selNegative);
    var neutralTrump=trump_data.filter(selNeutral);
    var neutralBiden=biden_data.filter(selNeutral);


    // Count for sunburst
    var countTotal=Object.values(data).length;
    var countTrump=Object.values(trump_data).length;
    var countBiden=Object.values(biden_data).length;
  
    var countTrumpPositive=Object.values(positiveTrump).length;
    var countTrumpNegative=Object.values(negativeTrump).length;
    var countTrumpNeutral=Object.values(neutralTrump).length;
    var countBidenPositive=Object.values(positiveBiden).length;
    var countBidenNegative=Object.values(negativeBiden).length;
    var countBidenNeutral=Object.values(neutralBiden).length;

  //   var data1 = [
  //     {
  //       "type": "sunburst",
  //       "labels": ["Positive", "Negative", "Neutral", "Positive", "Negative", "Neutral"],
  //       "parents": ["","Trump","Trump","Trump", "Biden","Biden","Biden"],
  //       "values":  [65, 14, 12, 10, 2, 6],
  //       "leaf": {"opacity": 0.4},
  //       "marker": {"line": {"width": 2}},
  //       // "branchvalues": 'total'
  //     }];
      
  //     // var layout = {
  //     //   "margin": {"l": 0, "r": 0, "b": 0, "t": 0},
  //     // };
  //     Plotly.newPlot('doughnut', data1)
  //     // myPlot = document.getElementById("doughnut");

  //   }
  // );
  var data1 = [{
    type: "sunburst",
    labels: ["Tweets", "Trump", "Biden", "Trump-Positive", "Trump-Negative", "Trump-Neutral", "Biden-Positive", "Biden-Negative", "Biden-Neutral"],
    parents: ["", "Tweets", "Tweets","Trump","Trump","Trump","Biden","Biden","Biden" ],
    values:  [countTotal, countTrump, countBiden, countTrumpPositive, countTrumpNegative, countTrumpNeutral, countBidenPositive, countBidenNegative, countBidenNeutral],
    outsidetextfont: {size: 20, color: "#377eb8"},
    leaf: {opacity: 0.4},
    marker: {line: {width: 2}},
    branchvalues: 'total'
  }];
  
  var layout = {
    margin: {l: 0, r: 0, b: 0, t: 0},
    width: 500,
    height: 500
  };
  
  
  var myChart=Plotly.newPlot('myDiv', data1, layout);
  var myPlot = document.getElementById("myDiv");
  myPlot.on('plotly_click', function(d){
    var point = d.points[0]["pointNumber"];
    // console.log(point)
    // d3.select("barchartcanvas").html("");
    renderBar(point)
});
    });

function renderBar(x){
    $("canvas#barchartcanvas").remove();
    $("div#chart").append('<canvas id="barchartcanvas" width="600" height="450"></canvas>')
    d3.json(url).then(function (data) {

        var trump_data=data.filter(selTrump);
        var biden_data=data.filter(selBiden);
        
        var dates = data.reduce(function (r, a) {
            r[a.Date] = r[a.Date] || [];
            r[a.Date].push(a);
            return r;
        }, Object.create(null));
        var xValues=Object.keys(dates)

        var barPlotData={};
        var color="";
        var label="";
        if (x == 3){barPlotData=trump_data.filter(selPositive);color="#17a327";label="Positive Tweets-Trump";};
        if (x== 6 ){barPlotData=biden_data.filter(selPositive);color="#17a327";label="Positive Tweets-Biden";};
        if (x== 4 ){barPlotData=trump_data.filter(selNegative);color="#f01d1d";label="Negative Tweets-Trump";};
        if (x== 7 ){barPlotData=biden_data.filter(selNegative);color="#f01d1d";label="Negative Tweets-Biden";};
        if (x== 5 ){barPlotData=trump_data.filter(selNeutral);color="#d5db23";label="Neutral Tweets-Trump";};
        if (x== 8 ){barPlotData=biden_data.filter(selNeutral);color="#d5db23";label="Neutral Tweets-Biden";};

        var yValues=[];
        
        for(var i=0; i<xValues.length; i++){
            grouped = barPlotData.reduce(function (r, a) {
                r[a.Date] = r[a.Date] || [];
                r[a.Date].push(a);
                return r;
            }, Object.create(null));
            
            yValues.push(grouped[xValues[i]].length);
            }
// #f01d1d red-trump,#242ba6 - biden
var barData={
    labels:xValues,
    datasets:[
        {
            label:label,
            backgroundColor: color,
            data: yValues
        },
    ]
}
var ctx = document.getElementById("barchartcanvas").getContext("2d"); 
// myBarChart.destroy()
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: barData
  });
//bar chart event handler

    
//bar destroy function

// var button = document.getElementById("myDiv");
// console.log(button)
//   myDiv.addEventListener("click", function(){
//         myBarChart.destroy();
//     });
});
};

// function renderTable(){}