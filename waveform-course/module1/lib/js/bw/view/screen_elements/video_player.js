/**
* @author Andy Galletly
*/

// flat jplayer
var global_video_html_block = $( ' \
<div class="jp-video jp-flat-video">\
	<div class="jp-closed-captions"></div>\
	<div class="jp-jplayer"></div>\
	<div class="jp-gui">\
		<div class="jp-play-control jp-control">\
			<a class="jp-play jp-button"></a>\
			<a class="jp-pause jp-button"></a>\
		</div>\
		<div class="jp-bar">\
			<div class="jp-seek-bar">\
				<div class="jp-play-bar"></div>\
				<!--<div class="jp-details"><span class="jp-title"></span></div>-->\
				<!--<div class="jp-timing"><span class="jp-current-time"></span></div>-->\
				<div class="jp-timing"><span class="jp-duration"></span></div>\
			</div>\
		</div>\
		<div class="jp-screen-control jp-control">\
			<a class="jp-full-screen jp-button"></a>\
			<a class="jp-restore-screen jp-button"></a>\
		</div>\
	</div>\
	<div class="jp-no-solution">\
		Media Player Error<br />\
		To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.\
	</div>\
</div>\
' );

function VideoPlayerView( m )
{
	var self = this;
	TimedElementView.call(self, m);
	
	self.jplayer_div = null;
	self.jplayer_skin = global_video_html_block.clone();
		
	self.use_closed_captions		= false;
	
	self.isPlaying = false ;
	self.show_closed_captions 	= false;
	self.has_closed_captions 		= false;
	
	
	self.trascript_open = false;
	
	self.ccbuttontext = 'subtitles';
	if ( self.xml_node.attr("ccbuttontext") ) 
	{ 
		self.ccbuttontext = self.xml_node.attr("ccbuttontext"); 
	}
	
	self.controls = false; 
	if ( self.xml_node.attr("controls") ) 
	{ 
		if ( self.xml_node.attr("controls").toLowerCase() == "true" ) 
		{ 
			self.controls = true; 
		} 
	}
	self.postertype = 'jpg'; 
	if ( self.xml_node.attr("postertype") ) 
	{ 
		self.postertype = self.xml_node.attr("postertype"); 
	}
	if ( self.xml_node.attr( "useclosedcaptions" ) )
	{
		if ( self.xml_node.attr( "useclosedcaptions" ).toLowerCase() == "true" )
		{
			self.use_closed_captions = true;
		} 
	}

	self.stopothers = true;
	if ( self.xml_node.attr( "stopothers" ) )
	{
		if ( self.xml_node.attr( "stopothers" ).toLowerCase() == "false" )
		{
			self.stopothers = false;
		} 
	}
	if ( self.xml_node.attr( "closedcaptionsoninit" ) )
	{
		if ( self.xml_node.attr( "closedcaptionsoninit" ).toLowerCase() == "true" )
		{
			 self.show_closed_captions = true;
		} 
	}
	
	self.reload = true;
	self.vid_width 		= self.xml_node.attr('width') ;
	self.vid_height 	= self.xml_node.attr('height') ;
	self.src_url 			= self.xml_node.attr('src');
	self.vttcuepoints = [];
	
	self.jp_container_id = 'jp_container_' + self.$div.attr( 'id' );
	self.jp_content_id = 'jp_' + self.$div.attr( 'id' );
	self.no_suffix = self.src_url.substr(0, self.src_url.lastIndexOf("."));
			
	self.base_setContent = self.setContent;
	
	
	self.setContent = function()
	{
		self.resizeListen = true;
		self.$content = self.jplayer_skin;
		self.base_setContent();
		
		self.jplayer_div = $( self.$div.find( ".jp-jplayer" )[0] );
	
		self.jplayer_skin.attr( 'id', self.jp_container_id );
		self.jplayer_div.attr( 'id', self.jp_content_id );
		
		for( var i = 0; i < self.xml_node.children().length; i++ )
		{
			var item = self.xml_node.children()[ i ];
			if( item.nodeName == 'transcript' )
			{
				self.transcript_xml_node = $( item );
				self.createTranscript( self.transcript_xml_node );
			}
		}
		
		self.createCues( self.xml_node.children() );
		
		// (seemingly) delays apply player until html elements have rendered.
		setTimeout( self.applyPlayer , 0 );
	
	}
	
	
	self.super_screenSizeUpdate = self.screenSizeUpdate;
	self.screenSizeUpdate = function()
	{
		if ( devmode ) console.log( 'Log: screenSizeUpdate !! ' )
		self.super_screenSizeUpdate();
		
		if( self.transcript_xml_node )
		{
			self.removeTranscript();
			self.createTranscript( self.transcript_xml_node );
		}
		
	}
	
	self.removeTranscript = function(  )
	{
		self.$div.removeClass('transcript_open');
		if ( devmode ) console.log( 'Log: removeTranscript start ' )
		self.trascript_open = false;
		tweenTo( self.jplayer_div, 0, {scale:1});
		tweenTo( self.$transcript_holder, 0, {autoAlpha:1, display:'block'});
		
		self.$transcript.empty().remove();
		self.$transcript_holder.empty().remove();
		
		self.$transcript_button.empty().remove();
		
		if ( devmode ) console.log( 'Log: removeTranscript end ' )
	};
	
	self.createTranscript = function( xmlNode )
	{
		if ( devmode ) console.log( 'Log: TRANSCRIPT ' + xmlNode.text() );
		
		self.$transcript_holder = $( '<div class="transcriptHolder" />' );
		
		self.$transcript_button = $( '<div class="transcriptBtn" />' );
		self.$transcript = $( '<div class="transcript" />' );
		
		self.$transcript_button.append( $('<div class="tooltip">' + getVarText( 'transcript_label' ) + '</div>' ) );
		
		self.$transcript.append( xmlNode.text() );
		
		
		self.transcript_width = 300;
		
		if( xmlNode.attr( 'width' ) )
		{
			self.transcript_width = parseNumberString( xmlNode.attr( 'width' ) )
		}
		
		self.$transcript.width( self.transcript_width );
		
		self.$div.append( self.$transcript_button );
		self.$transcript_holder.append( self.$transcript );
		
		self.$div.append( self.$transcript_holder );
		self.createTranscriptIcon();
		applyClick( self.$transcript_button, self.toggleTranscript );
		self.closeTranscript();
		
	};
	
	self.createTranscriptIcon = function(  )
	{

		var $svg = $( '<svg version="1.1" class="video_transcript" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23 22" style="enable-background:new 0 0 23 22;" xml:space="preserve"><style type="text/css">	svg.video_transcript .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><g id="XMLID_2_">	<g id="XMLID_42_">		<path id="XMLID_43_" class="st0" d="M14.1,0H8C3.6,0,0,3.6,0,8c0,4,3,7.4,6.9,7.9c0.1,1.8,0,4.4-1.6,6.1c0,0,4.5-1.8,7.1-6h1.7 c4.4,0,8-3.6,8-8C22.1,3.6,18.5,0,14.1,0z M3.4,4h8v2h-8V4z M18.4,9h-15V7h15V9z"/></g></g></svg>' );
		self.$transcript_button.append( $svg );
		
	};
	
	self.toggleTranscript = function(  )
	{
		if( self.trascript_open )
		{
			self.closeTranscript();
		}
		else
		{
			self.openTranscript();
		}
	};
	
	self.openTranscript = function(  )
	{
		self.trascript_open = true;
		if( _respondo.desktop() )
		{
			var new_scale = 1- ( self.transcript_width / self.vid_width );
			
			if ( devmode ) console.log( 'Log: new_scale ' + new_scale )
			
			tweenTo( self.jplayer_div, 0.3, {scale:new_scale, transformOrigin:"left top"});
			tweenTo( self.$transcript_holder, 0.3, {width: self.transcript_width });
		}
		else
		{
			tweenTo( self.$transcript_holder, 0, {autoAlpha:1, display:'block'});
		}
		
		self.$div.addClass('transcript_open');
		
	};
	
	self.closeTranscript = function( t )
	{
		if(isNaN(t))
		{
			var t = 0.3
		}
		self.trascript_open = false;
		if( _respondo.desktop() )
		{
			tweenTo( self.jplayer_div, t, {scale:1});
			tweenTo( self.$transcript_holder, t, {width:'0%'});
		}
		else
		{
			tweenTo( self.$transcript_holder, 0, {autoAlpha:0, display:'none'});
		}
		self.$div.removeClass('transcript_open');
	};
	
	self.hideCCtracks = function()
	{
		
		if( self.video_element )
		{
			if( self.video_element[0].textTracks )
			{
				for( var i = 0; i < self.video_element[0].textTracks.length; i++ )
				{
					var item = self.video_element[0].textTracks[ i ];
					if ( devmode ) console.log( 'Log HIDE TRACK ' + item.label )
					if(item.OFF)
					{
						item.mode = item.OFF;
					}
					else
					{
						item.mode = 'hidden';
					}
				}
			}
		}
	}
	self.showCCtracks = function()
	{
		if( self.video_element )
		{
			if( self.video_element[0].textTracks )
			{
				
				for( var i = 0; i < self.video_element[0].textTracks.length; i++ )
				{
					var item = self.video_element[0].textTracks[ i ];
					if ( devmode ) console.log( 'Log SHOW TRACK ' + item.label )

					if(item.SHOWING)
					{
						item.mode = item.SHOWING;
					}
					else
					{
						item.mode = 'showing';
					}
				}
			}
		}
	}
	
	
	self.toggleCC = function()
	{
		//self.show_closed_captions = true
		if( self.show_closed_captions )
		{
			self.toggleHideCC()
		}
		else
		{
			self.toggleShowCC()
		}
	}
	
	self.toggleShowCC = function()
	{
	
		self.showCCtracks()
		var ccdiv = $(self.jplayer_skin.find( '.jp-closed-captions' )[ 0 ]);
		ccdiv.fadeIn();
		self.cc_button.addClass('on');
		self.show_closed_captions = true
	}
	self.toggleHideCC = function()
	{
		self.hideCCtracks()
		var ccdiv = $(self.jplayer_skin.find( '.jp-closed-captions' )[ 0 ]);
		ccdiv.fadeOut();
		self.cc_button.removeClass('on');
		self.show_closed_captions = false
	}
	
	
	self.base_kill = self.kill;
	self.kill = function()
	{
		self.vttcuepoints = [];
		
		if (!self.jplayer_div || !self.jplayer_div.jPlayer) return;
		
		self.jplayer_div.jPlayer( 'stop' );
		self.jplayer_div.jPlayer( 'destroy' );
		self.jplayer_skin.empty().remove();
		self.jplayer_div.empty().remove();
		self.base_kill()
	}
	
	self.play = function()
	{
		
		self.jplayer_div.jPlayer( 'play' );
		if( $('.lte8') )
		{
			TweenMax.delayedCall( 0.1, self.checkPlaying );
		}
		else
		{
			self.$div.addClass('started')
		}
	}	
		
	self.checkPlaying = function()
	{
		/*
			This is a delayed backup play for ie8. 
			When using the Flash version of the player, calls to play a previously hidden jplayer will fail
			Adding a second play call to the jplayer forces it to play
		*/
		
		if( !self.isPlaying )
		{
			if ( devmode ) console.log( 'Log PLAYING VID ' )
			self.play() ;
		}	
		else
		{
			self.$div.addClass('started')
		}
	}
	
	self.pause = function()
	{
		self.jplayer_div.jPlayer( 'pause' );
	}
	
	self.stop = function()
	{
		self.jplayer_div.jPlayer( 'pause' );
	}
	
	self.reset = function()
	{
		self.jplayer_div.jPlayer( 'stop' );
	}
	
	self.changeSource = function( url )
	{
	}
	
	self.attachCCButton = function()
	{
		//self.show_closed_captions = true;
		self.cc_button = $( '<div class="ccbutton"></div>');
		
		
		var $svg = $( '<svg version="1.1" class="video_transcript" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 23 22" style="enable-background:new 0 0 23 22;" xml:space="preserve"><style type="text/css">	svg.video_transcript .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}</style><g id="XMLID_2_">	<g id="XMLID_42_">		<path id="XMLID_43_" class="st0" d="M14.1,0H8C3.6,0,0,3.6,0,8c0,4,3,7.4,6.9,7.9c0.1,1.8,0,4.4-1.6,6.1c0,0,4.5-1.8,7.1-6h1.7 c4.4,0,8-3.6,8-8C22.1,3.6,18.5,0,14.1,0z M3.4,4h8v2h-8V4z M18.4,9h-15V7h15V9z"/></g></g></svg>' );
		self.cc_button.append( $svg );
		
		self.cc_button.append( $( '<div class="tooltip"><p>'+self.ccbuttontext+'</p></div>' ) );
		self.jplayer_skin.append( self.cc_button );
		applyClick(self.cc_button, self.toggleCC );
	
		if (self.show_closed_captions) {
			self.toggleShowCC();
		}
	}
	
	self.loadVTT = function()
	{
		if ( self.use_closed_captions )
		{
			
		$.ajax({
			type: "GET",
            url : self.no_suffix+ '.vtt',
            dataType: "text",
            success : function (data) 
			{
				self.has_closed_captions = true;
				
				if( self.video_element )
				{
					// native subtitle track
					var _track = $('<track label="English" srclang="en" src="' +self.no_suffix+ '.vtt" kind="subtitles" default />')
					self.video_element.append( _track );
					
					if( !self.video_element[0].textTracks )
					{
						
						self.createVTTCues( data );
					}
					
					if( isFF() )
					{
						_track.remove();
						self.createVTTCues( data );
					}
				}
				else
				{
					self.createVTTCues( data );
				}
				
				self.attachCCButton();
				
            },
            error : function (data) 
			{
				self.has_closed_captions = false;
            }
        });
		}
	}
	
	
	self.ClosedCaption = function( line )
	{
		var cptn = this
		cptn.firstlinesplit = line.split( ' --> ' );
		cptn.start_time = self.convertTimeCodeToSeconds( cptn.firstlinesplit[ 0 ] ); 
		cptn.end_time = self.convertTimeCodeToSeconds( cptn.firstlinesplit[ 1 ] ); 
	
		cptn.text = '';
		
		cptn.addText = function( text_line )
		{
			if( text_line.length > 1 )
			{
				cptn.text += '<p>' + text_line + '</p>';
			}
		}
	}
	
	self.createVTTCues = function( data )
	{
	
		var newlines = data.split('\n');
		
		var current_caption = null;
		
		for( var i = 0; i < newlines.length; i++ )
		{
			var line = newlines[ i ];
			if( line.indexOf( '-->' )>-1 )
			{
				var caption = new self.ClosedCaption( line );
				current_caption = caption;
				self.vttcuepoints.push( caption );
			}
			else if( current_caption )
			{
				current_caption.addText( line )
			}
		}
	}
	
	
	
	self.applyPlayer = function()
	{
		var ancestor_string = '#' + self.jp_container_id;
		
		self.jplayer_div.jPlayer(
		{
			ready: function () 
			{
				self.video_element = $(self.jplayer_div.find('video')[0]);
				if ( devmode ) console.log( 'Log self.video_element %o', self.video_element )
				if( self.video_element.length<1 )
				{
					self.video_element = null;
				}
				if ( devmode ) console.log( 'Log self.video_element %o', self.video_element )
				
				$(this).jPlayer("setMedia", 
				{
					m4v: self.src_url,
					poster: self.no_suffix + '.' + self.postertype
				});
				
				
				if( self.autoplay )
				{
					self.play();
				}
				if( !self.controls )
				{
					self.jplayer_skin.find('.jp-gui').empty();
				}
				self.loadVTT();
				
			},
			play: function() {
				
				
				
				$(this).jPlayer("option", "autohide", {
					full: true,
					restored: true
				});
				// Avoid multiple jPlayers playing together.

				if (self.stopothers) {
					// pause others and reset playhead to 0
					$(this).jPlayer("pauseOthers", 0);
				}
				self.isPlaying = true ;

				var cue = self.findCue( 'start' );
				if( cue )
				{
					self.doCue( cue );
				}
			},
			// When paused, show the GUI
			pause: function() {
				$(this).jPlayer("option", "autohide", {
					full: false,
					restored: false
				});
				self.isPlaying = false ;
			},
			// Enable clicks on the video to toggle play/pause
			click: function(event) {
				if(event.jPlayer.status.paused) {
					self.play()
				} else {
					self.pause();
				}
			},
			timeupdate: function(event) 
			{
				self.timeUpdate( event.jPlayer.status.currentTime );
			},
			ended:function (event){
				var cue = self.findCue( 'end' );
				if( cue )
				{
					self.doCue( cue );
				}
			},
			sizeFull: {
				width: "100%",
				height: "auto",
				cssClass: "jp-flat-video-full"
			},
			resize : self.resized,
			cssSelectorAncestor: ancestor_string,
			swfPath: "lib/js/plugins/jPlayer",
			solution: "html,flash",
			supplied: "m4v",
			size: {
				width: self.vid_width,
				height: self.vid_height,
				cssClass: "jp-video-auto"
			},
			noFullWindow: {
				android_phone: /android [0-3]/
			},
			smoothPlayBar: true,
			keyEnabled: false,
			globalVolume: true
		});
	
	}
	
	self.resized = function( event )
	{
		var paused = event.jPlayer.status.paused;
		if( self.$div.find('.jp-state-full-screen').length>0 )
		{
			$('body').addClass('fullscreenvideo');
			self.closeTranscript(0);
			// only do this if html player is used, flash player freaks out. ( IE8 shouldn't need this fix anyway )
			if( event.jPlayer.html.used && $('.lte9').length )
			{
				// fix for IE9, moves the player to a seperate div outside of the course div
				self.movePlayerToTop();
			}
		}
		else
		{
			$('body').removeClass('fullscreenvideo');
			if( event.jPlayer.html.used )
			{
				self.dockPlayer();
			}
		}
		
		// continue playing if already playing
		if( !paused )
		{
			self.play();
		}
	}
	
	self.movePlayerToTop = function()
	{
		self.jplayer_skin.appendTo( $( 'body' ) );
	}
	
	self.dockPlayer = function()
	{
		if( self.$transcript_button )
		{
			self.jplayer_skin.insertBefore( self.$transcript_button );
		}
		else
		{
			self.jplayer_skin.appendTo( self.$div );
		}
	}
	
	self.base_timeUpdate = self.timeUpdate;
	self.timeUpdate = function( t )
	{
		self.base_timeUpdate( t );
		var new_time = t; // Math.round( t );
	
			
			var vttcue = self.findVTTCue( self.currentTime );
			
			
			if( vttcue )
			{
				if( vttcue != self.current_vttcue )
				{
					self.current_vttcue = vttcue;
					self.doCue( vttcue );
				}
			} else {
				self.current_vttcue = null;
				self.noCue( );				
			}

	
	}
	
	self.base_doCue = self.doCue;
	self.doCue = function( cue )
	{
		self.base_doCue(cue);
		
		if( cue.text )
		{
			var ccdiv = $(self.jplayer_skin.find( '.jp-closed-captions' )[ 0 ]);
			
			if( !self.show_closed_captions )
			{
				ccdiv.fadeOut(0);
			}
			
			ccdiv.empty().append( cue.text );
		}
		
	}
	
	self.noCue = function(  )
	{
		var ccdiv = $(self.jplayer_skin.find( '.jp-closed-captions' )[ 0 ]);			
		ccdiv.empty();
	}
	
	self.base_endCue = self.endCue;
	self.endCue = function( cue )
	{
		self.base_endCue( cue );
		if( cue.text )
		{
			var ccdiv = $( self.jplayer_skin.find( '.jp-closed-captions' )[ 0 ] ); 
			ccdiv.empty();
		}
	}
	
	
	self.findVTTCue = function( timecode )
	{
		var cue = null;
		for( var i = 0; i < self.vttcuepoints.length; i++)
		{
			var cuepoint = self.vttcuepoints[ i ];
			if( cuepoint.id == timecode )
			{
				cue = cuepoint;
				break;
			}
			if( ( timecode >= cuepoint.start_time ) && ( timecode <= cuepoint.end_time ) )
			{
				cue = cuepoint;
				break;
			}
		}
		
		return cue;
	}
	
}
VideoPlayerView.prototype = TimedElementView;
