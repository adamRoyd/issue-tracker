/**
* @author Andy Galletly
*/
/*
	<timeline control="scroll" time="60">
		<tween element="text_1" time="0.5"><![CDATA[ x: 20, y: 50 ]]></tween>
	</timeline>
*/
function TimelineView( m )
{
	var self = this;
	TimedElementView.call(self, m);
	
	self.screen.dispatcher.bind( 'kill', self.kill );
	
	self.controllingScreenView = null;
	
	self.timer_div = $('<div class="timer"></div>');
	self.timer_tween = null;

	self.time = Number( self.xml_node.attr("time") );
	
	self.queuedControl = null;	
	self.control = self.xml_node.attr("control");
	self.control_element  = null;	
	self.input;
	self.scrollingElement;
	self.scrollAxis = self.xml_node.attr("scrollaxis");
	self.parent = self.xml_node.attr("parent");
	self.useParent = self.xml_node.attr("useparent") == "true";
	// self.parent_offset = self.xml_node.attr("offset");
	
	self.offset = null;
	if (self.xml_node.attr("offset"))
	{
		self.offset = Number(self.xml_node.attr("offset"));
	}
	// self.scrollWidth = Number( self.xml_node.attr("scrollwidth") );
	
	self.complete_event = self.xml_node.attr("completeevent");
	
	self.base_setContent = self.setContent;
	self.setContent = function()
	{
		self.$content = self.timer_div;
		self.base_setContent();

		self.screen.dispatcher.on( 'ready', function(){ TweenMax.delayedCall( 0,self.applyTimeline ) } ) ;
		self.base_setContent();
	}
	
	self.applyTimeline = function()
	{
		//if ( devmode ) console.log( 'Log applyTimeline' )
		
		self.controllingScreenView = self.useParent? self.screen_view.screen.parentScreenView : self.screen_view;
	
		var repeatNum = 0  ;
		var repeatDelayNum = 0 ; 
		
		if( self.xml_node.attr("repeat"))
		{
			repeatNum = Number( self.xml_node.attr("repeat")) ;
		}
		
		if( self.xml_node.attr("repeatDelay"))
		{
			repeatDelayNum = Number( self.xml_node.attr("repeatDelay")) ;
		}
		
		
		
		self.timer_tween = new TimelineMax({onUpdate: self.timeUpdate, onComplete: self.timelineComplete, repeat:repeatNum, repeatDelay:repeatDelayNum });
	
		self.timer_tween.add( TweenMax.to(self.$content, self.time, {}) );
		
		for( var i = 0; i < self.xml_node.children().length; i++ )
		{
			var item =  $(self.xml_node.children()[ i ] );
			
			
			if( item[0].nodeName == "tween" )
			{
				var element_id = item.attr( 'element' );
				
				//if ( devmode ) console.log( 'Log '+i+' TWEEN ELEMENT ' + element_id )
				var element_div = self.screen_view.getScreenElementById( element_id ).getDiv() ;
				var tween_settings_object = self.createTweenObject( item.text() ); 
				
				var tween_time =  item.attr( 'time' );
				if( tween_time.indexOf( '%' ) > -1 )
				{
					tween_time = (Number( tween_time.split( '%' )[ 0 ] )/100)*self.timer_tween.duration() ;					
				}	
				tween_time = Number( tween_time ) ;
				
				
				var timeoffset = 0;
				if( item.attr( 'timeoffset' ) )
				{
					timeoffset =  item.attr( 'timeoffset' );
										
					if( timeoffset.indexOf( '%' ) > -1 )
					{
						timeoffset = (Number( timeoffset.split( '%' )[ 0 ] )/100)*self.timer_tween.duration() ;
					}
				}
				
				if( item.attr( 'event' ) )
				{
					element_div.data( 'complete_event', item.attr( 'event' ) )
					tween_settings_object.onComplete = function()
					{
						self.screen_view.doClickById( $( this.target ).data( 'complete_event' ) ) ;
					}
				}
				
				var tween = new TweenMax( element_div, tween_time, tween_settings_object );
				self.timer_tween.add( tween, timeoffset );
				
			}
			if( item[0].nodeName == "event" )
			{
				//if ( devmode ) console.log( 'Log: add event to timeline ' + item.attr( 'id' ) )
			
				var time = 0;
				if( item.attr( 'time' ) )
				{
					time =  item.attr( 'time' );
				}
				self.timer_tween.addCallback( self.screen_view.doClickById, time, [item.attr( 'id' )] );
			}
			self.timer_tween.smoothChildTiming = true;
		}
		self.time = self.timer_tween.totalDuration();
		
		if ( self.autoplay )
		{
			self.play();
		}
		else
		{
			self.pause();
		}
		
		if( self.control=='scroll' )
		{
			var inputElementId = self.xml_node.attr("input");
			if (inputElementId)
			{
				self.input = controllingScreenView.getScreenElementById( inputElementId );
			}
			
			self.addScrollListener();
		}
		else if( self.control )
		{
			// A control element can be a custom slider. It's a view object that sends out a 'updatepercent' event.
			if ( devmode ) console.log( 'Log: self.control ' + self.control )
			var control_element = controllingScreenView.getScreenElementById( self.control )
			if( control_element )
			{
				self.control_element = control_element;
				self.addSliderListener();
			}
		}
		
		if (self.xml_node.attr("offset") && isNaN(self.offset))
		{
			self.calculateOffset(self.xml_node.attr("offset"));
		}


		self.runQueuedControl();

		if( self.control=='scroll' )
		{
			self.updateTimelineByScrollPosition();
		}
	}
	
	self.calculateOffset = function( offsetType )
	{
		var borderWidth = self.screen_view.$div.parent().css("border-left-width");
		borderWidth = Number(borderWidth.split("px")[0]);
		switch (offsetType)
		{
			case "enterScreen":
				self.offset = self.screen_view.$div.parent().position().left + borderWidth - 1014;
				break;
			case "onScreen":
				self.offset = self.screen_view.$div.parent().position().left + borderWidth;
				break;
			default:
				self.offset = 0;
				break;
		}
	}
	
	self.addTween = function( tween, offset )
	{
		//if ( devmode ) console.log( 'Log ADD TWEEN ' + self.model.id + ' %o', tween )
		self.timer_tween.add( tween, offset )
		self.time = self.timer_tween.totalDuration();
		//if ( devmode ) console.log( 'Log ADD TWEEN self.time ' + self.time )
	}
	
	self.addSliderListener = function()
	{
		//if ( devmode ) console.log( 'Log: addSliderListener ' )
		self.control_element.view.dispatcher.bind('updatepercent',self.updateTimelineControlElement)
		
	}
	
	self.updateTimelineControlElement = function( e, percent )
	{
		//if ( devmode ) console.log( 'Log: updateTimelineControlElement ' + self.control_element.view.getPercent())
		var pos = percent/100;
		var seek_time = self.time * pos
		tweenTo(self.timer_tween, 0.2, {time:seek_time, ease:Linear.easeNone});
		
	}
	
	self.addScrollListener = function()
	{
		if (self.input)
		{
			self.scrollingElement = self.input.view.$div;
		}
		else if (self.screen.view instanceof ScrollManager)
		{
			self.scrollingElement = self.controllingScreenView.$div;
		}
		else
		{
			self.scrollingElement = $(window);
		}
		
		self.scrollingElement.bind('scroll',self.updateTimelineByScrollPosition);	
	}
	
	self.updateTimelineByScrollPosition = function()
	{
		var current, max, pos;	
		
		if (self.scrollAxis == "x")
		{
			current = self.scrollingElement.scrollLeft();
			max = self.scrollingElement[0].scrollWidth - self.scrollingElement.width();
		}
		else
		{
			current = self.scrollingElement.scrollTop();
			max = $(document).height() - self.scrollingElement.height();
		}
		
		if (self.offset)
		{
			current -= self.offset;
			max = self.time
		}
		
		pos = current / max;
		pos = Math.min(Math.max(pos, 0), 1); // clamp between 1 and 0
		
		//if ( devmode ) console.log( 'Log updateTimelineByScrollPosition ' + pos )
		//if ( devmode ) console.log( 'Log current ' + current )
			
		var seek_time = self.time * pos
		
		//if ( devmode ) console.log( 'Log updateTimelineByScrollPosition seek_time ' + seek_time )
	
		// var tweenTime = 0.2;
	
		tweenTo(self.timer_tween, 0, {time:seek_time, ease:Linear.easeNone});
	}
	
	self.createTweenObject = function( string )
	{
		var obj = {};

		var string_array = string.split(",");
		for( var i = 0; i < string_array.length; i++ )
		{
			var item_split = string_array[ i ].split(":");
			
			var _property  = item_split[0].replace(/\s+/g, '');
			var _value = item_split[1];//.replace(/\s+/g, '')
			
			
			obj[ _property ]  =  _value;
			
			
			//if ( devmode ) console.log( 'Log CREATE TWEEN ' + _property , _value)
			
		}

		return obj;
	}
	
	self.base_kill = self.kill;
	self.kill = function()
	{
		self.screen.dispatcher.unbind('ready');
		if (self.scrollingElement)
		{
			self.scrollingElement.unbind('scroll', self.updateTimelineByScrollPosition);
		}
		self.timer_tween.kill();
		self.base_kill()
	}
	
	self.play = function()
	{
		if (self.timer_tween)
		{
			self.timer_tween.play();
		}
		else
		{
			self.queueControl(self.play);
		}
	}
	
	self.pause = function()
	{
		self.timer_tween.pause();
	}
	
	self.stop = function()
	{
		self.timer_tween.pause();
	}
	
	self.reverse = function()
	{		
		self.timer_tween.reverse();
	}
	
	
	self.reset = function()
	{
		self.current_cue = null;
		self.timer_tween.pause(0);
		self.timeUpdate();
	}
	
	self.timeUpdate = function( )
	{
		//if ( devmode ) console.log( 'Log TIMELINE UPDATE ' + self.model.id + ' - ' + self.timer_tween.time() )
	}
	
	self.timelineComplete = function()
	{
		self.screen_view.doClickById( self.complete_event )
	}
	
	self.queueControl = function(playControl)
	{
		self.queuedControl = playControl;
	}

	self.runQueuedControl = function()
	{
		if (self.queuedControl)
		{
			self.queuedControl();
			self.queuedControl = null;
		}
	}

}
TimelineView.prototype = TimedElementView;
