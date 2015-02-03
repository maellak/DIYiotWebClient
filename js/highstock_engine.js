function addplotpoint(subject){
	var chart = $('#plotcontainer').highcharts(),
	    series = chart.series[0];
	series.addPoint([ subject.datatimestamp[subject.i-1][0], subject.datatimestamp[subject.i-1][1] ], false);
	chart.redraw();
}

function initplot(subject){
	$LAB
	.script("js/plugins/highstock/highstock.js").wait() 
   .script("js/plugins/highstock/modules/exporting.js").wait()
   .wait(function(){

	//$.ajax({
	//	url: "js/plugins/highstock/highstock.js",
	//	dataType: "script"
	//}).done(function() {
	
		Highcharts.setOptions({
			global : {
				useUTC : false
			}
		});

		$('#plotcontainer').highcharts('StockChart', {
			rangeSelector: {
				 buttons: [{
					count: 1,
					type: 'minute',
					text: '1M'
				}, {
					count: 2,
					type: 'minute',
					text: '2M'
				 }, {
					count: 5,
					type: 'minute',
					text: '5M'
				 }, {
					type: 'all',
					text: 'All'
				 }],
				 inputEnabled: false,
				 selected: 0
			},

			title : {
				text : 'Light Sensor Mearurements'
			},
			xAxis: {
				gridLineWidth: 1,
				title: {
					text: 'Local Time',
				},
			},
			yAxis: {
				gridLineWidth: 1,
				title: {
					text: subject.unitofmeasurement
				},
			},
			series : [{
				name : subject.unitofmeasurement,
				data : [],
				animation: false,
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
		
	});
	
	//$.ajax({
	//	url: "js/plugins/highstock/modules/exporting.js",
	//	dataType: "script"
	//});
}
