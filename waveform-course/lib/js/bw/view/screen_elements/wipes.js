/**
* @author Andy Galletly
*/

function WipesElementView( m )
{		
	var self = this ;
	ScreenElementView.call( self, m );
	self.click_nodes = [];
	self.reveal_nodes = [];
	self.click_array = [];
	self.reveal_array = [];
	self.auto_select_delay = 0;
	self.current_click = null;
	
	
	
	self.setContent = function()
	{
	
		self.$div.append(self.$content);
	
		for( var i = 0; i < self.xml_node.children().length; i++ )
		{
			var item = self.xml_node.children()[ i ];
			switch( item.nodeName )
			{
				case 'click': self.click_nodes.push(item);
					break;
				case 'reveal': self.reveal_nodes.push(item);
					break;
			}
		}
	
		if( self.xml_node.attr( 'autoselectdelay' ) )
		{
			self.auto_select_delay = self.xml_node.attr( 'autoselectdelay' )
		}
	
		self.createClicksAndReveals();
		
		TweenMax.delayedCall(0, self.attachRevealContent)
		TweenMax.delayedCall( self.auto_select_delay, self.autoSelect)
		
		self.base_setContent();
	}
	
	
	self.createClicksAndReveals = function()
	{
		
		for( var i = 0; i < self.click_nodes.length; i++ )
		{
			var click_item = $( self.click_nodes[ i ] );
			var reveal_item = $( self.reveal_nodes[ i ] );
			var clickdiv_id = self.idprefix + self.model.id + '_click_' + i ;
			var clickdiv = $( '<div class="click" id="' + clickdiv_id + '">' );
			clickdiv.data( 'id', i );
			clickdiv.data( 'event', click_item.attr( 'event' ) );
			clickdiv.data( 'selected', click_item.attr( 'selected' ) );
		//	clickdiv.append( click_item.text() );
			self.$content.append( clickdiv )
			
			var clickchildren = click_item.children();
			for( var j = 0; j < clickchildren.length; j++ )
			{
				var node = $( clickchildren [ j ] )
				
				node.attr( 'target', clickdiv_id );
				if( !node.attr( 'id' ) )
				{
					node.attr( 'id', clickdiv_id + "_item" + j );
				}
			}
			clickdiv.xml = click_item;
			
			applyClick(
				clickdiv,
				function () 
				{
					var elm = $( this ).data( 'elm' );
					self.selectTab( elm );	
				}
			)	
			self.click_array.push( clickdiv );
			
			var div_id = self.idprefix + self.model.id + '_reveal_' + i ;
			var revealdiv = $( '<div class="wipeContent" id="' + div_id + '">' );
			revealdiv.data( 'id', i );
			self.$content.append( revealdiv );
			
			var boxchildren = reveal_item.children();
			for( var j = 0; j < boxchildren.length; j++ )
			{
				var node = $( boxchildren [ j ] )
				
				node.attr( 'target', div_id );
				if( !node.attr( 'id' ) )
				{
					node.attr( 'id', div_id + "_item" + j );
				}
			}
			revealdiv.xml = reveal_item;
			
			tweenTo( revealdiv, 0, { autoAlpha: 0, height: 0, display: 'none' } );
			self.reveal_array.push( revealdiv );
			
		}
	}
	
	
	self.attachRevealContent = function()
	{
		for( var i = 0; i < self.click_array.length; i++ )
		{
			var item = self.click_array[ i ];
			
			self.screen_view.createScreenElements( item.xml );
		}
		for( var i = 0; i < self.reveal_array.length; i++ )
		{
			var item = self.reveal_array[ i ];
			
			self.screen_view.createScreenElements( item.xml );
		}
	}
	
	self.autoSelect = function()
	{
		for( var i = 0; i < self.click_array.length; i++ )
		{
			var item = self.click_array[ i ];
			if( item.data( 'selected' ) == 'true' )
			{
				self.selectTab( item );				
			}
		}
	}
	
	self.closeTab = function(click)
	{
		self.screen_view.doClickById( 'reset' );	
		click.removeClass( 'selected' );
		
		var reveal = self.reveal_array[ click.data( 'id' ) ];
		tweenTo( reveal, 0, { autoAlpha: 0,y: 0 } );			
		reveal.addClass('inactive');
		
		enableElement( click );
	}
	 
	self.selectTab = function( click )
	{	
		disableElement( click )			
		if (self.current_click == click) 
		{
			self.closeTab(click);
			self.current_click = null;
		} else 
		{
			if (self.current_click) 
			{
				self.closeTab(self.current_click)
			}
			self.openTab(click);
			self.current_click = click;
		}
	}
	
	self.openTab = function(click) 
	{	
		self.screen_view.doClickById( 'clicked_' + click.data( 'id' ) ) ;
		self.screen_view.doClickById( click.data('event') ) 
		
		click.addClass( 'selected' );		
		
		var completefunc = function() { 
			enableElement( click )			
		};	
		
		var reveal = self.reveal_array[ click.data( 'id' ) ];
		reveal.removeClass('inactive')
		
		tweenTo( reveal, 0, { autoAlpha: 0, y: 0, transform: null, display: 'block' } );	
		tweenTo( reveal, 0, { autoAlpha: 1, height: 100, onComplete: completefunc } );
	}	
	
}
WipesElementView.prototype = ScreenElementView;
