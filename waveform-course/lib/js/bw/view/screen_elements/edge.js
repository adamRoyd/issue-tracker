/**
* @author Andy Galletly
*/

function EdgeView( m )
{
	var self = this;
	TimedElementView.call(self, m);
	
	self.edge_iframe = $('<iframe></iframe>');
	self.timer_tween;
	
	self.adobeEdge = null ;
	self.compId = null ;
	
	self.time = Number( self.xml_node.attr("time") );
	self.alt_image = self.xml_node.attr("altimg");
	self._use_ff_alt = false;
	
	self.super_setContent = self.setContent;
	self.setContent = function()
	{	
		//if ( devmode ) console.log( '\n%c*** EDGE setContent', 'color: red' )
		/*
		if( isFF() && self.alt_image && self._use_ff_alt )
		{
			self.$content = $( '<img src="'+self.alt_image+'" />' )
			self.super_setContent();
		}
		else
		{
		*/
			self.$div.css('display','block' );
			self.edge_iframe.css('display','block' );
			self.$content = self.edge_iframe;
		//	self.applyEdge();
			self.super_setContent();
		/*	
		}
		*/
		self.setReady()
		setTimeout( self.applyEdge , 0 );
	}
	
	self.setReady = function()
	{
		//self.model.setReady( false ) ;
		self.model.setReady( true ) ;
	}
	
	self.duration = null ;
	
	self.applyEdge = function()
	{
		if ( devmode ) console.log( 'Log: APPLY EDGE' )
		// add the iframe and give it the url from attr
		//if ( devmode ) console.log( '%c*** APPLY EDGE CALLED', 'color: red' ) ;
		
		//console.log("self.edge_iframe: %o", self.edge_iframe ) ;
		
		self.edge_iframe.attr( 'width', '100%' );
		self.edge_iframe.attr( 'height', '100%' );
		self.edge_iframe.attr( 'src', self.xml_node.attr("src") );
		self.edge_iframe.load( self.iFrameLoaded ) ;
		self.edge_iframe.attr( 'frameborder', '0' );
		
		//if ( devmode ) console.log( '____end of apply edge func' )
						
	}
	
	self.iFrameLoaded = function()
	{
		if ( devmode ) console.log( '>>>>>> iFrame loaded' )
		
		if ( isFF() )
		{
			var iframe_window = self.edge_iframe[0].contentWindow;
			iframe_window.oldGetComputedStyle = iframe_window.getComputedStyle;
			
			iframe_window.getComputedStyle = function( element, pseudoElt )
			{
				var t = iframe_window.oldGetComputedStyle( element, pseudoElt );
				if (t === null)
				{
					return {getPropertyValue:function(){}};
				}
				else
				{
					return t;
				}
			};
		}
		
		// add edge.css to loaded html page
		self.edge_iframe.contents().find( 'head' ).append( $( '<link rel="stylesheet" type="text/css" href="../edge.css">' ) ) ;
		
		var edgeContent = self.edge_iframe[0].contentWindow ;
		
		self.adobeEdge = edgeContent.AdobeEdge;
		
		
		var edgeStage = $( self.edge_iframe.contents() ).find( '#Stage' ) ;
		//edgeStage.css( 'background-color', 'transparent' ) ;
		edgeStage.addClass( 'edgeStage' ) ;
		
		//console.log("GET ACTUAL EDGE: %O", self.edge_iframe.AdobeEdge.getComposition( 'test_01' ));
		// binding new things
		
		
		self.adobeEdge.bootstrapCallback(function(compId) 
		{  
			//if ( devmode ) console.log( 'Log: STAGE  ' + self.edge_iframe.contents().find( '.edgeStage' ))
			self.edge_iframe.contents().find( '.edgeStage' ).css('backgroundColor', 'transparent' );
			//if ( devmode ) console.log( '%c*** BOOTSTRAP CALLBACK!', 'color: red' )
			//make the reference to the specific composition  
		  
			if( !self.compId )
			{
				self.compId = compId ;
			}
			
			//console.log("self.compId: " + self.compId) ;
			
			//console.log('self.adobeEdge.getComposition( self.compId ).getStage() %o', self.adobeEdge.getComposition( self.compId ).getStage() ) ;
			
			//self.adobeEdge.getComposition("waterTest").getStage().play( 1 ) ;
			
  
			self.playEdge = function()
			{
				self.adobeEdge.getComposition( self.compId ).getStage().play( 1 ) ;
			}
			
			self.stopEdge = function()
			{
				self.adobeEdge.getComposition( self.compId ).getStage().autoPlay = false ;
				self.adobeEdge.getComposition( self.compId ).getStage().stop() ;
			}
			
  
			self.adobeEdge.Symbol.bindTimelineAction(compId, "stage", "Default Timeline", "play", function(sym, e) 
			{	
				// set total duration in ms on play
				self.duration = sym.getDuration() ;		
			});
			
			self.adobeEdge.Symbol.bindTimelineAction(compId, "stage", "Default Timeline", "update", function(sym, e) 
			{	
				self.onUpdate() ;
			});
			
			self.adobeEdge.Symbol.bindTimelineAction(compId, "stage", "Default Timeline", "complete", function(sym, e) 
			{	
				currentScreen.view.doEventById("edgeComplete_" + self.oModel.id ) ;
			})
			
			//if ( devmode ) console.log( '\n*** EDGE decalre ready after boostrap callback' )
			self.setReady( ) ;			
			
			if( self.autoplay )
			{
				self.playEdge();
			}
			else
			{
				self.stopEdge();
			}
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
			
		// make sure gfx create stopped timelines
		/*
		if ( self.autoplay )
		{
			self.play();
		}
		*/
	}
	
	
	self.onUpdate = function()
	{
		var curTime = self.adobeEdge.getComposition( self.compId ).getStage().getPosition() ;
		self.timeUpdate( curTime/1000 ) ;
	}
	
	self.base_kill = self.kill;
	self.kill = function()
	{
		
		if ( devmode ) console.log( 'Log: KILL EDGE' );	
		self.edge_iframe.contents().find("body").html('');
		self.edge_iframe.attr( 'src', 'about:blank' );
		self.edge_iframe.empty().remove();
		self.base_kill()
		
		self.adobeEdge = null ;
		self.edge_iframe = null ;
	}
	
	self.play = function( args )
	{
	
		if ( devmode ) console.log("PLAY args: " + args ) ;
		
		self.playEdge()
	}
	
	self.pause = function( args )
	{
		
		if ( devmode ) console.log("PAUSE EDGE"); 
		//self.timer_tween.pause();
	}
	
	self.stop = function( args )
	{
		if ( devmode ) console.log("STOP EDGE"); 
		self.stopEdge()
		//self.timer_tween.pause();
	}
	
	self.reset = function( args )
	{
		self.current_cue = null;
		//self.timer_tween.pause(0);
		//self.timeUpdate();
	}
	
		
}
EdgeView.prototype = TimedElementView;
