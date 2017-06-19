function ScrollManager( s )
{		
	var self = this ;
	self.FRAME_UPDATE = false;
	
	ScreenView.call(self, s);
	self.view = self ;
	self.running = false;
	
	// elements
	self.$div;
	self.custom_xml;
	
	self.subScreenArray = [] ;
	self.animationTriggersArray = [] ;
	
	self.progressTracker = null ; 
	
	self.scrollPosition = 0 ;
	
	self.scrollDirection = "vertical" ;
	self.useRealPosition = false;
	self.scrollWidth = null;
	self.updateOnReady;
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{		
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		self.$div.addClass( 'scrollManager' ) ;
		
		self.appendChildren( $( self.custom_xml ) )
		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;
			
			
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
					
				case "topicbutton": 
					self.registerAnimationTrigger( $( xml_node ) ) ;
					break;
				case "text": 
				case "box": 
				case "screen":
					self.registerAnimationTrigger( $( xml_node ) ) ;
					break ;
			}			
		}
		
		return self.custom_element;
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
				node.attr( 'target', self.screen.id );
			}
			if( !node.attr( 'id' ) )
			{
				node.attr( 'id', self.screen.id + "_item" + i );
			}
		}
		
		self.screen.child_array = self.createScreenElements( xml_node )
	}
	
	self.registerAnimationTrigger = function( xml_node )
	{
		// probably a good idea to move subscreens into this as animation triggers too		
		
		var elm = self.getScreenElementById( xml_node.attr( 'id' ) ) ;
		if ( devmode ) console.log("A SCROLL TRIGGER BOX HAS BEEN FOUND: %o", elm ) ;
		var animationTrigger = {}; 
		animationTrigger.elm = elm ;
		animationTrigger.id = elm.id ;
		animationTrigger.width = elm.view.$div.width() ;
		animationTrigger.height = elm.view.$div.height() ;
		//animationTrigger.top = elm.view.$div.position().top ;
		//animationTrigger.left = elm.view.$div.position().left ;
		animationTrigger.top = elm.y ;
		animationTrigger.left = elm.x ;
		animationTrigger.right = animationTrigger.left + animationTrigger.width ;
		animationTrigger.realPosFound = false;
		
		animationTrigger.bufferOffset = 0 ;
		if( xml_node.attr( 'bufferoffset' ) )
		{
			animationTrigger.bufferOffset = Number( xml_node.attr( 'bufferoffset' )) ;
		}
		
		animationTrigger.seen = false ;
		
		
		self.animationTriggersArray.push( animationTrigger ) ;
	}
	
	var topBuffer = 300 ;
	var bottomBuffer = 300 ;
	var leftBuffer = 150 ;
	var rightBuffer = 150 ;
	
	var topBufferMarker ;
	var bottomBufferMarker ;
	var leftBufferMarker ;
	var rightBufferMarker ;
	
	self.setupScrollListener = function()
	{
		if( self.scrollDirection == "vertical" )
		{
			$(window).bind( 'scroll', self.scrollTick );	
		}
		else
		{
			if (!self.FRAME_UPDATE)
			{
				self.$div.bind( 'scroll', self.scrollTick );			
			}
		}

		topBufferMarker = $( '<div class="topBufferMarker" id="' + self.screen.id + 'topBufferMarker_"></div>');
		$( '#navholder' ).append( topBufferMarker ) ;
		
		bottomBufferMarker = $( '<div class="bottomBufferMarker" id="' + self.screen.id + 'bottomBufferMarker_"></div>');
		$( '#navholder' ).append( bottomBufferMarker ) ;
		
		leftBufferMarker = $( '<div class="leftBufferMarker" id="' + self.screen.id + 'leftBufferMarker_"></div>');
		$( '#navholder' ).append( leftBufferMarker ) ;
		
		rightBufferMarker = $( '<div class="rightBufferMarker" id="' + self.screen.id + 'rightBufferMarker_"></div>');
		$( '#navholder' ).append( rightBufferMarker ) ;
		
		
		if( self.scrollDirection == "vertical" )
		{
			topBufferMarker.attr( 'top', topBuffer ); 
			bottomBufferMarker.attr( 'top', bottomBuffer ); 		
		}
		else
		{
			leftBufferMarker.attr( 'left', leftBuffer ); 
			rightBufferMarker.attr( 'left', rightBuffer ); 		
		}
	}
	
	
	self.scrollCount = 0 ;
	self.scrollMax = 0 ;
	self.scrollTick = function()
	{
		//console.log("Scrollin'") ;
		
		if( self.scrollCount >= self.scrollMax )
		{
			self.updateByScrollPosition() ;
			self.scrollCount = 0 ;
			//console.log("%c 		SCROOL UPDATE", 'color: purple;' ) ;
		}
		else
		{
			self.scrollCount++; 
			//console.log("%c 		SCROOL TICK", 'color: orange;' ) ;
		}
		
		if (self.running)
		{
			requestAnimationFrame(self.scrollTick)			
		}		
	}
	
	self.inTopArea = null;
	
	self.updateByScrollPosition = function()
	{
		var current, max;
		var docHeight, winHeight;
		var docWidth, winWidth;
		
		//console.log("winWidth: " + winWidth ) ;

		if( self.scrollDirection == "horizontal" )
		{
			current = self.$div.scrollLeft(); // current scroll position		

			//winWidth = $(window).width() ; // height of window		
			winWidth = 1014 ; //self.$div.width()				
			
			// THIS SHOULDN'T CHANGE SO WE DON'T NEED TO KEEP FINDING IT OUT
			docWidth = self.$div[0].scrollWidth; // - self.scrollingElement.width();  //3620 ; // temp width check!!!
			
			if (self.scrollWidth)
			{
				docWidth = self.scrollWidth; // Use number specified in the XML if width can't be found at runtime //3620 for main menu
			}
			
			max = docWidth - winWidth ;			
		}
		else
		{
			current = $(window).scrollTop(); // current scroll position
			winHeight = $(window).height() ; // height of window		
			
			// THIS SHOULDN'T CHANGE SO WE DON'T NEED TO KEEP FINDING IT OUT
			docHeight = $(document).height() ; // total height of all content
			
			max = docHeight - winHeight; // total height without window height included		
		}
		
		self.currentscroll = current
		
		var perc = current / max; // percent position 0 - 1		
		var pos = perc * max ; // actual pixel position of window top
		
		var bottomPos = pos + winHeight ;
		var rightPos = pos + winWidth ;
		
		if( perc > 0.9 )
		{
			self.markEndReached() ;
		}
		
		//console.log("%c SCROLL at pos %s of total height %s", 'color: orange;', pos, docHeight ) ;
		
		if( pos < 100 )
		{
			navObj.navScreen.screenAtTop() ;
		}
		else
		{			
			navObj.navScreen.screenInBody() ;
		}
		
		
		for( var i = 0; i < self.animationTriggersArray.length; i++ )
		{
			var animationTriggerObj = self.animationTriggersArray[ i ];
			
			if (self.useRealPosition && !animationTriggerObj.realPosFound)
			{
				animationTriggerObj.top = animationTriggerObj.elm.view.$div.position().top ;
				animationTriggerObj.left = animationTriggerObj.elm.view.$div.position().left ;
				animationTriggerObj.right = animationTriggerObj.left + animationTriggerObj.width ;
				animationTriggerObj.realPosFound = true;
			}

			/*
			console.log("svgAnim self: %o", self ) ;
			console.log("		elm %s has a position of %s - is it between %s and %s?", animationTriggerObj.elm.id, animationTriggerObj.left, ( pos + leftBuffer ), (rightPos - rightBuffer)) ;
			
			
			console.log("animationTriggerObj: %o", animationTriggerObj ) ;
			console.log("pos: " + pos) ;
			console.log("leftBuffer: " + leftBuffer) ;
			console.log("rightPos: " + rightPos) ;
			console.log("rightBuffer: " + rightBuffer) ;
			*/
			
			var leftInDisplayArea = false ;
			if( animationTriggerObj.left  >= pos + leftBuffer + animationTriggerObj.bufferOffset  && animationTriggerObj.left <= rightPos - rightBuffer - animationTriggerObj.bufferOffset)
			{
				leftInDisplayArea = true ;
			}
			
			var rightInDisplayArea = false ;
			if( animationTriggerObj.right  >= pos + leftBuffer + animationTriggerObj.bufferOffset  && animationTriggerObj.right <= rightPos - rightBuffer - animationTriggerObj.bufferOffset)
			{
				rightInDisplayArea = true ;
			}
			
			var bodyInDisplayArea = false ;
			if( animationTriggerObj.left  < pos + leftBuffer + animationTriggerObj.bufferOffset && animationTriggerObj.right > rightPos - rightBuffer -  animationTriggerObj.bufferOffset)
			{
				bodyInDisplayArea = true ;
			}
			
			// add check for scroll end?
			/*
			console.log("leftInDisplayArea: " + leftInDisplayArea ) ;
			console.log("rightInDisplayArea: " + rightInDisplayArea ) ;
			console.log("bodyInDisplayArea: " + bodyInDisplayArea ) ;
			*/
			if( leftInDisplayArea || rightInDisplayArea || bodyInDisplayArea )
			{
				// screen top is within display area
				//console.log("				ACTIVE SCREEN ID: " + animationTriggerObj.elm.id );
				if( !animationTriggerObj.active )
				{
					animationTriggerObj.active = true ;
					animationTriggerObj.seen = true ;
					
					//console.log("%c SCROLL AREA ENTERING ACTIVE ZONE: %s", 'background: yellow; color: hotpink;', animationTriggerObj.id ) ;
					if (animationTriggerObj.elm.view.subScreenObject)
					{
						animationTriggerObj.elm.view.subScreenObject.view.doEventById( "onEnterScrollView" ) ;
					}
					else
					{
						animationTriggerObj.elm.view.screen.view.doEventById( animationTriggerObj.id + "_activate" ) ;
					}
				}
			}
			else
			{				
				if( animationTriggerObj.active )
				{
					animationTriggerObj.active = false ;					
					
					//console.log("%c SCROLL AREA LEAVING ACTIVE ZONE: %s", 'background: pink; color: yellow;', animationTriggerObj.id ) ;
					if (animationTriggerObj.elm.view.subScreenObject)
					{
						animationTriggerObj.elm.view.subScreenObject.view.doEventById( "onExitScrollView" ) ;	
					}
					else
					{
						animationTriggerObj.elm.view.screen.view.doEventById( animationTriggerObj.id + "_deactivate" ) ;
					}				
				}
			}			
		}
		
		

		self.updateProgressDisplay() ;
	}
	
	self.markEndReached = function()
	{
		if( !self.screen.completed )
		{
			self.screen.screenCompleted();
			trackingObj.updateTracking() ;
		}
	}
	
	
	self.createSettings = function( oXML )
	{		
		if( oXML.attr( "scrolldirection" ) == "horizontal" )
		{
			self.scrollDirection = "horizontal";
		}
				
		if( oXML.attr( "scrollwidth" ) )
		{
			self.scrollWidth =  Number(oXML.attr( "scrollwidth" )); 
		}
		
		self.useRealPosition = oXML.attr( "userealposition" ) == "true";
		self.updateOnReady = !(oXML.attr( "updateonready" ) == "false");
	}
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{	
		TweenMax.delayedCall( 0, self.setupScrollVars ) ;
		
		
		
		self.super_screenLoaded();
	}

	self.super_ready = self.ready;
	self.ready = function()
	{
		self.super_ready();
		
		if (self.updateOnReady)
		{		
			self.forceUpdate();
		}
	}
	
	self.forceUpdate = function()
	{
		self.updateByScrollPosition();
		if (self.FRAME_UPDATE)
		{
			self.running = true;
			requestAnimationFrame(self.scrollTick)			
		}		
	}
	
	self.setupScrollVars = function()
	{
		self.createProgressTracker() ;
		self.setupScrollListener() ;
		//TweenMax.delayedCall( 0.1, self.updateByScrollPosition ) ;	
	}
	
	self.progressIconsArray = [] ;
	
	self.createProgressTracker = function()
	{
		self.progressTracker = $('<div class="progressTracker" id="' + self.screen.id + 'progressTracker"></div>');
		//self.$div.append ( self.progressTracker ) ;
		//$( '#navholder' ).append ( self.progressTracker ) ;
		
		for( var i = 0; i < self.subScreenArray.length; i++ )
		{
			var item = self.subScreenArray[ i ];			
			var icon = $('<div class="icon" id="' + self.screen.id + 'progressIcon_' + i + '"></div>');
			icon.id = i ;
			icon.event = self ;
			
			self.progressTracker.append( icon ) ;
			
			applyClick(
					icon,
					
					function () {
						var elm = $( this ).data( 'elm' );
						self.selectProgressIcon( elm );						
					}
				);
				
			self.progressIconsArray.push( icon ) ;
			
		}		
	}
	
	self.showControls = function()
	{
		$( '#navholder' ).append ( self.progressTracker ) ;
	}
	
	self.selectProgressIcon = function( elm )
	{
		
		//tweenTo(window, 1, {scrollTo:{y: self.subScreenArray[ elm.id ].top, x:0}, ease:Power4.easeOut});
		
		self.scrollToScreen( elm.id ) ;
	}
	
	self.updateProgressDisplay = function()
	{
		for( var i = 0; i < self.subScreenArray.length; i++ )
		{
			self.progressIconsArray[ i ].removeClass( 'active' ) ;
		
			var item = self.subScreenArray[ i ];
			if( item.active )
			{
				self.progressIconsArray[ i ].addClass( 'active' ) ;
				//break;
			}
		}
	}
	
	self.super_enable = self.enable;
	self.enable = function()
	{
	
		//$( '#courseholder' ).css( 'overflow', 'visible' ) ;
		self.progressTracker.show() ;
		
		//tweenTo(window, 0.1, {scrollTo:{y: self.scrollPosition } });
		
		self.super_enable() ;
	}
	
	self.super_disable = self.disable;
	self.disable = function()
	{
		//self.scrollPosition = $(window).scrollTop() ;		
		//$( '#courseholder' ).css( 'overflow', 'hidden' ) ;
		self.progressTracker.hide() ;
		
		
		self.super_disable() ;
	}
	
	self.super_kill = self.kill;
	self.kill = function()
	{
		self.running = false;
		self.subScreenArray = [] ;
		self.progressTracker.remove( ) ;
		$(window).unbind( 'scroll', self.scrollTick );	
		self.super_kill() ;
	}	
	
	self.scrollToCurrent = function(  )
	{
		
		if( self.scrollDirection == "horizontal" )
		{
			self.$div.scrollLeft( self.currentscroll )
		}
		else
		{
			$(window).scrollTop( self.currentscroll )
		}
	}
	
	
	self.scrollToScreen = function( id )
	{
		tweenTo(window, 1, {scrollTo:{y: self.subScreenArray[ id ].top, x:0}, ease:Power4.easeOut});
	}
	
}
ScrollManager.prototype = ScreenView;