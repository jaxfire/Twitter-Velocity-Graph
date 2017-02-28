var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");

var intervalHandle;
			
var tweetCounts = [];
var dataSpikes = [];
var labelData = [];

renderChart();

startBtn.onclick = function() {

	intervalHandle = setInterval(getMatchData, 5000); //Debugging
	//intervalHandle = setInterval(getMatchData, 60000); //Real
  
};

stopBtn.onclick = function() {

	clearInterval(intervalHandle);
  
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
            
            console.log(tweetCounts);
            tweetCounts = tempCount;
            dataSpikes = tempSpike;
            labelData = tempLabels;
                        
            renderChart();
			
		} else {
            console.log(this.readyState + ", " + this.status);
        }
		
	};
  
	xhttp.open("GET", "python/match_data_raw.txt", true);
	xhttp.send();
	
}

function renderChart(){
    
    var ctx = document.getElementById("myChart");
    
    ctx.style.backgroundColor = "rgba(51,62,85,255)";
    
    var myChart = new Chart(ctx, {
        
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