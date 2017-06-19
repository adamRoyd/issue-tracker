/**
* @author Andy Galletly
*/
function ScreenElementView(m)
{
	var self = this
	/* this line confirms m as an object, fixing a bug encountered on the ipad */
	self.screen_id = m.id; 
	
	self.model = m;
	self.id = self.model.id;
	self.idprefix = 'element_'+self.model.screen.id + "_";
	self.$div = $('<div>');
	self.$div.addClass( 'screenElement' );
	self.$div.attr('id', self.idprefix + self.model.id);
	
	self.$content = $( '<div />' );
	self.$contentHolder;
	self.screen = self.model.screen;
	self.templateView = self.screen.templateView;
	self.screen_view = self.screen.view;
	self.resizeListen = false;
	
	self.xml_node = $( self.model.xml );
	
	self.childElementArray = []; 
	
	self.event_sequence_index = 0;
	self.event_sequence = null;
	if( self.xml_node.attr('sequence') )
	{
		self.event_sequence = self.xml_node.attr('sequence').split(',');
	}
	
	self.createElement = function()
	{
		self.$contentHolder = self.screen_view.$div;
		
		
		if(self.model.sTarget)
		{
			var targetElement = self.screen_view.getScreenElementById( self.model.sTarget );
			// console.log("TARGET "+self.model.sTarget+" - "+targetElement);
			
			if( !targetElement )
			{
				self.$contentHolder = $( "#" + self.model.sTarget );
			}
			else
			{
				self.$contentHolder = targetElement.view.$div;
			}
		}
		
		self.$div.model = self.model;
		self.$div.view = self;
		
		self.setInlineStyles();
		
		if( self.model.rotation )
		{
			tweenTo( self.$div, 0, { rotation: self.model.rotation } )
		}
		
		if( self.model.draggable )
		{
			var bound_div = self.screen_view.$div;
			if( self.model.draggable != "true" )
			{
				
				
				var boundsElement = self.screen_view.getScreenElementById( self.model.draggable ) ;
								
				if( boundsElement )
				{
					bound_div = boundsElement.view.$div;
				}
				else
				{
					bound_div = $( "#" + self.model.draggable ) ;
				}
			}
			self.oDraggable = 	Draggable.create(self.$div, {
				edgeResistance:1,
				type:"left,top",
				bounds : bound_div,
				throwProps:true,
				throwResistance: 1
			} );
		
		}
				
			
		// very handy for IE8 :after css (use .after instead)
		if( self.$div.find( '> .after' ).length<1 )
		{
			self.$div.append( '<div class="after"></div>');
		}
		
		self.$div.addClass( 'screenElement' );
		
		if(!self.model.type)
		{
			self.$div.addClass( 'custom' );
		}
		self.$div.addClass( self.model.type );
		self.$div.addClass( self.model.id );
		if( !self.model.enabled )
		{
			self.$div.addClass( 'disabled' );
		}
		
		if( self.model.classname )
		{
			self.$div.addClass( self.model.classname )
		}
		
		if( self.model.screensize )
		{
			self.resizeListen = true;
		}
		
		
		self.setContent();

		self.screenSizeUpdate()
		
		if(self.model.sFilters)
		{
			self.applyFilters( self.model.sFilters );
		}
		
		self.$div.find(':last-child').addClass('last-child');
				
		if( self.model.bit && masterObj.bDevMode )
		{
			self.$div.append( self.createBitButton( self.model.bit ) );
		}
		
	}
	
	self.appendChildren = function( xml_node )
	{
		
		var boxchildren = xml_node.children();
		for(var i = 0; i<boxchildren.length; i++)
		{
			var node = $(boxchildren[i])
			
			// console.log( "set target " + self.model.id )
			
			if( !node.attr( 'target' ) )
			{
				node.attr( 'target', self.model.id );
			}
			if( !node.attr( 'id' ) )
			{
				node.attr( 'id', self.model.id + "_item" + i );
			}
		}
		self.model.child_array = self.screen_view.createScreenElements( xml_node )
	}
	
	self.update = function(  )
	{
		if ( devmode ) console.log( 'Log UPDATE ' + self.model.id )
		self.setContent();	
	}
	
	self.attachToScreen = function()
	{

		//	if ( devmode ) console.log( 'Log attachToScreen %O', self.$contentHolder  )
		
		if( self.model.animtype != "none" )
		{
			tweenTo(self.$div, 0, {alpha:0})
		}
		self.$contentHolder.append(self.$div);
		if( self.model.screensize )
		{
			self.screenSizeUpdate();
		}
	}
	
	self.testScreenSize = function()
	{
		var matchSize = false;
		if( self.model.screensize )
		{
			if ( devmode ) console.log( 'Log '+self.model.id+' testScreenSize ' + _respondo.screen_type + '  ' + self.model.screensize )
			if( _respondo.desktop() && ( self.model.screensize.indexOf( 'desktop' ) > -1 ) )
			{
				matchSize = true;
			}
			if( _respondo.phone() && ( self.model.screensize.indexOf( 'phone' ) > -1 ) )
			{
				matchSize = true;
			}
		}
		else
		{
			matchSize = true;
		}
		return matchSize;
	}
	
	self.screenSizeUpdate = function()
	{
		if(_respondo.ready())
		{
			if( self.model.screensize )
			{
				if( self.testScreenSize() )
				{
					if( self.contents )
					{
						self.$div.append( self.contents );
						self.contents = null;
					}
				}
				else
				{
					self.contents = self.$div.contents();
					self.$div.empty();
				}
				
				
				
			}
			self.setInlineStyles();
		}
	}
	
	self.setInlineStyles = function()
	{
		if(_respondo.ready())
		{
			if( _respondo.phone() )
			{
				self.$div.css('left', '');
				self.$div.css('top', '');
				self.$div.css('width', '');
				self.$div.css('height', '');
			}
			else
			{
				
				if( self.model.z )
				{
					//self.stylestring += "z-index:" + self.model.z + ";";
					self.$div.css( 'zIndex', self.model.z );
				}
				if( self.model.x )
				{
					//self.stylestring += "left:" + self.model.x + "px;";
					self.$div.css('left', self.model.x);
				}
				if( self.model.y )
				{
					//self.stylestring += "top:" + self.model.y + "px;";
					self.$div.css('top', self.model.y);
				}
				if(self.model.width)
				{
					//self.stylestring += "width:" + self.model.width + "px;";
					self.$div.css('width', self.model.width);
				}
				
				if(self.model.height)
				{
					//self.stylestring += "height:" + self.model.height + "px;";
					self.$div.css('height', self.model.height);
				}
		
			}
		}
	}
	
	self.createBitButton = function( id )
	{
		if( id=='true' )
		{
			id = self.model.id;
		}
		var $button = $( '<button type="button" class="bitbutton" title="SCREEN: ' + id + '">BIT ' + id + '</button>' );
		$button.data( 'id', id );
		$button.click( 
			function()
			{ 
				masterObj.openBit( $(this).data('id') ) 
			} 
		);
		return $button;
	}
	
	self.doTween = function( settings_obj )
	{
		//self.model.screen.view.doTween( self.model, settings );
		
		var scrn_elm = self.model;
		var animtime = settings_obj.time
		var item = self.$div
		
		
		var twnObj = new Object();
		twnObj.delay = settings_obj.delay;
		twnObj.ease = settings_obj.ease;
		
		// console.log("DO TWEEN "+scrn_elm.id + " > " + settings_obj.type);
		
		//item.css('display', 'block');
		twnObj.display = 'block';
		
		switch(settings_obj.type)
		{
			case "alpha": 
				twnObj.autoAlpha = 1;
				break;
			case "alphaout": 
				twnObj.autoAlpha = 0;
				twnObj.display = 'none';
				break;
			case "top": 
				tweenTo( item, 0, { top:0-100 } );
				twnObj.autoAlpha = 1;
				twnObj.top = scrn_elm.y;
				break;
			case "right": tweenTo( item, 0, { left: 1014 } );
				twnObj.autoAlpha = 1;
				twnObj.left = scrn_elm.x;
				break;
			case "rightout": tweenTo( item, 0, { right: 0 } );
				twnObj.autoAlpha = 0;
				twnObj.left = -100;
				break;
			case "bottom": 
				tweenTo( item, 0, { top:650 } );
				twnObj.autoAlpha = 1;
				twnObj.top = scrn_elm.y;
				break;
			case "left": tweenTo( item, 0, { left:0-item.width() } );
				twnObj.autoAlpha = 1;
				twnObj.left = scrn_elm.x;
				break;
			case "hidden":
				twnObj.autoAlpha = 0;
				twnObj.delay = 0;
				animtime = 0;
				twnObj.display = 'none';
				break;
			case "none": 
			default:
				twnObj.autoAlpha = 1;
				twnObj.delay = 0;
				animtime = 0;
				break;
		}
		

		twnObj.onComplete = function()
		{
//			if ( devmode ) console.log( 'Log TWEEN COMPLETE - ENABLE ' + self.model.id + ' - ' + self.model.enabled )
			if( self.model.view )
			{
				if( self.model.enabled )
				{
					self.model.enable(); 
				}
			}
		};
		
		_respondo.dispatcher.unbind( 'updateSize', self.screenSizeUpdate );
		
		// if( self.resizeListen )
		// {
			_respondo.dispatcher.bind( 'updateSize' , self.screenSizeUpdate );
			self.screenSizeUpdate();
		//}

		self.activetween = tweenTo( item, animtime, twnObj );
		
		
	}
	
	self.applyFilters  = function( sFilters )
	{
		self.$div;
		if(!sFilters)
		{
			var sFilters = self.model.sFilters;
		}
		if( sFilters )
		{
			var filter_array =  sFilters.split("|");
			
			for(var i = 0; i<filter_array.length; i++)
			{
				var filter = filter_array[i];
				var filtertype = filter.split("_")[0].toLowerCase();
				var filtersettings = filter.split("_")[1];
				
				switch ( filtertype )
				{
			
					case "swapimage": self.swapImage( self.$div, filtersettings );
						break;
					case "css": self.$div.addClass( filtersettings );
						break;
					case "cssremove": self.$div.removeClass( filtersettings );
						break;
					default : self.$div.addClass( sFilters );
						break;					
				}				
			}
		}
	}
	
	self.clickable = function()
	{
		return Boolean( self.model.event_id || self.model.click_function || self.event_sequence )
	}
	
	self.enable = function(  )
	{
	
		//if ( devmode ) console.log("Enable "+self.id + " with event name: " + self.event_id)
		
		if( self.clickable() )
		{
			self.model.enabled = true;

			self.$div.removeClass( 'disabled' )


			if(!self.$div.data('btn'))
			{
				
				applyClick(
					self.$div,
					self.click,
					self.rollover,
					self.rollout
				);
				
				if (self.model.initDisabled == "true") 
				{
					self.model.disable();
				}
				else
				{
					self.rollout();
				}
			}
			else
			{
				enableElement(self.$div);
				self.screen_view.doEvents(self.model.event_id, "out", self.model);
			}
		}
		
		if( self.model.setParentHeight )			
		{
			self.$contentHolder.model.height = self.getDiv().outerHeight() ;
			self.$contentHolder.model.getDiv().css( 'height', self.view.$contentHolder.model.height ) ;
		}
	};
	
	self.sequenceIndex = function( index )
	{
		self.event_sequence_index = Number( index )
		var event_id = self.event_sequence[ self.event_sequence_index ];
		self.event_sequence_index++;
		if( self.event_sequence_index > self.event_sequence.length-1 )
		{
			self.event_sequence_index = 0;
		}
		self.screen_view.doEvents(event_id, "click", self.model);
	}
	
	self.resetSequence = function()
	{
		self.event_sequence_index = 0;
	};
	
	self.click = function()
	{
		if(self.model.enabled)
		{
			if (self.model.doubleTap && !self.isOver)
			{
				self.rollover();
				return;
			}
			
			self.$div.addClass('visited');

			self.model.dispatcher.trigger('click');
			
			if( self.model.toggleEvents )
			{
				self.toggle();
			}
			else
			{
				self.screen_view.doEvents(self.model.event_id, "click", self.model);
			}
			
			if( self.model.click_function )
			{
				self.model.click_function();
			}
			
			if( self.event_sequence )
			{
				self.sequenceIndex( self.event_sequence_index );
			}
			
		}
	};
	self.isOver = false;
	self.rollover = function()
	{
		if(self.model.enabled && !self.isOver)
		{
			self.isOver = true;
			self.model.dispatcher.trigger('rollover', [self.model]);
			
			self.screen_view.doEvents(self.model.event_id, "over", self.model);
		}
	};
	self.rollout = function()
	{	
		if(self.model.enabled && self.isOver)
		{
			self.isOver = false;
			self.model.dispatcher.trigger('rollout');
			
			self.screen_view.doEvents(self.model.event_id, "out", self.model);
		}
	};
	
	self.removeFromScreen = function()
	{
		var screen_view = self.model.screen.view;
		var elm_obj = self.model;
		var div = self.$div
		tweenTo(div, 0.2, 
		{
			autoAlpha:0, 
			y: '+=10',
			onComplete:function()
			{
				div.empty().remove();
				screen_view.removeFromArray( elm_obj );
			} 
		});
		
		
	}
	
	self.kill = function()
	{
		if( self.activetween )
		{
			self.activetween.kill();
		}
		_respondo.dispatcher.unbind( 'updateSize', self.screenSizeUpdate );
		if( self.$content )
		{
		
			if(  self.$content.kill )
			{
				self.$content.kill();
			}
			
			if( self.$content.empty )
			{
				self.$content.empty().remove();
			}
		
		}
		self.$div.empty().remove();
	}
	
	self.remove = function()
	{
		var screen_view = self.model.screen.view;
		$( self.$div ).empty().remove();
		var elm_obj = self.model;
		screen_view.removeFromArray(elm_obj)
	}
	
	self.setContent = function()
	{
		//if ( devmode ) console.log( 'setContent: ' + self.model.id );
		//if ( devmode ) console.log( 'setContent self: %O', self )
		
		
		switch(self.model.type)
		{
			case "custom":
					if( !self.screen_view.custom )
					{
						if ( devmode ) console.log("CALL OLD CUSTOM: %O", self) ;
						// legacy screentype custom call.
						self.templateView.custom( self.model );	
					}
				break;
				
		   default:
			  break;
		}
		
		self.setReady() ;
	}
	self.base_setContent = self.setContent;
	
	self.setReady = function()
	{
		//if ( devmode ) console.log( 'setReady: ' + self.model.id )
		self.model.setReady( true ) ;
		// self.screen_view.doEvents(self.model.event_id, "init", self.model);
		self.screen_view.screenElementReady() ;
	}
	
	
	self.createScreen = function()
	{
		if ( devmode ) console.log( 'Log CREATE SCREEN SUBCLASSED' )
	}
		
	self.createLine = function()
	{ 
		if ( devmode ) console.log( 'Log CREATE LINE SUBCLASSED' )
	}
	
	self.createBox = function()
	{ 
		if ( devmode ) console.log( 'Log CREATE BOX SUBCLASSED' )
	}
	
	self.createText = function()
	{
		if ( devmode ) console.log( 'Log CREATE TEXT SUBCLASSED' )
	}
	
	self.createImage = function()
	{
		if ( devmode ) console.log( 'Log CREATE IMAGE SUBCLASSED' )
	}
	
	self.createStatus = function()
	{
		if ( devmode ) console.log( 'Log CREATE STATUS SUBCLASSED' )
	}
	
	self.createButton = function()
	{
		if ( devmode ) console.log( 'Log CREATE BUTTON SUBCLASSED' )
	}
	
	self.createTabs = function()
	{
		if ( devmode ) console.log( 'Log CREATE TABS SUBCLASSED' )
	}

	/* MEDIA */
	self.createVideo = function()
	{
		if ( devmode ) console.log( 'Log CREATE VIDEO SUBCLASSED' )
	}
	
	self.createAudio = function()
	{		
		if ( devmode ) console.log( 'Log CREATE AUDIO SUBCLASSED' )
	}
	
	self.createTimer = function()
	{
		if ( devmode ) console.log( 'Log CREATE TIMER SUBCLASSED' )
	}
	
	self.createSprite = function()
	{
		// var xml = $(self.model.oXML);
		// self.$div.data('view', self);
		
		// self.$content = new Sprite( self, xml );
		if ( devmode ) console.log( 'Log CREATE SPRITE SUBCLASSED' )
	}
	
}
