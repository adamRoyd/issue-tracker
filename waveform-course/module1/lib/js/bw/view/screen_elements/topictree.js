function TopicTreeView( m )
{
	var self = this ;
	ScreenElementView.call( self, m );
	
	self.topic_buttons = [];
	self.screen_button_objects = [];
	
	self.setContent = function()
	{
		self.createTree();
		
		// applyClick( self.$div, click_function );
		
		self.$content.append( $( self.model.oXML ).text() );
		
		self.$div.append(self.$content);
		
		self.base_setContent();
	}
	
	self.createTree = function()
	{
		for( var i = 0; i < masterObj.arTopics.length; i++ )
		{
			var topic_object = masterObj.arTopics[ i ];
			self.createTopic( topic_object );
		}
	};
	
	self.createTopic = function( topic_object )
	{
		var topic_btn_object = {};
		var $topicbtn = $( '<div class="topic_btn"><div class="bg"></div></div>' );
		var $topicstatus = $( '<div class="topicstatus"></div>' );
		var $topicscreens = $( '<div class="topicscreens"></div>' );
		var $topiclabel = $( '<div class="topiclabel"><p>'+topic_object.label+'</p></div>' );
		$topicbtn.append( $topicstatus );
		$topicbtn.append( $topiclabel );
		$topicbtn.append( $topicscreens );
		topic_btn_object.button = $topicbtn;
		topic_btn_object.button_status = $topicstatus;
		topic_btn_object.id = topic_object.id;
		topic_btn_object.topic_object = topic_object;
		topic_btn_object.topic_screens_div = $topicscreens;
		topic_btn_object.open = false;
		topic_btn_object.named_screens = []
		var updatestatus = function()
		{
			topic_btn_object.button.removeClass( 'notattempted incomplete completed passed locked' );
			topic_btn_object.button.addClass( topic_btn_object.topic_object.getStatus() );
		}
		
		updatestatus();
		
		topic_object.dispatcher.bind( 'statusupdated', updatestatus  ) ;
		
		for( var i = 0; i < topic_object.arScreens.length; i++ )
		{
			var screen_object = topic_object.arScreens[ i ];
			if( screen_object.label )
			{
				var screen_button_object = self.createScreen( screen_object, $topicscreens )
				topic_btn_object.named_screens.push( screen_button_object );
				self.screen_button_objects.push( screen_button_object );
			}
		}
		
		var topicclick = function()
		{
			if( topic_btn_object.named_screens.length )
			{
				if( topic_btn_object.open )
				{
					self.closeTopic( topic_btn_object );
				}
				else
				{
					self.openTopic( topic_btn_object );
				}
			}
			else
			{
				self.closeTopics();
				loadTopic( topic_btn_object.topic_object.id );
			}
		}
		
		self.$content.append( $topicbtn );
		
		self.topic_buttons.push( topic_btn_object );
		applyClick( $topicbtn, topicclick );
	};
	
	self.createScreen = function( screen_object, $target )
	{
		
		
		var screen_btn_object = {};
		var $screenbtn = $( '<div class="screen_btn incomplete"></div>' );
		var $screenstatus = $( '<div class="screenstatus"></div>' );
		var $screenlabel = $( '<div class="screenlabel"><p>'+screen_object.label+'</p></div>' );
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
			if( currentScreen.id == screen_btn_object.screen_object.id )
			{
				self.screen_view.doClickById( 'hidepanel' );
			}
			else
			{
				jumpScreen( screen_btn_object.screen_object.id );
			}
		}
		
		$target.append( $screenbtn );
		applyClick( $screenbtn, loadscreen );
		
		return screen_btn_object;
		
	};
	
	self.openCurrentTopic = function( )
	{
		self.openTopicId( currentTopic.id );
		
		self.hilightScreenId( currentScreen.id );
		
	}
	
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
	
	self.openTopicId = function( id )
	{
		self.openTopic( getItemById( id, self.topic_buttons ) );
	}
	
	self.openTopic = function( topic_btn_object )
	{
		for( var i = 0; i < self.topic_buttons.length; i++ )
		{
			var item = self.topic_buttons[ i ];
			if( item != topic_btn_object )
			{
				self.closeTopic( item );
			}
		}
		var newheight = topic_btn_object.topic_screens_div.height() + 30;
		TweenMax.to( topic_btn_object.button, 0.3, { height: newheight } );
		topic_btn_object.button.addClass( 'open' );
		topic_btn_object.open = true;
	};
	
	self.closeTopics = function(  )
	{
		for( var i = 0; i < self.topic_buttons.length; i++ )
		{
			var item = self.topic_buttons[ i ];
			self.closeTopic( item );
		}
	};
	
	self.closeTopic = function( topic_btn_object )
	{
		var removeopen = function( ) { topic_btn_object.button.removeClass( 'open' ) };
		TweenMax.to( topic_btn_object.button, 0.3, { height: 30, onComplete: removeopen } );
		topic_btn_object.open = false;
	}
	
}
TopicTreeView.prototype = ScreenElementView;