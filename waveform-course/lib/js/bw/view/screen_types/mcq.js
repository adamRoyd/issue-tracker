function MCQ( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	self.submitBtn;
	self.resetBtn;
	
	// object arrays
	self.optionArray 		= [];
	
	// settings
	self.optionwidth 		= null;
	self.optionoffset 		= null;
	self.radiomode 			= true;
	self.randomise 			= false;
	self.maxoptions 		= null;
	self.selectedoptions 	= 0;
	self.eventonanswer ;
	
	
	self.requiredchoices = 1;
	self.defaultPointsValue = 1 ;
	self.oSelectedOption = null ;
	self.correctRemain = false;
	
	self.attempted = false;
	self.passed = false;
	
	self.custom_xml;
	
	self.maxAttempts = -1 ;
	self.attempts = 0 ;
	
	self.showCorrectAnswersWithFeedback = true ;
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		
		if( self.screen.getScored() )
		{
			self.showCorrectAnswersWithFeedback = false ;
		}
		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;
			// if ( devmode ) console.log( i + " - " + xml_node.nodeName );
			
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
					
				case "option":		self.optionArray.push( new self.option( $( xml_node ), self.optionArray.length + 1 ) );
					break;
					
				case "fb": 			self.createFeedback( $( xml_node ) );
					break;
			}
		}
		
		if ( devmode ) console.log( 'Log MCQ CUSTOM %o', self.custom_xml );
	
		self.appendOptions() ;	
		
		
		
		return self.custom_element;
		
	}


	self.appendOptions = function()
	{
	
		var options_array = self.optionArray
		if( self.randomise )
		{
			var options_array = shuffleArray ( self.optionArray );
		}
		
		for( var i = 0; i < options_array.length; i++ )
		{
			var opt = options_array[ i ];
			
			self.$customdiv.append( opt.option );
			
		}
	}

	self.initOptions = function()
	{
	

		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
			
			// if ( devmode ) console.log( " > apply click to option " + opt.id );
			
			applyClick(
				opt.option,
				function () {
					var elm = $( this ).data( 'elm' );
					self.selectOption( elm.oObj.id );						
				}
			);
		}
	}
	
	self.rolloverOption = function( opt )
	{
		//opt.radio.addClass("mcq_radio_over");
	}
	
	self.rolloutOption = function( opt )
	{
		//opt.radio.removeClass("mcq_radio_over");
	}
	
	//	<settings optwidth="180" optionoffset="10" radiomode="true" randomise="false" />
	self.createSettings = function( oXML )
	{
		self.radiomode 		= Boolean( oXML.attr( "radiomode" ) == 'true' );
		self.randomise 		= Boolean( oXML.attr( "randomise" ) == 'true' );
		self.maxoptions = Number(  oXML.attr( "maxoptions" ) );
		self.requiredchoices = Number(  oXML.attr( "requiredchoices" ) );
		self.eventonanswer = oXML.attr( "eventonanswer" );
		self.autosubmit = Boolean( oXML.attr( "autosubmit" ) == 'true' );
		self.correctRemain = Boolean( oXML.attr( 'correctremain' ) == 'true' );
		
		if( oXML.attr( 'optwidth' ))
		{
			self.optionwidth = Number( oXML.attr( 'optwidth' )) ;
		}
		
		self.unlockOnIncorrect = true ;
	
		
		if( oXML.attr( "unlockOnIncorrect" ) )
		{
	
			self.unlockOnIncorrect = oXML.attr( "unlockOnIncorrect" ) === 'true' ;			
		}
		
		if( oXML.attr( "max_attempts" ))
		{
			self.maxAttempts = Number ( oXML.attr( "max_attempts" )) ;
		}
	
		
	}
	
	//	<option correct="false"><![CDATA[<p class="option" align="center">Agree</p>]]></option>
	self.option = function( oXML, id )
	{
		var opt_obj = this;
		opt_obj.oCustom 		= self;
		opt_obj.correct 		= Boolean( oXML.attr( "correct" ) == "true" );
		opt_obj.isCorrect	= false; // If the user answers correctly
		opt_obj.iPoints 		= Number( oXML.attr( "points" ) );
		
		if( isNaN( opt_obj.iPoints ))
		{
			opt_obj.iPoints = self.defaultPointsValue ;
		}
		
		opt_obj.id 			= id;
		opt_obj.event 			= oXML.attr( "event" );
		opt_obj.incorrectEvent 			= oXML.attr( "incorrectEvent" );
		opt_obj.option 	= $( '<div id="' + self.screen.id + '_mcq_option_' + id + '" class="option"></div>' );
		opt_obj.radio = $('<div class="radio"></div>');
		if( !self.radiomode )
		{
			opt_obj.radio.addClass( 'checkbox' );
		}
		opt_obj.option.append( opt_obj.radio );
		
		opt_obj.option_data = oXML.attr('data');
				
		var text = $(oXML.text());
		if( masterObj.bCheatMode && opt_obj.correct )
		{
			text.prepend( "* " );
		}
		
		opt_obj.option.append( text );
		
		opt_obj.option.oObj = opt_obj;
		
	}
	
	
	self.selectOption = function(id)
	{
		var opt = self.getOptionById( id );
		
		if( self.radiomode )
		{
			if(opt)
			{
				if(self.oSelectedOption)
				{
					self.setDeselected( self.oSelectedOption ) ;
				}
			
				self.oSelectedOption = opt;
				self.setSelected( opt ) ;
				
			}
		}
		else
		{
			if( opt.selected )
			{
				self.setDeselected( opt ) ;
			}
			else
			{
				if( self.maxoptions )
				{
					if( self.selectedoptions < self.maxoptions )
					{
						self.setSelected( opt ) ;
					}
				}
				else
				{
					self.setSelected( opt ) ;
				}
			}
			self.updateOptionCount(); 
		}
		
		self.checkEnableSubmit();

	}
	
	self.blurEvent = function()
	{
		//alert("OASIS"); 
		self.updateOptionDisplay(); 
	}
	
	
	self.setSelected = function( opt )
	{
		opt.selected = true;
		opt.option.addClass("selected");
		tweenTo(opt.option, 0, {className:'+=selected'});
	}
	
	self.setDeselected = function( opt )
	{
		opt.selected = false;
		tweenTo(opt.option, 0, {className:'-=selected'});
	}
	
	
	self.updateOptionCount = function()
	{
		self.selectedoptions = 0;
		for( var i = 0 ; i< self.optionArray.length; i++)
		{
			var opt = self.optionArray[ i ]
			if( opt.selected )
			{
				self.selectedoptions++
			}
			
		}

	}
	
	self.checkEnableSubmit = function()
	{
		var do_enable = false;
		var optionschosen = 0;
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
			
			if( opt.selected )
			{
				optionschosen++;
				do_enable = true;
			}
		}
		
		if(optionschosen < self.requiredchoices)
		{
			do_enable = false;
		}
		
		if(do_enable)
		{
			if( self.eventonanswer )
			{
				self.screen_view.doEventById( self.eventonanswer );
			}
			else
			{
				self.enableSubmit();
			}
		}
		else
		{
			self.disableSubmit();
		}
		
	}
	
	self.disableSubmit = function()
	{
		disableContentButton( self.submitBtn );
	}
	
	self.enableSubmit = function()
	{
		var submit_btn = self.submitBtn;
		
		self.attempted = true;
		
		self.screen.dispatcher.trigger( 'attempted' ) ;
		
		if( submit_btn )
		{
			enableContentButton( submit_btn );
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
	
	self.disableOptions = function()
	{
		
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
			
			disableElement( opt.option );
		}
	}
	
	self.enableOptions = function(forceReset)
	{
		
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
			if (!forceReset && (self.correctRemain && opt.isCorrect))
				continue;
			
			opt.isCorrect = false;
			enableElement( opt.option );
		}
	}
	
	
	
	self.submit = function()
	{
	
		self.disableOptions();
	
		self.screen.setAnswered( true ); 
		
		var correct_count = 0;
		var correct_choices = 0;
		var incorrect_choices = 0;
		
		var screen_points = 0;
		
		var selected_id = null
		var fbObj = null;
		
		var option_fb = null;
		var selected_option = null;	
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
		
			if( opt.correct )
			{
				correct_count++
				if( opt.selected )
				{
					correct_choices++
					opt.isCorrect = true;
					selected_id = opt.id;
					selected_option = opt;
					
				}
			}
			else
			{
				if( opt.selected )
				{
					incorrect_choices++;
					selected_id = opt.id;
					selected_option = opt;
				}
				//only show ticks if not assessed
				if( !self.screen.getScored() )
				{
					opt.tick = $('<div class="cross"></div>')
					opt.radio.append( opt.tick )
				}
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
		
		/*
		if( self.checkFeedback( selected_id ) )
		{
			feedback_id = selected_id
		}
		*/
		
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
		
		if( feedback_id != "fail_attempt" && self.showCorrectAnswersWithFeedback )
		{
			self.showTicks() ;
		}
		
		if (selected_option)
		{
			if ( devmode ) console.log( 'Log SET CHOSEN OPTION DATA '+ selected_option.option_data )
			if( self.screen.screenElementView )
			{
				if ( devmode ) console.log( 'Log SET CHOSEN OPTION %o', self.screen.screenElementView.model )
				if ( devmode ) console.log( 'Log SET CHOSEN OPTION DATA '+ selected_option.option_data )
				self.screen.screenElementView.model.chosen_option = selected_option.option_data;
			}
		}
		
		self.applyFeedback( feedback_id ) ;
		self.doClickById('submit')
		
		if( feedback_id != "fail_attempt" )
		{
			self.showMCQFeedback() ;
		}
		
		disableContentButton( self.submitBtn );
	
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
	}
	
	self.showMCQFeedback = function()
	{
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
		
			if( opt.selected )
			{
				self.doEventById( opt.id ) ;
				self.doEventById( opt.event ) ;
				
				if (!opt.correct)
				{
					self.doEventById( opt.incorrectEvent );
				}
			}
			else
			{
				if (opt.correct)
				{
					self.doEventById( opt.incorrectEvent );
				}				
			}
		}
	}
	
	self.forceReset = function()
	{
		self.attempts = 0;
		self.reset(true);
	}
	
	self.reset = function(forceReset)
	{
		self.removeFeedback();
		self.enableOptions(forceReset);
		self.hideTicks(forceReset) ;
		self.disableReset() ;
		self.doEventById('reset');
	}
	
	self.showTicks = function()
	{
		
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			
			var opt = self.optionArray[ i ];
			
			if( opt.correct )
			{
				opt.tick = $('<div class="tick"></div>')
				opt.option.addClass( 'correct' );
				opt.radio.append( opt.tick )
			}
		}
	}
	
	self.hideTicks  = function(forceReset)
	{
		for( var i = 0; i < self.optionArray.length; i++ )
		{
			var opt = self.optionArray[ i ];
			
			if( opt.tick )
			{
				opt.tick.remove()
			}
			if( opt.selected )
			{
				if (forceReset || !(self.correctRemain && opt.isCorrect))
				{
					self.setDeselected( opt ) ;
				}
			}
		}
	}
	
	self.getOptionById = function( id )
	{
		var rtn = getItemById( id, self.optionArray );
			
		return rtn;
	}
		
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		
		self.submitBtn = self.getScreenElementById( 'submitBtn' );
		self.resetBtn = self.getScreenElementById( 'resetBtn' );
		self.initOptions()
		self.enableOptions();
		
		if ( devmode ) console.log( 'Log MCQ LOADED' );
		self.super_screenLoaded();
	}
	
}
MCQ.prototype = ScreenView;