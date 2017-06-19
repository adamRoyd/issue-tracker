/**
* @author Andy Galletly
*/
function TopicScreen(xml_node, topic_obj) 
{
	var self = this ;
	Screen.call(self, xml_node);
	
	self.navspeed = 0.6;
	
	self.type = "topic"
		
	self.topic = topic_obj;
	
	self.topicId = self.topic.id;
	
	self.resourcesID = null;
	
	if( self.oXML.attr( "resourcesid" ) )
	{
		self.resourcesID = self.oXML.attr( "resourcesid" );
	}
	if( self.oXML.attr( "topicref" ) )
	{
		self.topicref = self.oXML.attr( "topicref" );
	}

	self.nextDir = self.oXML.attr( "nextDir" );
	
	self.classname = self.oXML.attr( "class" );
	
	if( !self.nextDir )
	{
		self.nextDir = "next" ;
	}
	
	self.next_locked = false;
	self.back_locked = false;

	if(self.oXML.attr("next"))
	{
		var nextVal = self.oXML.attr("next");
		if (nextVal == "false")
		{
			self.next_locked = true;
		}
		else
		{
			self.nextRef = nextVal;
		}
	}
	
	if(self.oXML.attr("back"))
	{
		var backVal = self.oXML.attr("back");		
		if (backVal == "false")
		{
			self.back_locked = true;
		}
		else
		{
			self.backRef = backVal;
		}
	}

	self.super_screenCompleted = self.screenCompleted;
	self.screenCompleted = function()
	{
		self.super_screenCompleted();
		
		if( navObj )
		{
			navObj.enableBackNext();
		}
		
		self.topic.updateStatus();
	}
	
	self.show = function( nav_direction )
	{	
		if( ( masterObj.desktoplayout == 'scroll' ) && _respondo.desktop() )
		{
			nav_direction = 'fade';
		}
		
		var $holder_div = self.view.$div
		
		if( $holder_div )
		{
			tweenTo( $holder_div , 0, { autoAlpha:1 , display:'block' } );
			switch( nav_direction )
			{
				case 'next': 
					tweenTo($holder_div, 0, { left: 1014, top: 0 } );
					tweenTo($holder_div, self.navspeed, { left: 0, top: 0, onComplete: self.showing } );
					break;
				case 'back': 
					tweenTo($holder_div, 0, { left: -1014, top: 0 } );
					tweenTo($holder_div, self.navspeed, { left: 0, top: 0, onComplete: self.showing } );
					break;
				case 'phonemenu': 
				case 'menu': 
					self.leave( nav_direction );
					break;
				case 'default':
					tweenTo( $holder_div, 0, { left: 0, top: 0, autoAlpha:0 } );
					tweenTo( $holder_div , self.navspeed, { top: 0, autoAlpha:1 , display:'block' , onComplete: self.showing} );
					break;
				case 'fade':
					tweenTo( $holder_div, 0, { left: 0, top: 0, autoAlpha:0 } );
					tweenTo( $holder_div , self.navspeed, { top: 0, autoAlpha:1 , display:'block' , onComplete: self.showing} );
					break;
				case 'phone':
				default: 
					tweenTo( $holder_div, 0, { left: 0, top: 0, autoAlpha:0 } );
					tweenTo( $holder_div , 0, { autoAlpha:1 , display:'block' , onComplete: self.showing} );
					break;
			}
		}
	}
	
	self.leave = function( nav_direction )
	{
		
		if( ( masterObj.desktoplayout == 'scroll' ) && _respondo.desktop() )
		{
			nav_direction = 'fade';
		}
		var $holder_div = self.view.$div
		if( $holder_div )
		{
			switch( nav_direction )
			{
				case 'next': 
					tweenTo($holder_div, self.navspeed, { left: -1014, top: 0, onComplete: self.view.removeScreen } );
					break;
				case 'back': 
					tweenTo($holder_div, self.navspeed, { left: 1014, top: 0, onComplete: self.view.removeScreen } );
					break;
				case 'menu': 
					tweenTo($holder_div, self.navspeed, { top: 0, onComplete: self.view.removeScreen } );
					break;
				case 'phonemenu':
				case 'phone':
				case 'fade':
				default: 
					tweenTo( $holder_div ,0, { autoAlpha:0 , display:'none', onComplete: self.view.removeScreen } );
					break;
			}
		}
		
		currentScreen.dispatcher.unbind( 'ready_to_leave' );
	}
	
	/* =============== GET + SET ================= */
	
	self.super_setAnswered = self.setAnswered;
	self.setAnswered = function( _val )
	{
		self.super_setAnswered( _val );
	}
	
	
}
TopicScreen.prototype = Screen;