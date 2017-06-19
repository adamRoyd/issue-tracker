function ResourceScreen( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	
	self.custom_xml;
	
	self.resourceButtons = [];
	
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
		alert("Called from resource_screen js") ;
	}
	
	//	<settings optwidth="180" optionoffset="10" radiomode="true" randomise="false" />
	self.createSettings = function( oXML )
	{
		
	}
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		if ( devmode ) console.log( 'ResourceScreen screentype LOADED' );
		
		for (var i = 0; i < self.arAllScreenElements.length; i++)
		{
			var elm = self.arAllScreenElements[i];
			if ( (elm.view.subScreenObject) && (elm.view.subScreenObject.view instanceof ResourceButton) )
			{
				var resourceBtn = elm.view.subScreenObject.view;

				self.resourceButtons.push(resourceBtn);
				resourceBtn.registerOverCallback(self.onResourceButtonRollover);
			}
		}
		
		self.super_screenLoaded();
	}
	
	self.onResourceButtonRollover = function(resourceBtn)
	{
		for (var i = 0; i < self.resourceButtons.length; i++)
		{
			var btn = self.resourceButtons[i];
			if (btn != resourceBtn)
			{
				btn.forceRollout();
			}
		}
	}
	
}
ResourceScreen.prototype = ScreenView;