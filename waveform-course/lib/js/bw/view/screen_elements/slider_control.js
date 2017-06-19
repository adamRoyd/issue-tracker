/**
* @author Andy Galletly
*/

function SliderControlElementView( m )
{		
	var self = this ;
	ScreenElementView.call( self, m );
	
	self.triggeredComplete = false;
	self.snap_index = null;
	self.draggable = null;
	
	self.dispatcher = createDispatcher(self.idprefix + self.model.id + '_dispatcher')
	
	self.setContent = function()
	{
		if ( devmode ) console.log( 'Log: SLIDER CONTROL ' + self.model.id)
		self.resizeListen = true;
		self.$div.append( self.$content );
		
		self.appendChildren( self.xml_node )
		
		TweenMax.delayedCall( 0, self.attachContent );
		
		self.base_setContent();
	}
	
	self.super_kill = self.kill;
	self.kill = function(  )
	{
		if( self.draggable )
		{
			self.draggable[0].kill();
		}
		self.dispatcher.unbind();
		self.super_kill();
	}
	self.attachContent = function(  )
	{
		
		self.createController(  );
	}
	
	self.super_screenSizeUpdate = self.screenSizeUpdate;
	self.screenSizeUpdate = function()
	{
		self.super_screenSizeUpdate();
		
		if( self.sliderguide )	self.sliderguide.empty().remove();
		if( self.toggle )	self.toggle.empty().remove();
		
		self.createController();
		
	}

	self.disable = function()
	{
		self.draggable[0].disable();
		self.$div.addClass('disabled');
	}

	self.reset = function()
	{
		TweenMax.to( self.slider, 0.3, { left: self.init_pos, onUpdate: self.evaluateDragPosition, onComplete: self.evaluateSnap } )
	}

	self.enable = function()
	{
		if( self.draggable )
		{
			if ( devmode ) console.trace( 'Trace: self.enable drag %o', self.draggable );
			self.draggable[0].enable();
		}
		self.$div.removeClass('disabled');
	}
	
	self.createController = function(  )
	{
		var xml_node = self.xml_node;
		if( xml_node )
		{
	
				self.sliderguide = $( '<div class="slider_guide"></div>' );
				
				self.slider = self.$div.find('.slider')
				if( self.slider.length<1 )
				{
					self.slider = $( '<div class="slider wf-slider"></div>' );
					self.sliderguide.append( self.slider ) 
				}
				
				self.sliderguide.width( Number( xml_node.attr( 'width' ) ) );
				
				self.snapcount = Number( xml_node.attr( 'snap' ) )
				var label_nodes = xml_node.find('label')
				if( label_nodes.length>0 )
				{
					self.snapcount = label_nodes.length
				}
				
				self.sliderwidth = Number( xml_node.attr( 'width' ) )
				self.snapspacing = 100 / (self.snapcount-1) ;
				
				
				self.init_pos = parseNumberString( xml_node.attr( 'init' ) );
				if(!self.init_pos)
				{
					self.init_pos = 0;
				}
				self.markerarray = [];
				self.snaparray = [];
				for( var i = 0; i < self.snapcount; i++ ) {
					// Add snap point
					sliderSnapX = i*self.snapspacing
					
					// Add snap marker
					var sliderMarker = $( '<div class="sliderMarker"></div>' );
					self.sliderguide.append( sliderMarker );
					sliderMarker.css( 'left', sliderSnapX+'%' );
					
					self.markerarray.push( sliderMarker );
					self.snaparray.push( sliderSnapX );
					
					var label_node = $( label_nodes[ i ] );
					
					if( label_node.text() )
					{
						var $labeldiv = $( '<div class="label"></div>' );
						$labeldiv.append( label_node.text() );
						sliderMarker.append( $labeldiv );
						$labeldiv.data('marker', sliderMarker );
						applyClick( $labeldiv, 
							function () 
							{
								var elm = $( this ).data( 'elm' );
								var marker = elm.data('marker');
								self.moveSliderToMarker( marker );	
							}
						);
					}
					
					applyClick( sliderMarker, 
						function () 
						{
							var elm = $( this ).data( 'elm' );
							self.moveSliderToMarker( elm );	
						}
					);
				}
				
				if ( devmode ) console.log( 'Log: SNAP ARRAY ' + self.snaparray)
				self.$content.empty();
				self.$content.append( self.sliderguide );
				
				TweenMax.to( self.slider, 0, { left: self.init_pos, onUpdate: self.evaluateDragPosition, onComplete: self.evaluateSnap } )
				
				
				self.draggable = Draggable.create(self.slider, 
				{
					edgeResistance:1,
					type: "left",
					bounds: self.sliderguide,
					throwProps:true,
					maxDuration:0.5,
					throwResistance :10000,
					onDrag: function(e) 
					{
						self.evaluateDragPosition( );
					} ,
					onThrowUpdate: function(e) 
					{
						self.evaluateDragPosition( );
					},
					onThrowComplete: function(e) 
					{
						self.evaluateDragPosition( );
						self.evaluateSnap();
					},
					snap: self.implementSnap
				});
				
				
			
			
		}
	}
	
	self.moveSliderToMarker = function( marker )
	{
		//if ( devmode ) console.log( 'Log: moveSlider %o', marker)
		TweenMax.to( self.slider, 0.3, { left: marker.css('left'), onUpdate: self.evaluateDragPosition, onComplete: self.evaluateSnap } )
	};
	
	self.getRoundPercent = function()
	{
		return Math.round( self.percent );
	};
	
	self.getPercent = function()
	{
		return self.percent;
	};
	
	self.getSnapIndex = function()
	{
		return self.snap_index;
	};
	
	
	self.implementSnap = function(  )
	{
		var slider_pos = self.slider.position().left / self.slider.parent().width() * 100;
		
		if( self.snaparray.length>0 )
		{
			var test_diff = 100
			self.snap_index = -1;
			for( var i = 0; i < self.snaparray.length; i++ )
			{
				var snap_pos = self.snaparray[ i ];
				var diff = Math.abs( slider_pos - snap_pos );
				if( diff < test_diff )
				{
					test_diff = diff;
					self.snap_index = i;
				}
			}
			if( self.snap_index > -1 )
			{
				self.moveSliderToMarker( self.markerarray[self.snap_index] );
			}
		}
	};
	
	self.evaluateSnap = function(  )
	{
		//var slider_pos = self.slider.position().left;
		
		var slider_pos = self.slider.position().left / self.slider.parent().width() * 100;
		
		if ( devmode ) console.log( 'Log: evaluateSnap' + slider_pos )
		if( self.snaparray.length>0 )
		{
			self.snap_index = -1;
			for( var i = 0; i < self.snaparray.length; i++ )
			{
				var snap_pos = self.snaparray[ i ];
				var diff = Math.abs( slider_pos - snap_pos );
				if( diff<1 )
				{
					self.snap_index = i;
				}
			}
			if( self.snap_index > -1 )
			{
				if ( devmode ) console.log( 'Log: SNAP INDEX ' + self.snap_index );
				self.screen_view.doClickById( self.id + '_snap' );
				self.screen_view.doClickById( self.id + '_index' + self.snap_index );
				self.dispatcher.trigger('updatesnap', [self.snap_index]);
			}
		}
	};
	
	self.evaluateDragPosition = function()
	{
		var max = self.sliderguide.width() - self.slider.outerWidth();
		
		self.percent = ( self.slider.position().left / max ) * 100;
		
		if( self.percent<0 )
		{
			self.percent = 0;
		}
		if( self.percent>100 )
		{
			self.percent = 100;
		}
		
		var params = [self.percent]
		
		self.dispatcher.trigger('updatepercent', params);
		
	};
	
	
}
SliderControlElementView.prototype = ScreenElementView;
