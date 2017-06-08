function ScreenListView( m )
{
	var self = this ;
	ScreenElementView.call( self, m );
	
	self.topic_buttons = [];
	self.screen_button_objects = [];
	
	self.setContent = function()
	{
		self.createList();
		
		// applyClick( self.$div, click_function );
		
		self.$content.append( $( self.xml_node ).text() );
		
		self.$div.append(self.$content);
		
		self.base_setContent();
	}
	
	self.createList = function()
	{
		var topic_object = currentTopic;
		if( self.xml_node.attr( 'topic' ) )
		{
			topic_object = masterObj.getTopicById( self.xml_node.attr( 'topic' ) )
		}			
		
		var showall = Boolean( self.xml_node.attr( 'showall' ) == 'true' );
		
		
		for( var i = 0; i < topic_object.arScreens.length; i++ )
		{
			var screen_object = topic_object.arScreens[ i ];
			
			if( screen_object.label || showall )
			{
				var screen_button_object = self.createScreen( screen_object, self.$div )
				
				self.screen_button_objects.push( screen_button_object );
			}
		}
	};

	
	self.createScreen = function( screen_object, $target )
	{
		
		var screen_btn_object = {};
		var $screenbtn = $( '<div class="screen_btn incomplete"></div>' );
		var $screenstatus = $( '<div class="screenstatus"></div>' );
		var $screenlabel = $( '<div class="screenlabel"><p>'+screen_object.label+'</p></div>' );
		if(! screen_object.label )
		{
			$screenlabel = $( '<div class="screenlabel"><p>'+screen_object.id+': '+screen_object.screentype+'</p></div>' );
		}
		$screenbtn.append( $screenstatus );
		$screenbtn.append( $screenlabel );
		
		screen_btn_object.id = screen_object.id;
		screen_btn_object.button = $screenbtn;
		screen_btn_object.button_status = $screenstatus;
		screen_btn_object.screen_object = screen_object
		
		screen_btn_object.button.addClass( 'id'+screen_object.id );
		
		var updatestatus = function()
		{
			if( screen_btn_object.screen_object.completed )
			{
				screen_btn_object.button.removeClass( 'incomplete' );
				screen_btn_object.button.addClass( 'completed' );
			}
			trackingObj.updateTracking()
		}
		updatestatus();
		screen_object.dispatcher.bind( 'completed', updatestatus  ) ;
		
		
		var loadscreen = function()
		{
			jumpScreen( screen_btn_object.screen_object.id );
		}
		
		$target.append( $screenbtn );
		
		if ( devmode ) console.log( 'Log: ' + currentScreen.id + ' - ' + screen_btn_object.screen_object.id );
		if( currentScreen.id == screen_btn_object.screen_object.id )
		{
			screen_btn_object.button.addClass( 'current' );
		}
		else
		{
			applyClick( $screenbtn, loadscreen );
		}
		
		return screen_btn_object;
		
	};
	
	self.hilightScreenId = function( id )
	{
		for( var i = 0; i < self.screen_button_objects.length; i++ )
		{
			var screen_button_object = self.screen_button_objects[ i ];
			screen_button_object.button.removeClass( 'current' );
			if( screen_button_object.id == id )
			{
				screen_button_object.button.addClass( 'current' );
			}
		}
	};
	
	
}
ScreenListView.prototype = ScreenElementView;