
// console.log("screentype text_graphic.js");
		
function Photostory(s)
{
	var self = this; 
	
	ScreenView.call(self, s);
	self.super_screenLoaded = self.screenLoaded;
	self.view = self;
	
	
	
	self.custom_xml 					= null;
	self.width;
	self.height;

	// elements
	self.$customdiv;
	self.nextBtn ;
	self.backBtn ;
	self.progressHolder = $( document.createElement('div') );
	
	self.buttonnumbers = false;
	self.overrideNav = false;
	self.progressnav = true;
	self.progressIconArray = [] ;
	self.cellArray = [] ;
	self.active_cell_index = 0;
	
	self.totalCells = 0 ;
	self.transitionTime = 0.2 ;
	
	self.auto = null;
	self.transitionType = "default" ;
	
	self.startFrame = 0 ;
	
	// console.log("screentype text_graphic() obj");
	self.super_custom = self.custom;
	self.custom = function(custom_xml_node)
	{		
		self.custom_xml = $( custom_xml_node );
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		
		self.width = Number( self.custom_xml.attr('width') );
		self.height = Number( self.custom_xml.attr('height') );
		self.x = self.custom_xml.attr('x');
		self.y = self.custom_xml.attr('y');
		
		self.photostoryWidth = self.width ;
		
		self.photostoryHolder = $('<div class="photostory_holder" id="custom' + self.screen.id + '_photostory_'+self.custom_element.id+'"></div>');
		
		self.photostoryHolder.css( "overflow", "hidden" );
		self.$customdiv.addClass('photostory');
		self.$customdiv.append(self.photostoryHolder);
		
		self.strip = $('<div class="strip"></div>');
		tweenTo( self.strip, 0, { autoAlpha: 0} ) ;
		
		self.photostoryHolder.append( self.strip );
		
		
		self.progressHolder.attr('class', 'progress');		
		self.$customdiv.append(self.progressHolder);
		
		for ( var i = 0; i < self.custom_xml.children().length; i++)
		{
			
			var xml_node = self.custom_xml.children() [ i ] ;
			
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
				
				case "cell": 
					var index = self.cellArray.length;
					var cell_object = new self.createCell( index, $( xml_node ) );
					this.cellArray.push( cell_object );
					
				break;
			}
		}
		
		self.totalCells = self.cellArray.length ;
		
		return self.custom_element;
	}
	
	self.super_kill = self.kill;
	self.kill = function()
	{
		self.stopAuto();
		self.super_kill();
	//	_respondo.dispatcher.unbind( 'updateSize' , self.updateSize );
	}
	
	self.createSettings = function( settings_xml )
	{
		self.dragnav = Boolean( $(settings_xml).attr('dragnav') == "true" );
		self.buttonnumbers = Boolean( $(settings_xml).attr('buttonnumbers') == "true" );
		self.buttony = Number( $(settings_xml).attr('buttony'));
		self.overrideNav = Boolean( $(settings_xml).attr('overridenav') == 'true' );
		
		if( $( settings_xml).attr( 'progressnav' ))
		{
			self.progressnav = Boolean( $(settings_xml).attr('progressnav') == 'true' );
		}
		
		self.auto = Number( $(settings_xml).attr('auto'));
		
		self.screen.reloadOnResize();
		
		if( $( settings_xml).attr( 'transition' ))
		{
			self.transitionType = $( settings_xml).attr( 'transition' ) ;
		}
		if( $( settings_xml).attr( 'transitiontime' ))
		{
			self.transitionTime = $( settings_xml).attr( 'transitiontime' ) ;
		}
		
		if( $( settings_xml).attr( 'startframe' ))
		{
			self.startFrame = $( settings_xml).attr( 'startframe' ) ;
		}
		//_respondo.dispatcher.unbind( 'updateSize' , self.updateSize );
		//_respondo.dispatcher.bind( 'updateSize' , self.updateSize );
	}
	
	self.createCell = function( index, cell_node )
	{ 
		if ( devmode ) console.log("createCell %s", index ) ;
		//this.screen.view.createScreenElements(cell_node);
		var cell_object = this;
		
		cell_object.index = index;
		//this.clicktext = $( click_node.text() );
		
		if( cell_node.attr("id") )
		{
			cell_object.id = cell_node.attr("id");
		}
		else
		{
			cell_object.id = 'cell'+index;
		}
		
		
		cell_object.element_id = 'custom' + self.screen.id + '_' + self.custom_element.id + '_' + cell_object.id	;
		cell_object.cellDiv = $('<div class="cell" id="' + cell_object.element_id + '"></div>');
		
		cell_object.cellpos = ( index * self.width )
		cell_object.cellDiv.css( "left", cell_object.cellpos) ;
		cell_object.cellDiv.css( "top", 0) ;
		
		cell_object.cellDiv.css('width', self.width )
		cell_object.cellDiv.css('height', self.height );

		
		
		cell_object.event = cell_node.attr("event") ;
		if( !cell_object.event )
		{
			cell_object.event = '';
		}

		cell_object.layerWidth = cell_node.attr("width") ;
		
		self.strip.append( cell_object.cellDiv );
		
		var layerchildren = cell_node.children();
		for( var i = 0; i < layerchildren.length; i++ )
		{
			var node = $( layerchildren[ i ] );
			
			node.attr( 'target', cell_object.element_id );
			if( !node.attr( 'id' ) )
			{
				node.attr( 'id', 'cell_' + cell_object.element_id + '_item' + i );
			}
		}
			
		cell_object.cell_node = cell_node ;
		
		TweenMax.delayedCall( 0, function(){ self.createScreenElements(cell_object.cell_node) } );
		
	}
	
	self.attachControls = function()
	{
		var progressmarker_element = self.getScreenElementById('progressmarker');
		if( self.progressHolder )
		{
			self.progressHolder.empty();
			self.progressHolder.css('top', self.buttony);	
			self.progressIconArray = [];
		}
		var width = 0;
		
		for( var i = 0; i < self.cellArray.length; i++)
		{
			
			var progressIconDiv = $( document.createElement('div') );
			
			
			
			progressIconDiv.attr('class', 'progressButton');	
			if (i ==0)
			{
				progressIconDiv.addClass('visited');
			}
			
			progressIconDiv.index = i ;
			
			if( self.buttonnumbers )
			{
				progressIconDiv.append( '<div class="inner"><p>'+(progressIconDiv.index+1)+'</p></div>' )
			}
			
			var progressmarker = null;
			if(progressmarker_element)
			{
				progressmarker = progressmarker_element.getDiv().clone();
				progressIconDiv.append(progressmarker);
			}
			
			self.progressHolder.append(progressIconDiv);	
			
			
			progressIconDiv.event = self.cellArray[ i ].event; 
			
			self.progressIconArray.push( progressIconDiv ) ;
			
			if( self.progressnav )
			{
				applyClick(
					progressIconDiv,
					
					function () {
						var elm = $( this ).data( 'elm' );
						self.selectProgressIcon( elm );						
					}
				);
			}
		}
		
		
		
	}
	
	self.updateSize = function()
	{
		self.stopAuto();
		self.screen.reloadScreen();
	
	}
	
	
	//self.screenElementsReady = function()
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		self.attachControls()
		//setTimeout( self.setupScrollControls, 100) ;
		TweenMax.delayedCall(0, self.setupScrollControls) ;
		
		self.showInitialFrame() ;
		
		self.super_screenLoaded();		
		
	}
	
	self.showInitialFrame = function()
	{
		if( Number( self.startFrame ) >= self.cellArray.length )
		{
			self.startFrame = self.cellArray.length - 1 ;
		}
		self.displayCellByIndex( self.startFrame ) ;		
	}

	self.setupScrollControls = function()
	{
		//tweenTo( self.photostoryHolder, 2, { x: -700, yoyo : true, repeat : -1 }) ;
		
		var snaparray_x = [];
		for( var i = 0; i < self.cellArray.length; i++ )
		{
			var oCell = self.cellArray[ i ];
			oCell.cellpos = ( i ) * self.photostoryHolder.width();
			oCell.cellDiv.css( "left", ( oCell.cellpos )) ;
			snaparray_x.push( 0-oCell.cellpos )
		}
		
		if( self.dragnav )
		{
			if( _respondo.desktop() )
			{
				if ( !(isIE()==8) )
				{
					Draggable.create(
						self.strip, 
						{
							type:"left", 
							edgeResistance:4, 
							throwProps:true, 
							zIndexBoost:false,
							snap: {
								left: snaparray_x
								},
							onDrag: function()
								{
									self.stopAuto()
								},
							onThrowComplete : function()
								{
									self.setActiveCellByPosition()
								}
								
						}
					);
				}
			}
		}
		//this.init() ;
		self.activateCell()
		
		if( self.auto && _respondo.desktop() )
		{
			self.auto_delay = TweenMax.delayedCall(self.auto, self.autoPage)
		}
		
	}	
	
	self.autoPage = function(  )
	{
		if( self.active_cell_index == self.cellArray.length-1 )
		{
			self.auto_restart();
		}
		else
		{
			self.auto_nextCell();
		}
		self.auto_delay = TweenMax.delayedCall(self.auto, self.autoPage);
	};

	self.stopAuto = function(  )
	{
		if( self.auto_delay )
		{
			self.auto_delay.kill();
		}
	};
	
	/* ============================= SCREEN SPECIFIC FUNCTIONALITY ================================== */
	
	self.displayCellByIndex = function( index, t )
	{
		if( !t )
		{
			t = self.transitionTime;
		}
		
		var cell_object = self.cellArray[index]
		self.displayCell( cell_object.id, t ) ;
	}
	
	self.displayCellById = function( id, t )
	{
		self.displayCell( id, t ) ;
	}
	
	self.displayCell = function( id, t )
	{	
		switch( self.transitionType )
		{
			case "fade":
				self.fadeToFrame( id, t ) ;
			break ;
			
			default:
				self.scrollToFrame( id, t ) ;
			break ;
		}
	}	
	
	self.fadeToFrame = function( id, t )
	{
		tweenTo( self.strip, self.transitionTime/2, { autoAlpha: 0, ease: Power2.easeIn, onComplete: self.fadeIn, onCompleteParams:[ id ] } );
	}
	
	self.fadeIn = function( id )
	{
		console.log("FADE IN CELL: %s", id ) ;
		var cell_object = getItemById( id, self.cellArray )
		self.doEventById( 'initFrame_' + cell_object.index ) ;
		self.active_cell_index = cell_object.index ;
		tweenTo( self.strip, 0.01, { left: 0-cell_object.cellpos, onComplete: self.activateCell } );
		tweenTo( self.strip, self.transitionTime/2, { delay:0.1, autoAlpha: 1,ease: Power2.easeIn }) ;
	}
	
	self.scrollToFrame = function( id, t ) 
	{

		if( !t )
		{
			t = self.transitionTime
		}
		
		var cell_object = getItemById( id, self.cellArray )
		
		self.active_cell_index = cell_object.index ;
		self.updateProgressDisplay( );
		tweenTo( self.strip, t, { autoAlpha:1, left: 0-cell_object.cellpos, onComplete: self.activateCell } );
	}
	
	self.setActiveCellByPosition = function( )
	{
		self.stopAuto();
		var index=0;
		for( var i = 0; i < self.cellArray.length; i++ )
		{
			var oCell = self.cellArray[ i ];
			
			if( Math.round( self.strip.position().left ) == Math.round( 0-oCell.cellpos ) )
			{
				index = i
			}
		}
	
		self.active_cell_index = index ;
		self.activateCell();
	}
	
	
	self.activateCell = function()
	{
		if ( devmode ) console.trace( 'Trace: activateCell ' + self.active_cell_index);
		var active_cell = self.cellArray[ self.active_cell_index ];
		var cellEvent = 'update,'+active_cell.id+','+active_cell.event;
		self.doClickById( cellEvent );
		self.updateProgressDisplay( );
		
		if( self.active_cell_index == self.cellArray.length-1 )
		{
			self.showRestartButton();
		}
		else
		{
			self.showNextButton();
		}
		
		if( self.active_cell_index == 0 )
		{
			self.hideBackButton()
		}
		else
		{
			self.showBackButton()
		}
		
		navObj.initNav() ;
	}
	
	self.lastpos = function()
	{
		return ( self.progressIconArray.length * self.photostoryWidth );
	}
	
	self.nextCell = function()
	{
		self.stopAuto();
		self.auto_nextCell()
	}
	
	self.auto_nextCell = function(  )
	{
		if( self.active_cell_index < self.cellArray.length-1 )
		{
			self.active_cell_index++ ;
			self.updateProgressDisplay( );
			self.displayCellByIndex( self.active_cell_index ); 
			navObj.initNav() ;
		}
	};
	
	
	self.backCell = function()
	{
		if( self.active_cell_index > 0 )
		{
			self.active_cell_index-- ;
			self.updateProgressDisplay( );
			self.displayCellByIndex( self.active_cell_index ); 
			navObj.initNav() ;
		}
	}
	
	self.restart = function(  )
	{
		self.stopAuto();
		self.displayCellByIndex( 0 ); 
	};
	
	self.auto_restart = function(  )
	{
		self.displayCellByIndex( 0 ); 
	};
	
	
	
	self.showRestartButton = function(  )
	{
		var nextBtn = self.getScreenElementById( 'nextBtn' );
		disableContentButton( nextBtn );
		var restartBtn = self.getScreenElementById( 'restartBtn' );
		enableContentButton( restartBtn );
	};

	self.hideBackButton = function(  )
	{
		var backBtn = self.getScreenElementById( 'backBtn' );
		disableContentButton( backBtn );
	};

	self.showBackButton = function(  )
	{
		var backBtn = self.getScreenElementById( 'backBtn' );
		enableContentButton( backBtn );
	};

	self.showNextButton = function(  )
	{
		var restartBtn = self.getScreenElementById( 'restartBtn' );
		disableContentButton( restartBtn );
		var nextBtn = self.getScreenElementById( 'nextBtn' );
		enableContentButton( nextBtn );
	};
	
	// ------------------ OVERRIDE NAV CHECKS ---------------------- //
	
	/*
		These functions are called from screen.js in order to check whether this template wants to override the nav buttons
		If it does, it returns true in the check, then performs the actual override
		If not, false is returned, and the navigation continues its goNext called
		
		The following 4 functions will be needed for any template requiring an override.
		A template with no override defined will always return false at screen.js level
	*/
	
	self.checkOverrideNext = function()
	{
		if (!self.screen.completed)
		{
			return true;
		}
		
		if( self.overrideNav )
		{
			if( self.active_cell_index >= (self.totalCells -1 ) || _respondo.phone() )
			{
				return false ;
			}
			else
			{
				return true ;
			}
		}
		else
		{
			return false ;
		}
	}
	
	self.overrideNext = function()
	{
		if (!self.overrideNav)
		{
			self.screen.doClickById("onContentNotSeen");
			self.screen.screenCompleted();
		}
		else
		{	
			self.nextCell( );
		}
	}
	
	self.checkOverrideBack = function()
	{
		if( self.overrideNav )
		{
			if( self.active_cell_index == 0 || _respondo.phone() )
			{
				return false ;
			}
			else
			{
				return true ;
			}
		}
		else
		{
			return false ;
		}	
	}
	
	self.overrideBack = function()
	{
		self.backCell( );
	}
	
	// ------------------ END OF OVERRIDE NAV CHECKS ---------------------- //

	self.selectProgressIcon = function( elm )
	{
		self.stopAuto();
		self.enableAllProgressButtons() ;
		self.displayCellByIndex( elm.index );
	}
	
	self.updateProgressDisplay = function( )
	{
		if ( devmode ) console.log( 'Log: updateProgressDisplay ' + self.active_cell_index )
		self.enableAllProgressButtons() ;
		disableElement( self.progressIconArray[ self.active_cell_index ] );
		self.progressIconArray[ self.active_cell_index ].addClass( "selected" );
	}
		
	self.enableAllProgressButtons = function()
	{
		for( var i = 0 ; i < self.progressIconArray.length; i++)
		{
			enableElement( self.progressIconArray[ i ] ) ;
			self.progressIconArray[ i ].removeClass( "selected" );
		}
	}
	
	
}
Photostory.prototype = ScreenView;