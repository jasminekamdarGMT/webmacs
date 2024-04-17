/*
 *  Auth: Ryan Kimball
 *  File: /javascript/x600m.js
 *  Desc: This file contains the x600m api for the custom web pages
 *  Hist: 02/26/2014 - Initial version.
 * 
 */

 // conditional event class
var condEvnt = {

	/*
	 *  Function: 
	 *      add - add a new event
	 *  Parameters: 
	 *		name - name of event
	 *		desc - description of action
	 *		expression - lua expression	
	 *		eventGroupID - which event group this conditional event belongs to 
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	add: function(name, desc, expression, eventGroupID, callback){			
		var data = "op=add&name="+name+"&description="+encodeURIComponent(desc)+"&expression="+encodeURIComponent(expression)+"&eventGroupID="+eventGroupID+"&type=COMPLEX";		
					
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "eventOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Event " + name + " added to database.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      update - update an event
	 *  Parameters: 
	 *		id - id of event
	 *		name - name of event
	 *		desc - description of action
	 *		expression - lua expression 
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	update: function(id, name, desc, expression, eventGroupID, callback){	


		// not all parameters are required for update to work
		var data = "op=update&type=COMPLEX";
		// the id is
		if(id){
			data = data + "&id=" + id;
		} else {
			callback("5:Missing parameter: id.")
		}
		// the name is not required
		if(name != null){
			data = data + "&name=" + name;
		}
		// desc is not required
		if(desc != null){
			data = data + "&description=" + encodeURIComponent(desc);
		}

		// expression is not required
		if(expression != null){
			data = data + "&expression=" + encodeURIComponent(expression);
		}

		// eventGroupID is not required
		if(eventGroupID != null){
			data = data + "&eventGroupID=" + eventGroupID;
		}
		
									
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "eventOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Event " + name + " updated.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      del - delete an event
	 *  Parameters: 
	 *		id - id of action to delete
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	del: function(id, callback){			
		var data = "op=del&id="+id;							
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "eventOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Event " + name + " removed from database.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},
};


// event class
var evnt = {

	/*
	 *  Function: 
	 *      add - add a new event
	 *  Parameters: 
	 *		name - name of event
	 *		desc - description of action
	 *		dtStart - when to start event
	 *		dtEnd - when to end event
	 *		freq - NONE, SECONDLY, MINUTELY, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY
	 *		interval - how often, in terms of the freq, to repeat the event
	 *		byday - bitmask that indicates what days event should occur when the freq equals WEEKLY (saturday = bit 7, sunday = bit 0)
	 *		monthlyRepeatType - how to repeat when freq equals MONTHLY.(DOM = day of month, DOW = day of week)
	 *		untilType - NEVER, COUNT, DATE (what to look for to stop repeats of event)
	 *		dtUntil - when to stop repeats of event (only when untilType = DATE)
	 *		count - how many times to repeat event (only when untilType = COUNT)
	 *		eventGroupID - the id of the event group that this event belongs to	 
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	add: function(name, desc, dtStart, dtEnd, freq, interval, byday, monthlyRepeatType, untilType, dtUntil, count, eventGroupID,callback){			
		var data = "op=add&name="+name+"&description="+encodeURIComponent(desc)+"&dtstart="+encodeURIComponent(dtStart)+"&dtend="+encodeURIComponent(dtEnd)+
				   "&freq="+freq+"&interval="+interval+"&byday="+byday+"&monthlyRepeatType="+monthlyRepeatType+
				   "&untilType="+untilType+"&dtuntil="+encodeURIComponent(dtUntil)+"&count="+count+"&eventGroupID="+eventGroupID+"&type=CALENDAR";		

		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "eventOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Event " + name + " added to database.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      update - update an event
	 *  Parameters: 
	 *		id - id of event
	 *		name - name of event
	 *		desc - description of action
	 *		dtStart - when to start event
	 *		dtEnd - when to end event
	 *		freq - NONE, SECONDLY, MINUTELY, HOURLY, DAILY, WEEKLY, MONTHLY, YEARLY
	 *		interval - how often, in terms of the freq, to repeat the event
	 *		byday - bitmask that indicates what days event should occur when the freq equals WEEKLY (saturday = bit 7, sunday = bit 0)
	 *		monthlyRepeatType - how to repeat when freq equals MONTHLY.(DOM = day of month, DOW = day of week)
	 *		untilType - NEVER, COUNT, DATE (what to look for to stop repeats of event)
	 *		dtUntil - when to stop repeats of event (only when untilType = DATE)
	 *		count - how many times to repeat event (only when untilType = COUNT)
	 *		eventGroupID - the id of the event group this event belongs to	 
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	update: function(id, name, desc, dtStart, dtEnd, freq, interval, byday, monthlyRepeatType, untilType, dtUntil, count, eventGroupID, callback){
				   
		// not all parameters are required for update to work
		var data = "op=update&type=CALENDAR";
		// the id is
		if(id){
			data = data + "&id=" + id;
		} else {
			callback("5:Missing parameter: id.")
		}
		// the name is not required
		if(name != null){
			data = data + "&name=" + name;
		}
		// desc is not required
		if(desc != null){
			data = data + "&description=" + encodeURIComponent(desc);
		}
		
		// dtStart is not required
		if(dtStart != null){
			data = data + "&dtstart=" + encodeURIComponent(dtStart);
		}

		// dtEnd is not required
		if(dtEnd != null){
			data = data + "&dtend=" + encodeURIComponent(dtEnd);
		}

		// freq is not required
		if(freq != null){
			data = data + "&freq=" + freq;
		}

		// interval is not required
		if(interval != null){
			data = data + "&interval=" + interval;
		}

		// byday is not required
		if(byday != null){
			data = data + "&byday=" + byday;
		}

		// monthlyRepeatType is not required
		if(monthlyRepeatType != null){
			data = data + "&monthlyRepeatType=" + monthlyRepeatType;
		}

		// untilType is not required
		if(untilType != null){
			data = data + "&untilType=" + untilType;
		}

		// dtUntil is not required
		if(dtUntil != null){
			data = data + "&dtuntil=" + encodeURIComponent(dtUntil);
		}

		// count is not required
		if(count != null){
			data = data + "&count=" + count;
		}

		// eventGroupID is not required
		if(eventGroupID != null){
			data = data + "&eventGroupID=" + eventGroupID;
		}
				
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "eventOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Event " + name + " updated.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      del - delete an event
	 *  Parameters: 
	 *		id - id of action to delete
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	del: function(id, callback){			
		var data = "op=del&id="+id;							
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "eventOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Event " + name + " removed from database.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},
};

// action class
var act = {

	/*
	 *  Function: 
	 *      add - add a new action
	 *  Parameters: 
	 *		name - name of action
	 *		desc - description of action
	 *		luaExpr - lua expression to run
	 *		eventSourceID - id of event that will trigger the action
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	add: function(name, luaExpr, desc, eventSourceID, callback){			
		var data = "op=add&name="+name+"&description="+encodeURIComponent(desc)+"&expression="+encodeURIComponent(luaExpr)+"&eventSourceID="+eventSourceID+"&type=COMPLEX";	
						
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "actionOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Action " + name + " added to database.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      update - update a action
	 *  Parameters: 
	 *		id - id of action
	 *		name - name of action
	 *		desc - description of action
	 *		luaExpr - lua expression to run
	 *		eventSourceID - id of event that will trigger the action
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	update: function(id, name, luaExpr, desc, eventSourceID, callback){	

		// not all parameters are required for update to work
		var data = "op=update";
		// the id is
		if(id){
			data = data + "&id=" + id;
		} else {
			callback("5:Missing parameter: id.")
		}
		// the name is not required
		if(name != null){
			data = data + "&name=" + name;
		}
		// luaExpr is not required
		if(luaExpr != null){
			data = data + "&expression=" + encodeURIComponent(luaExpr);
		}
		// desc is not required
		if(desc != null){
			data = data + "&description=" + encodeURIComponent(desc);
		}
		// eventSourceID is not required
		if(eventSourceID != null){
			data = data + "&eventSourceID=" + eventSourceID;
		}
		
						
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "actionOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Action " + name + " updated.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      del - delete an action
	 *  Parameters: 
	 *		id - id of action to delete
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	del: function(id, callback){			
		var data = "op=del&id="+id;	
					
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "actionOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
	    	
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Action " + name + " removed from database.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},
};

// reg class
var reg = {

	/*
	 *  Function: 
	 *      set - set the io value
	 *  Parameters: 
	 *		name - name of io to set
	 *		val - new value of io
	 *		callback - function to call after completing request with result
	 *		pulseTime - how long to pulse for
	 *  Return value:
	 *      none
	 */	
	set: function(name, val, callback, pulseTime){			
		var fileName = "secureState.xml?"+name+"State="+val;
		if(pulseTime){
			fileName = fileName+"&"+name+"PulseTime="+pulseTime;
		}				
		var jqxhr = $.ajax( {
	    	type: "GET",
	    	url: fileName,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
	    	if(callback){
				callback("0:"+data);
			}	    		    	
	    }).fail(function() {
	    	if(callback){
				callback("1:No response.");
			}	    	
	    }).always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      pulse - send pulse command to io
	 *  Parameters: 
	 *		name - name of io to pulse
	 *		pulseTime - how long to pulse
	 *		callback - function to call after completing request with result
	 *  Return value:
	 *      none
	 */	
	pulse: function(name, pulseTime, callback){		
		this.set(name,2,callback,pulseTime);
	},

	/*
	 *  Function: 
	 *      toggle - send toggle command to io
	 *  Parameters: 
	 *		name - name of io to pulse
	 *		callback - function to call after completing request with result
	 *  Return value:
	 *      none
	 */	
	toggle: function(name,callback){			
		this.set(name, 5, callback);
	},

	/*
	 *  Function: 
	 *      set - set the io value
	 *  Parameters: 
	 *		name - name of io to set
	 *		val - new value of io
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	setInitVal: function(name, val, callback){			
		var data = "op=setInitVal&name="+name+"&initVal="+val;					
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "regOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:Register initial value set to " + val + ".");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},
};

// io class
var io = {

	/*
	 *  Function: 
	 *      set - set the io value
	 *  Parameters: 
	 *		name - name of io to set
	 *		val - new value of io
	 *		callback - function to call after completing request with result
	 *		pulseTime - how long to pulse for
	 *  Return value:
	 *      none
	 */	
	set: function(name, val, callback, pulseTime){			
		var fileName = "secureState.xml?"+name+"State="+val;
		if(pulseTime){
			fileName = fileName+"&"+name+"PulseTime="+pulseTime;
		}				
		var jqxhr = $.ajax( {
	    	type: "GET",
	    	url: fileName,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
	    	if(callback){
				callback("0:"+data);
			}	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    }).always(function() {		  	
		});
	},


	/*
	 *  Function: 
	 *      pulse - send pulse command to io
	 *  Parameters: 
	 *		name - name of io to pulse
	 *		pulseTime - how long to pulse
	 *		callback - function to call after completing request with result
	 *  Return value:
	 *      none
	 */	
	pulse: function(name, pulseTime, callback){			
		this.set(name,2,callback,pulseTime);
	},

	/*
	 *  Function: 
	 *      toggle - send toggle command to io
	 *  Parameters: 
	 *		name - name of io to pulse
	 *		callback - function to call after completing request with result
	 *  Return value:
	 *      none
	 */	
	toggle: function(name,callback){			
		this.set(name, 5, callback);
	},

	/*
	 *  Function: 
	 *      update - update an I/O description
	 *  Parameters: 
	 *		id - id of event	 
	 *		desc - description of I/O
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	update: function(id, desc, callback){	


		// not all parameters are required for update to work
		var data = "op=update";
		// the id is
		if(id){
			data = data + "&id=" + id;
		} else {
			callback("5:Missing parameter: id.")
		}
		
		// desc is not required
		if(desc != null){
			data = data + "&description=" + encodeURIComponent(desc);
		}
		
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "ioOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	

			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:I/O updated.");
				}				
			} else {				
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	}
};



// user class
var user = {
	/*
	 *  Function: 
	 *      login - log the user in
	 *  Parameters: 
	 *      username - the user's username
	 *		password - the user's password
	 *		callback - function to call with result
	 *  Return value:
	 *      none
	 */
	login: function(username, password, callback){
		var data = "username="+username+"&password="+password;
        var jqxhr = $.ajax( {
        	type: "POST",
        	url: "login.php",
        	data: data,
        	timeout: 10000,
        	async: false,
        	cache: false,
        	contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        	beforeSend: function(){}
        }).done(function(data) {        	
        		// handle other return codes other than SUCCESS
        		var strs = data.split(":");
				if(strs[0] == "SUCCESS"){
					if(callback){
						callback("0:Login Successful. Redirecting.");
					}
					window.location.replace(strs[1]);
				} else {
					if(callback){
						callback("2:Login error: "+data);
					}
				}
		}).fail(function() { 
		  	if(callback){
		  		callback("1:No response.");
		  	} 
		}).always(function() {});
	},

	/*
	 *  Function: 
	 *      logout - log the user out
	 *  Parameters: 
	 *      none
	 *  Return value:
	 *      none
	 */
	logout: function(){
		window.location.replace("logout.php");
	},

	/*
	 *  Function: 
	 *      set - set the io value
	 *  Parameters: 
	 *		fullName - full name of user
	 *		email - email for user
	 *		password - new password (if left at "********", then no change will occur)
	 *		confirmPassword - should match password in order for change to occur
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	updateSettings: function(fullName, email, password, confirmPassword, callback){			
		var data = "fullName="+fullName+"&email="+email+"&password="+password+"&confirmPassword="+confirmPassword;					
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "/system/updateMyInfo.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
			// handle other return codes other than SUCCESS
    		var strs = data.split(":");
			if(strs[0] == "SUCCESS"){
				if(callback){
					callback("0:User settings updated.");
				}				
			} else {
				if(callback){
					callback("4:Database error: "+data);
				}
			}  	   	
	    }).fail(function(data) {
	    	if(callback){
				callback("1:No response.");
			}
	    })
		  .always(function() {		  	
		});
	},
};

// currentPage class
var currentPage = {
	refreshTimeoutID: null,

	/*
	 *  Function: 
	 *      setIOFields - parse through json data and update IO fields
	 *  Parameters: 
	 *      data - a json object
	 *  Return value:
	 *      none
	 */
	setIOFields: function (data){
		// run through the json and update the components in the widget						
		$.each(data, function(key, val){
			var e = $('#' + key);
			if(e != undefined){
				e.html(val);
			}
		});
	},	

	/*
	 *  Function: 
	 *      refreshIOFields - use ajax to refresh the IO and Register fields
	 *  Parameters: 
	 *      fileName - name of json file to request for IO states
	 *		period - how often to refresh in seconds (0 = do not repeat)		
	 *  Return value:
	 *      none
	 */
	refreshIOFields: function (fileName, period, contentDivName){	
		var jqxhr = $.ajax( {
	    	type: "GET",
	    	dataType: "json",
	    	url: fileName,	            	
	    	timeout: 10000,
	    	//async: false,
	    	cache: false,    		            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
			currentPage.setIOFields(data);   	
	    }).fail(function(data) {})
		  .always(function() {
		  	clearTimeout(currentPage.refreshTimeoutID);
		  	if(period){
			  	if(period != 0){
			  		if(period < 1){
			  			period = 1;
			  		}
				  	// make sure the page still exists before refreshing 				  	
				  	var contentBox = $("#"+contentDivName); 	
				  	if(contentBox.length > 0){
				  		currentPage.refreshTimeoutID = setTimeout(function(){currentPage.refreshIOFields(fileName, period, contentDivName);},period*1000);
				  	}
			  	}
		  	}
		});
	}
};

// database class
var db = {
	/*
	 *  Function: 
	 *      commitSettingsToFlash - copy the settings database to flash from ram
	 *  Parameters: 
	 *		callback - function to call with result
	 *  Return value:
	 *      none
	 */
	commitSettings: function (callback) {	     	
	    var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "commitSettings.php",
	    	data: "",
	    	timeout: 10000,
	    	async: false,
	    	cache: false,
	    	contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    	beforeSend: function(){	    		    		
	    	}
	    }).done(function(data) { 
	    		if(data == "LOGGED_OUT"){
					// check for popup window
	    			if(window.opener){    				
	    				window.opener.location.href = "sessExpLoginScreen.php";
	    				window.close();
	    			} else {
						window.location.replace("sessExpLoginScreen.php");
					}
				} else if(data != "SUCCESS") {				
					// we haven't handled this error so just display the message in the status box					
					if(callback){
	    				callback("3:Commit settings error: "+data);
	    			}					
	    		} else {
	    			document.cookie=escape('commitSettings') + '=' + escape(0);
	    			if(callback){
	    				callback("0: Settings committed.");
	    			}
	    		}
	    }).fail(function() {
		  	if(callback){
		  		callbck("1:No response.");
		  	}
		}).always(function() {});	 
	}
};

// sqlite class
var sqlite = {
	/*
	 *  Function: 
	 *      exec - execute a sql query and return the result
	 *  Parameters: 
	 *		filename - filename of sqlite database	 
	 *		query - query to send
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	exec: function(filename, query, callback){

		// not all parameters are required for update to work
		var data = "filename="+filename+"&query="+encodeURIComponent(query);	
		
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "sqliteOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {
			if(callback){
				callback(data);
			}  	
	    }).fail(function(data) {
	    	if(callback){
				callback("ERROR: Communication error.");
			}
	    }).always(function() {		  	
		});
	}
};


// file class
var file = {
	/*
	 *  Function: 
	 *      read - read from a file
	 *  Parameters: 
	 *		filename - filename
	 *		offset - offset from beginning of file
	 *		length - how many bytes to read
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	read: function(filename, offset, length, callback){

		var data = "op=read&filename="+filename+"&offset="+offset+"&length="+length;
		
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "fileOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			if(callback){
				callback(data);
			}  	
	    }).fail(function(data) {	    	
	    	if(callback){
				callback("ERROR: Communication error.");
			}
	    }).always(function() {		  	
		});
	},

	/*
	 *  Function: 
	 *      write - read to a file
	 *  Parameters: 
	 *		filename - filename
	 *		offset - offset from beginning of file
	 *		length - how many bytes to read
	 *		callback - function to call after completing with result
	 *  Return value:
	 *      none, but result can be obtained through callback function
	 */	
	write: function(filename, data, offset, whence, length, callback){

		var data = "op=write&filename="+filename+"&offset="+offset+"&whence="+whence+"&length="+length+"&data="+encodeURIComponent(data);
		
		var jqxhr = $.ajax( {
	    	type: "POST",
	    	url: "fileOps.php",
	    	data: data,	            	
	    	timeout: 10000,
	    	/*async: false,*/
	    	cache: false,	            	
	    	beforeSend: function(){
	    	}
	    }).done(function(data) {	    	
			if(callback){
				callback(data);
			}  	
	    }).fail(function(data) {	    	
	    	if(callback){
				callback("ERROR: Communication error.");
			}
	    }).always(function() {		  	
		});
	}
};
