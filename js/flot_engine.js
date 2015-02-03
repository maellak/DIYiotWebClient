var plot;

function addplotpoint(subject){
	plot.setData([{data: subject.datatime, label: subject.unitofmeasurement}]);
	plot.setupGrid();
	plot.draw();
}

function initplot(subject){
	$LAB
	.script("js/plugins/flot/jquery.flot.js").wait()  
   .wait(function(){

	//$.ajax({
	//	url: "js/plugins/flot/jquery.flot.js",
	//	dataType: "script"
	//}).done(function() {
		plot = $.plot($("#plotcontainer"), [{data: [], label: subject.unitofmeasurement}]);
	});
}
