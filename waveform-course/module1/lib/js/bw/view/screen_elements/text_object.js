function TextElementView( m )
{		
	var self = this ;
	ScreenElementView.call(self, m);
	self.view = self ;
	
	
	
	self.setContent = function()
	{
		self.$content.remove();
		// if ( devmode ) console.log( 'Log TEXT OBJECT SET CONTENT ' + self.model.id )
		if( self.xml_node.attr( 'type' ) == 'input' )
		{	
			self.$content = document.createElement("textArea");
			$(self.$content).css( 'padding', '5px');
			$(self.$content).css( 'width', self.xml_node.attr( 'width' ));
			$(self.$content).css( 'height', self.xml_node.attr( 'height' ));
			$(self.$content).css( 'box-sizing', 'border-box' );
			$(self.$content).css( 'resize', 'none' );
			
			var initialVal = self.xml_node.text()
			$(self.$content).attr("initialVal",initialVal)
			$(self.$content).val(initialVal);
			
			$(self.$content).focus(function(){
				if ( self.value == $(self).attr("initialVal") ) {
					self.value = "";
				}
			});
			
			if (self.$content.addEventListener) 
			{
				self.$content.addEventListener('input', function() 
				{
					// event handling code for sane browsers
					self.screen_view.doEventById("inputUpdated") ;
					
					
					coursetextObj.storeText( self.value, self.xml_node.attr( 'id' )  )
				}, 
				false);
			} 
			else if (self.$content.attachEvent) 
			{
				self.$content.attachEvent('onpropertychange', function() 
				{
					self.screen_view.doEventById("inputUpdated") ;
					
					//courseTextObj.storeText( )
				});
			}		
		}
		else
		{
			
			var fullText = self.xml_node.text()  ;
			
			fullText = doStringReplacements( fullText ) ;
			
			self.$content = $(fullText);
			
			if( self.xml_node.attr('scroll') && self.xml_node.attr('scroll') == "true" )
			{
				self.$div.css('overflow', 'auto');
			}
		}
		
		self.$div.append(self.$content);
				
		var selectables = self.$div.find('.selectable')
		
		for( var i = 0; i < selectables.length; i++ )
		{
			var item = $( selectables[ i ] );
			
			if( item.data('event') )
			{
				
				item.click( function()
				{						
										
					self.screen_view.doEventById( $(this).data('event') ) ;  
					
				} );
			}
			
			if( item.data('glossary') )
			{
				
				item.click( function()
				{						
					openGlossaryAtTerm( $(this).data('glossary')) ;  
				} );
			}
			//item = $('<span class="selectable span1" data-event="event1">Lorem ipsum dolor sit amet</span>')
		}
		
		
		self.base_setContent();
	}
	
	self.update = function(  )
	{
		self.setContent();
		
	}
	
}
TextElementView.prototype = ScreenElementView;