
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

    d3.select("#doughnut-chart").html("");
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


    // Count for doughnut
    var countTrumpPositive=Object.values(positiveTrump).length;
    var countTrumpNegative=Object.values(negativeTrump).length;
    var countTrumpNeutral=Object.values(neutralTrump).length;
    var countBidenPositive=Object.values(positiveBiden).length;
    var countBidenNegative=Object.values(negativeBiden).length;
    var countBidenNeutral=Object.values(neutralBiden).length;
    var chartData= {
            labels: ["Positive", "Negative", "Neutral"],
                
            datasets: [
              {data: [countTrumpPositive, countTrumpNegative, countTrumpNeutral],
                // label: "Trump",
                // labels: ["Trump-Positive", "Trump-Negative", "Trump-Neutral"],
                backgroundColor: [
                    "#5cbd4f",  
                    "#f23c33",
                    "#3e95cd",
                ],            
            },
                {
                // labels: ["Biden-Positive", "Biden-Negative", "Biden-Neutral"],
                // label: "Biden",
                backgroundColor: [
                        "#5cbd4f",  
                        "#f23c33",
                        "#3e95cd",
                    ],
                data:[countBidenPositive, countBidenNegative, countBidenNeutral],
              },
            ],
          };
          $(document).ready(
            function() {
              var canvas = document.getElementById("doughnut-chart");
              var ctx = canvas.getContext("2d");
          var myNewChart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData
          });
          
    canvas.onclick = function(evt) {
        renderBar();
        var activePoints = myNewChart.getElementsAtEvent(evt);
          var idx = activePoints[0]['_index'];
        renderBar(idx)
      };
    }
  );
});

function renderBar(x){
    d3.json(url).then(function (data) {
        var trump_data=data.filter(selTrump);
        var biden_data=data.filter(selBiden);
        
        var dates = data.reduce(function (r, a) {
            r[a.Date] = r[a.Date] || [];
            r[a.Date].push(a);
            return r;
        }, Object.create(null));
        var xValues=Object.keys(dates)

        var bidenData={};
        var trumpData={};
          //Grouped by date data
        //Positive
        if (x == 0){
            trumpData=trump_data.filter(selPositive);
            bidenData=biden_data.filter(selPositive);
        };
        //Negative
        if (x == 1){
            trumpData=trump_data.filter(selNegative);
            bidenData=biden_data.filter(selNegative);
        };
        //Neutral
        if (x == 2){
            trumpData=trump_data.filter(selNeutral);
            bidenData=biden_data.filter(selNeutral);
        };

        var yValuesT=[];
        var yValuesB=[];
        
        for(var i=0; i<xValues.length; i++){
            groupedT = trumpData.reduce(function (r, a) {
                r[a.Date] = r[a.Date] || [];
                r[a.Date].push(a);
                return r;
            }, Object.create(null));
            groupedB = bidenData.reduce(function (r, a) {
                r[a.Date] = r[a.Date] || [];
                r[a.Date].push(a);
                return r;
            }, Object.create(null));
            yValuesT.push(groupedT[xValues[i]].length);
            yValuesB.push(groupedB[xValues[i]].length);
        }
// #f01d1d red-trump,#242ba6 - biden
var barData={
    labels:xValues,
    datasets:[
        {
            label:"Trump",
            backgroundColor: "#f01d1d",
            data: yValuesT
        },
        {
            label:"Biden",
            backgroundColor: "#242ba6",
            data: yValuesB
        },
    ]
}
var ctx = document.getElementById("bar-chartcanvas").getContext("2d"); 
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: barData
  });
//bar chart event handler
//bar destroy function
});
};

// function renderTable(){}