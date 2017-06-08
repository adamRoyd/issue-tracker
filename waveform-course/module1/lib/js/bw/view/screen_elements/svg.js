var $_svgholder;
function SvgElementView( m )
{		
	var self = this ;
	ScreenElementView.call( self, m );
	self.svgcontent =  String( self.xml_node.text() ) ;
	self.url =  self.xml_node.attr('src') ;
	self.svg_element;
	self.url_has_desktop = false;
	self.url_has_phone = false;
	
	
	self.getFilenameFromURL = function( url )
	{
		var rtn = url.substring(url.lastIndexOf('/')+1, url.length);
		rtn = rtn.split('.').join('_');
		return rtn;
	};
	
	
	self.loadedfunction = function()
	{
		$('#'+self.svg_id).data('svgloaded', true)
		var svgDoc = $('#'+self.svg_id).find('object')[0].contentDocument;
		self.$svg_contents  = $(svgDoc).find('svg').clone();
		
		self.svgLoaded();
	}
	
	self.attatchsvgfunction = function()
	{

		self.svg_element = $( '<object data="' + self.url + '" type="image/svg+xml"><p>SVG not supported</p></object>' );
		
		self.svgdiv.append( self.svg_element );
		self.svg_element[0].addEventListener('load', self.loadedfunction, true);
		self.svg_element[0].addEventListener("SVGLoad", self.loadedfunction, true);
	}
	
	self.loadSvgInt$div = function()
	{
		
		if( !$_svgholder )
		{
			$_svgholder = $( '<div id="svgholder"></div>' );
			$( 'body' ).append( $_svgholder );
		}
		
		self.svg_id = self.getFilenameFromURL( self.url );
		
		if( $('#'+self.svg_id).data('svgloaded') )
		{
			var svgDoc = $('#'+self.svg_id).find('object')[0].contentDocument;
			self.$svg_contents  = $(svgDoc).find('svg').clone();
			
			self.svgLoaded();
		}
		else
		{
			if( $('#'+self.svg_id).length > 0 )
			{
				TweenMax.delayedCall(0.02, self.loadSvgInt$div );
			}
			else
			{
				self.svgdiv = $( '<div id="' +self.svg_id+ '"></div>' );
				$_svgholder.append( self.svgdiv );
				self.screen_view.arImageElements.push( self.url )
				
				if( isIE() || isFF() )
				{
					$.get( self.url, function(data) {
					  self.attatchsvgfunction();
					});
				}
				else
				{
					self.attatchsvgfunction();
				}
			}
		}
		
	}
	
	self.setContent = function()
	{
		
		
		self.screen.dispatcher.bind('showing', self.screen_showing);
		
		self.$content.empty()
		self.$div.append(self.$content);
		
		if( self.url )
		{
			self.loadSvgInt$div()
		}
		else
		{
			if ( devmode ) console.log( 'Log: self.svgcontent ' + self.svgcontent )
			self.svg_element = $( self.svgcontent );
			self.$content.append( self.svg_element );
			
			if ( devmode ) console.log( 'Log: %o', self.svg_element)
			self.svgLoaded();
		}
		
		
	}
	
	self.svgLoaded = function()
	{
		if(self.$svg_contents)
		{
			
			self.$content.empty().append(self.$svg_contents);
			
		}
		self.setReady();
		
		
	}
	
}
SvgElementView.prototype = ScreenElementView;