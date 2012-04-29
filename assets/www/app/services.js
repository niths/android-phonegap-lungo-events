App.Services = (function(lng, app, undefined) {
	
	var getEvent = function(id){
		lng.Sugar.Growl.show ('Laster', '',  'loading', true, 0);
		$$.ajax({
    		type: 'GET',
    		url: 'http://192.168.0.105:8080/niths/events/' + id,
//    		url: 'http://ec2-46-137-46-84.eu-west-1.compute.amazonaws.com:8080/niths/' + param,
    		contentType: 'application/json',
    		cache: false,
    		success: function(data){
    			// Debug:
    			//alert(JSON.stringify(data));

    			app.View.render_event_info(data);
                lng.Sugar.Growl.hide();
    		},
    		error: function(jqXHR, res, errorThrown){
    			
   				app.View.render_event_info(null);
   				lng.Sugar.Growl.hide();
    		},
    		timeout:5000
    	});
	}
	
	var getAllEvents = function(term){
		lng.Sugar.Growl.show ('Laster', '',  'loading', true, 0);
		
		//Calculate todays date for params to the API 
		var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth()+1; //January is 0!
	    var yyyy = today.getFullYear();
	    if(dd<10){ dd='0'+dd; } 
	    if(mm<10){mm='0'+mm;} 
	    var today = dd+'/'+mm+'/'+yyyy + '-00:00';
	    var param = '';
	    if(term == ''){ //Empty search
	    	param =  'events/dates?startTime='+today; // + '&endTime=' + inFiveDays;	    	
	    } else { //search with tags
	    	param =  'events/tags-and-dates?tag='+term+'&startTime='+today; // + '&endTime=' + inFiveDays;	    	
	    }
		
	//	alert(url);
    	//Get events
    	$$.ajax({
    		type: 'GET',
    		url: 'http://192.168.0.105:8080/niths/' + param,
//    		url: 'http://ec2-46-137-46-84.eu-west-1.compute.amazonaws.com:8080/niths/' + param,
    		contentType: 'application/json',
    		cache: false,
    		success: function(data){
    			// Debug:
    			// alert(JSON.stringify(data));
    			var data_to_bind = handleData(data);
    			//alert(JSON.stringify(data));
    			app.View.render_list_index(data_to_bind);
                lng.Sugar.Growl.hide();
    		},
    		error: function(jqXHR, res, errorThrown){
    			
    			var msg = "Beklager, en feil oppsto";
    			if(res.status == 204){
    				msg = "Fant ingen resultater";
    			}else if(res.statusText == 'timeout'){
    				msg = "Ingen kontakt med server";
    			}
    			var data_to_bind =  [];
    			data_to_bind.push({
    				event_name: msg,
    				event_description : '',
    				event_start: '',
    				event_image_url: 'assets/images/x.png'
    	        });
    			
   				app.View.render_list_index(data_to_bind);
    			$$("#pullDown").remove();
   				lng.Sugar.Growl.hide();
    		},
    		timeout:5000
    	});
	}

    
	var handleData= function(data){
		var data_to_bind = [];
		for (var i = 0; i < data.length && i < 20; i++){
			var imgg = Math.floor((Math.random()*4)+1);
			var img = '';
			if(imgg == 1){
				img = 'assets/images/e.png';				
			}else if (imgg == 2){
				img = 'assets/images/b.png';
			}else if (imgg == 3){
				img = 'assets/images/q.png';				
			}else{
				img = 'assets/images/k.png';				
				
			}
			
			data_to_bind.push({
				event_id: data[i].id,
				event_name: data[i].name,
				event_description : data[i].description,
				event_start: data[i].startTime,
				event_image_url: img
          });
		}
		return data_to_bind;
	}

    return {
        getAllEvents: getAllEvents,
        getEvent: getEvent
    }

})(LUNGO, App);