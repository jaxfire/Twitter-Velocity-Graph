var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");

var intervalHandle;
			
var graphData = []

startBtn.onclick = function() {

	intervalHandle = setInterval(getMatchData, 1000); //Debugging
	//intervalHandle = setInterval(getMatchData, 1000); //Real
  
};

stopBtn.onclick = function() {

	clearInterval(intervalHandle);
  
};

function getMatchData(){

	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
  
		if (this.readyState == 4 && this.status == 200) {
		
			graphData = this.responseText.split(",");	
			console.log(graphData);
			
		}
		
	};
  
	xhttp.open("GET", "test.txt", true);
	xhttp.send();
	
}