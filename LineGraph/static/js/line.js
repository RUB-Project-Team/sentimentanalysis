function selTrump(d){
    return d["Matched Keywords"]=="Trump"
  }

  function selBiden(d){
    return d["Matched Keywords"]=="Biden"
  }
  
  function selPositive(d){
    return d.Prediction=="Positive"
}

function selNeutral(d){
    return d.Prediction=="Neutral"
}

function selNegative(d){
    return d.Prediction=="Negative"
}


//function renderLine(x){

    var url = `/line-data`;

    //loading the csv file and pulling data
    d3.json(url).then(function (data) {

        //filtering the data for Trump
    var trump_data=data.filter(selTrump);
    var positiveTrump=trump_data.filter(selPositive);
    var negativeTrump=trump_data.filter(selNegative);
    var neutralTrump=trump_data.filter(selNeutral);

        //filtering the data for Biden
    var biden_data=data.filter(selBiden);     
    var positiveBiden=biden_data.filter(selPositive);   
    var negativeBiden=biden_data.filter(selNegative);
    var neutralBiden=biden_data.filter(selNeutral);
    
      //getting the Date data   
            
    var dates = data.reduce(function (r, a) {
        r[a.Date] = r[a.Date] || [];
        r[a.Date].push(a);
        return r;
    }, Object.create(null));
    
    var xValues=Object.keys(dates);
    console.log(xValues);
}
    
            
    //         var yValues=[];
            
    //         for(var i=0; i< xValues.length; i++){
    //             grouped = barPlotData.reduce(function (r, a) {
    //                 r[a.Date] = r[a.Date] || [];
    //                 r[a.Date].push(a);
    //                 return r;
    //             }, Object.create(null));
                
    //             yValues.push(grouped[xValues[i]].length);
    //             }
    // // // #f01d1d red-trump,#242ba6 - biden
    // var lineData={
    //     x :xValues,
    //     y: yValues
    //     ]
    // }
    
    // Plotly.newPlot("myDiv", lineData);
    
    
    // });
    // }
