App.Events = (function(lng, app, undefined) {
	
	var makeSearch = function(){
        app.Services.getAllEvents(app.Data.getSearchTerm());
    }

    // makePullDown method. Calculates distance to top and container to make the pulldown. 
    var makePullDown = function(){
        var pulldown_offset_top = (lng.dom("#pullDown").offset().top);
        var container_top = (lng.dom("#events_index_container").offset().top);
        if (pulldown_offset_top >= container_top && !pulldown_offset_top <  container_top){
            lng.dom("#pullDown").toggleClass('loading');
            $$('.pullDownLabel').html('Laster...');
            // update the request
            App.Data.setSearchTerm($$("#text_search_input").val());
            makeSearch();
           
        }

    };

    lng.dom('#search_button').tap(function(event) {
         App.Data.setSearchTerm($$("#text_search_input").val());
         makeSearch();
    });
    lng.dom('.event-list-info').tap(function(event) {
    	app.Services.getEvent($$(this).attr('id'));
    });
    
    lng.dom('#tagsdiv a').tap(function(event) {
    	var tag = $$(this).html();
    	$$("#text_search_input").val(tag);
    	App.Data.setSearchTerm(tag);
    	makeSearch();
    });

    lng.dom('#events_index_container').on('longTap', function(){
        makePullDown();       
    });

    return {
        makeSearch:makeSearch,
        makePullDown:makePullDown
    }

})(LUNGO, App);