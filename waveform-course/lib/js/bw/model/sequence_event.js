function SequenceEvent(xml_node, scrn_view){
	var self = this ;
	self.screen_view = scrn_view;
	self.oXML = $(xml_node);
	self.id = self.oXML.attr("id");
	
	self.clickEvents;
	
	self.triggered = false ;
	
	self.maxTriggers = -1 ;
	self.totalTriggers = 0 ;
	self.final_event;
	self.current_event_count = 0;
	
	self.setup = function()
	{
		if( self.oXML.attr("maxTriggers") )
		{
			self.maxTriggers = Number( self.oXML.attr("maxTriggers")) ;
		}
		if( self.oXML.attr("final") )
		{
			self.final_event = self.oXML.attr("final") ;
		}
	
		var xmlnodes = self.oXML.children();
		
		for(var i = 0; i<xmlnodes.length; i++)
		{
			switch(xmlnodes[i].nodeName)
			{
				case "click": self.clickEvents = self.createActions( $(xmlnodes[i]).children() );
					break;
				default: self.clickEvents = self.createActions( self.oXML.children() );
					break;
			}
		}
	}
	
	self.createActions = function ( arr )
	{
		var new_arr = [];
		for( var i = 0; i<arr.length; i++ ) 
		{
			new_arr.push( new EventAction(arr[i], self.screen_view, self.id) )
		}
		
		// new_arr = shuffleArray( new_arr );
		
		return new_arr;
	}
	
	self.click = function(target)
	{
		// if ( devmode ) console.log( 'Log SEQUENCE ' + self.current_event_count )
		if( self.current_event_count< self.clickEvents.length )
		{
			var current_event = self.clickEvents[ self.current_event_count ]
			// if ( devmode ) console.log( 'Log SEQUENCE %o', current_event  )
			current_event.activate( target ); 
			self.current_event_count ++;
		}
		else
		{
			// if ( devmode ) console.log( 'Log SEQUENCE EVENT ' + self.final_event )
			self.screen_view.doClickById( self.final_event );
			self.current_event_count = 0;
			// self.clickEvents = shuffleArray( self.clickEvents );
			self.click( target ) ;
		}
	}
	
	self.over = function(target){} ;
	self.out = function(target){} ;
	
}