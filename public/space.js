function getToday(){
	var date = new Date();
	var year = String(date.getFullYear());
	var month = String(date.getMonth() + 1);
	if(month < 10){
		month = "0" + month
	}
	var day = String(date.getDate());
	if(day < 10){
		day = "0" + day;
	}
	var today = year+"-"+month+"-"+day;
	return today
}


function getVelData(){
	var velList = document.getElementsByClassName("relVel");
	var nameList = document.getElementsByClassName("astName");
	var data = [];
	for(var i = 0; i < velList.length; i++){
		data[i] = {y: parseInt(velList[i].innerHTML.replace(/,/g,"")), label: nameList[i].innerHTML};
	}
	return data;
}

function getDiamData(){
	var diamList = document.getElementsByClassName("diameter");
	var nameList = document.getElementsByClassName("astName");
	var data = [];
	for(var i = 0; i < diamList.length; i++){
		data[i] = {y: parseInt(diamList[i].innerHTML.replace(/,/g,"")), label: nameList[i].innerHTML};
	}
	return data;
}

function chart() {
	var velData = getVelData();
		var diamData = getDiamData();
		var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		theme: "light1", 
		axisX: {
			title: "Today's Asteroids",
			labelWrap: true,
			labelMaxWidth: 100,
			labelAngle: 60
		},
		title:{
			text: "Relative Velocity/Estimated Diameter"
		},
		axisY: {
			title: "Velocity(mph)"
		},
		axisY2: {
			title: "Esimated Diameter(ft)"
		},
		legend: {
		cursor: "pointer",
		itemclick: toggleDataSeries
		},
		data: [{
			type: "column", 
			name: "Velocity",
			showInLegend: true,
			indexLabelFontColor: "#5A5757",
	      	indexLabelFontSize: 16,
			indexLabelPlacement: "outside",
			dataPoints: velData
		},
		{
			type: "column",
			name: "Diameter",
			axisYType: "secondary",
			showInLegend: true,
			dataPoints: diamData
		}
		]
	});
	chart.render();
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}
			

module.exports = getToday;




