
// console.log("screentype text_graphic.js");
		
function Glossary(s)
{
	var self = this ;
	ScreenView.call(self, s);
	self.screen 				= s;
	self.view = self ;
	self.custom_xml 					= null;
	
	//display
	self.glossaryHolder ;
	self.glossaryNavHolder ;
	self.glossaryContentHolder ;
	
	// array holding all letter block objects
	self.letterBlocksArray = [] ;
	
	// array holding all term objects
	self.termsArray = [] ;
	
	self.scrolltween = null;
	self.scroll_id = null;
	
	
	self.heightAttempts = 0 ; 
	// console.log("screentype text_graphic() obj");
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		//self.$div = self.custom_element.view.$div;
		
		self.heightAttempts = 0 ; 
		self.createDisplay() ;
		self.parseXML() ;
		
		return self.custom_element;
	}
	
	self.onScrollUpdate = function ()
	{
		courseTimer.resetTimer() ;
	}	
	
	self.parseXML = function()
	{		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;
			// if ( devmode ) console.log( i + " - " + xml_node.nodeName );
			
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
					
				case "letter_block": self.createLetterBlock( $( xml_node ) ) ;
					break;					
			}
		}
	}
	
	self.createDisplay = function()
	{
		self.width = $(self.custom_xml).attr('width');
		self.height = $(self.custom_xml).attr('height');
		
		
		
		self.x = $(self.custom_xml).attr('x');
		self.y = $(self.custom_xml).attr('y');
		 
		self.glossaryHolder = $('<div class="glossary_holder" id="' + self.screen.id + '_glossary_holder"></div>');
			
		self.$div.addClass('glossary');
		self.$customdiv.append(self.glossaryHolder);
				
		self.glossaryNavHolder = $('<div class="glossary_nav_holder" id="' + self.screen.id + '_glossary_nav_holder"></div>');
		self.glossaryHolder.append(self.glossaryNavHolder);
		
		self.glossaryContentHolder = $('<div class="glossary_content_holder" id="' + self.screen.id + '_glossary_content_holder"></div>');
		self.glossaryHolder.append(self.glossaryContentHolder);
		
		//TweenMax.delayedCall( 0, self.updateHeight ) ;
	}
	
	self.updateHeight = function()
	{
		if( _respondo.phone())
		{
			/*
			if ( devmode ) console.log( "\nHEIGHT STUFF") ;
			if ( devmode ) console.log( "glossaryContentHolder: %o", self.glossaryContentHolder ) ;			
			if ( devmode ) console.log( "$div height: " + self.$div.innerHeight()) ;
			if ( devmode ) console.log( "$div height 2: " + self.$div.height()) ;
			if ( devmode ) console.log( "$div top: " + self.$div.offset().top) ;
			if ( devmode ) console.log( "$div top: " + self.$div.css( 'top')) ;
			if ( devmode ) console.log( "$div padding-top: " + self.$div.css( 'padding-top')) ;
			if ( devmode ) console.log( "$div padding-bottom: " + self.$div.css( 'padding-bottom')) ;
			if ( devmode ) console.log( "$dialogueholder padding-bottom: " + $( '#dialogueholder').css( 'padding-bottom')) ;
			*/
			
			var $divTop = stripPX( self.$div.css( 'top')) ;
			var $divHeight = self.$div.innerHeight() ;
			var holderPaddingTotal = stripPX( $( '#dialogueholder').css( 'padding-top' )) + stripPX($( '#dialogueholder').css( 'padding-bottom' ))
			var glossaryTop = self.glossaryContentHolder.offset().top ;
			
			
			//var phoneGlossaryHeight = ( $divHeight - $divTop - holderPaddingTotal ) - glossaryTop ;	
			var phoneGlossaryHeight = ( $divHeight - $divTop ) ;	
						
			if( phoneGlossaryHeight < 1 )
			{				
				self.heightAttempts++ ; 
				
				if( self.heightAttempts < 10 )
				{
					TweenMax.delayedCall( 0, self.updateHeight ) ;
				}
				else
				{
					console.warn("GLOSSARY HEIGHT FAIL") ;
				}
			}
			
			var phoneGlossaryHeightPixels = String( phoneGlossaryHeight ) + 'px' ;
			
			self.$customdiv.css( 'height', phoneGlossaryHeightPixels ) ;
		}
	}
	
	self.createSettings = function( custom_xml )
	{
		//self.width  	= Number( custom_xml.attr( "width" ) );
	}
	
	self.createLetterBlock = function( custom_xml )
	{
		//console.log("LETTER BLOCK: " + custom_xml.attr( "id" )) ;
		//self.optionwidth  	= Number( custom_xml.attr( "optwidth" ) );
		var letterBlock = {} ;
		letterBlock.termArray = [] ;
		
		letterBlock.id = custom_xml.attr( "id" ).replace(/\s+/g, '');
		
		letterBlock.$customdiv = $('<div class="letterBlock" id="' + letterBlock.id + '"></div>');
		$( letterBlock.$customdiv ).css( 'position', 'relative' ) ;
		self.glossaryContentHolder.append( letterBlock.$customdiv ) ;
		//$( letterBlock ).attr( 'target', 
		
		var termChildren = $( custom_xml ).children() ;
		
		for ( var i = 0; i < termChildren.length; i++)
		{
			var termXML = $( termChildren[ i ] );						
			var termObj = self.createTerm( letterBlock, termXML ) ;
			
			$( termObj ).attr( 'target', letterBlock.id ) ;
			
			letterBlock.termArray.push( termObj ) ;
		}		
		
		self.letterBlocksArray.push( letterBlock ) ;
	}
	
	self.createTerm = function ( letterBlock, termXML )
	{
		var termObj = {};
		termObj.id = termXML.attr( 'id' ).replace(/\s+/g, '');
		termObj.xmlNode = termXML ;
		
		
		termObj.$customdiv = $('<div class="term" id="' + termObj.id + '"></div>');
		
		letterBlock.$customdiv.append( termObj.$customdiv ) ;
				
		var termChildren = $( termXML ).children()
		for ( var i = 0; i < termChildren.length; i++)
		{
			var node = $( termChildren[ i ] );			
			
			$(node).attr( 'target', termObj.id ) ;
			if( !node.attr( 'id' ) )
			{
				node.attr( 'id', 'cell_' + termObj.id + '_item' + i );
			}
		}
			
		self.termsArray.push( termObj );
		return termObj;
	}
	
	self.attachContents = function()
	{
		//if ( devmode ) console.log( 'attachContents called' )
		//if ( devmode ) console.log( 'self.termsArray: %o', self.termsArray )	
		
		for( var i = 0; i < self.termsArray.length; i++ )
		{
			var term = self.termsArray[ i ];			
			self.createScreenElements(term.xmlNode);
		}
	}
	
	
	self.glossaryScrollTo = function( id )
	{
		//tweenTo(self.$customdiv, 0, {scrollTo:{y:0, x:0}});	
		id = id.replace(/\s+/g, '');
		var scrollToElement = self.getLetterBlockById( id ) ;
		
		var subScrollValue = 0 ;
		if( !scrollToElement )
		{			
			scrollToElement = self.getTermById( id ) ;			
			var firstLetter = id.charAt( 0 ) ;
			var parentScrollToElement = self.getLetterBlockById( firstLetter ) ;
			
			subScrollValue =  document.getElementById( parentScrollToElement.id ).offsetTop ;
			
			self.highlightElement( scrollToElement ) ;
		}
			
		if( !scrollToElement )
		{
			console.warn("No term or letter block found with id: " + id ) ;
			return ;
		}
		
		var offsetY = document.getElementById( scrollToElement.id ).offsetTop + subScrollValue ;
		var scrollTargetPos = Number( $( scrollToElement.$customdiv ).position().top );		
		var offsetWithHolderPosition = scrollTargetPos + self.$customdiv.top ;
				
		// slight buffer to stop it being too tight to the top
		offsetY -= 5 ;
		
		self.scrolltween = tweenTo(self.$customdiv, 0.5, {scrollTo:{y:offsetY, x:0}, ease:Power4.easeOut});		
	}
	
	self.highlightElement = function( letterBlock )
	{
		console.log("HIGHLIGHT ELM: %o", letterBlock.$customdiv.find('.term_title')) ;
		var titleDiv = letterBlock.$customdiv.find( '.term_title' ) ;
		var titleDivText = titleDiv.find( 'p' ) ;
		
		TweenMax.set( titleDiv, { className: '+=selected' }) ;
		TweenMax.to( titleDiv, 5, { className: '-=selected', delay: 1 }) ;
		
		TweenMax.set( titleDivText, { className: '+=selected' }) ;
		TweenMax.to( titleDivText, 5, { className: '-=selected', delay: 1 }) ;
		
		//titleDiv.addClass( 'selected' ) ;
		
		
	}
	
	self.getLetterBlockById = function( id )
	{
		var rtn = null ;
		
		for( var i = 0; i < self.letterBlocksArray.length; i++ )
		{
			var item = self.letterBlocksArray[ i ];
			
			if( item.id.toLowerCase() == id.toLowerCase() )
			{
				rtn = item ;
				break ;
			}
		}
		
		return rtn ;
	}
	
	self.getTermById = function( id )
	{
		var rtn = null ;
		
		for( var i = 0; i < self.termsArray.length; i++ )
		{
			var item = self.termsArray[ i ];
			
			if( item.id.toLowerCase() == id.toLowerCase() )
			{
				rtn = item ;
				break ;
			}
		}
		
		return rtn ;
	}
	
	/*
	self.screenElementsReady = function()
	{
		
		self.attachContents();
		
	}
	*/
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		
		
		$( "#glossary_glossary" ).on("scroll", self.onScrollUpdate);
		
		self.attachContents();
		
		if ( devmode ) console.log( 'Log GLOSSARY LOADED' );
		
		TweenMax.delayedCall( 0, self.updateHeight ) ;
		
		if( self.screen.initVars )
		{			
			// glossary will assume the first element of an initVars array will be a glossary entry to scroll toGMTString			
			TweenMax.delayedCall( 0.2,  self.glossaryScrollTo, [self.screen.initVars[ 0 ]] )			
		}
		
		
		self.super_screenLoaded();
	}
	
	

	self.super_kill = self.kill ;
	self.kill = function(  )
	{
		if ( devmode ) console.log( 'Log GLOSSARY KILL' );
		$( "#glossary_glossary" ).off("scroll", self.onScrollUpdate);
		
		if( self.scrolltween )
		{
			self.scrolltween.kill();
			self.scrolltween = null;
		}
		self.$customdiv.empty().remove();
		self.super_kill() ;
	}
	
}
Glossary.prototype = ScreenView;