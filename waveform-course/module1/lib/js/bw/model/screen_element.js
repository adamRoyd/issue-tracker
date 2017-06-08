/**
* @author Andy Galletly
*/
function ScreenElement(xml_node, s)
{
	var self = this;
	self.screen = s;
	self.screen_view = self.screen.view;
	self.oXML = xml_node;
	self.xml = xml_node;
	self.id = $(self.xml).attr("id");
	self.bit = false;
	if( $(self.xml).attr("bit") )
	{
		self.bit = $(self.xml).attr("bit")
	}
		
	self.type = self.xml.nodeName;
	if(!self.type)
	{
		if ( devmode ) console.log( 'Log NO TYPE %o'  ,self.xml )
		self.type = self.xml[0].nodeName;
	}
	
	
	self.topicId = $(self.xml).attr("topicbtn");
	self.status_x = Number( $(self.xml).attr("status_x") );
	self.status_y = Number( $(self.xml).attr("status_y") );
	
	self.sTarget = $(self.xml).attr("target");
	
	self.event_id = null;
	
	self.height = null;
	self.width = null
	self.x = 0;
	self.y = 0;
	self.z = null;
	self.rotation = 0;
	self.draggable = false;
	
	self.animtype = "none";
	self.animtime = 0;
	self.animdelay = 0;
	self.animease = "Strong.easeOut"
	
	self.screensize = null;
	self.classname = '';
	
	self.tabbable = true;
	
	self.enabled = true;
	
	self.view = null;
	
	self.child_array = [];
	
	self.setParentHeight = null ;
	
	self.dispatcher = $(document.createElement('div'));	
	self.dispatcher.attr('id', ('dispatcher_' + self.id ));
	
	self.ready = false ;
	
	self.click_function = null;
	
	self.setup = function()
	{
		if($(self.xml).attr("setparentheight"))
		{
			
			self.setParentHeight = Boolean( $(self.xml).attr("setparentheight") == "true" ) ;
			if ( devmode ) console.log("setparentheight: " + self.setParentHeight ) ;
		}
		
		if($(self.xml).attr("height"))
		{
			// Assume a percentage and if not cast it as a number
			self.height = parseNumberString( $(self.xml).attr("height") );
			// if (self.height.indexOf("%") == -1) {
				// self.height = Number(self.height)
			// }
		}
		if($(self.xml).attr("width"))
		{
			self.width = parseNumberString( $(self.xml).attr("width") );
			// if (self.width.indexOf("%") == -1) {
				// self.width = Number(self.width)
			// }
		}
		if($(self.xml).attr("z"))
		{
			self.z = parseNumberString( $( self.xml ).attr( "z" ) );
		}
		if($(self.xml).attr("x"))
		{
			self.x = parseNumberString( $( self.xml ).attr( "x" ) );
		}
		if($(self.xml).attr("y"))
		{
			self.y = parseNumberString($(self.xml).attr("y"));
		}
		if($(self.xml).attr("position"))
		{
			self.position = $(self.xml).attr("position");
		}
		if($(self.xml).attr("rotation"))
		{
			self.rotation = parseNumberString($(self.xml).attr("rotation"));
		}
		if($(self.xml).attr("event"))
		{
			self.event_id = $(self.xml).attr("event");
		}
		if($(self.xml).attr("class"))
		{
			self.classname = $(self.xml).attr("class");
		}
		if($(self.xml).attr("draggable") != "false" )
		{
			self.draggable = $(self.xml).attr("draggable");
		}
		if($(self.xml).attr("tabbable") )
		{
			self.tabbable = $(self.xml).attr("tabbable");
		}
		
		if($(self.xml).attr("anim"))
		{
			self.animtype = $(self.xml).attr("anim");
		}
		if($(self.xml).attr("ease"))
		{
			self.animease = $(self.xml).attr("ease");
		}

		if($(self.xml).attr("animtime"))
		{
			self.animtime = Number($(self.xml).attr("animtime"));
		}

		if($(self.xml).attr("animdelay"))
		{
			self.animdelay = Number($(self.xml).attr("animdelay"));
		}

		if( $( self.xml ).attr( 'screensize' ) )
		{
			self.screensize = $( self.xml ).attr( 'screensize' );
		}


		if( $( self.xml ).attr( 'enabled' ) )
		{
			self.enabled = Boolean( $( self.xml ).attr( 'enabled' ) != 'false' );
		}
		
		
		
		
		switch( self.type )
		{
			//case 'text': self.view = new TextScreenElement(self);

			case "var": self.createVar();
				self.view = new ScreenElementView(self);
				break;
		
			case "screen": self.view = new SubScreenView( self );
				break;	
			case "dialogue": self.view = new SubDialogueView( self );
				break;
			case "text": self.view = new TextElementView( self );
				break;
			case "line": self.view = new LineElementView( self );
				break;
			case "pointer": self.view = new PointerElementView( self );
				break;
			case "box": self.view = new BoxElementView( self );
				break;
			case "screenlist": self.view = new ScreenListView( self );
				break;
			case "topicbutton": self.view = new TopicbuttonElementView( self );
				break;
			case "image": self.view = new ImageElementView( self );
				break;
			case "svg": self.view = new SvgElementView( self );
				break;
			case "status": self.view = new StatusElementView( self );
				break;
			case "button": self.view = new ButtonElementView( self );
				break;
			case "tabs": self.view = new TabsElementView( self );
				break;
			case "sliderreveal": self.view = new SliderRevealElementView( self );
				break;
			case "slidercontrol": self.view = new SliderControlElementView( self );
				break;
			case "edge": self.view = new EdgeView( self );
				break;			
			case "svganim": self.view = new SvgAnim( self );
				break;
			case "video": self.view = new VideoPlayerView( self );
				break;
			case "audio": self.view = new AudioPlayerView( self );
				break;
			case "score": self.view = new ScoreElementView( self );
				break;
			case "timer": self.view = new TimerView( self );
				break;
			case "timeline": self.view = new TimelineView( self );
				break;
			case "pagecounter": self.view = new PagecounterView( self );
				break;
			case "custom": self.view = new ScreenElementView( self );
				break;
			case "fb":
				// fall through
			case "feedback": self.screen_view.createFeedback( $( self.oXML ) );
				self.ready = true ;
				break;	
			case "wipes": 
				self.view = new WipesElementView( self );
				break;				
			default: self.view = new ScreenElementView(self);
		}
		
		
	}
	
	self.createVar = function()
	{
		self.screen.setVar( $( self.xml ).attr("id"), $( self.xml ).text() );
	}
	
	self.kill = function()
	{
		if( self.view )
		{
			self.view.kill()
			self.view = null;
		}
	}
	
	self.getChildren = function()
	{
		var rtn_array = [];
		
		for( var i = 0; i < self.child_array.length; i++ )
		{
			var childScreenElement = self.child_array[ i ];
			rtn_array.push( childScreenElement );
			rtn_array = rtn_array.concat( childScreenElement.getChildren() ) ;
		}
		
		
		return rtn_array;
	}
	
	self.getDiv = function()
	{
		if( self.view ){
			return self.view.$div;
		}
	}
	
	self.enable = function()
	{
		if( self.view )
		{
			self.view.enable();
		}
		else
		{
			if ( devmode ) console.warn( 'WARN: SCREEN ELEMENT HAS NO VIEW ' + self.id + ' - ' + self.type );
		}
		
	}
	
	self.doTween = function( settings )
	{
		if( !settings )
		{
			var settings = new Object();
			settings.delay 	= self.animdelay;
			settings.ease 	= self.animease;
			settings.type 	= self.animtype;
			settings.time 	= self.animtime;
		}
		self.view.doTween( settings )
	}
	
	self.applyFilters = function( filters )
	{
		self.view.applyFilters( filters );
	}
	
	self.disable = function()
	{
		disableElement(self.view.$div);
	}
	
	self.show = function()
	{
		self.view.doTween();
	}
	
	self.getReady = function()
	{
		return self.ready ;
	}
	
	self.setClickFunction = function()
	{
		
		var function_string = $( self.oXML ).attr( "func" ) ;
		
		var click_function = self.findFunc( function_string ) ; 
		
		if( click_function )
		{	
			self.click_function = click_function;
		}
	}
	
	self.findFunc = function( funcId )
	{
		var click_function = null;
		var func = null;
		
		var element_func = self[ funcId ] ;
		var element_view_func = self.view[ funcId ] ;
		var screen_view_func = self.screen.view[ funcId ];
		var screen_func = self.screen[ funcId ];
		
		var parent_screen_view_func = null;
		if( self.screen.parentScreenView )
		{
			parent_screen_view_func = self.screen.parentScreenView[ funcId ]
		}
		
		if( $.isFunction ( func ) )
		{
			click_function = function()
			{ 
				$.proxy( func, self.templateView )( ); 
			}
		}
		else if( $.isFunction ( element_view_func ) )
		{
			console.log("			ELEMENT VIEW FUNC FOUND!") ;
			console.log("				element_view_func: " + element_view_func) ;
			
			click_function = function()
			{ 
				$.proxy( element_view_func, self.view )( ); 
			}
		}
		else if( $.isFunction ( element_func ) )
		{
			click_function = function()
			{ 
				$.proxy( element_func, self.view )( ); 
			}
		}
		else if( $.isFunction ( screen_view_func ) )
		{
			click_function = function()
			{ 
				$.proxy( screen_view_func, self.view )( ); 
			}
		}
		else if( $.isFunction ( screen_func ) )
		{
			click_function = function()
			{ 
				$.proxy( screen_func, self.screen )( ); 
			}
		}
		else if( $.isFunction ( parent_screen_view_func ) )
		{
			click_function = function()
			{ 
				$.proxy( parent_screen_view_func, self.screen.parentScreenView )( ); 
			}
		}
		else
		{ 
			var globalfunc = eval( funcId );
			if ( $.isFunction ( globalfunc ) )
			{
				click_function = function()
				{
					globalfunc();
				}
			}
		}
		
		return click_function ;
	}
	
	self.setReady = function( arg )
	{
		self.setClickFunction();
		
		self.ready = arg;
	}
	
	
	
	self.setup();
	
	
}
