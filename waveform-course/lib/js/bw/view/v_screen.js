/**
* @author Andy Galletly
*/
function ScreenView(s)
{
	var self = this;
	self.screen = s;
	self.id = self.screen.id ;
	self.oXML;
	self.eventsXml;
	self.arScreenElements = [];
	self.arAllScreenElements = [];
	self.courseHolder = $('#courseholder');
	self.$div = null;
	self.screenTarget;
	self.arImageElements = [];
	self.arEvents = [];
	self.assEvents = {};
	self.arTriggers = [] ;
	self.feedback_array = [];
	self.feedback_elements_array = [];
	
	self.custom_element;
	
	self.tween_array = []

	self.preloader = new Preloader( self.screen );
	
	
	// final load test
	self.allLoadTestsPassed = false ;
	
	self.reload_on_resize = false;
	if( self.screen.phonexml != self.screen.desktopxml )
	{
		self.reload_on_resize = true;
	}

	if( self.screen.reload_on_resize )
	{
		self.reload_on_resize = true;
	}
	self.complete_on_load = true;
	
	self.initScreen = function(t)
	{
		self.screen.setVisited( true );
		self.arScreenElements = [];
		self.arAllScreenElements = [];
		self.arImageElements = [];
		self.arEvents = [];
		self.assEvents = {};
		self.arTriggers = [] ;
		self.feedback_array = [];
		self.feedback_elements_array = [];
	
	    self.screenTarget = t;
	 
	    self.$div = $('<div />');
		self.$div.attr( 'id', 'screenHolder_' + self.screen.id );
		self.$div.addClass( 'screenHolder' );
		self.$div.addClass( self.screen.screentype );
		self.$div.addClass( 'topic' + self.screen.topicId );
		self.$div.addClass( 'screen' + self.screen.id );
		self.$div.addClass( self.screen.type + 'screen' );
		
	    $(self.screenTarget).append(self.$div);
		tweenTo(self.$div, 0, {autoAlpha:0, display:'none'});
	    
		self.$div.css('height', '100%');
		self.$div.css('width', '100%');
	    
		self.allScreenElementsReady = false ;
		self.allImagesLoaded = false ;
		
		self.oXML = self.screen.viewXML;
		
		
		
		if( self.reload_on_resize )
		{
			_respondo.dispatcher.unbind( 'updateSize' , self.reload );
			_respondo.dispatcher.bind( 'updateSize' , self.reload );
		}
		
		self.init_screen_element_xml = $(self.oXML).children()[0]
		
		

		if( $(self.oXML).children()[0].nodeName != 'data' )
		{
			self.init_screen_element_xml = $(self.oXML);
		}
		
		self.initScreenElements()
		
		TweenMax.delayedCall( 0.1, self.preloadImages );
		
	}
	
	self.initScreenElements = function()
	{
		self.arScreenElements = self.createScreenElements( self.init_screen_element_xml );
	}
	
	self.reloadOnResize = function()
	{
		if( !self.reload_on_resize )
		{
			self.reload_on_resize = true;
			_respondo.dispatcher.unbind( 'updateSize' , self.reload );
			_respondo.dispatcher.bind( 'updateSize' , self.reload );
		}
	}
	
	self.reload = function()
	{
		self.screen.reload()
	}
	
	self.kill = function()
	{
		for( var i = 0; i < self.tween_array.length; i++ )
		{
			var tween = self.tween_array[ i ];
			tween.kill();
		}
		self.preloader.dispatcher.unbind( 'loaded' );
		self.preloader.kill();
		_respondo.dispatcher.unbind( 'updateSize' , self.reload );
		for(var i = 0; i<self.arAllScreenElements.length; i++)
		{
			var elm_obj = self.arAllScreenElements[i];
			elm_obj.kill();
		}
		self.arAllScreenElements = [];
		
		if( self.screen.templateView.kill )
		{
			self.screen.templateView.kill()
		}
			
		if( self.$div )
		{
			if( self.$div.length>0 )
			{
				self.$div.empty().remove();
			}
		}
		//self.screen.kill();
	}
	
	self.preloadImages = function()
	{
		self.preloader.dispatcher.bind( 'loaded', function()
													{
														self.allImagesLoaded = true ;
														self.testReady() ;														
													});
														
		self.preloader.loadImageArray( self.arImageElements );
		
	}
	
	self.allImagesLoaded = function()
	{	
	//	alert("ALL IMAGES LOADED") ;
		tweenTo( self.$div, 0, { delay:0, autoAlpha:0, display:'block' } );
		self.screenLoaded();
	}
	
	self.createScreenElements = function(xml)
	{
		var scrn_obj = self.screen;
	    var scr_elements = new Array();
	    $(xml).children().each(function () 
		{
			switch( this.nodeName )
			{
				case 'settings': 
					self.createScreenSettings(this);
					break;
				case 'events': 
					self.createEvents(this);
					break;
				// case "custom": 
					// self.custom( this )
				// break;
				default: 
					var oElement  = null;
					
					
					
					if( this.nodeName == 'custom' )
					{
						// legacy compatibility!
						// to be removed
						if( self.screen.templateView.custom )
						{
							oElement = self.createScreenElement(this);
							//self.screen.templateView.custom( oElement );
						}
						else
						{
							oElement = self.custom( this );
							
						}
					}
					else
					{
						oElement = self.createScreenElement(this);
					}
					
					scr_elements.push(oElement);
				
					scr_elements = scr_elements.concat( oElement.getChildren() );
				break;
			}
			
	    })
	    
		if( self.screen.scored )
		{
			self.complete_on_load = false;
		}
	    
	    self.attachScreenElements(scr_elements)
	    	
		return scr_elements;
	}
	
	self.screenElementReady = function()
	{
		// if all screen elms are ready,  ;
		
		//if ( devmode ) console.log( 'ScreenElementReady! : ' + self.arAllScreenElements.length )
		
		// prevents repeat
		if( !self.allLoadTestsPassed )
		{
			var allReady = true ;
			for( var i = 0; i < self.arAllScreenElements.length; i++ )
			{
				var elm = self.arAllScreenElements[ i ];
				//if ( devmode ) console.log( i + 'Log elm ' + elm.id + ' REAADY -- ' + elm.getReady() )
				if( !elm.getReady())
				{
					allReady = false ;
					break;
				}
			}		
			
			if( allReady )
			{
				self.allScreenElementsReady = true ;
				self.testReady() ;
			}
			else
			{
				self.allScreenElementsReady = false ;
			}
		}
		
		// else sit tight
	}
	
	self.testReady = function() 
	{
		/*
		if ( devmode ) console.log( 'v screen test ready called..' )
		if ( devmode ) console.log( 'self.allScreenElementsReady: ' + self.allScreenElementsReady  )
		if ( devmode ) console.log( 'self.allImagesLoaded: ' + self.allImagesLoaded  )
		*/
		if( self.allScreenElementsReady && self.allImagesLoaded )
		{
			if ( devmode ) console.log("ALL GOOD - proceed to screeLoaded") ;
			//tweenTo( self.$div, 0, { delay:0, autoAlpha:0, display:'block' } );
			
			if( !self.allLoadTestsPassed )
			{
				self.allLoadTestsPassed = true ;
				self.screenLoaded();
			}
		}
		else
		{
			//console.log("NOT YET - wait to screeLoaded") ;
		}
	}
	
	
	
	self.createScreenSettings = function( settings_xml )
	{
		self.complete_on_load = Boolean( $(settings_xml).attr( 'autocomplete' ) != 'false' );
		self.reload_on_resize = Boolean( $(settings_xml).attr( 'resizereload' ) == 'true' );
		
		
		if( self.reload_on_resize )
		{
			_respondo.dispatcher.unbind( 'updateSize' , self.reload );
			_respondo.dispatcher.bind( 'updateSize' , self.reload );
		}
	}
	
	self.createEvents = function( events_xml )
	{
		self.eventsXml = events_xml;
		self.arEvents = [];
		self.assEvents = {};
		self.arTriggers = [] ;
		// if ( devmode ) console.log( "create events: "+events_xml )
	
		var eventNodes = $(events_xml).children();
		
		for(var i=0; i<eventNodes.length; i++)
		{
			
			var evtxml = eventNodes[i];
			
			var eventType = evtxml.nodeName ;
			
			switch( eventType )
			{
				case "event":
					var evt_obj = new ScreenEvent(evtxml, self)
					self.arEvents.push( evt_obj );
					self.assEvents[ evt_obj.id ] = evt_obj ;
					evt_obj.setup();
				break ;
				
				case "trigger":
					var trig_obj = new TriggerEvent(evtxml, self)
					self.arTriggers.push( trig_obj );
					trig_obj.setup();
				break ;
				
				case "sequence":
					var evt_obj = new SequenceEvent(evtxml, self)
					self.arEvents.push( evt_obj );
					evt_obj.setup();
				break ;
				
				default:
					if ( devmode ) console.warn("* * * UNKOWN EVENT TYPE REQUESTED: " + eventType ) ;
				break ;
			}
		}
	}
	
	self.custom = function( custom_xml )
	{
		self.custom_element = self.createScreenElement( $( custom_xml ) );	

		return self.custom_element;
	}
	
	
	
	self.createScreenElement = function(xml_node)
	{
		if( ! $(xml_node).attr('id') )
		{
			$(xml_node).attr('id', 'element' + self.arAllScreenElements.length )
		}
		
		var element_object = new ScreenElement(xml_node, self.screen);
		self.arAllScreenElements.push(element_object);
		if( element_object.view )
		{
			element_object.view.createElement();
		}
		else
		{
			if ( devmode ) console.log( 'Log element_object has no view ' + element_object.id + ' : ' + element_object.type )
		}
		return element_object;
	}
	
	self.attachScreenElements = function(arr)
	{
	    
	    for (var i=0; i<arr.length; i++)
	    {
			var element_object = arr[i];
			if( element_object.view )
			{

				// NOTE: This was to force double tap elements on a page to roll out. This is now handled within the resource screen.
				// if (element_object.view.clickable())
				// {
					// element_object.dispatcher.bind('rollover', self.onElementRollover);
				// }
				
				element_object.view.attachToScreen();
			}
	    }
		
		
	}
	
	self.onElementRollover = function ( evt, elm )
	{
		for (var i=0; i < self.arAllScreenElements.length; i++)
		{
			var oElement =  self.arAllScreenElements[i];
			if( oElement != elm && oElement.view.isOver )
			{
				oElement.view.rollout();
			}
	    }		
	}
	
	self.tweenScreenElements = function( arr )
	{
		var elements = arr;
		
		if( !arr )
		{
			elements = self.arAllScreenElements;
		}
		
		for (var i=0; i< elements.length; i++)
		{
			var oElement =  elements[i];
			if( oElement.view )
			{
				oElement.doTween();
			}
	    }
	}
	
	self.removeFromArray = function(elm_obj)
	{
		for( i in self.arAllScreenElements )
		{
			if( self.arAllScreenElements[i] == elm_obj )
			{
				self.arAllScreenElements.splice( i, 1 );
				break;
			}
		}
		
	}
	
	
	self.bookmarkResume = function()
	{
		// console.log("bookmarkResume");
		bookmarkResume()
	}

	self.bookmarkMenu = function()
	{
		// console.log("bookmarkMenu");
		bookmarkMenu();
	}
	
	self.screenLoaded = function()
	{
		// legacy !
		if( self.screen.templateView.screenElementsReady )
		{
			self.screen.templateView.screenElementsReady();
		}
		self.screen.screenLoaded();
		
	}
	
	self.ready = function()
	{
		
		self.tweenScreenElements();
		
		if( self.complete_on_load )
		{
			self.screen.screenCompleted();
		}
		
		TweenMax.delayedCall(0, self.initEvent);
	}
	
	self.doEvents = function(evt, type, target)
	{
		if( evt )
		{
			var events_arr = evt.split(",");
			
			if( type == null )
			{
				type = "click" ;
			}
			
			if(type=="over")
			{
			}
			if(type=="out")
			{
			}
			
			if(type=="click")
			{
				for(var i=0; i<events_arr.length; i++)
				{
					self.doEventById(events_arr[i], type, target);
					
				}
			}
			else
			{
				self.doEventById(events_arr[events_arr.length-1], type, target);
			}
		}
	}
	
	self.doClickById = function( id, item )
	{
		if(id)
		{
			if( !item )
			{
				self.doEvents( id, 'click' );
			}
			else
			{
				self.doEvents( id, 'click', item );
			}
		}
	}
	
	self.getEventById = function( id )
	{
		var rtn = null;
		for(var i=0; i<self.arEvents.length; i++)
		{
			var evt = self.arEvents[i];
			if( evt.id == id )
			{
				rtn = evt;
			}
		}
		return rtn
	}
	
	self.doEventById = function(id, type, target)
	{
		for(var i=0; i<self.arEvents.length; i++)
		{
			var evt = self.arEvents[i];
			
			var activate = true
			
			//if ( devmode ) console.log( 'Log EVENT '+evt.id+' SCREENSIZE ' + evt.screensize + ' : ' + _respondo.screen_type )
			if( evt.screensize )
			{
				//if ( devmode ) console.log( 'Log EVENT SCREENSIZE ' + evt.screensize + ' : ' + _respondo.screen_type )
				if( evt.screensize!=_respondo.screen_size )
				{
					activate = false;
				}
			}
			if( activate )
			{
				if(id == evt.id)
				{				
					switch(type)
					{
						case "over": evt.over(target);
							break;
						case "out": evt.out(target);
							break;
						case "click": evt.click(target);
							break;
						default: evt.click(target);
							type = 'click';
							break;
					}
				}
			}
		}
		
		// check trigz
		if( type == 'click' )
		{
			self.checkTriggers( id ) ;
		}
	}

	self.checkTriggers = function( eventId )
	{
		for( var i = 0; i < self.arTriggers.length; i++ )
		{
			var trig = self.arTriggers[ i ] ;		
			
			if( trig.allComplete() && trig.containsEvent( eventId ))
			{
				trig.activate(  );
			}
		}
	}
	
	self.initEvent = function()
	{
		if( !self.initEventCalled )
		{
			self.initEventCalled = true ;
			self.doClickById('init');
		}		
		
		if( $('.in-topic').length )
		{
			self.doClickById('in_topic');
		}
		else
		{
			self.doClickById('in_menu');
		}
		
	}
	
	
	self.createFeedback = function( fb_xml )
	{
		var feedback_obj = {};
		feedback_obj.id = fb_xml.attr( "id" );
		feedback_obj.fb_xml = fb_xml;
		feedback_obj.event = fb_xml.attr( "event" );
		self.feedback_array.push( feedback_obj );
	}
		
	self.getFeedbackById = function( id )
	{
		
		var rtn = getItemById( id, self.feedback_array );
		
		if( !rtn )
		{
			for( var i = 0; i < self.feedback_array.length; i++ )
			{
				var feedback_object = self.feedback_array[ i ];
				var fb_id_array = String( feedback_object.id ).split( ',' );
				if( fb_id_array.length > 1 )
				{
					for( var j = 0; j < fb_id_array.length; j++ )
					{
						var item = fb_id_array[ j ];
						if( item == id )
						{
							rtn = feedback_object;
							break;
						}
					}
					
					if( rtn )
					{
						break;
					}
				}
			}
		}
		return rtn;
	}
	
	self.checkFeedback = function( id )
	{
		var fb = self.getFeedbackById( id );
		var rtn = false;
		if(fb)
		{
			rtn = true;
		}
		return rtn;
	}
	
	self.applyFeedback = function( id )
	{
		var fbObj = null;
		switch( id )
		{
			case "pass":
				fbObj = self.getFeedbackById( "pass" );				
			break ;
		
			case "fail":
				fbObj = self.getFeedbackById( "fail" );				
			break ;
		
			case "partial":
				fbObj = self.getFeedbackById( "partial" );
				if( !fbObj )
				{
					fbObj = self.getFeedbackById( "fail" );
				}				
			break ;
		}
		
		if( !fbObj )
		{
			fbObj = self.getFeedbackById( id );
		}
		
		self.doEventById( id ) ;
		
		
		if( fbObj )
		{
			self.feedback_elements_array = [];
			self.feedback_elements_array = self.createScreenElements( fbObj.fb_xml );
			
			
			// if a child is a box, add its children to the fb array
			// this will currently only return the first level of box children
			var allChildElementsArray = [ ] ; 
			for( var i = 0; i < self.feedback_elements_array.length; i++ )
			{
				var item = self.feedback_elements_array[ i ];
				allChildElementsArray.push( item ) ;
				
				for( var j = 0; j < item.view.childElementArray.length; j++ )
				{
					var element = item.view.childElementArray[ j ];		
					allChildElementsArray.push( element ) ;
				}				
			}
			
			TweenMax.delayedCall(0.1, function() { self.tweenScreenElements( allChildElementsArray ); } );

			if( fbObj.event )
			{
				self.doClickById( fbObj.event ) ;
			}

			if( _respondo.phone() )
			{
				var fb_element = self.getScreenElementById( 'fb' );
				if( fb_element )
				{
					scrollToDiv( fb_element.getDiv() )
				}
			}
		}
	}
	
	self.removeFeedback = function()	
	{
		for( var i = 0; i < self.feedback_elements_array.length; i++ )
		{
			var item = self.feedback_elements_array[ i ];
			item.view.removeFromScreen();
		}
	}
	
	self.removeScreen = function()
	{
		if( self.$div )
		{
			
			self.kill()
			var holderdiv = self.$div;
			if( self.screen.templateView.killScreen )
			{
				self.screen.templateView.killScreen()
			}
			// if ( devmode ) console.log("removeScreen "+holderdiv);
			self.$div.empty().remove();
			self.$div = null;
		}
	}
	
	self.getScreenElementById = function(id)
	{
		//self.arScreenElements
		var elm = null;
		for(var i = 0; i<self.arAllScreenElements.length; i++)
		{
			var elm_obj = self.arAllScreenElements[i];
			if(elm_obj.id == id)
			{
				elm = elm_obj;
				break;
			}
		}
		
		// if( ( !elm ) && self.screen.parentScreenView )
		// {
			// elm = self.screen.parentScreenView.getScreenElementById( id );
		// }
		
		return elm;
	}
	
	self.removeScreenElementById = function(id)
	{
		// if ( devmode ) console.log("getScreenElementById "+id)
		//self.arScreenElements
		var new_array = [];
		
		for(var i = 0; i<self.arAllScreenElements.length; i++)
		{
			var elm_obj = self.arAllScreenElements[i];
			// if ( devmode ) console.log("CHECK ELEMENT "+elm_obj.id+" - "+id);
			if(elm_obj.id == id)
			{
				elm_obj.getDiv().empty().remove();
			}
			else
			{
				new_array.push( elm_obj );
			}
		}
		
		self.arAllScreenElements = new_array;
		
	}
		
	self.enableButton = function(btn_name)
	{
		var btn = self.getScreenElementById(btn_name);
		
		// console.log("ENABEL BUTTON "+btn)
		btn.view.$content.attr('disabled', false);
		tweenTo( btn.getDiv(), 0.3, {autoAlpha:1} );
	}
	
	self.disableButton = function(btn_name)
	{
		var btn = self.getScreenElementById(btn_name);
		btn.view.$content.attr('disabled', true);
		tweenTo( btn.getDiv(), 0.3, {autoAlpha:0.5} );
	}
	
	self.disable = function()
	{
		
		self.$div.addClass( 'disabled' );
		
		if( self.screen.templateView.disable )
		{
			self.screen.templateView.disable()
		}
	}
	
	self.enable = function()
	{
		if( self.$div )
		{
			self.$div.removeClass( 'disabled' );
		
		
			if( self.screen.templateView.enable )
			{
				self.screen.templateView.enable()
			}
		}
	}
	
}
