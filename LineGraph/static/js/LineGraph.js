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
    //d3.select("#doughnut-chart").html("");
    // d3.select("#doughnut-chart3").html("");
    //d3.json("http://localhost:5000/data").then(function (data) {
    //var state = data.map(d => d.state);
    var url = `/line-data`;
    d3.json(url).then(function (data) {
    var trump_data=data.filter(selTrump);
    var biden_data=data.filter(selBiden);
    var tweetDate = data.map(d=> d.Date);
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
     // var percentT=((countTrump/countTotal)*100).toFixed(2);
      // var percentB=((countBiden/countTotal)*100).toFixed(2);
      
      // var percentPT=((countTrumpPositive/countTotal)*100).toFixed(2);
      // var percentNT=((countTrumpNegative/countTotal)*100).toFixed(2);
      // var percentNeT=((countTrumpNeutral/countTotal)*100).toFixed(2);
      // var percentPB=((countBidenPositive/countTotal)*100).toFixed(2);
      // var percentNB=((countBidenNegative/countTotal)*100).toFixed(2);
      // var percentNeB=((countBidenNeutral/countTotal)*100).toFixed(2);
      
  //  Line Chart
var trace1 = {
  x: tweetDate,
  y: ["countTrumpPositive", "countTrumpNeutral", "countTrumpNegative"],
  type: "line"
};

var data = [trace1];

var layout = {
  title: "'Line' Chart",
};
Plotly.newPlot("myDiv", data, layout);
// Plotly.newPlot("plot", data, layout);
  // var data1 = [{
  //   type: "sunburst",
  //   labels: ["Tweets", "Trump", "Biden", "Trump-Positive", "Trump-Negative", "Trump-Neutral", "Biden-Positive", "Biden-Negative", "Biden-Neutral"],
  //   parents: ["", "Tweets", "Tweets","Trump","Trump","Trump","Biden","Biden","Biden" ],
  //   // values:  [countTotal, countTrump, countBiden, countTrumpPositive, countTrumpNegative, countTrumpNeutral, countBidenPositive, countBidenNegative, countBidenNeutral],
  //   outsidetextfont: {size: 20, color: "#377eb8"},
  //   insidetextfont:{size:20},
  //   leaf: {opacity: 0.5 },
  //   marker: {line: {width: 2}},
  //   values:[100, percentT,percentB ,percentPT-0.01,percentNT, percentNeT,percentPB-0.01,percentNB, percentNeB ],
  //   branchvalues: 'total' 
  // }];
  
  // var layout = {
  //   margin: {l: 0, r: 0, b: 0, t: 0},
  //   sunburstcolorway:["#f01d1d", "#242ba6"],
  //   width: 500,
  //   height: 500,
  //   // title: {
  //   //   text:'Tweet Classification',
  //   //   font: {
  //   //     family: 'Courier New, monospace',
  //   //     size: 24
  //   //   },}
  // };
  
  
//   var myChart=Plotly.newPlot('myDiv', data1, layout);
//   var myPlot = document.getElementById("myDiv");
//   myPlot.on('plotly_click', function(d){
//     var point = d.points[0]["pointNumber"];
//     renderBar(point)
//     renderTable(point)
// });
  //  });

// function renderBar(x){
//     $("canvas#barchartcanvas").remove();
//     $("div#chart").append('<canvas id="barchartcanvas" width="600" height="350"></canvas>')
//     d3.json(url).then(function (data) {

//         var trump_data=data.filter(selTrump);
//         var biden_data=data.filter(selBiden);
        
//         var dates = data.reduce(function (r, a) {
//             r[a.Date] = r[a.Date] || [];
//             r[a.Date].push(a);
//             return r;
//         }, Object.create(null));
        
//         var xValues=Object.keys(dates)
//         // console.log(xValues)
//         var barPlotData={};
//         var color="";
//         var label="";
//         if (x == 3){barPlotData=trump_data.filter(selPositive);color="#17a327";label="Positive Tweets-Trump";};
//         if (x== 6 ){barPlotData=biden_data.filter(selPositive);color="#17a327";label="Positive Tweets-Biden";};
//         if (x== 4 ){barPlotData=trump_data.filter(selNegative);color="#f01d1d";label="Negative Tweets-Trump";};
//         if (x== 7 ){barPlotData=biden_data.filter(selNegative);color="#f01d1d";label="Negative Tweets-Biden";};
//         if (x== 5 ){barPlotData=trump_data.filter(selNeutral);color="#d5db23";label="Neutral Tweets-Trump";};
//         if (x== 8 ){barPlotData=biden_data.filter(selNeutral);color="#d5db23";label="Neutral Tweets-Biden";};

//         var yValues=[];
        
//         for(var i=0; i< xValues.length; i++){
//             grouped = barPlotData.reduce(function (r, a) {
//                 r[a.Date] = r[a.Date] || [];
//                 r[a.Date].push(a);
//                 return r;
//             }, Object.create(null));
            
//             yValues.push(grouped[xValues[i]].length);
//             }
// // #f01d1d red-trump,#242ba6 - biden
// var barData={
//     labels:xValues,
//     datasets:[
//         {
//             label:label,
//             backgroundColor: color,
//             data: yValues
//         },
//     ]
// }
// var ctx = document.getElementById("barchartcanvas").getContext("2d"); 
// // myBarChart.destroy()
// var myBarChart = new Chart(ctx, {
//     type: 'bar',
//     data: barData
//   });

// });
// };

// function renderTable(x){
//   d3.select("table").html("");
//   $("table#table1").append("<thead><tr><th>Tweets</th></tr></thead><tbody></tbody>");
//   if(x == 1 || x==2 || x==0 ){d3.select("thead").html("")};
//   d3.json("/doughnut-data").then(function (data) {
//     var trump_data=data.filter(selTrump);
//     var biden_data=data.filter(selBiden);
//     var tableData={};
//     if (x == 3){tableData=trump_data.filter(selPositive);};
//     if (x== 6 ){tableData=biden_data.filter(selPositive);};
//     if (x== 4 ){tableData=trump_data.filter(selNegative);};
//     if (x== 7 ){tableData=biden_data.filter(selNegative);};
//     if (x== 5 ){tableData=trump_data.filter(selNeutral);};
//     if (x== 8 ){tableData=biden_data.filter(selNeutral);};
//     // console.log(Object.entries(tableData)[5][1]["Tweet"]);
//     requiredData=[];
//     for(var i=0; i < 5; i++){
//       requiredData.push({sno:(i+1),tweet: Object.entries(tableData)[i][1]["Tweet"]});
//     }
//     var table=d3.select("#table")
// table.select("tbody").selectAll("tr")
// .data(requiredData)
// .enter()
// .append("tr")
// .html(function(d){
//   // console.log(d)  
//     return `<td>${d["sno"]}</td><td>${d["tweet"]}</td>`;
// })
//   });
 }
