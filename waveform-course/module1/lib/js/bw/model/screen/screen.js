/**
* @author Andy Galletly
*/
function Screen(xml_node) 
{
	var self = this ;
	self.oXML = xml_node;
	
	self.ready = false;
	
	self.viewXML;
	self.id = self.oXML.attr("id");
	self.screenxml = self.oXML.attr("xml");
	self.desktopxml = self.screenxml;
	self.phonexml = self.screenxml;
	self.screentype = "text_graphic";
	self.class_name = '';
	
	self.label = null;
	
	self.reloading = false;
	
	self.dispatcher = $(document.createElement('div'));	
	self.dispatcher.attr('id', ('dispatcher_' + self.id ));
	
	self.scored = false;
	self.answered = false ;
	self.visited = false;
	self.completed = false;
	self.passed = false;
	self.is_showing = false;
	
	self.feedback_array = [];
	self.feedback_elements_array = [];
	
	self.view = null;
	self.templateView = null;
	
	self.screenVars = [];
	self.initVars = [] ;
	
	self.oTarget;
	
	self.setParameters = function()
	{
		if( self.oXML.attr("class") )
		{
			self.class_name = self.oXML.attr("class");
		}
		
		if( self.oXML.attr("type") )
		{
			self.screentype = self.oXML.attr("type");
		}
		else if( self.oXML.attr("src") )
		{
			self.screentype = self.oXML.attr("src");
		}
		
		if( self.oXML.attr("label") )
		{
			self.label = self.oXML.attr("label");
		}
		
		self.desktoptype = self.screentype;
		self.phonetype = self.screentype;
		
		if( self.oXML.attr("phonexml") )
		{
			self.phonexml = self.oXML.attr("phonexml");
			if( self.oXML.attr("phonetype") )
			{
				self.phonetype = self.oXML.attr("phonetype");
			}
			else
			{
				self.phonetype = self.screentype;
			}
		}
			
		if(self.oXML.attr("scored"))
		{
			self.setScored( Boolean( self.oXML.attr( 'scored' ) == 'true' ) );
		}
	}
	
	self.initScreen = function(targ, vars )
	{
		self.oTarget = targ;
		self.initVars = vars ;
		self.init( self.oTarget );
	}
	
	
	self.doClickById = function( id )
	{
		self.view.doClickById( id );
	}	
	
	self.reloadOnResize = function()
	{
		self.view.reloadOnResize();
	}
	
	self.reload = function()
	{
		self.reloading = true;
		self.kill();

		self.oTarget.empty();
		
		self.init ( self.oTarget );
		
	}
	
	self.init = function()
	{
		if(self.view)
		{
			// console.log("Screen obj " + self.view)
			self.view = null;
		}
		if( (self.phonexml != self.desktopxml) && _respondo.phone() )
		{
			self.screentype = self.phonetype;
		}
		else
		{
			self.screentype = self.desktoptype;
		}
		
		var screen_view_object = ScreenView
		var use_legacy_screentype = true;
		
		switch( self.screentype )
		{
			case 'choices_game': 
				screen_view_object = ChoicesGame;
				use_legacy_screentype = false;
				break;
			case 'mcq': 
				screen_view_object = MCQ;
				use_legacy_screentype = false;
				break;
			case 'column_sort': 
				screen_view_object = ColumnSort;
				use_legacy_screentype = false;
				break;
			case 'sliding_scale': 
				screen_view_object = SlidingScale;
				use_legacy_screentype = false;
				break;
			case 'score': 
				screen_view_object = ScoreScreen;
				use_legacy_screentype = false;
				break;
			case 'photostory': 
				screen_view_object = Photostory;
				use_legacy_screentype = false;
				break;
			case 'drag_drop': 
				screen_view_object = Drag_drop;
				use_legacy_screentype = false;
				break;
			case 'list_sort': 
				screen_view_object = List_sort;
				use_legacy_screentype = false;
				break;
			case 'mcq_graphical': 
				screen_view_object = Mcq_graphical;
				use_legacy_screentype = false;
				break;
			case 'parallax': 
				screen_view_object = Parallax;
				use_legacy_screentype = false;
				break;
			case 'wipe_reveal_h': 
				screen_view_object = Wipe_reveal_h;
				use_legacy_screentype = false;
				break;
			case 'text_graphic': 
				screen_view_object = Text_graphic;
				use_legacy_screentype = false;
				break;
			case 'glossary': 
				screen_view_object = Glossary;
				use_legacy_screentype = false;
				break;
				
			case 'scrollmanager': 
				screen_view_object = ScrollManager;
				use_legacy_screentype = false;
				break;		
											
			case 'multimcq': 
				screen_view_object = MultiMcq;
				use_legacy_screentype = false;
				break;		
								
			case 'resource_screen': 
				screen_view_object = ResourceScreen;
				use_legacy_screentype = false;
				break;		
								
			case 'resource_button': 
				screen_view_object = ResourceButton;
				use_legacy_screentype = false;
				break;										
			case 'resource_video': 
				screen_view_object = ResourceVideo;
				use_legacy_screentype = false;
				break;		
				
			case 'custom': 
				screen_view_object = Custom;
				use_legacy_screentype = false;
				break;
			default: screen_view_object = ScreenView;
			break;
		}
		
		self.view = new screen_view_object(this);
		
		// legacy support!
		if( use_legacy_screentype )
		{
			if ( devmode ) console.log( 'Log LEGACY SCREENTYPE ' + self.screentype )
			var screen_type_func = eval( self.screentype );
			self.templateView = new screen_type_func(this);
		}
		else
		{
			self.templateView = {};
		}
		
		self.loadXML();
	
	}
	
	self.screenSetupComplete = function()
	{
	//	if ( devmode ) console.log("Screen Setup Complete " + self.id) ;
		screenReady( self.type );
		self.setReady( true );
	}	
	
	self.screenCompleted = function()
	{
		self.setVisited( true );
		self.setCompleted( true );
		trackingObj.updateTracking() ;
	}
	
	self.screenLoaded = function()
	{
		self.screenSetupComplete();
		self.dispatcher.trigger( 'loaded' );
	}
	
	
	
	self.showing = function()
	{		
		
		var $holder_div = self.view.$div
		
		$holder_div.css( 'transform', 'none' );
		self.view.ready();
		self.is_showing = true;
		self.dispatcher.trigger('showing');
	}
	
	self.prepareToLeave = function(  )
	{
		if( self.view.getEventById( 'exit' ) )
		{
			self.view.doEventById( 'exit' ) ;
		}
		else
		{
			self.readyToLeave();
		}
	}
	
	self.readyToLeave = function()
	{
		if ( devmode ) console.trace( "READY TO LEAVE " + self.id );
		self.dispatcher.trigger( 'ready_to_leave' );
		self.dispatcher.unbind( 'ready_to_leave' );
		self.is_showing = false;
	}
	
	self.loadXML = function()
	{
		var xml_url = self.screenxml
		
		if( (self.phonexml != self.desktopxml) && _respondo.phone() )
		{
			xml_url = self.phonexml;
		}
		
		loadXML( xml_url, self.xmlReady);
	}
	
    self.xmlReady = function (data) 
	{
        self.viewXML = data;

		// this log weirdly breaks IE11 // Function.prototype.toString: 'this' is not a Function object
		//if ( devmode ) console.log(" self: %o",  self)
	
        self.view.initScreen(self.oTarget);
    }
	
	self.show = function()
	{		
		var $holder_div = self.view.$div
		tweenTo( $holder_div, 0, { x: 0, y: 0, autoAlpha:0 } );
		tweenTo( $holder_div , 0, { autoAlpha:1 , display:'block' , onComplete: self.showing} );
	}
	
	self.leaveCourse = function()
	{
		// console.log("leaveCourse");
		exitCourse();
	}

	self.closeGenericDialogue = function()
	{
		// console.log("closeGenericDialogue");
		closeDialogue();
	}	
	
	self.kill = function()
	{
		if( self.view )
		{
			self.view.kill();
		}
		self.dispatcher.unbind( 'ready' ) ;
		self.dispatcher.unbind( 'loaded' );
		self.dispatcher.unbind('showing');
		self.dispatcher.trigger( 'kill' );
		self.dispatcher.unbind( 'kill' );
	}
	
	self.enable = function()
	{
		if( self.view )
		{
			self.view.enable();
		}
	}
	
	self.disable = function()
	{
		self.view.disable();
	}
	
	self.checkOverrideNext = function()
	{
		try
		{
			if( self.view.checkOverrideNext() )
			{				
				return true ;
			}
			else
			{
				return false ;
			}
		}
		catch( e )
		{
			// 	Screentype with no override NEXT defined
			return false ;
		}
	}
	
	self.overrideNext = function()
	{
		self.view.overrideNext() ;
	}
	
	self.checkOverrideBack = function()
	{
		try
		{
			if( self.view.checkOverrideBack() )
			{				
				return true ;
			}
			else
			{
				return false ;
			}
		}
		catch( e )
		{
			//	Screentype with no override BACK defined
			return false ;
		}
	}
	
	self.overrideBack = function()
	{
		self.view.overrideBack() ;
	}
	
	self.pass = function(  )
	{
		if( self.getScored() )
		{
			self.setAnswered( true );
			self.setPassed( true );
		}
	}
	self.partial = function(  )
	{
		if( self.getScored() )
		{
			self.setAnswered( true );
			self.setPassed( false );
		}
	}
	self.fail = function(  )
	{
		if( self.getScored() )
		{
			self.setAnswered( true );
			self.setPassed( false );
		}
	}
	
	self.resetProperties = function()
	{
		self.setVisited( false );
		self.setCompleted( false );
		self.setAnswered( false );
		self.setPassed( false );
	}
	
	/* =============== GETS + SETS ================= */
	
	
	self.setCompleted = function( _val )
	{
		self.completed = Boolean( _val );
		if( self.completed )
		{
			self.dispatcher.trigger( 'completed' );
		}
	}
	
	self.getCompleted = function()
	{
		return self.completed;
	}
	
	self.setVisited = function( _val )
	{
		self.visited = Boolean( _val );
		if( self.visited )
		{
			self.dispatcher.trigger( 'visited' ) ;
		}
	}
	
	self.getVisited = function()
	{
		return self.visited;
	}
	
	self.setAnswered = function( _val )
	{

		// if ( devmode ) console.log( 'Log SET ANSWERED '+self.id+' ' + _val )
		self.answered = Boolean( _val );
		if( self.answered )
		{
			self.dispatcher.trigger( 'answered' ) ;
			self.setCompleted( true );
			//enableNext();
		}
	}
	self.getAnswered = function()
	{
		return self.answered;
	}
	
	self.setScored = function( _val )
	{
		self.scored = Boolean( _val );
	}
	self.getScored = function()
	{
		return self.scored;
	}
	
	self.getPassed = function()
	{
		return self.passed ;
	}	
	
	self.setPassed = function( _val )
	{
		self.passed = Boolean( _val ) ;
		if( self.passed ) {
			self.dispatcher.trigger( 'passed' ) ;
		} else {
			self.dispatcher.trigger( 'failed' ) ;
		}
	}
	
	self.setReady = function( _val )
	{
		var is_ready = Boolean( _val );
		if( is_ready )
		{		
			self.ready = is_ready;
			self.dispatcher.trigger( 'ready' ) ;
			if( self.reloading )
			{
				self.reloading = false;
				self.show();
			}
		}
	}
	
	self.getReady = function()
	{
		return self.ready;
	}
	
	self.getShowing = function()
	{
		return self.is_showing;
	}
	
	self.setVar = function( _id, _val )
	{
		var old_var = getItemById( _id, self.screenVars );
		if( !old_var ) 
		{
			self.screenVars.push( { id: _id, val: _val } );
		}
		else
		{
			if( old_var.val != _val )
			{
				old_var.oldval = old_var.val;
				old_var.val = _val;
			}
		}
	}

	self.getVar = function( id )
	{
		var rtn = null;
		var var_obj = getItemById( id, self.screenVars );
		if( var_obj )
		{
			rtn = var_obj.val
		}
		return rtn;
	}
	
	self.resetVar = function( id )
	{
		var var_obj = getItemById( id, self.screenVars );
		if( var_obj.oldval )
		{
			var_obj.val  = var_obj.oldval;
		}
	}
	
	self.resetVars = function( )
	{
		for( var i = 0; i < self.screenVars.length; i++ )
		{
			var var_obj = self.screenVars[ i ];
			self.resetVar( var_obj.id )
		}
	}
	
	self.setParameters();
}

