/**
* Menu v0.1
* @author Andy Galletly
*/
function Menu()
{
	// if ( devmode ) console.log("menu.js Menu() ");
	var self = this  ;
	
	self.menuScreen = null;
	self.$div = $('#menuholder');
	
	self.createUI = function()
	{	
		if(masterObj.bHasMenu)
		{
			self.menuScreen = $('#menuScreen');
			self.createMenu();
		}
		else
		{
			menuReady();
		}
	}
	
	self.createMenu = function()
	{
		loadMenuScreen();		
	}

	self.hideMenu = function()
	{
		if(masterObj.bHasMenu)
		{
			if( self.menuScreen )
			{
				if( self.menuScreen.length )
				{				
					self.menuScreen.disable();
				}			

				if( _respondo.desktop() )
				{
					tweenTo(self.$div, 0.2, {autoAlpha:0, display:'none'});
					tweenTo( $( '#contentholder' ), 0.2, {autoAlpha:1, display:'block'});
				}
				else
				{
					tweenTo( $( '#contentholder' ), 0, {y:0});
					tweenTo( self.$div, 0, {y:0});
					tweenTo(self.$div, 0.3, {autoAlpha:0, y:0, display:'none'});
					tweenTo( $( '#contentholder' ), 0.3, {autoAlpha:1, y:0, display:'block'});
				}
			}
		}
	}	
	
	self.showMenu = function()
	{
		if(masterObj.bHasMenu)
		{
			self.menuScreen.show() ;
			self.menuScreen.enable();
			self.menuScreen.view.doEventById("showMenu") ;
			
			if( _respondo.desktop() )
			{
				tweenTo(self.$div, 0.2, {autoAlpha:1, display: 'block'})
				tweenTo( $( '#contentholder' ), 0.2, {autoAlpha:0, display:'none'});
			}
			else
			{
				tweenTo( $( '#contentholder' ), 0, {y:0});
				tweenTo( self.$div, 0, {y:0});
				tweenTo(self.$div, 0.3, {autoAlpha:1, y:0, display: 'block' })
				tweenTo( $( '#contentholder' ), 0.3, {autoAlpha:0, y:0, display:'none'});
			}
		}		
	}
	
	self.startMenu = function()
	{
		$('.ui_course_title').empty().append(masterObj.courseTitle);
		$( '#menuholder' ).removeClass('hidden');
		self.menuScreen.view.doEventById("onStartMenu") ;
	}
	
	self.inTopic = function()
	{
		self.menuScreen.view.doEventById("in_topic") ;
	}
}