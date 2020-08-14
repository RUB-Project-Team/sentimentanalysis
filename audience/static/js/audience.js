var url = `tweetsSource`;
    d3.json(url).then(function (data) {
        grouped = data.reduce(function (r, a) {
            r[a.Source] = r[a.Source] || [];
            r[a.Source].push(a);
            return r;
        }, Object.create(null));
        // console.log(grouped["Twitter for iPhone"].length)
        var source=Object.keys(grouped);
        // console.log(source[0])
        // var dict={Source:[],count:[]}
        // for(i=0; i< source.length; i++){
        //     dict["Source"].push(source[i]);
        //     dict["count"].push(grouped[source[i]].length);
        // }
        // console.log(dict["count"])
        var dict={}
        for(i=0; i< source.length; i++){
            dict[source[i]]=grouped[source[i]].length
            // dict["count"].push(grouped[source[i]].length);
        }
        var items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
          });
          
          // Sort the array based on the second element
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          var graphData=items.slice(0,5);
        //   console.log(graphData[0][0])
        // console.log(dict)
  var data1 = {
    datasets: [{
        data: [
            graphData[0][1],
            graphData[1][1],
            graphData[2][1],
            graphData[3][1],
            graphData[4][1]
        ],
        backgroundColor: [
            "rgba(255, 0, 0, 0.4)",
            // "#FF6384",
            "rgba(0,255,0,0.4)",
            "rgba(255,255,0,0.5)",
            "#E7E9ED",
            "#36A2EB"
        ],
        // fillOpacity: .3,
        label: 'My dataset' // for legend
    }],
    labels: [
        graphData[0][0],
        graphData[1][0],graphData[2][0],graphData[3][0],graphData[4][0]
    ]
};
var ctx = $("#myChart");
new Chart(ctx, {
    data: data1,
    type: 'polarArea',
    fillOpacity: .3
});
});

// function termFreq(){
//   var canvas = document.getElementById('myChart');
//   var extremo1=[-5, 3, 9, -11];
//   var extremo2=[-5, 3, 9, -11];
//   var data = {
//   labels: ["Visua_Verbal", "Secuencial_Global", "Sensitivo_Intuitivo", "Reflexivo_Activo"],

//   datasets: [
//       {
//        backgroundColor: 'rgba(63, 191, 191, 0.75)',
//        borderColor: 'rgba(63, 191, 191, 0.75)',
//        hoverBackgroundColor: 'rgba(191, 63, 63, 1)',
//        hoverBorderColor: 'rgba(191, 63, 63, 1)',
//                data: extremo1
//       },
//       {   
//        backgroundColor: 'rgba(63, 191, 191, 0.75)',
//        borderColor: 'rgba(63, 191, 191, 0.75)',
//        hoverBackgroundColor: 'rgba(191, 63, 63, 1)',
//        hoverBorderColor: 'rgba(191, 63, 63, 1)',
//                data: extremo1
//       }
//   ]
// };

// var option = {
//     maintainAspectRatio: false,
//     responsive: true,
//       scales: {
//              xAxes: [{
//                display: true,
//                ticks: {
//                maxTicksLimit: 12
//                }
//              }],
//              yAxes: [{
//                 position: "left",
//                 display: true,
//                 ticks: { 
//                 callback:(label,index,labels)=>{
//                 label = label.match(/_(\w*)/)[1];
//                 return label;
//                 }}
//                 },
//                 {
//                  position: "right",
//                  display: true,
//                  ticks: {

//                  callback:(label,index,labels)=>{
//                  return label ;
//                  }
//                 }
//                }]
//                },
//                legend: {
//                        display: false
//               }

// };
// var myLineChart = new Chart(canvas,{
//   type: 'horizontalBar',
//   data:data,
// options:option
// });
// };