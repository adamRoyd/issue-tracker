function ResourceButton( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	
	self.custom_xml;
	self.resourceType;
	
	self.overCallback;
	
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
		alert("Called from resource_video js") ;
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
		if (xml_node.nodeName == 'image' && xml_node.getAttribute('class').indexOf('resourceImage') > -1)
		{		
			var imagePath = self.screen.oXML.attr('image');
			xml_node.textContent = imagePath;
		}
	}
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{	
		self.resourceType = self.screen.oXML.attr('resourceType');
		self.$div.parent().addClass(self.resourceType);

		var title = self.screen.oXML.attr('title');
		var description = self.screen.oXML.attr('description');
		
		var titleDiv = self.$div.find('.title');
		var descriptionDiv = self.$div.find('.description');
		titleDiv.empty().append(title);
		descriptionDiv.empty().append(description)
		
		self.updateEvents();
		
		if ( devmode ) console.log( 'ResourceButton screentype LOADED' );
		self.super_screenLoaded();
	}

	self.updateEvents = function()
	{
		for (var i=0; i < self.arEvents.length; i++)
		{
			var event = self.arEvents[i];
			for (var j=0; j < event.clickEvents.length; j++)
			{
				var clickEvent = event.clickEvents[j]	
				var $clickEventXml = $(clickEvent.oXML);
				if ($clickEventXml.attr('id') == "RESOURCE_TYPE")
				{
					$clickEventXml.attr('id', self.resourceType);
				}
			}
			

		}
		
	}
	
	self.registerOverCallback = function (cb)
	{
		self.overCallback = cb;
	}
	
	self.forceRollout = function()
	{	
		if (self.prevOverTarget)
		{
			self.prevOverTarget.view.rollout();
		}
	}
	
	self.prevOverTarget;
	
	self.doEvents = function(evt, type, target)
	{
		if( evt )
		{
			var events_arr = evt.split(",");
			
			if( type == null )
			{
				type = "click" ;
			}
			
			if(type=="over")
			{
				self.prevOverTarget = target;
				if (self.overCallback) self.overCallback(self);
			}
			if(type=="out")
			{
			}
			
			if(type=="click")
			{
				for(var i=0; i<events_arr.length; i++)
				{
					self.doEventById(events_arr[i], type, target);
				}
				
				
				self.doEventById(self.resourceType, type, target);
			}
			else
			{
				self.doEventById(events_arr[events_arr.length-1], type, target);
			}
		}
	}	
	
}
ResourceButton.prototype = ScreenView;