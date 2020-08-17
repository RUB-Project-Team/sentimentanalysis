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

var chartData="";
var trump_data="";
var biden_data="";
var positiveTrump="";
var positiveBiden="";   
var negativeTrump="";
var negativeBiden="";
var neutralTrump="";
var neutralBiden="";
var xValues="";
var y1=[];
var y2=[];
var y3=[];
var y4=[];
var y5=[];
var y6=[];
var url="/tweetData"
d3.json(url).then(function (data) {
  //console.log(data)

chartData=data;  
trump_data=data.filter(selTrump);
biden_data=data.filter(selBiden);
positiveTrump=trump_data.filter(selPositive);
positiveBiden=biden_data.filter(selPositive);   
negativeTrump=trump_data.filter(selNegative);
negativeBiden=biden_data.filter(selNegative);
neutralTrump=trump_data.filter(selNeutral);
neutralBiden=biden_data.filter(selNeutral);
var dates = chartData.reduce(function (r, a) {
    r[a.Date] = r[a.Date] || [];
    r[a.Date].push(a);
    return r;
}, Object.create(null));
// console.log(dates)
    xValues=Object.keys(dates)
    // y1, y2, y3, y4, y5, y6="";
    for(var i=0; i< xValues.length; i++){
        var grouped = positiveTrump.reduce(function (r, a) {
            r[a.Date] = r[a.Date] || [];
            r[a.Date].push(a);
            return r;
        }, Object.create(null));
        y1.push(grouped[xValues[i]].length);
        var grouped2 = negativeTrump.reduce(function (r, a) {
            r[a.Date] = r[a.Date] || [];
            r[a.Date].push(a);
            return r;
        }, Object.create(null));
        y2.push(grouped2[xValues[i]].length);
        var grouped3 = neutralTrump.reduce(function (r, a) {
            r[a.Date] = r[a.Date] || [];
            r[a.Date].push(a);
            return r;
        }, Object.create(null));
        y3.push(grouped3[xValues[i]].length);

        var grouped4 = positiveBiden.reduce(function (r, a) {
          r[a.Date] = r[a.Date] || [];
          r[a.Date].push(a);
          return r;
      }, Object.create(null));
      y4.push(grouped4[xValues[i]].length);        
      
      var grouped5 = negativeBiden.reduce(function (r, a) {
        r[a.Date] = r[a.Date] || [];
        r[a.Date].push(a);
        return r;
    }, Object.create(null));
    y5.push(grouped5[xValues[i]].length);        
    
    var grouped6 = neutralBiden.reduce(function (r, a) {
      r[a.Date] = r[a.Date] || [];
      r[a.Date].push(a);
      return r;
  }, Object.create(null));
  y6.push(grouped6[xValues[i]].length);
        }
      // });
    // });
//Trump chart


new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [{ 
          data: y1,
          label: "Positive",
          borderColor: "#17a327",
          fill: false
        }, { 
          data: y2,
          label: "Negative",
          borderColor: "#f01d1d",
          fill: false
        }, { 
          data: y3,
          label: "Neutral",
          borderColor: "#d5db23",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Trump Tweets'
      },
      xAxes: [{
        ticks: {
          // autoSkip: false,
          maxRotation: 90,
          minRotation: 45
        }
      }]
    }
  });

//Biden Chart
  new Chart(document.getElementById("myChart2"), {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [{ 
          data: y4,
          label: "Positive",
          borderColor: "#17a327",
          fill: false
        }, { 
          data: y5,
          label: "Negative",
          borderColor: "#f01d1d",
          fill: false
        }, { 
          data: y6,
          label: "Neutral",
          borderColor: "#d5db23",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Biden Tweets'
      }
    }
  });

});
