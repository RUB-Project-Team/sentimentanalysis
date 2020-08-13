// var url = `twitterSource`;
//     d3.json(url).then(function (data) {
//         grouped = data.reduce(function (r, a) {
//             r[a.Source] = r[a.Source] || [];
//             r[a.Source].push(a);
//             return r;
//         }, Object.create(null));
        
//         console.log(Object.keys(grouped).length)
  var data1 = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
        ],
        label: 'My dataset' // for legend
    }],
    labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue"
    ]
};
var ctx = $("#myChart");
new Chart(ctx, {
    data: data1,
    type: 'polarArea'
});
// });

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