function MultiMcq( s )
{		
	var self = this ;
	self.FRAME_UPDATE = false;
	self.REVEAL_TIME = 0.5;
	
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$div;
	self.custom_xml;
	
	self.subScreenArray = [] ;
	self.currentScreenIndex = 0;
	
	self.progressIndicator;
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{		
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		// self.$div.addClass( 'scrollManager' ) ;
		
		self.appendChildren( $( self.custom_xml ) )
		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;
			
			
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
					
				case "screen":
					self.registerScreen( $( xml_node ) ) ;
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
	

	self.createSettings = function( oXML )
	{		
		
	}
	
	self.initProgressIndicator = function()
	{
		self.progressIndicator = $('<div class="progressIndicator"></div>');
		for (var i = 0; i < self.subScreenArray.length; i++)
		{
			self.progressIndicator.append('<div class="screen num' + i + '"/>');
		}	
		
		self.$div.append(self.progressIndicator);	

		self.hideProgressIndicator();
	}
	
	self.hideProgressIndicator = function()
	{
		self.progressIndicator.addClass('hidden');
	}
	
	self.showProgressIndicator = function()
	{
		self.progressIndicator.removeClass('hidden');
		
		TweenMax.set( self.progressIndicator, { y:50 } ) ;	
		TweenMax.to( self.progressIndicator, 0.5, { y:0 } ) ;				
	}
	
	self.registerScreen = function( $xmlNode )
	{
		var screen = self.view.getScreenElementById( $xmlNode.attr('id') );
		var arrayLength = self.subScreenArray.push(screen);
		
		self.hideScreen(arrayLength - 1);
	}
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{	
		self.super_screenLoaded();
	}

	self.super_ready = self.ready;
	self.ready = function()
	{
		self.initProgressIndicator();
		self.super_ready();
	}
	
	self.super_enable = self.enable;
	self.enable = function()
	{
		self.super_enable() ;
	}
	
	self.super_disable = self.disable;
	self.disable = function()
	{
		self.super_disable() ;
	}
	
	self.super_kill = self.kill;
	self.kill = function()
	{
		self.super_kill() ;
	}	
	
	self.showNextScreen = function()
	{
		self.hideScreen(self.currentScreenIndex);
		
		var nextScreenIndex = self.currentScreenIndex + 1;
		if (nextScreenIndex >= self.subScreenArray.length)
		{
			self.onComplete();
			return;
		}
		
		self.showScreen(nextScreenIndex);
	}
	
	self.showScreen = function(screenIndex)
	{
		self.currentScreenIndex = screenIndex;
		var screen = self.subScreenArray[screenIndex];
		screen.enable();
		screen.view.subScreenObject.doClickById('onShow');
		
		TweenMax.set( screen.view.$div, { autoAlpha: 1, display: 'block' } ) ;		
		
		self.updateProgress(screenIndex);
	}
	
	self.hideScreen = function(screenIndex)
	{
		var screen = self.subScreenArray[screenIndex];
		screen.disable();	
		screen.view.subScreenObject.doClickById('onHide');
		
		TweenMax.set( screen.view.$div, { autoAlpha: 0, display: 'none' } ) ;		
	}
	
	self.updateProgress = function(screenIndex)
	{
		self.progressIndicator.find('.screen').removeClass('current');
		var className = '.num' + screenIndex;
		var progressIcon = self.progressIndicator.find(className);
		progressIcon.addClass('current');
	}
	
	self.startGame = function()
	{
		self.showScreen(0);
		self.showProgressIndicator();
	}
	
	self.showCurrentScreenReveal = function()
	{
		var revealPart = self.view.getScreenElementById('part' + self.currentScreenIndex);		
		self.doReveal(revealPart);
	}
	
	self.doReveal = function(revealPart)
	{
		TweenMax.to( revealPart.view.$div, self.REVEAL_TIME, { autoAlpha: 1, display: 'block' } ) ;		
	}
	
	self.onPass = function()
	{
		if (self.currentScreenIndex == self.subScreenArray.length -1)
		{
			self.onComplete();
		}
	}
	
	self.onComplete = function()
	{
		self.screen.screenCompleted();
		
		var revealPart = self.view.getScreenElementById('partFinal') || self.view.getScreenElementById('part' + self.subScreenArray.length);
		
		self.doReveal(revealPart);			
		self.animateAllParts();
								
		self.view.doEventById('onComplete');
	}

	self.reset = function()
	{
		self.hideScreen(self.currentScreenIndex);
		self.currentScreenIndex = 0;
		self.hideProgressIndicator();
	}
	
	self.animateAllParts = function()
	{

	}
	
}
MultiMcq.prototype = ScreenView;