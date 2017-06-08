function SlidingScale( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	self.submitBtn;
	self.resetBtn;
	
	self.slider_nodes = [];
	self.sliders = [];
	
	self.attempted = false;
	self.passed = false;
	
	self.maxAttempts = -1 ;
	self.attempts = 0 ;
		
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;
			// if ( devmode ) console.log( i + " - " + xml_node.nodeName );
			
			switch ( xml_node.nodeName )
			{
				case "settings": self.createSettings( $( xml_node ) ) ;
					break;
					
				case "slider": self.slider_nodes.push( $( xml_node ) );
					break;
			}
		}
		
		return self.custom_element;		
	}
	
	//	<settings max_attempts="2" />
	self.createSettings = function( oXML )
	{
		if( oXML.attr( "max_attempts" ))
		{
			self.maxAttempts = Number ( oXML.attr( "max_attempts" )) ;
		}		
	}
	self.addSlider = function( $slider_node )
	{
		var slider_element_view = self.getScreenElementById( $slider_node.attr( 'id' ) ).view;
		
		var slider_obj = {};
		slider_obj.id = $slider_node.attr( 'id' );
		slider_obj.view = slider_element_view;
		slider_obj.correct_index = $slider_node.attr( 'correctindex' );
		slider_obj.chosen_index = null;
		
		/* sd - don't need a corresponding kill and unbind function because this is dealt with by the slider control - (we will always have a slider control for a sliding scale screen) */
		slider_element_view.dispatcher.bind('updatesnap',self.checkEnableSubmit)
		
		self.sliders.push( slider_obj );
	};
	
	self.checkEnableSubmit = function(  )
	{
		var do_enable = true;
		for( var i = 0; i < self.sliders.length; i++ )
		{
			var slider_obj = self.sliders[ i ];
			slider_obj.chosen_index = slider_obj.view.getSnapIndex();
			if( slider_obj.chosen_index < 0 )
			{
				do_enable = false;
			}
		}
		
		if(do_enable)
		{
			self.enableSubmit();
		}
		else
		{
			self.disableSubmit();
		}
	};
	
	self.disableOptions = function()
	{
		
		for( var i = 0; i < self.sliders.length; i++ )
		{
			var slider_obj = self.sliders[ i ];
			slider_obj.view.disable();
			
		}
	}
	
	self.enableOptions = function()
	{
		
		for( var i = 0; i < self.sliders.length; i++ )
		{
			var slider_obj = self.sliders[ i ];
			slider_obj.view.enable();
			
		}
	}
	
	self.resetOptions = function()
	{
		
		for( var i = 0; i < self.sliders.length; i++ )
		{
			var slider_obj = self.sliders[ i ];
			slider_obj.view.reset();
			
		}
	}
	
	
	self.disableSubmit = function()
	{
		disableContentButton( self.submitBtn );
	}
	
	self.enableSubmit = function()
	{
		self.attempted = true;
		
		self.screen.dispatcher.trigger( 'attempted' ) ;
		
		if( self.submitBtn )
		{
			enableContentButton( self.submitBtn );
		}
		else if ( self.autosubmit )
		{
			self.submit()
		}
	}
	
	self.disableReset = function()
	{
		disableContentButton( self.resetBtn );
	}
	
	self.enableReset = function()
	{	
		enableContentButton( self.resetBtn );
	}
	
	self.reset = function(  )
	{
		self.disableReset();
		self.resetOptions();
		self.enableOptions();
		
		self.doClickById('reset');
	};
	self.submit = function(  )
	{
		self.doClickById('submit');
		
		self.disableOptions();
	
		self.screen.setAnswered( true ); 
		
		var correct_count = 0;
		var correct_choices = 0;
		var incorrect_choices = 0;
		
		var screen_points = 0;
		
		
		for( var i = 0; i < self.sliders.length; i++ )
		{
			var slider_obj = self.sliders[ i ];
			correct_count++;
			if( slider_obj.correct_index == slider_obj.chosen_index )
			{
				correct_choices++;
			}
			else
			{
				incorrect_choices++
			}
			
		}
		
		var feedback_id = "fail";
		
		self.passed = false;
		if( ( correct_count == correct_choices ) && ( incorrect_choices == 0 ) )
		{
			self.passed = true;
			feedback_id = "pass";
			self.screen.pass();
		}
		else if( ( correct_choices > 0 ) && ( ( correct_choices < correct_count ) || ( incorrect_choices > 0 ) ) )
		{
			
			feedback_id = "partial";
			self.screen.partial();
		}
		else
		{
			feedback_id = "fail";
			if( self.attempts >= self.maxAttempts )
			{
				self.screen.fail();
			}
		}
		
		if( self.maxAttempts > 0 )
		{
			if ( devmode ) console.log("		attempts based") ;
			self.attempts++ ;
			
			if( feedback_id != "pass" )
			{
				if ( devmode ) console.log("		haven't passed") ;
				if( self.attempts <= self.maxAttempts )
				{
					if ( devmode ) console.log("		attempts left") ;
					
					feedback_id = "fail_attempt" ;					
				}
			}
		}		
		
		self.applyFeedback( feedback_id ) ;
		
		self.disableSubmit();
	
		if( self.resetBtn && ( !self.screen.getScored() ) )
		{
			if( feedback_id != "pass" )
			{
				if( self.maxAttempts > 0 )
				{
					if( self.maxAttempts >= self.attempts )
					{
						self.enableReset() ;
					}
				}
				else
				{
					self.enableReset() ;
				}
			}
			
			self.disableSubmit();
		}
				
		if( self.passed )
		{
		//	unlockNext() ;
		}
		else
		{
			if( self.unlockOnIncorrect )
			{
		//		unlockNext() ;
			}
		}	
	};
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		
		self.submitBtn = self.getScreenElementById( 'submitBtn' );
		self.resetBtn = self.getScreenElementById( 'resetBtn' );
		
		for( var i = 0; i < self.slider_nodes.length; i++ )
		{
			var item = self.slider_nodes[ i ];
			self.addSlider( item );
		}
		
		if ( devmode ) console.log( 'Log SLIDING SCALE LOADED' );
		self.super_screenLoaded();
	}
	
}
SlidingScale.prototype = ScreenView;