// Call the dataTables jQuery plugin
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
	
metric_types=['doughnut','bar'];

chart_myBarChart0=["myBarChart0",metric_types[1],["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[371,50,123,50,666]];
chart_myBarChart1=["myBarChart1",metric_types[1],["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[371,50,123,50,666]];
chart_myBarChart2=["myBarChart2",metric_types[1],["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[371,50,123,50,666]];
chart_myBarChart3=["myBarChart3",metric_types[1],["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[371,50,123,50,666]];
chart_myBarChart4=["myBarChart4",metric_types[1],["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[371,50,123,50,666]];
chart_myBarChart5=["myBarChart5",metric_types[1],["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[371,50,123,50,666]];


metric_charts=[chart_myBarChart0,chart_myBarChart1,chart_myBarChart2,chart_myBarChart3,chart_myBarChart4,chart_myBarChart5];

var current_chart_length=4;

var metric_myPieChart=[];

var metric_ctx=[];

async function metrics_load_new(){
	document.getElementById("ontology_name").innerHTML = "Παρακαλώ περιμένετε..";
	
	await metrics_wait(10000);
	
	document.getElementById("ontology_name").innerHTML = '';
	
	for (var j = 0; j < current_chart_length; j++) {
		metrics_create_chart(metric_ctx[j],metric_myPieChart[j],metric_charts[j][0],metric_charts[j][1],metric_charts[j][2],metric_charts[j][3]);
	}
}
function metrics_create_chart(ctx_id,myPieChart_id,chart_id,chart_type,chart_labels,chart_data){
	
	if(myPieChart_id) myPieChart_id.destroy();
	
	ctx_id=document.getElementById(chart_id);
	
	myPieChart_id = new Chart(ctx_id, {
	type: chart_type,
	data: {
	labels: chart_labels,
	datasets: [{
	  data: chart_data,
	  backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
	  hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
	  hoverBorderColor: "rgba(234, 236, 244, 1)",
	}],
	},
	options: {
	maintainAspectRatio: false,
	tooltips: {
	  backgroundColor: "rgb(255,255,255)",
	  bodyFontColor: "#858796",
	  borderColor: '#dddfeb',
	  borderWidth: 1,
	  xPadding: 15,
	  yPadding: 15,
	  displayColors: false,
	  caretPadding: 10,
	},
	legend: {
	  display: false
	},
	cutoutPercentage: 80,
	},
	});
	
	myPieChart_id.update();
}
function metrics_wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}