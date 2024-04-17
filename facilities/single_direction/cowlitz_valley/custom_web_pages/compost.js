//counter for saving settings to database
var update = 0;
//window that displays the text file
var popup;

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

/*
*  Function:
*      openFile -- Opens a popup window to display the batch file .csv
*  Parameters:
*      fileName -- File that will be displayed in the popup window
*  Return value:
*      none
*/
function openFile(fileName){
	var w = 500;
	var h = 500;
	var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
	var wTop = window.screenTop ? window.screenTop : window.screenY;
	var left = wLeft + (window.innerWidth / 2) - (w / 2);
	var top = wTop + (window.innerHeight / 2) - (h / 2);

	popup = window.open("", "FileWindow", "location=no, top=" + top + ", left=" + left + ", width=" + w + ", height=" + h);
	file.read(fileName, 0, 1000000, function(fileData){
		fileData = fileData.replace(/\n/g, "</br>");
		popup.document.write("<p>" + fileData +"</p>");
	});
	popup.document.title = fileName;
}

/*
*  Function:
*      deleteFile -- Deletes batch file from usb and database
*  Parameters:
*      file -- Name of file to be deleted
*  Return value:
*      none
*/
function deleteFile(file){
	var result = confirm("Are you sure you want to delete file: \n" + file + "?");
	if(result){
		sqlite.exec("/usb/batch_files.db", "DELETE FROM batch_files WHERE name='" + file + "';", function(info){

		});
		document.location.href = "deleteFile.php?filename=" + file;
	}
}

/*
*  Function:
*      setPage -- Changes the data displayed on the settings page
*  Parameters:
*      page -- Keyword used to distinguish data that will be displayed
*  Return value:
*      none
*/
function setPage(page){
	$("#blowerDiv").hide();
	$("#userDiv").hide();
	$("#zoneDiv").hide();
	$("#graphDiv").hide();

	$("#blower").css("background-color", "white");
	$("#user").css("background-color", "white");
	$("#zone").css("background-color", "white");
	$("#graph").css("background-color", "white");

	$("#" + page).css("background-color", "lightgrey");
	$("#" + page + "Div").show();
	getSettings();
}

/*
*  Function:
*      getSettings -- Gets data from settings database and loads it into the settings page
*  Parameters:
*      none
*  Return value:
*      none
*/
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

/*
*  Function:
*      setBlowerSettings -- saves blower settings to database and alerts user of success/fail
*  Parameters:
*      none
*  Return value:
*      none
*/
function setBlowerSettings(){
	$("*").css("cursor", "progress");
	var values = ["PressureSetPoint", "PressureSetPoint2", "MaxPressure", "MinPressure", "MinVFDSpeed", "BlowerGain", "BlowerIntegral", "BlowerDerivative"];
	for(var i = 0; i < values.length; i++){
		var query = "UPDATE settings SET `value`='" + $("#" + values[i]).val() + "' WHERE `name`='" + values[i] + "';";
		sqlite.exec("/usb/settings.db", query, function(info){
			if(info == "SUCESS" && update >= 6){
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

/*
*  Function:
*      setUserSettings -- saves user settings to database and alerts user of success/fail
*  Parameters:
*      none
*  Return value:
*      none
*/
function setUserSettings(){
	$("*").css("cursor", "progress");
	var values = ["DataLoggingRate", "FacilityName"];
	for(var i = 0; i < values.length; i++){
		var query = "UPDATE settings SET `value`='" + $("#" + values[i]).val() + "' WHERE `name`='" + values[i] + "';";
		sqlite.exec("/usb/settings.db", query, function(info){
			if(info == "SUCESS" && update >= 1){
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

/*
*  Function:
*      setZoneSettings -- saves zone settings to database and alerts user of success/fail
*  Parameters:
*      none
*  Return value:
*      none
*/
function setZoneSettings(){
	$("*").css("cursor", "progress");
	var values = ["R1TempSetPoint", "R2TempSetPoint", "R3TempSetPoint", "R1Duration", "R2Duration", "MinDamperValue", "MaxTemperatureAlarm", "MinTemperatureAlarm", "ZoneGain", "ZoneIntegral", "ZoneDerivative", "ZoneRate"];
	for(var i = 0; i < values.length; i++){
		var query = "UPDATE settings SET `value`='" + $("#" + values[i]).val() + "' WHERE `name`='" + values[i] + "';";
		sqlite.exec("/usb/settings.db", query, function(info){
			if(info == "SUCESS" && update >= 10){
				alert("Zone settings saved successfully!");
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

/*
*  Function:
*      getStartDates -- loads zone start dates
*  Parameters:
*      none
*  Return value:
*      none
*/
var start_dates = {};
var zones = ["zone1", "zone2", "zone3", "zone4", "zone5", "zone6", "zone7", "zone8", "zone9", "zone10"];
function getStartDates(){
	sqlite.exec("/usb/batch_files.db", "SELECT * FROM batch_files ORDER BY id DESC;", function(info){
		data = JSON.parse(info);
		$.each(zones,function(k1, v1){
			$.each(data,function(k,v){
				var sections = v.name.split("_");
				if(sections[3] == v1 + ".csv"){
		  var start_date = sections[0].substring(5) + "/" + sections[1] + "/" + sections[2];
		  start_dates[v1] = start_date;
          var days = Math.floor(( Date.now() - Date.parse(start_date) ) / 86400000);
					$('#' + v1 + 'date').html(days);
					var x = v.name;
					return false;
				}
			});
		});
	});
}

/*
*  Function:
*      overrideZone -- loads manual zone override or automatic
*  Parameters:
*      zone -- zone that was affected
*  Return value:
*      none
*/
function overrideZone(zone){
	var box = $('#' + zone + 'override');
	if(box.is(':checked')){
		io.set(zone + 'override', 1, callback);
		$('#' + zone + 'Damper').css( 'cursor', 'pointer' );
	}else{
		io.set(zone + 'override', 0, callback);
		$('#' + zone + 'Damper').css( 'cursor', 'default' );
	}
}

/*
*  Function:
*      overrideBlower -- loads manual blower override or automatic
*  Parameters:
*      blower -- blower that was affected
*  Return value:
*      none
*/
function overrideBlower(blower){
	var box = $('#' + blower + 'override');
	if(box.is(':checked')){
		io.set(blower + 'override', 1, callback);
		$('#' + blower + 'Speed').css( 'cursor', 'pointer' );
	}else{
		io.set(blower + 'override', 0, callback);
		$('#' + blower + 'Speed').css( 'cursor', 'default' );
	}
}

function clickZone(zone){
	setValue(zone);
}

/*
*  Function:
*      setValue -- loads manual set zone damper value
*  Parameters:
*      zone -- zone that was affected
*  Return value:
*      none
*/
function setValue(zone){
	$( "#selected-zone" ).val(zone);
	if (currentState['zone'+zone+'control'] == 1) {
		start_date = start_dates['zone'+zone];
		$( "#zone-control-title" ).html("Zone "+zone+" - Started "+start_date);
		$( "#zonecontrolon" ).hide();
		$( "#zonecontroloff" ).show();
		$( "#savezonechanges" ).show();
		$( "#zoneOnline" ).show();
		$( "#zoneOffline" ).hide();
		var checked = currentState['zone'+zone+'override'] == 1 ? true : false;
		$( "#zoneoverride" ).prop('checked', checked);
		$( "#zonevalue" ).val(currentState['zone'+zone+'value']);
	} else {
		$( "#zone-control-title" ).html("Zone "+zone+" - Stopped");
		$( "#zonecontrolon" ).show();
		$( "#zonecontroloff" ).hide();
		$( "#savezonechanges" ).hide();
		$( "#zoneOnline" ).hide();
		$( "#zoneOffline" ).show();
	}
	refreshZoneValue();
	$( "#zone-control-form" ).modal('show');
}

function refreshZoneValue(){
	if ($('#zoneoverride').is(':checked')) {
		$( "#zone-value-div" ).show();
	} else {
		$( "#zone-value-div" ).hide();
	}
}

function startSelectedZone(){
	selected_zone = $( "#selected-zone" ).val();
	io.set('zone'+selected_zone+'control', 1, callback);
	io.set('zone'+selected_zone+'reset', 1, callback);
	$( "#zone-control-form" ).modal('hide');
}

function stopSelectedZone(){
	selected_zone = $( "#selected-zone" ).val();
	io.set('zone'+selected_zone+'control', 0, callback);
	$( "#zone-control-form" ).modal('hide');
}

function saveSelectedZone(){
	selected_zone = $( "#selected-zone" ).val();
	var override_value = $('#zoneoverride').is(':checked') ? 1 : 0;
	io.set('zone' + selected_zone + 'override', override_value, callback);
	io.set('zone' + selected_zone + 'value', $( "#zonevalue" ).val(), callback);
	$( "#zone-control-form" ).modal('hide');
}

/*
*  Function:
*      setBlowerValue -- loads manual set zone damper value
*  Parameters:
*      blower -- blower that was affected
*  Return value:
*      none
*/
function setBlowerValue(blower){
	$( "#selected-blower" ).val(blower);
	if (currentState['blower'+blower+'fault'] < 2) {
		$( "#blower-form-title" ).html('Blower '+blower+" - Fault");
		$( "#blower-start-button" ).hide();
		$( "#blower-stop-button" ).show();
	} else if (currentState['blower'+blower+'run'] > 0) {
		$( "#blower-form-title" ).html('Blower '+blower+" - On");
		$( "#blower-start-button" ).hide();
		$( "#blower-stop-button" ).show();
	} else {
		$( "#blower-form-title" ).html('Blower '+blower+" - Off");
		$( "#blower-start-button" ).show();
		$( "#blower-stop-button" ).hide();
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
	io.set('blower' + selected_blower + 'value', $('#blowervalue').val(), callback);
	$( "#blower-form" ).modal('hide');
}

function startSelectedBlower() {
	selected_blower = $( "#selected-blower" ).val();
	io.set('blower' + selected_blower + 'run', 1, callback);
	$( "#blower-form" ).modal('hide');
}

function stopSelectedBlower() {
	selected_blower = $( "#selected-blower" ).val();
	io.set('blower' + selected_blower + 'run', 0, callback);
	$( "#blower-form" ).modal('hide');
}

/**************GRAPHING JAVASCRIPT*****************/
//Array that holds data to be graphed
var data1 = [
];
var data2 = [
];

//Array that holds graph data
var dataset = [
    {
        label: "Temperature",
        data: data1,
        xaxis:1,
        color: "#FF0000",
        points: { fillColor: "#FF0000", show: true },
		lines: { show: true },
		unit: '°F'
	},
	{
        label: "Damper",
        data: data2,
        xaxis:1,
        color: "#00FF00",
        points: { fillColor: "#00FF00", show: true },
		lines: { show: true },
		unit: '%'
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
		min: 0,
		max: 180,
		tickSize: 20,
        axisLabel: "Temperature",
        axisLabelUseCanvas: false,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 5
    },
    legend: {
		show: true,
		noColumns: 2
    },
    grid: {
        hoverable: true,
        borderWidth: 3,
        mouseActiveRadius: 50,
        backgroundColor: { colors: ["#ffffff", "#ffffff"] },
        axisMargin: 20
    }
};

function viewSelectedZoneGraph() {
	//$( "#zone-control-form" ).modal('hide');
	selected_zone = $( "#selected-zone" ).val();
	dblClickZone('zone'+selected_zone);
} 
/*
*  Function:
*      dblClickZone -- Displays graph in popup window when a zone is double clicked on main page
*  Parameters:
*      zone -- Zone that should be displayed
*  Return value:
*      true/false -- returns false when graph is displayed else returns true
*/
function dblClickZone(zone){
	sqlite.exec("/usb/batch_files.db", "SELECT * FROM batch_files ORDER BY id DESC;", function(info){
		data = JSON.parse(info);
		$.each(data,function(k,v){
			var sections = v.name.split("_");
			if(sections[3] == zone + ".csv"){
				openGraph(v.name);
				return false;
			}
		});
	});
}

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
	file.read(fileName, 0, 1000000, function(fileData){
		var dataArray = fileData.split("\n");
		var j = 0;
		for(var i = 1; i < dataArray.length; i++){
			var values = dataArray[i].split(", ");
			var date = gd(values[0]);
			if(date == date){
				data1[j] = [date, values[1]];
				if(values.length > 2) {
					data2[j] = [date, values[2]];
				}
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
							(date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "<br>" +
                            padDigits(date.getHours(), 2) + ":" + padDigits(date.getMinutes(), 2) +
                            " <strong>" + y + "</strong>" + item.series.unit);
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
