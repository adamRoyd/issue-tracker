/**
* @author Andy Galletly
*/
function SoundbankScreen(xml_node) 
{
	var self = this ;
	Screen.call(self, xml_node);
	self.type = "soundbank";
	
	self.soundModel ;
	
	self.dispatcher = $(document.createElement('div'));	
	self.dispatcher.attr('id', ('dispatcher_' + self.id ));
	
	self.setSoundModel = function( m )
	{
		self.soundModel = m ;
	}
	
	self.base_screenSetupComplete = self.screenSetupComplete   ;
	self.screenSetupComplete  = function()
	{	
		self.base_screenSetupComplete ()
		self.showing(); // is needed?
		self.dispatcher.trigger( 'setupComplete' ) ; 
	}
	
	self.screenViewReady = function()
	{
		// called from vscreen when screen is loaded				
		self.view.doEventById( "screenLoaded" ) ;
	}
	
}
NavScreen.prototype = Screen;