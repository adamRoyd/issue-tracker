/**
* @author Andy Galletly
*/

function SvgAnim( m )
{
	var self = this;
	TimedElementView.call(self, m);

	self.loop = false;	
	if ( self.xml_node.attr("loop") ) 
	{ 
		if ( self.xml_node.attr("loop").toLowerCase() == "true" ) 
		{ 
			self.loop = true; 
		} 
	}
	
	self.width 		= self.xml_node.attr('width') ;
	self.height 	= self.xml_node.attr('height') ;	
	self.disableTM 	= self.xml_node.attr('disableTM') == "true" ;	// Disable Tween Max
	self.fps		= 24;
	
	self.frame = 0 ;
	self.frameCount ;
	
	self.src_url 			=  self.xml_node.attr('src') ;	
	self.no_suffix = self.src_url.substr(0, self.src_url.lastIndexOf("."));
	self.comp;
		
	self.base_setContent = self.setContent;
	self.setContent = function()
	{
		if (self.xml_node.attr('fps'))
		{
			self.fps = Number( self.xml_node.attr('fps') );
		}

		//AJAX_JSON_Req(jsonfile, self.handle_AJAX_Complete);		
		
		$.getJSON( self.src_url, self.onJSONLoad );

		// (seemingly) delays apply player until html elements have rendered.
		// setTimeout( self.applyPlayer , 0 );
	
	}
	
	self.onJSONLoad = function( json )
	{
		self.prependFilePath( json );
		
		self.comp = new SVGAnim(
					   json,
					   self.width,
					   self.height,
					   self.fps
					   );		
		
		self.frameCount = self.comp.mc.m_frameCount ;
		if ( devmode ) console.log("SVG %s frame count: %s", self.id, self.frameCount ) ;
		// console.log("Here's the obj: %o", self ) ; ( IE doesnt understand this for whatever reason... )
		
		self.$content.append(self.comp.s.node);
		self.$div.append( self.$content );
		
		self.createCues( self.xml_node.children() );
		
		self.setReady() ;		
		self.duration = (1/self.fps) * self.frameCount ;
		
		self.reset();		
	}
	
	
	self.prependFilePath = function( json )
	{
		var filePath = self.src_url.substr(0, self.src_url.lastIndexOf("/"));
		for (var bitmapKey in json.DOMDocument.Bitmaps)
		{
			var bitmapObj = json.DOMDocument.Bitmaps[bitmapKey];
			bitmapObj.bitmapPath = filePath + bitmapObj.bitmapPath.substr(1, bitmapObj.bitmapPath.length - 1);
		}
	}
	
	self.base_kill = self.kill;
	self.kill = function()
	{
		self.base_kill()
	}
	
	self.applyFrame = function()
	{	
		self.timeUpdate( self.animationTween.time() ) ;		
		self.comp.mc.gotoAndStop( self.frame );
	}	
	
	self.play = function(frame)
	{	
		if (self.disableTM)
		{
			self.playNoTM();
			return;
		}
	
		TweenMax.killTweensOf( self ) ;
		self.frame = frame || 0 ;
		
		self.animationTween = tweenTo(self, (self.duration),
			{
				frame : self.frameCount,
				onUpdate : self.applyFrame				
			}
		);
		
		if( self.loop )
		{
			self.animationTween.repeat( -1 ) ;
		}
	}
	
	self.playNoTM = function()
	{
		self.comp.mc.play();
	}
	
	self.pause = function()
	{
		if (self.disableTM)
		{
			return;
		}		
		
		self.animationTween.pause() ;
	}
	
	self.stop = function()
	{
		if (self.disableTM)
		{
			self.stopNoTM();
			return;
		}				
		self.animationTween.pause() ;
		self.frame = 1 ;
		self.applyFrame() ;
	}
	
	self.stopNoTM = function()
	{		
		self.comp.mc.stop();
	}	
	
	self.replay = function()
	{
		if (self.disableTM)
		{
			return;
		}				
		
		self.animationTween.restart() ;
		TweenMax.delayedCall( 0, self.reset ) ;
	}
	
	self.reverse = function()
	{
		if (self.disableTM)
		{
			return;
		}				
		
		self.animationTween.reverse() ;
	}
	
	self.reset = function()
	{	
		self.comp.mc.gotoAndStop( 1 );	
		
		if(!self.loop)
		{
			self.comp.setLoop(0);
		}
		
		if( self.autoplay )
		{
			self.play();
		}
	
		self.current_cue = null ;
	}
	
    function AJAX_JSON_Req(url, cb)
    {
        AJAX_req = new XMLHttpRequest();
        AJAX_req.open("GET", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/json");
        
        AJAX_req.onreadystatechange = cb;
        AJAX_req.send();
    }	
	
}
SvgAnim.prototype = TimedElementView;
