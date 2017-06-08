
// console.log("screentype text_graphic.js");
		
function Text_graphic(s)
{
	var self = this; 
	
	ScreenView.call(self, s);
	self.super_screenLoaded = self.screenLoaded;
	self.view = self;
	
	// console.log("screentype text_graphic() obj");
	self.super_custom = self.custom;
	self.custom = function(custom_xml_node)
	{
		self.custom_xml = $( custom_xml_node );
		self.super_custom( self.custom_xml );
		self.$div = self.custom_element.view.$div;
		// console.log("screentype text_graphic.js custom()");
		return self.custom_element;	
	}
	
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		// console.log("screentype text_graphic.js screenElementsReady()");
		self.super_screenLoaded();	
	}

	
}
Text_graphic.prototype = ScreenView;