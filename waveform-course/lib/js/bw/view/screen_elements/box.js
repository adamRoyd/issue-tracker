function BoxElementView( m )
{		
	var self = this ;
	ScreenElementView.call(self, m);
	
	self.setContent = function()
	{
		
		if( !self.xml_node.attr('bgcol') )
		{
			//self.$content.css( 'background-color', tidyColour( "FFFFFF" ) );
		}
		else
		{
			var bghex = tidyColour( self.xml_node.attr('bgcol') );
			var bgRGB = hexToRgb( bghex )
			var bgalpha = 1;
			if( self.xml_node.attr('bgalpha') )
			{
				bgalpha = Number( self.xml_node.attr('bgalpha') )
			}
			
			self.$div.css( 'background-color', 'rgba(' + bgRGB.r + ',' + bgRGB.g + ',' + bgRGB.b + ',' + bgalpha + ')');
		}
		
		if( self.xml_node.attr('scroll')=='true' )
		{
			self.$div.addClass( 'scrolling' )
		}
		
		var corner = parseNumberString( self.xml_node.attr('corner') )
		
		
		if( corner )
		{
		if ( devmode ) console.log( 'Log: BOX CORNER ' + corner)
			self.$div.css( 'border-radius', corner );
		}
		
		if( self.xml_node.attr('linewidth') || self.xml_node.attr('linecol') )
		{
			self.$div.css( 'border-width', self.xml_node.attr('linewidth')  + "px" );
			self.$div.css( 'border-color', tidyColour( self.xml_node.attr('linecol') ) );
			self.$div.css( 'border-style', "solid" );
			self.$div.css( 'border-radius', corner );
		}
		
		self.appendChildren( self.xml_node )
		
		self.base_setContent();
	}
}
BoxElementView.prototype = ScreenElementView;