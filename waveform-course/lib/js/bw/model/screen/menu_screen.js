/**
* @author Andy Galletly
*/
function MenuScreen(xml_node) 
{
	var self = this ;
	Screen.call(self, xml_node);
	self.type = "menu";
	
	self.super_screenSetupComplete = self.screenSetupComplete;
	self.screenSetupComplete = function()
	{
		self.super_screenSetupComplete();
		
		//self.show() ;
	}	
		
	self.show = function()
	{		
		tweenTo(self.view.$div, 0, {autoAlpha:1, display:'block'})
		self.showing();
	}
}
MenuScreen.prototype = Screen;