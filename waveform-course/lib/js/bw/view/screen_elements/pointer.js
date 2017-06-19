/**
* @author Andy Galletly
*/

function PointerElementView( m )
{		
	var self = this ;
	ScreenElementView.call( self, m );
	
	
	self.setContent = function()
	{
		self.arrow = $( '<div class="arrow" />' );
		
		if( $(self.model.xml).attr("colour"))
		{
			self.arrow.css( 'border', 'solid' );
			self.arrow.css( 'border-color', tidyColour( $(self.model.xml).attr("colour") ) );
		}
		
		// set a default width in case no width is set in xml
		if( !$(self.model.xml).attr("width"))
		{
			$(self.model.xml).attr("width", 20);
		}
		
		self.arrow.css( 'border-width', $(self.model.xml).attr("width")/2 );
				
		// check values against xml to avoid checking default values
		var className = $(self.model.xml).attr("class")
		
		
		var pointerWidth = Number( $(self.model.xml).attr("width") ) ;
		
		var marginCorrection = ( pointerWidth/2 )*-1 ;
				
		if(  !$(self.model.xml).attr("x") )
		{				
			
			self.model.x = '50%' ;
			self.$div.css( 'left', '50%');			
		}
		
		if(  !$(self.model.xml).attr("y") )
		{
			self.model.y = '50%' ;
			self.$div.css('top', '50%');
		}
		
		switch( $(self.model.xml).attr("dir") )
		{
			case "down":				
				self.$div.addClass( 'down' ) ;
				if(  !$(self.model.xml).attr("y") )
				{					
					self.model.y = '100%' ;
					self.$div.css('top', '100%');
				}
				//if(  !$(self.model.xml).attr("x") )
				//{
					self.$div.css( 'margin-left', marginCorrection + 'px' ) ;
				//}
			break;
			
			case "left":
				self.$div.addClass( 'left' ) ;
				if(  !$(self.model.xml).attr("x") )
				{						
					self.model.x = (Number( $(self.model.xml).attr("width")/2 )*-1 )  ;
					self.$div.css('left', self.model.x);
				}
				//if(  !$(self.model.xml).attr("y") )
				//{
					self.$div.css( 'margin-top', marginCorrection + 'px' ) ;
				//}
			break ;
			
			case "right":
				self.$div.addClass( 'right' ) ;
				if(  !$(self.model.xml).attr("x") )
				{	
					self.model.x = '100%' ;
					self.$div.css('left', '100%');
				}
				//if(  !$(self.model.xml).attr("y") )				
				//{
					self.$div.css( 'margin-top', marginCorrection + 'px' ) ;
				//}
			break;
			
			default:
				self.$div.addClass( 'up' ) ;
				if(  !$(self.model.xml).attr("y") )
				{					
					self.model.y = (Number( $(self.model.xml).attr("width")/2 )*-1 )  ;
					self.$div.css('top', self.model.y );
				}
				//if(  !$(self.model.xml).attr("x") )
				//{	
					
					self.$div.css( 'margin-left', marginCorrection + 'px' ) ;
				//}
			break;
			
			
		}
		self.$div.append( self.arrow );
		self.base_setContent();
	}
	
	
	
}
PointerElementView.prototype = ScreenElementView;
