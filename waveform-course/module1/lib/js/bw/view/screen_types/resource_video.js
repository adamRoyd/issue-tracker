function ResourceVideo( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	
	self.custom_xml;
	self.resourceType;
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;			
			
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
			}
		}
		
		return self.custom_element;
	}
	
	self.customFunction = function()
	{

	}
	
	//	<settings optwidth="180" optionoffset="10" radiomode="true" randomise="false" />
	self.createSettings = function( oXML )
	{
		
	}
	
	self.super_createScreenElement = self.createScreenElement;
	self.createScreenElement = function(xml_node)
	{
		self.checkAndInjectFilepaths(xml_node);
		
		return self.super_createScreenElement(xml_node);
	}
	
	self.checkAndInjectFilepaths = function(xml_node)
	{
		switch(xml_node.nodeName)
		{
			case 'video':	
				var resourcePath = self.screen.oXML.attr('resource');
				var width = self.screen.oXML.attr('width');
				var height = self.screen.oXML.attr('height');

				xml_node.setAttribute('src', resourcePath);
				xml_node.setAttribute('width', width);
				xml_node.setAttribute('height', height);
				break;
			case 'var':
				var title = self.screen.oXML.attr('title');
				xml_node.textContent = title;
				break;
		}


	}
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{	
		self.super_screenLoaded();
	}
	
}
ResourceVideo.prototype = ScreenView;