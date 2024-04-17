/*
*  Function:
*      callback -- Called when X-600M is interacted with directly i.e. register value is set
*  Parameters:
*      result -- value returned by X-600M
*  Return value:
*      none
*/
function callback(result) {
	var str = result.substring(2);
}

/* START BLOWER CONTROL FUNCTIONS */

function setBlowerValue(blower, label){
	$( "#selected-blower" ).val(blower);
	if (currentState['blower'+blower+'fault'] == 0) {
		$( "#blower-form-title" ).html('Blower '+label+" - Fault");
		$( "#blower-start-button" ).hide();
		$( "#blower-stop-button" ).show();
	} else if (currentState['blower'+blower+'control'] > 0) {
		$( "#blower-form-title" ).html('Blower '+label+" - On");
		$( "#blowercontrolon" ).prop('checked', true);
		//$( "#blower-start-button" ).hide();
		//$( "#blower-stop-button" ).show();
	} else {
		$( "#blower-form-title" ).html('Blower '+label+" - Off");
		$( "#blowercontroloff" ).prop('checked', true);
		//$( "#blower-start-button" ).show();
		//$( "#blower-stop-button" ).hide();
	}
	var checked = currentState['blower'+blower+'override'] == 1 ? true : false;
	$( "#bloweroverride" ).prop('checked', checked);
	$( "#blowervalue" ).val(currentState['blower'+blower+'value']);
	refreshBlowerValue();
	$( "#blower-form" ).modal('show');
}

function refreshBlowerValue(){
	if ($('#bloweroverride').is(':checked')) {
		$( "#blower-value-div" ).show();
	} else {
		$( "#blower-value-div" ).hide();
	}
}

function saveSelectedBlower(){
    selected_blower = $( "#selected-blower" ).val();
	var override_value = $('#bloweroverride').is(':checked') ? 1 : 0;
	io.set('blower' + selected_blower + 'override', override_value, callback);
	if (override_value == 1) {
		var control_value = $('#blowercontrolon').is(':checked') ? 1 : 0;
		io.set('blower' + selected_blower + 'control', control_value, callback);
		io.set('blower' + selected_blower + 'value', $('#blowervalue').val(), callback);
	}
	$( "#blower-form" ).modal('hide');
}

function startSelectedBlower() {
	selected_blower = $( "#selected-blower" ).val();
	io.set('blower' + selected_blower + 'control', 1, callback);
	$( "#blower-form" ).modal('hide');
}

function stopSelectedBlower() {
	selected_blower = $( "#selected-blower" ).val();
	io.set('blower' + selected_blower + 'control', 0, callback);
	$( "#blower-form" ).modal('hide');
}

/* END BLOWER CONTROL FUNCTIONS */

/* BEGIN ZONE CONTROL FUNCTIONS */

function setZoneValue(zone){
	$( "#selected-zone" ).val(zone);
	if (currentState['zone'+zone+'control'] == 1) {
		start_date = start_dates['zone'+zone];
		$( "#zone-control-title" ).html("Zone "+zone+" - Started "+start_date);
		$( "#zonecontrolon" ).hide();
		$( "#zonecontroloff" ).show();
		$( "#zoneOnline" ).show();
		$( "#zoneOffline" ).hide();
	} else {
		$( "#zone-control-title" ).html("Zone "+zone+" - Stopped");
		$( "#zonecontrolon" ).show();
		$( "#zonecontroloff" ).hide();
		$( "#zoneOnline" ).hide();
		$( "#zoneOffline" ).show();
    }
    $( "#zonereset" ).prop('checked', false);
	refreshZoneValue();
	$( "#zone-control-form" ).modal('show');
}

function refreshZoneValue(){
	if ($('#zonereset').is(':checked')) {
        $( "#zonecontrolon" ).html("Start New Batch");
        $( "#zonestartlabel" ).html("Start New Batch");
	} else {
        $( "#zonecontrolon" ).html("Resume Batch");
        $( "#zonestartlabel" ).html("Resume Batch");
	}
}

function startSelectedZone(){
    selected_zone = $( "#selected-zone" ).val();
    var reset_value = $('#zonereset').is(':checked') ? 1 : 0;
    if (reset_value == true) {
        io.set('zone'+selected_zone+'reset', 1, callback);
    }
	io.set('zone'+selected_zone+'control', 1, callback);
	$( "#zone-control-form" ).modal('hide');
}

function stopSelectedZone(){
	selected_zone = $( "#selected-zone" ).val();
	io.set('zone'+selected_zone+'control', 0, callback);
	$( "#zone-control-form" ).modal('hide');
}

function viewSelectedZoneGraph() {
	selected_zone = $( "#selected-zone" ).val();
	start_date = start_dates['zone'+selected_zone].replace('/','_');
	openGraph(start_date+"_zone"+selected_zone+".csv");
}

/* END ZONE CONTROL FUNCTIONS */

/*
*  Function:
*      getStartDates -- loads zone start dates
*  Parameters:
*      none
*  Return value:
*      none
*/
var start_dates = {};
var zones = ["zone14", "zone15", "zone16", "zone17", "zone18", "zone19", "zone20", "zone21", "zone22", "zone23", "zone24", "zone25", "zone26"];
function getStartDates(){
	sqlite.exec("/usb/zone_startup.db", "SELECT * FROM zone_startup;", function(info){
        data = JSON.parse(info);
		$.each(zones,function(k1, v1){
			$.each(data,function(k,v){
                if (v.name == v1 + "filename") {
                    var sections = v.state.split("_");
                    var start_date = sections[0] + "/" + sections[1] + "/" + sections[2];
                    start_dates[v1] = start_date;
                    var days = Math.floor(( Date.now() - Date.parse(start_date) ) / 86400000);
                    $('#' + v1 + 'age').html(days);
					var x = v.name;
					return false;
                }
			});
		});
	});
}

/* BEGIN SETTINGS FUNCTIONS */

function getSettings(){
	sqlite.exec("/usb/settings.db", "SELECT name, value FROM settings;", function(info){
		data = JSON.parse(info);
		$.each(data,function(k,v){
			element = document.getElementById(v.name);
			if(element)
				element.value = v.value;
		});
	});
}

//counter for saving settings to database
var update = 0;

function saveBlowerSettings(){
	$("*").css("cursor", "progress");
    var values = ["Blower45TempSetPoint", "Blower16TempSetPoint", "Blower78TempSetPoint", "Blower90TempSetPoint",
        "Blower12TempSetPoint", "Blower34TempSetPoint", "Blower56TempSetPoint",
		"MinVFDSpeed", "BlowerCycleTotalTime", "BlowerCycleOffTime",
		"BlowerGain", "BlowerIntegral", "BlowerDerivative", "BlowerRate"];
	for(var i = 0; i < values.length; i++){
		var query = "UPDATE settings SET `value`='" + $("#" + values[i]).val() + "' WHERE `name`='" + values[i] + "';";
		sqlite.exec("/usb/settings.db", query, function(info){
			if(info == "SUCESS" && update >= 11){
				alert("Blower settings saved successfully!");
				update = 0;
				$("*").css("cursor", "default");
			}else if(info == "SUCESS"){
				update++;
			}else{
				alert("ERROR: " + info);
			}
		});
	}
}

function saveDamperSettings(){
	$("*").css("cursor", "progress");
    var values = ["DamperTempSetPoint", "MinDamperValue", "DamperGain", "DamperIntegral", "DamperDerivative", "DamperRate"];
	for(var i = 0; i < values.length; i++){
		var query = "UPDATE settings SET `value`='" + $("#" + values[i]).val() + "' WHERE `name`='" + values[i] + "';";
		sqlite.exec("/usb/settings.db", query, function(info){
			if(info == "SUCESS" && update >= 5){
				alert("Damper settings saved successfully!");
				update = 0;
				$("*").css("cursor", "default");
			}else if(info == "SUCESS"){
				update++;
			}else{
				alert("ERROR: " + info);
			}
		});
	}
}

function saveUserSettings(){
	$("*").css("cursor", "progress");
	var values = ["MaxTemperatureAlarm","MinTemperatureAlarm","DataLoggingRate", "FacilityName"];
	for(var i = 0; i < values.length; i++){
		var query = "UPDATE settings SET `value`='" + $("#" + values[i]).val() + "' WHERE `name`='" + values[i] + "';";
		sqlite.exec("/usb/settings.db", query, function(info){
			if(info == "SUCESS" && update >= 3){
				alert("User settings saved successfully!");
				update = 0;
				$("*").css("cursor", "default");
			}else if(info == "SUCESS"){
				update++;
			}else{
				alert("ERROR: " + info);
			}
		});
	}
}

/* END SETTINGS FUNCTIONS */

/* BEGIN BATCH FILE FUNCTIONS */

function openFile(fileName){
	var w = 500;
	var h = 500;
	var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
	var wTop = window.screenTop ? window.screenTop : window.screenY;
	var left = wLeft + (window.innerWidth / 2) - (w / 2);
	var top = wTop + (window.innerHeight / 2) - (h / 2);

	popup = window.open("", "FileWindow", "location=no, top=" + top + ", left=" + left + ", width=" + w + ", height=" + h);
	file.read("/usb/"+fileName, 0, 1000000, function(fileData){
		fileData = fileData.replace(/\n/g, "</br>");
		popup.document.write("<p>" + fileData +"</p>");
	});
	popup.document.title = fileName;
}

function deleteFile(file){
	var result = confirm("Are you sure you want to delete file: \n" + file + "?");
	if(result){
		sqlite.exec("/usb/batch_files.db", "DELETE FROM batch_files WHERE name='" + file + "';", function(info){

		});
		document.location.href = "deleteFile.php?filename=/usb/" + file;
	}
}

/* END BATCH FILE FUNCTIONS */

/**************GRAPHING JAVASCRIPT*****************/
//Array that holds data to be graphed
var data1 = [
];

//Array that holds graph data
var dataset = [
    {
        label: "Temperature",
        data: data1,
        xaxis:1,
        color: "#FF0000",
        points: { fillColor: "#FF0000", show: true },
        lines: { show: true }
    }
];

//Array that holds axis and legend information about graph
var options = {
    series: {
        shadowSize: 5
    },
    xaxes: [
    {
        mode: "time",
        timeformat: "%b %e<br />%Y",
		timezone: "browser",
        minTickSize: [24, "hour"],
        color: "black",
        axisLabel: "Date",
        axisLabelUseCanvas: false,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10
    }],
    yaxis: {
        color: "black",
        tickDecimals: 2,
        axisLabel: "Temperature",
        axisLabelUseCanvas: false,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 5
    },
    legend: {
		show: false
    },
    grid: {
        hoverable: true,
        borderWidth: 3,
        mouseActiveRadius: 50,
        backgroundColor: { colors: ["#ffffff", "#ffffff"] },
        axisMargin: 20
    }
};

/*
*  Function:
*      openGraph -- Displays graph in popup window
*  Parameters:
*      fileName -- Name of file that contains data to be graphed
*  Return value:
*      none
*/
function openGraph(fileName){
	var w = 1000;
	var h = 500;
	var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
	var wTop = window.screenTop ? window.screenTop : window.screenY;
	var left = wLeft + (window.innerWidth / 2) - (w / 2);
	var top = wTop + (window.innerHeight / 2) - (h / 2);
	window.open("graph.html", fileName, "location=no, top=" + top + ", left=" + left + ", width=" + w + ", height=" + h);
}

/*
*  Function:
*      loadGraph -- Runs when graph popup window is displayed, used to genereate graph image
*  Parameters:
*      fileName -- name of file that contains data to be graphed
*  Return value:
*      none
*/
function loadGraph(fileName){
	file.read('/usb/'+fileName, 0, 1000000, function(fileData){
		var dataArray = fileData.split("\n");
		var j = 0;
		for(var i = 1; i < dataArray.length; i++){
			var date = gd(dataArray[i].split(", ")[0]);
			var value = dataArray[i].split(", ")[1];
			if(date == date){
				data1[j] = [date, value];
				j++;
			}
		}
		plot = $.plot($("#flot-placeholder"), dataset, options);
		$("#flot-placeholder").UseTooltip();
		//create save
		$("#save").hide();
		html2canvas(document.body, {
		  onrendered: function(canvas) {
			var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
			//document.write('<img src="'+img+'"/>');
			$("#save").attr("href", img);
			$("#save").attr('download', zone + "_graph.png");
			$("#save").show();
		  }
		});
	});
}

/*
*  Function:
*      gd -- Parses date to more readable format
*  Parameters:
*      date -- Date string as found in file
*  Return value:
*      string -- returns date in javascript readable format
*/
function gd(date) {
    var d = new Date(Date.parse(date));
	return d.getTime();
}

//tooltip point information
var previousPoint = null, previousLabel = null;

/*
*  Function:
*      $.fn.UseTooltip -- Generates a tooltip that displays information about a specific point on the graph
*  Parameters:
*      none
*  Return value:
*      none
*/
$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];
                var date = new Date(x);
                var color = item.series.color;

                showTooltip(item.pageX, item.pageY, color,
                            "<strong>" + item.series.label + "</strong><br>"  +
                            padDigits(date.getHours(), 2) + ":" + padDigits(date.getMinutes(), 2) +
                            " <strong>" + y + "</strong>°F");
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};

/*
*  Function:
*      padDigits -- Adds a zero in front of single digits for a consistent format
*  Parameters:
*      number -- Number to be padded
*	   digits -- Number of digits to pad
*  Return value:
*      string -- returns padded string
*/
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

/*
*  Function:
*      showTooltip -- Shows the tooltip on the graph at the point selected
*  Parameters:
*      x -- x location on page
*	   y -- y location on page
*	   color -- Color of the tooltip border
*	   contents -- Data to be displayed in tooltip
*  Return value:
*      none
*/
function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y + 10,
        left: x - 30,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}

function saveGraph(){
	$("#save").hide();
	html2canvas(document.body, {
	  onrendered: function(canvas) {
		var img = canvas.toDataURL("image/png");
		document.write('<img src="'+img+'"/>');
		$("#save").show();
	  }
	});
}
/**************GRAPHING JAVASCRIPT*****************/
