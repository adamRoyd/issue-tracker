/**
* @author Andy Galletly
*/
function SubScreen(xml_node, screen_element_view) 
{
	var self = this ;
	Screen.call(self, xml_node);

	/* headache! */
	self.screenElementView = screen_element_view;
	self.parentScreen = screen_element_view.screen;
	self.parentScreenView = screen_element_view.screen_view;
	self.parentScreenTemplateView = screen_element_view.templateView;
	
	self.type = "sub";
	if(!self.screentype)
	{
		self.screentype = 'text_graphic';
	}
	
	self.super_loadXML = self.loadXML;
	self.loadXML = function()
	{
		if( !$( self.oXML ).attr( 'xml' ) )
		{
			var xml_data = self.oXML;
			self.xmlReady( xml_data );
		}
		else
		{
			self.super_loadXML();
		}
	}
	
	self.super_screenSetupComplete = self.screenSetupComplete;
	self.screenSetupComplete = function()
	{
		self.super_screenSetupComplete();
		self.show();
	}
	
	self.super_initScreen = self.initScreen;
	self.initScreen = function(targ)
	{
		if ( devmode ) console.log( 'Log SUB SCREEN INIT' )
		self.super_initScreen( targ );
	}
}
SubScreen.prototype = Screen;