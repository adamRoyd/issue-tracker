function ButtonElementView( m )
{
	var self = this ;
	ScreenElementView.call( self, m );
	
	self.setContent = function()
	{
		self.$content.addClass('btn');
		
		
		
		// applyClick( self.$div, click_function );
		
		self.$content.append( $( self.model.oXML ).text() );
		
		self.$div.append(self.$content);
		
		self.base_setContent();
	}
	
	
}
ButtonElementView.prototype = ScreenElementView;