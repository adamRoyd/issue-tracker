function LineElementView( m )
{		
	var self = this ;
	ScreenElementView.call(self, m);
	
	self.setContent = function()
	{
		self.$content.width( xml_node.attr('x2') - xml_node.attr('x') );
		self.$content.height( xml_node.attr('y2') - xml_node.attr('y') );
		
		self.$content.css( 'border-color', tidyColour( xml_node.attr('colour') ) );
		self.$content.css( 'border-width', xml_node.attr('weight') );
		self.$content.css( 'border-style', 'dashed' );
		self.$content.css( 'border-right', 'none' );
		self.$content.css( 'border-bottom', 'none' );
		
		self.$div.append(self.$content);
		self.base_setContent();
	}
}
LineElementView.prototype = ScreenElementView;