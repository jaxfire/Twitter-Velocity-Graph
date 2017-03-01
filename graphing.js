var stopStartBtn = document.getElementById("stopStart");

var intervalHandle;
			
var tweetCounts = [];
var barColors = [];
var labelData = [];

var ctx = document.getElementById("twitter_chart");
ctx.style.backgroundColor = "rgba(51,62,85,255)";

var myChart;

var running;

renderChart();

//Toggle the graphing functionality on/off
stopStartBtn.onclick = function() {
    
    var elem = stopStartBtn.firstChild;
    
    if (running){
        running = false;
        clearInterval(intervalHandle);
        elem.data = "Start Chart";
    } 
    else{
        running = true;
        intervalHandle = setInterval(getLiveData, 5000); //Debugging 5 seconds
	    //intervalHandle = setInterval(getLiveData, 60000); //Real 1 minute
        elem.data = "Stop Chart";
     }
  
};

function getLiveData(){

	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
  
		if (this.readyState == 4 && this.status == 200) {
            
            var individualElements = this.responseText.split("/");
            
            var tempCount = [];
            var tempLabels = [];
            
            for(var i = 0; i < individualElements.length; i++){
                
                var countSpikeSplit = individualElements[i].split(",");               
                tempCount[i] = countSpikeSplit[0];
                if(countSpikeSplit[1] == 1){
                    barColors[i] = "rgba(244, 60, 86, 1)";
                } else{
                    barColors[i] = "rgba(38, 226, 173, 1)";
                }
                tempLabels[i] = formatMins(i);
               
            }
            
            tweetCounts = tempCount;
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
                backgroundColor: barColors,
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
            },
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            }
        }
    });
}


function formatMins(mins){
    
    var hours   = Math.floor(mins / 60);
    var minutes = Math.floor(mins % 60);

    if (hours < 10) {hours = "0" + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    
    return hours + ':' +minutes;

}