var url = '/tweetsSource';
    d3.json(url).then(function (data) {
        grouped = data.reduce(function (r, a) {
            r[a.Source] = r[a.Source] || [];
            r[a.Source].push(a);
            return r;
        }, Object.create(null));
        var source=Object.keys(grouped);
        var dict={}
        for(i=0; i< source.length; i++){
            dict[source[i]]=grouped[source[i]].length
        }
        var items = Object.keys(dict).map(function(key) {
            return [key, dict[key]];
          });
          // Sort the array based on the second element
          items.sort(function(first, second) {
            return second[1] - first[1];
          });
          var graphData=items.slice(0,5);
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
            "rgba(0,255,0,0.4)",
            "rgba(255,255,0,0.5)",
            "#E7E9ED",
            "#36A2EB"
        ],
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


function selTrump(d){
    return d["Matched Keywords"]=="Trump"
  };
function selBiden(d){
    return d["Matched Keywords"]=="Biden"
  };
var chartData="";
var trump_data="";
var biden_data="";
//read URL for data

d3.json("/tweetUser").then(function (data) {
    chartData=data;  
    trump_data=data.filter(selTrump);
    biden_data=data.filter(selBiden);
    //grouped by date
    trump_grouped = trump_data.reduce(function (r, a) {
                    r[a.Date] = r[a.Date] || [];
                    r[a.Date].push(a);
                    return r;
                }, Object.create(null));
    biden_grouped = biden_data.reduce(function (r, a) {
                    r[a.Date] = r[a.Date] || [];
                    r[a.Date].push(a);
                    return r;
                }, Object.create(null));
    // Unique dates for x axis
    var dates= Object.keys(biden_grouped);
    // Values for calculating average
    var total_biden=[];
    var followersByDayB=[];
    var friendsByDayB=[];
    var avgFollowerB=[];
    var avgFriendsB=[];
    var total_trump=[];
    var followersByDayT=[];
    var friendsByDayT=[];
    var avgFollowerT=[];
    var avgFriendsT=[];
    //Biden data
    for(i=0;i<dates.length;i++){
        total_biden.push(biden_grouped[dates[i]].length);
        //Followers and friends Values
        var followers=0;
        var friends=0;
        for(var j=0;j<biden_grouped[dates[i]].length;j++ ){
        followers+= biden_grouped[dates[i]][j]["Followers"];
        friends+= biden_grouped[dates[i]][j]["Friends"];
        };
        followersByDayB.push(followers);
        friendsByDayB.push(friends);
        //calculate avg
        avgFollowerB.push(Math.round(followersByDayB[i]/total_biden[i]));
        avgFriendsB.push(Math.round(friendsByDayB[i]/total_biden[i]));
    }
    //Trump Data
    for(i=0;i<dates.length;i++){
        total_trump.push(trump_grouped[dates[i]].length);
        //Followers and friends Values
        var followers=0;
        var friends=0;
        for(var j=0;j<trump_grouped[dates[i]].length;j++ ){
        followers+= trump_grouped[dates[i]][j]["Followers"];
        friends+= trump_grouped[dates[i]][j]["Friends"];
        };
        followersByDayT.push(followers);
        friendsByDayT.push(friends);
        //calculate avg
        avgFollowerT.push(Math.round(followersByDayT[i]/total_trump[i]));
        avgFriendsT.push(Math.round(friendsByDayT[i]/total_trump[i]));
    }
        new Chart(document.getElementById("myChart3"), {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{ 
              data: avgFollowerT,
              label: "Average Followers ~ Trump",
              borderColor: "#F01D1D",
              fill: false,
              showLine: false,
              pointStyle: "star",
              radius: 6
            }, { 
              data: avgFollowerB,
              label: "Average Followers ~ Biden",
              borderColor: "#242BA6",
              fill: false,
              showLine: false,
              pointStyle: "cross",
              radius: 6
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Average Followers of Tweeters of respective Candidates'
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Average Followers of Tweeters'
              }
            }]
          }
        }
      });
});