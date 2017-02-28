var stopStartBtn = document.getElementById("stopStart");

var intervalHandle;
			
var tweetCounts = [];
var dataSpikes = [];
var labelData = [];

var ctx = document.getElementById("myChart");
ctx.style.backgroundColor = "rgba(51,62,85,255)";

var myChart;

var running;

renderChart();

stopStartBtn.onclick = function() {
    
    var elem = stopStartBtn.firstChild;
    
    if (running){
        running = false;
        clearInterval(intervalHandle);
        elem.data = "Start Chart";
    } 
    else{
        running = true;
        intervalHandle = setInterval(getMatchData, 5000); //Debugging
	    //intervalHandle = setInterval(getMatchData, 60000); //Real
        elem.data = "Stop Chart";
     }
  
};

function getMatchData(){

	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
  
		if (this.readyState == 4 && this.status == 200) {
            
            var unsplitData = this.responseText.split("/");
            
            var tempCount = [];
            var tempSpike = [];
            var tempLabels = [];
            
            for(var i = 0; i < unsplitData.length; i++){
                
                var splitData = unsplitData[i].split(",");               
                tempCount[i] = splitData[0];
                tempSpike[i] = splitData[1];
                tempLabels[i] = formatMins(i);
               
            }
            
            tweetCounts = tempCount;
            dataSpikes = tempSpike;
            labelData = tempLabels;
                        
            renderChart();
			
		}
		
	};
  
	xhttp.open("GET", "python/match_data_raw.txt", true);
	xhttp.send();
	
}

function renderChart(){
    
    myChart = new Chart(ctx, {
        
        type: 'bar',
        data: {
            labels: labelData,
            datasets: [{
                data: tweetCounts
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    display: false,
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: false,
                        drawOnChartArea: false,
                        lineWidth: 0,
                        fontColor: "rgba(255, 255, 255, 1)"
                    },
                    barPercentage: 1.0,
                    categoryPercentage: 1.0
                }]
            },
            legend: {
                display: false
            },
            elements: {
                rectangle: {
                    backgroundColor: "rgba(38, 226, 173, 1)"
                }
            },
            title: {
                display: true,
                text: "Twitter Velocity Graph",
                fontColor: "rgba(216, 173, 40, 1)"
            },
            animation: {
                duration: 0
            },
            tooltips: {
                enabled: false
            }
        }
    });
    
    /*
    //Issue accessing the individual bars 
    for(var i = 0; i < dataSpikes.length; i++){
        if(dataSpikes[i] == 1){
            myChart.datasets[0].bars[0].fillColor = "rgba(255,0,0,255)";
            myChart.update();
        }
    }*/
}


function formatMins(mins){
    
    var hours   = Math.floor(mins / 60);
    var minutes = Math.floor(mins % 60);

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    
    return hours + ':' +minutes;

}