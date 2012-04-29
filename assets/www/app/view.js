App.View = (function(lng, app, undefined) {
    
    var event_template_markup = 
    	"<li data-icon='user' class=\"event-list-info\" id=\"{{event_id}}\">\n\
    	<a href=\"#events_single_container\" data-target=\"article\"><img src='{{event_image_url}}' />\
    	<strong>{{event_name}}</strong><p><small>{{event_start}}</small></p><br /><p>{{event_description}}</p></a></li>";
    // Template for event list
    lng.View.Template.create('event_template', event_template_markup);
    
    
    var render_event_info= function(event){
    	var markup_content = '<ul>';
    	if(event == null){
    		markup_content += '<p>Beklager, en feil oppsto</p>';
    	}else{
    		markup_content +='<li class="anchor"><strong>'+event.name+'</strong></li>';
    		markup_content +='<li class="tip">Start: '+event.startTime+'</li>';
    		markup_content +='<li class="tip">Stopp: '+event.endTime+'</li>';
    		if(event.location != null){
    			if(event.location.place != null){
    				markup_content +='<li class="tip">Sted: '+event.location.place+'</li>';    			    				
    			}else{
    				markup_content +='<li class="tip">Sted: ikke funnet</li>';    			    			    				
    			}
    		}else{
    			markup_content +='<li class="tip">Sted: ikke funnet</li>';    			    			
    		}
    		markup_content +='<li><strong>'+event.description+'</strong></li>';
    		
    	}
    	markup_content += '</ul><br /><p><a href="#events_index_container" data-target="article" data-icon="left" class="button onleft">Back</a></p>';
    	
    	
    	lng.View.Scroll.html('events_single_container', '' );
    	lng.View.Scroll.prepend('events_single_container', markup_content);
    	
    }
    
    var render_list_index = function(events){
    	//list
    	lng.View.Template.List.create ({
    		el : '#events_index_container',
    		template: 'event_template',
    		data: events
    	});
    	
    	//pull down
    	var markup_content = '<div id="pullDown"><span class="pullDownIcon"></span><span class="pullDownLabel">Dra ned for refresh...</span></div>';
        lng.View.Scroll.prepend('events_index_container', markup_content);
    }

    return{
        //render_list:render_list,
        render_list_index:render_list_index,
        render_event_info:render_event_info
    }

})(LUNGO, App);