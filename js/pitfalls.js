// Call the dataTables jQuery plugin
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

titles=['Semantic Web Pitfalls Pizza Ontology',
	'Semantic Web Pitfalls Dublincore Ontology',
	'Semantic Web Pitfalls Cidoc Ontology',
	'Semantic Web Pitfalls FOAF Ontology',
	'Semantic Web Pitfalls Music Ontology'];
	
types=['doughnut','bar'];
charts_pizza=[
	["myBarChart0",types[1],["P36", "P37"],[1,1]],
	["myBarChart1",types[0],["Minor","Important", "Critical"],[1,0,1]]
];

charts_dublincore=[
	["myBarChart0",types[1],["P36", "P37"],[1,1]],
	["myBarChart1",types[0],["Minor","Important", "Critical"],[1,0,1]]
];

charts_cidoc=[
	["myBarChart0",types[1],["P04","P06","P07","P08","P11","P36","P40"],[1,2,1,204,45,1,1]],
	["myBarChart1",types[0],["Minor","Important", "Critical"],[207,45,3]]
];

charts_foaf=[
	["myBarChart0",types[1],["P04","P08","P11","P12","P13","P22","P34","P35","P36","P41"],[2,2,7,2,27,1,4,1,1,6]],
	["myBarChart1",types[0],["Minor","Important", "Critical"],[43,20,0]]
];

charts_music=[
	["myBarChart0",types[1],["P36", "P40"],[1,1]],
	["myBarChart1",types[0],["Minor","Important", "Critical"],[1,0,1]]
];

charts=[charts_pizza,charts_dublincore,charts_cidoc,charts_foaf,charts_music];

random=[4000,5000,2000,1500,3000];

selected_chart=charts[0];

var myPieChart=[];

var ctx=[];
//*
for (var j = 0; j < selected_chart.length; j++) {
	ctx[j] = document.getElementById(selected_chart[j][0]);
	
	myPieChart[j] = new Chart(ctx[j], {
	type: selected_chart[j][1],
	data: {
	labels: selected_chart[j][2],
	datasets: [{
	  data: selected_chart[j][3],
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
}
//*/

async function load_new(x){
	document.getElementById("ontologies").disabled = true;
	document.getElementById("button").disabled = true;
	document.getElementById("ontology_name").innerHTML = "Παρακαλώ περιμένετε..";

	clearTable();
	
	if(x==0){
		document.getElementById("button").style="visibility:hidden";
		send_to_oops();
	}else{
		var id = document.getElementById("ontologies").value;
		
		document.getElementById("title").innerHTML =titles[id];
		
		selected_chart=charts[id];
		
		await wait(random[id]);
		
		document.getElementById("button").style="visibility:none";
		document.getElementById("ontology_name").innerHTML = '';
		
		for (var j = 0; j < selected_chart.length; j++) {
			create_chart(ctx[j],myPieChart[j],selected_chart[j][0],selected_chart[j][1],selected_chart[j][2],selected_chart[j][3]);
		}
	}
	document.getElementById("ontologies").disabled = false;
	document.getElementById("button").disabled = false;
}
function create_chart(ctx_id,myPieChart_id,chart_id,chart_type,chart_labels,chart_data){
	
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
const send_to_oops = async () => {
	create_static_table();
	
	document.getElementById("ontology_name").innerHTML = 'Detailed Table';
}
function create_static_table(){
	var id = document.getElementById("ontologies").value;
	var table = document.getElementById("pitfalls_table");
	var data =["#","Code","Name","Description","Importance","No Affected Elements","Affected Element"];

	generateTableHead(table, data)

	var tbodyRef = table.getElementsByTagName('tbody')[0];

	var p04_descr='Ontology elements (classes, object properties and datatype properties) are created isolated, with no relation to the rest of the ontology.';
	var p06_descr='A cycle between two classes in a hierarchy is included in the ontology. A cycle appears when some class A has a subclass (directly or indirectly) B, and at the same time B is a superclass (directly or indirectly) of A. This pitfall was first identified in [3]. Guidelines presented in [2] also provide recommendations to avoid this pitfall.';
	var p07_descr='A class whose name refers to two or more different concepts is created.';
	var p08_descr='This pitfall consists in creating an ontology element and failing to provide human readable annotations attached to it. Consequently, ontology elements lack annotation properties that label them (e.g. rdfs:label, lemon:LexicalEntry, skos:prefLabel or skos:altLabel) or that define them (e.g. rdfs:comment or dc:description). This pitfall is related to the guidelines provided in [5].';
	var p11_descr='Object and/or datatype properties without domain or range (or none of them) are included in the ontology.';
	var p12_descr='The ontology lacks information about equivalent properties (owl:equivalentProperty) in the cases of duplicated relationships and/or attributes.';
	var p13_descr='This pitfall appears when any relationship (except for those that are defined as symmetric properties using owl:SymmetricProperty) does not have an inverse relationship (owl:inverseOf) defined within the ontology.';
	var p22_descr='The ontology elements are not named following the same convention (for example CamelCase or use of delimiters as "-" or "_") . Some notions about naming conventions are provided in [2].';
	var p34_descr='An ontology element is used as a class without having been explicitly declared as such using the primitives owl:Class or rdfs:Class. This pitfall is related with the common problems listed in [8].';
	var p35_descr='An ontology element is used as a property without having been explicitly declared as such using the primitives rdf:Property, owl:ObjectProperty or owl:DatatypeProperty. This pitfall is related with the common problems listed in [8].';
	var p36_descr='This pitfall occurs if file extensions such as ".owl", ".rdf", ".ttl", ".n3" and ".rdfxml" are included in an ontology URI. This pitfall is related with the recommendations provided in [9].';
	var p37_descr='This pitfall occurs when the ontology code (OWL encoding) or its documentation (HTML document) is missing when looking up its URI. This pitfall deals with the first point from the Linked Data star system that states "On the web" ([10] and [11]). Guidelines in [12] also recommends to "Publish your vocabulary on the Web at a stable URI". This pitfall is also related to the problems listed in [8] and [5].';
	var p40_descr='It refers to reusing or referring to terms from another namespace that are not defined in such namespace. This is an undesirable situation as no information can be retrieved when looking up those undefined terms. This pitfall is related to the Linked Data publishing guidelines provided in [11]: "Only define new terms in a namespace that you control" and to the guidelines provided in [5].';
	var p41_descr='The ontology metadata omits information about the license that applies to the ontology.';
	
	data_pizza=[['P36','URI contains file extension.ontology',p36_descr,'Minor',1,'*This pitfall applies to the ontology in general instead of specific elements.'],
				['P37','Ontology not available on the Web.ontology',p37_descr,'Critical',1,'*This pitfall applies to the ontology in general instead of specific elements.']
			];
	data_dublincore=[['P36','URI contains file extension.ontology',p36_descr,'Minor',1,'*This pitfall applies to the ontology in general instead of specific elements.'],
				['P37','Ontology not available on the Web.ontology',p37_descr,'Critical',1,'*This pitfall applies to the ontology in general instead of specific elements.']
			];
	data_cidoc=[['P04','Creating unconnected ontology elements',p04_descr,'Minor',1,'cidoc-crm/core#E40_Legal_Body'],
				['P06','Including cycles in a class hierarchy',p06_descr,'Critical',2,'cidoc-crm/core#E74_Group   cidoc-crm/core#E40_Legal_Body'],
				['P07','Merging different concepts in the same class',p07_descr,'Minor',7,'cidoc-crm/core#E29_Design_or_Procedure'],
				['P08','Missing annotations',p08_descr,'Minor',204,'cidoc-crm/core#E18_Physical_Thing cidoc-crm/core#E40_Legal_Body cidoc-crm/core#E47_Spatial_Coordinates cidoc-crm/core#E77_Persistent_Item cidoc-crm/core#E25_Man-Made_Feature cidoc-crm/core#E45_Address cidoc-crm/core#E39_Actor cidoc-crm/core#E87_Curation_Activity cidoc-crm/core#E30_Right cidoc-crm/core#E80_Part_Removal cidoc-crm/core#E51_Contact_Point cidoc-crm/core#E34_Inscription cidoc-crm/core#E49_Time_Appellation cidoc-crm/core#E56_Language cidoc-crm/core#E78_Collection cidoc-crm/core#E37_Mark cidoc-crm/core#E7_Activity cidoc-crm/core#E24_Physical_Man-Made_Thing cidoc-crm/core#E3_Condition_State cidoc-crm/core#E14_Condition_Assessment cidoc-crm/core#E53_Place cidoc-crm/core#E64_End_of_Existence cidoc-crm/core#E38_Image cidoc-crm/core#E79_Part_Addition cidoc-crm/core#E36_Visual_Item cidoc-crm/core#E8_Acquisition cidoc-crm/core#E85_Joining cidoc-crm/core#E52_Time-Span cidoc-crm/core#E72_Legal_Object cidoc-crm/core#E13_Attribute_Assignment cidoc-crm/core#E31_Document cidoc-crm/core#E19_Physical_Object cidoc-crm/core#E6_Destruction cidoc-crm/core#E33_Linguistic_Object cidoc-crm/core#E9_Move cidoc-crm/core#E16_Measurement cidoc-crm/core#E10_Transfer_of_Custody cidoc-crm/core#E90_Symbolic_Object cidoc-crm/core#E17_Type_Assignment cidoc-crm/core#E73_Information_Object cidoc-crm/core#E44_Place_Appellation cidoc-crm/core#E89_Propositional_Object cidoc-crm/core#E84_Information_Carrier cidoc-crm/core#E50_Date cidoc-crm/core#E82_Actor_Appellation cidoc-crm/core#E65_Creation cidoc-crm/core#E83_Type_Creation cidoc-crm/core#E71_Man-Made_Thing cidoc-crm/core#E4_Period cidoc-crm/core#E66_Formation cidoc-crm/core#E35_Title cidoc-crm/core#E32_Authority_Document cidoc-crm/core#E69_Death cidoc-crm/core#E58_Measurement_Unit cidoc-crm/core#E5_Event cidoc-crm/core#E63_Beginning_of_Existence cidoc-crm/core#E27_Site cidoc-crm/core#E22_Man-Made_Object cidoc-crm/core#E54_Dimension cidoc-crm/core#E74_Group cidoc-crm/core#E46_Section_Definition cidoc-crm/core#E57_Material cidoc-crm/core#E81_Transformation cidoc-crm/core#E41_Appellation cidoc-crm/core#E12_Production cidoc-crm/core#E67_Birth cidoc-crm/core#E70_Thing cidoc-crm/core#E15_Identifier_Assignment cidoc-crm/core#E68_Dissolution cidoc-crm/core#E28_Conceptual_Object cidoc-crm/core#E1_CRM_Entity cidoc-crm/core#E2_Temporal_Entity cidoc-crm/core#E42_Identifier cidoc-crm/core#E75_Conceptual_Object_Appellation cidoc-crm/core#E20_Biological_Object cidoc-crm/core#E21_Person cidoc-crm/core#E86_Leaving cidoc-crm/core#E29_Design_or_Procedure cidoc-crm/core#E55_Type cidoc-crm/core#E26_Physical_Feature cidoc-crm/core#E11_Modification cidoc-crm/core#P84_had_at_most_duration cidoc-crm/core#P7_took_place_at cidoc-crm/core#P49_has_former_or_current_keeper cidoc-crm/core#P44_has_condition cidoc-crm/core#P99_dissolved cidoc-crm/core#P148_has_component cidoc-crm/core#P112_diminished cidoc-crm/core#P33_used_specific_technique cidoc-crm/core#P26_moved_to cidoc-crm/core#P89_falls_within cidoc-crm/core#P86_falls_within cidoc-crm/core#P122_borders_with cidoc-crm/core#P103_was_intended_for cidoc-crm/core#P119_meets_in_time_with cidoc-crm/core#P42_assigned cidoc-crm/core#P48_has_preferred_identifier cidoc-crm/core#P110_augmented cidoc-crm/core#P96_by_mother cidoc-crm/core#P83_had_at_least_duration cidoc-crm/core#P15_was_influenced_by cidoc-crm/core#P29_custody_received_by cidoc-crm/core#P23_transferred_title_from cidoc-crm/core#P111_added cidoc-crm/core#P68_foresees_use_of cidoc-crm/core#P118_overlaps_in_time_with cidoc-crm/core#P98_brought_into_life cidoc-crm/core#P135_created_type cidoc-crm/core#P116_starts cidoc-crm/core#P104_is_subject_to cidoc-crm/core#P93_took_out_of_existence cidoc-crm/core#P109_has_current_or_former_curator cidoc-crm/core#P140_assigned_attribute_to cidoc-crm/core#P97_from_father cidoc-crm/core#P125_used_object_of_type cidoc-crm/core#P115_finishes cidoc-crm/core#P8_took_place_on_or_within cidoc-crm/core#P78_is_identified_by cidoc-crm/core#P75_possesses cidoc-crm/core#P134_continued cidoc-crm/core#P2_has_type cidoc-crm/core#P59_has_section cidoc-crm/core#P58_has_section_definition cidoc-crm/core#P1_is_identified_by cidoc-crm/core#P37_assigned cidoc-crm/core#P114_is_equal_in_time_to cidoc-crm/core#P133_is_separated_from cidoc-crm/core#P41_classified cidoc-crm/core#P126_employed cidoc-crm/core#P120_occurs_before cidoc-crm/core#P32_used_general_technique cidoc-crm/core#P30_transferred_custody_of cidoc-crm/core#P146_separated_from cidoc-crm/core#P40_observed_dimension cidoc-crm/core#P13_destroyed cidoc-crm/core#P74_has_current_or_former_residence cidoc-crm/core#P51_has_former_or_current_owner cidoc-crm/core#P91_has_unit cidoc-crm/core#P34_concerned cidoc-crm/core#P4_has_time-span cidoc-crm/core#P53_has_former_or_current_location cidoc-crm/core#P31_has_modified cidoc-crm/core#P10_falls_within cidoc-crm/core#P27_moved_from cidoc-crm/core#P132_overlaps_with cidoc-crm/core#P128_carries cidoc-crm/core#P35_has_identified cidoc-crm/core#P38_deassigned cidoc-crm/core#P143_joined cidoc-crm/core#P72_has_language cidoc-crm/core#P76_has_contact_point cidoc-crm/core#P21_had_general_purpose cidoc-crm/core#P92_brought_into_existence cidoc-crm/core#P129_is_about cidoc-crm/core#P55_has_current_location cidoc-crm/core#P127_has_broader_term cidoc-crm/core#P147_curated cidoc-crm/core#P113_removed cidoc-crm/core#P65_shows_visual_item cidoc-crm/core#P94_has_created cidoc-crm/core#P25_moved cidoc-crm/core#P5_consists_of cidoc-crm/core#P87_is_identified_by cidoc-crm/core#P20_had_specific_purpose cidoc-crm/core#P145_separated cidoc-crm/core#P95_has_formed cidoc-crm/core#P123_resulted_in cidoc-crm/core#P56_bears_feature cidoc-crm/core#P88_consists_of cidoc-crm/core#P22_transferred_title_to cidoc-crm/core#P39_measured cidoc-crm/core#P43_has_dimension cidoc-crm/core#P124_transformed cidoc-crm/core#P106_is_composed_of cidoc-crm/core#P73_has_translation cidoc-crm/core#P70_documents cidoc-crm/core#P28_custody_surrendered_by cidoc-crm/core#P52_has_current_owner cidoc-crm/core#P54_has_current_permanent_location cidoc-crm/core#P11_had_participant cidoc-crm/core#P108_has_produced cidoc-crm/core#P71_lists cidoc-crm/core#P117_occurs_during cidoc-crm/core#P50_has_current_keeper cidoc-crm/core#P17_was_motivated_by cidoc-crm/core#P12_occurred_in_the_presence_of cidoc-crm/core#P45_consists_of cidoc-crm/core#P101_had_as_general_use cidoc-crm/core#P141_assigned cidoc-crm/core#P100_was_death_of cidoc-crm/core#P105_right_held_by cidoc-crm/core#P142_used_constituent cidoc-crm/core#P131_is_identified_by cidoc-crm/core#P46_is_composed_of cidoc-crm/core#P9_consists_of cidoc-crm/core#P121_overlaps_with cidoc-crm/core#P24_transferred_title_of cidoc-crm/core#P90_has_value cidoc-crm/core#P82_at_some_time_within cidoc-crm/core#P81_ongoing_throughout cidoc-crm/core#P80_end_is_qualified_by cidoc-crm/core#P79_beginning_is_qualified_by cidoc-crm/core#P57_has_number_of_parts'],
				['P11','Missing domain or range in properties',p11_descr,'Important',45,'cidoc-crm/core#P136_was_based_on cidoc-crm/core#P16_used_specific_object cidoc-crm/core#P17_was_motivated_by cidoc-crm/core#P50_has_current_keeper cidoc-crm/core#P108_has_produced cidoc-crm/core#P11_had_participant cidoc-crm/core#P52_has_current_owner cidoc-crm/core#P28_custody_surrendered_by cidoc-crm/core#P70_documents cidoc-crm/core#P39_measured cidoc-crm/core#P22_transferred_title_to  cidoc-crm/core#P65_shows_visual_item cidoc-crm/core#P55_has_current_location cidoc-crm/core#P129_is_about cidoc-crm/core#P92_brought_into_existence cidoc-crm/core#P137_exemplifies cidoc-crm/core#P27_moved_from   cidoc-crm/core#P138_represents    cidoc-crm/core#P32_used_general_technique cidoc-crm/core#P41_classified    cidoc-crm/core#P14_carried_out_by cidoc-crm/core#P134_continued cidoc-crm/core#P93_took_out_of_existence cidoc-crm/core#P23_transferred_title_from cidoc-crm/core#P29_custody_received_by cidoc-crm/core#P110_augmented  cidoc-crm/core#P48_has_preferred_identifier cidoc-crm/core#P26_moved_to cidoc-crm/core#P33_used_specific_technique   cidoc-crm/core#P79_beginning_is_qualified_by cidoc-crm/core#P80_end_is_qualified_by'],
				['P36','URI contains file extension.ontology',p36_descr,'Minor',1,'This pitfall applies to the ontology in general instead of specific elements.'],
				['P40','Namespace hijacking',p40_descr,'Critical',1,'http://creativecommons.org/ns#license']
			];
	data_foaf=[['P04','Creating unconnected ontology elements',p04_descr,'Minor',2,'foaf/0.1/Project foaf/0.1/LabelProperty'],
				['P08','Missing annotations',p08_descr,'Minor',2,'http://www.w3.org/2000/10/swap/pim/contact#Person http://purl.org/dc/terms/Agent'],
				['P11','Missing domain or range in properties',p11_descr,'Important',7,'foaf/0.1/phone foaf/0.1/givenName foaf/0.1/title foaf/0.1/nick foaf/0.1/sha1 foaf/0.1/givenname foaf/0.1/dnaChecksum'],
				['P12','Equivalent properties not explicitly declared',p12_descr,'Important',2,'http://xmlns.com/foaf/0.1/givenname http://xmlns.com/foaf/0.1/givenName'],
				['P13','Inverse relationships not explicitly declared',p13_descr,'Minor',27,'http://xmlns.com/foaf/0.1/theme could be inverse of http://xmlns.com/foaf/0.1/fundedBy http://xmlns.com/foaf/0.1/fundedBy could be inverse of http://xmlns.com/foaf/0.1/logofoaf/0.1/accountServiceHomepage foaf/0.1/openid foaf/0.1/account foaf/0.1/thumbnail foaf/0.1/member foaf/0.1/img foaf/0.1/tipjar foaf/0.1/workplaceHomepage foaf/0.1/knows foaf/0.1/phone foaf/0.1/topic_interest foaf/0.1/mbox foaf/0.1/pastProject foaf/0.1/workInfoHomepage foaf/0.1/focus foaf/0.1/publications foaf/0.1/holdsAccount foaf/0.1/based_near foaf/0.1/interest foaf/0.1/weblog foaf/0.1/schoolHomepage foaf/0.1/homepage foaf/0.1/currentProject'],
				['P22','Using different naming conventions in the ontology.ontology',p22_descr,'Minor',1,'*This pitfall applies to the ontology in general instead of specific elements.'],
				['P34','Untyped class',p34_descr,'Important',4,'http://www.w3.org/2004/02/skos/core#Concept http://purl.org/dc/terms/Agent http://www.w3.org/2003/01/geo/wgs84_pos#SpatialThing http://www.w3.org/2000/10/swap/pim/contact#Person'],
				['P35','Untyped property',p35_descr,'Important',1,'http://purl.org/dc/terms/creator'],
				['P36','URI contains file extension.ontology',p36_descr,'Minor',1,'*This pitfall applies to the ontology in general instead of specific elements.'],
				['P41','No license declared.ontology',p41_descr,'Important',6,'foaf/0.1/thumbnail foaf/0.1/theme foaf/0.1/fundedBy foaf/0.1/knows foaf/0.1/logo foaf/0.1/based_near']
			];
	data_music=[['P36','URI contains file extension.ontology',p36_descr,'Minor',1,'*This pitfall applies to the ontology in general instead of specific elements.'],
				['P40','Namespace hijacking',p40_descr,'Critical',1,'http://purl.org/dc/elements/1.1/created']
			];
	
	data_ontologies=[data_pizza,data_dublincore,data_cidoc,data_foaf,data_music];
	
	data_array=data_ontologies[id];
	
	for (var i in data_array) {
		var newRow = tbodyRef.insertRow();
		
		var newCell = newRow.insertCell();
		newCell.appendChild(document.createTextNode(i));
		
		for (var j in data_array[i]) {
			var newCell = newRow.insertCell();
			newCell.appendChild(document.createTextNode(data_array[i][j]));
		}
	}	
	document.getElementById("pitfalls_table").style.display = "";
}
function clearTable(){
	var table = document.getElementById("pitfalls_table");
	var body = table.getElementsByTagName('tbody')[0];
	body.innerHTML = '';
	
	var thead = table.getElementsByTagName('thead')[0];
	thead.innerHTML = '';
}
function generateTableHead(table, data) {
	var thead = table.getElementsByTagName('thead')[0];
	let row = thead.insertRow();
	for (let key of data) {
		let th = document.createElement("th");
		let text = document.createTextNode(key);
		th.appendChild(text);
		row.appendChild(th);
	}
}
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}