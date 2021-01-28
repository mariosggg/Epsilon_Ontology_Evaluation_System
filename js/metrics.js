// Call the dataTables jQuery plugin
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
	
metric_charts=[];

metric_charts[0]=["myBarChart0",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[156,0,84,88,257]]; //Size
metric_charts[1]=["myBarChart4",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[0.118778744494276,0.6485207907885175,0.9381533400219321,0.5376634027639661,0.4748778409101148]]; //Appropriateness
metric_charts[2]=["myBarChart1",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[13.594405594405595,0,45.11904761904762,22.535714285714285,31.293478260869566]]; //Attr Richness
metric_charts[3]=["myBarChart2",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[0.2613065326633166,0,0.22641509433962265,1.0232558139534884,0.4290484140233723]]; //Inheritance Richness
metric_charts[4]=["myBarChart3",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[1.2797202797202798,0,0.10714285714285714,0.07142857142857142,0.10869565217391304]]; //Relative Sizes
metric_charts[5]=["myBarChart5",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[0.03496503496503497,0,0,0.4642857142857143,0.14130434782608695]]; //Average Population 
metric_charts[6]=["myBarChart6",'bar',["Pizza", "Dublincore", "Cidoc", "FOAF", "Music"],[12.461538461538462,0,45.11904761904762,7.170454545454546,11.202334630350194]]; //Atomic Size

var metric_graphs=['http://localhost:8890/pizza','http://localhost:8890/dublincore','http://localhost:8890/cidoc','http://localhost:8890/foaf','http://localhost:8890/musicontology'];
var metric_queries=['SELECT distinct count(distinct ?instance) WHERE {?instance a ?class . ?class a owl:Class}', 									//instances 
					'SELECT (count(distinct ?entity) AS ?Entities) WHERE{?entity ?p ?o}',															//entities
					'SELECT (count (?s) as ?axioms) WHERE {?s ?p ?o}',																				//axioms
					'SELECT (count (?class) as ?count) WHERE {{?class ?p owl:Class} UNION {?class ?p rdfs:Class}}',									//classes
					'SELECT (count (distinct ?class) as ?count) WHERE {{?class ?p owl:ObjectProperty} UNION {?class ?p rdfs:ObjectProperty}}',		//object property
					'SELECT (count (distinct ?class) as ?count) WHERE {{?class ?p owl:DatatypeProperty} UNION {?class ?p rdfs:DatatypeProperty}}',	//data property
					'SELECT (count (distinct ?class) as ?count) WHERE {{?class ?p owl:NamedIndividual} UNION {?class ?p rdfs:NamedIndividual}}',	//individual size
					'SELECT ?super (count (distinct ?directSub) as ?count) WHERE {?directSub rdfs:subClassOf ?super FILTER NOT EXISTS {?otherSub rdfs:subClassOf ?super  FILTER (?otherSub != ?directSub) }} GROUP BY ?super'
					];

var current_chart_length=metric_charts.length;

var test=[];

var results=[];

async function metrics_load_new(x){
	document.getElementById("ontology_name").innerHTML = "Παρακαλώ περιμένετε..";
	
	document.getElementById("ontology_name").innerHTML = '';
	
	if(x!=0){
		metrics_prepare();
	}
	
	for (var j = 0; j < current_chart_length; j++) {
		results[j]=[];
		
		await metrics_wait(1000);
		if(x==0){
			results[j]=metric_charts[j][3];
		}else{
			for (var i = 0; i < metric_graphs.length; i++) {
				results[j][i]=0;
				data=calculate_data(i,j);
				results[j][i]=data;
			}
			results[j]=metric_charts[j][3];
		}
		metrics_create_chart(metric_charts[j][0],metric_charts[j][1],metric_charts[j][2],results[j]);
		await metrics_wait(1000);
	}
}
function calculate_data(i,j) {
	var temp_results=0;
	if(j==0){
		temp_results=test[i][3]+test[i][4]+test[i][5]+test[i][6];
	}else if(j==1){
		temp_results=1/2-(1/2)*Math.cos((test[i][2]*Math.PI/250));
	}else if(j==2){
		if(test[i][3]==0){
			temp_results=0;
		}else{
			temp_results=test[i][2]/test[i][3];
		}
	}else if(j==3){
		if(test[i][3]==0){
			temp_results=0;
		}else{
			temp_results=test[i][7]/test[i][3];
		}
	}else if(j==4){
		if(test[i][1]==0){
			temp_results=0;
		}else{
			temp_results=results[0][i]/test[i][1];
		}
	}else if(j==5){
		if(test[i][3]==0){
			temp_results=0;
		}else{
			temp_results=test[i][0]/test[i][3];
		}
	}else if(j==6){
		if(results[0][i]==0){
			temp_results=0;
		}else{
			temp_results=test[i][2]/results[0][i];
		}
	}
	return temp_results
}
function metrics_create_chart(chart_id,chart_type,chart_labels,chart_data){
	ctx_id=document.getElementById(chart_id).getContext('2d');
	
	myPieChart_id = new Chart(ctx_id, {
	type: chart_type,
	data: {
	labels: chart_labels,
	datasets: [{
	  data: chart_data,
	  backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc','#FA8072','#FFA07A'],
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
}
function metrics_wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
function metrics_prepare(){
	var url="http://139.91.210.25:8890/sparql";
	
	for (var i = 0; i < metric_graphs.length; i++) {
		var graph=metric_graphs[i];
		test.push([]);
		for (var j = 0; j < metric_queries.length; j++) {
			var query =metric_queries[j];
			var data="default-graph-uri="+graph+"&query="+query+"&format=application/sparql-results+xml";
			url="http://139.91.210.25:8890/sparql"+"?"+data;
			
			test[i].push([]);
			metrics_send_to_local(url,i,j);
		}
	}
}
function metrics_send_to_local(url,i,j){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "text/html");
	xhr.setRequestHeader('Access-Control-Allow-Origin','*');
	xhr.setRequestHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
	xhr.setRequestHeader('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');
	
	xhr.onreadystatechange = function(){// Call a function when the state changes.
		if (this.readyState === XMLHttpRequest.DONE) {
			if(this.status === 200){// Request finished. Do processing here.
				var test_array=create_local_array(xhr.responseText);
				test[i][j]=0;
				if(j==0){
					test[i][j]=test_array[0]["callret-0"];
				}else if(j==1){
					test[i][j]=test_array[0]["Entities"];
				}else if(j==2){
					test[i][j]=test_array[0]["axioms"];
				}else if(j==3){
					test[i][j]=test_array[0]["count"];
				}else if(j==4){
					test[i][j]=test_array[0]["count"];
				}else if(j==5){
					test[i][j]=test_array[0]["count"];
				}else if(j==6){
					test[i][j]=test_array[0]["count"];
				}else if(j==7){
					for (var k=0; k<test_array.length; k++){
						test[i][j]= test[i][j] + parseInt(test_array[k]["count"]);
					}
				}else{
					test[i][j]=0;
				}
				test[i][j]=parseInt(test[i][j]);
			}else{
				var error="";
				error +=this.status+" : "+this.statusText+"<br>";
				error +=this.responseText;
				console.log(error);
			}
		}
	}
	xhr.send();
}
function create_local_array(xml_text){
	parser = new DOMParser();
	xmlDoc = parser.parseFromString(xml_text,"text/xml");
	var profile = xmlDoc.getElementsByTagName("results");
	
	var arr = [];
	var k=0;
	var parsedHtml = parser.parseFromString(profile[0].innerHTML, 'text/html');
	var listEls = parsedHtml.all;
	for (var j = 0; j < listEls.length; j++) { //j=3 to skip HTML,HEAD,BODY elements!
		if (listEls[j].tagName.toLowerCase() == "result".toLowerCase()){
			var arr2=[];
			var children=listEls[j].children;
			for (var child in children){
				if (children[child].localName=="binding"){
					var name=children[child].attributes["name"].textContent;
					arr2[name]=children[child].innerText;
				}
			}
			arr.push([]);
			arr[k++]=arr2;
		}
	}
	return arr;
}
