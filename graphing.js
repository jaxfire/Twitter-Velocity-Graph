var stopStartBtn = document.getElementById("stopStart");
var tweetText = document.getElementById("tweets");

var intervalHandle;
			
var tweetCounts = [];
var barColors = [];
var labelData = [];

var ctx = document.getElementById("twitter_chart");
ctx.style.backgroundColor = "rgba(51,62,85,255)";

var myChart;

var running;

renderChart();

// Toggle the graphing functionality on/off
stopStartBtn.onclick = function() {
    
    var elem = stopStartBtn.firstChild;
    
    if (running){
        running = false;
        clearInterval(intervalHandle);
        elem.data = "Start Chart";
    } 
    else{
        running = true;
        intervalHandle = setInterval(parseData, 5000); //Debugging 5 seconds
	    // intervalHandle = setInterval(parseData, 60000); //Real 1 minute
        elem.data = "Stop Chart";
     }
  
};


function parseData(){

	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
  
		if (this.readyState == 4 && this.status == 200) {
            
            // Split the text into each tick's data
            var individualElements = this.responseText.split("/");
            
            var tempCount = [];
            var tempLabels = [];
            
            // For each tick's data
            for(var i = 0; i < individualElements.length; i++){
                
                //Split the tweet count and spike boolean values
                var countSpikeSplit = individualElements[i].split(","); 
                
                tempCount[i] = countSpikeSplit[0];
                
                // If this tick is a spike in the data
                if(countSpikeSplit[1] == 1){
                    // Colour the bar red
                    barColors[i] = "rgba(244, 60, 86, 1)";
                    // and pdate the latest tweets
                    updateTweetText();
                    
                } else{
                    // We use the default green colour
                    barColors[i] = "rgba(38, 226, 173, 1)";
                }
                
                // Format the tick counter into hh:mm format
                tempLabels[i] = formatMins(i);
               
            }
            
            // update global variables used by the chart
            tweetCounts = tempCount;
            labelData = tempLabels;
            
            // create a new instance of the chart which uses the latest values
            renderChart();
			
		}
		
	};
  
	xhttp.open("GET", "match_data_raw.txt", true);
	xhttp.send();
	
}

// presents the latest tweets from a spike tick to the user
function updateTweetText(){

	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
  
		if (this.readyState == 4 && this.status == 200) {
            
            tweetText.innerHTML = this.responseText;
			
		}
		
	};
  
	xhttp.open("GET", "latest_tweets.txt", true);
	xhttp.send();
	
}

// instantiates a new chart
function renderChart(){
    
    myChart = new Chart(ctx, {
        
        type: 'bar',
        data: {
            labels: labelData,  
            datasets: [{
                backgroundColor: barColors,
                data: tweetCounts,
                hoverBackgroundColor: "rgba(255,255,255,0.75)"
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
                    categoryPercentage: 1.0,
                    barPercentage: 1.0,
                    //barThickness: 5,
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
            }/*,
            hover: {
                mode: false
            }*/
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