function addplotpoint(subject){
	var chart = $('#plotcontainer').highcharts(),
	    series = chart.series[0];
	series.addPoint([ subject.datatime[subject.i-1][0], subject.datatime[subject.i-1][1] ], false);
	chart.redraw();
}

function initplot(subject){
	$LAB
	.script("js/plugins/highcharts/highcharts.js").wait() 
   .script("js/plugins/highcharts/modules/exporting.js").wait() 
   .wait(function(){

	//$.ajax({
	//	url: "js/plugins/highcharts/highcharts.js",
	//	dataType: "script"
	//}).done(function() {

		$('#plotcontainer').highcharts({
		  title: {
				text: 'Light Sensor Mearurements',
				x: -20 //center
		  },
		  subtitle: {
				text: 'Source: http://arduino.os.cs.teiath.gr',
				x: -20
		  },
		  xAxis: {
		  		gridLineWidth: 1,
				title: {
					text: 'Time (s)',
				},
		  },
		  yAxis: {
		  		gridLineWidth: 1,
				title: {
					text: subject.unitofmeasurement
				},
		  },
		  tooltip: {
				valueSuffix: ' value'
		  },
		  legend: {
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 50,
				floating: true
				},
		  series: [{
				name: subject.unitofmeasurement,
				data: [],
				animation: false 
		  }]
		});
	});
	
	//$.ajax({
	//	url: "js/plugins/highcharts/modules/exporting.js",
	//	dataType: "script"
	//});
}
