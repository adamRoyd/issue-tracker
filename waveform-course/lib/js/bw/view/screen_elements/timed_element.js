/**
* @author Andy Galletly
*/
function TimedElementView( m )
{
	var self = this;
	ScreenElementView.call(self, m);
	self.currentTime = -1;
	self.autoplay = true;
	self.preload = true;
	self.cuepoints = [];
	
	if ( self.xml_node.attr("autoplay") ) 
	{ 
		if ( self.xml_node.attr("autoplay").toLowerCase() == "false" ) 
		{ 
			self.autoplay = false ;
		} 
	}
	
	if ( self.xml_node.attr("preload") ) 
	{ 
		if ( self.xml_node.attr("preload").toLowerCase() == "false" ) 
		{ 
			self.preload = false; 
		} 
	}
	
	self.setContent = function()
	{
		self.$div.append( self.$content );
		self.createCues( self.xml_node.children() );
		self.setReady() ;
	}
	
	
	self.super_kill = self.kill;
	self.kill = function()
	{
		self.stop();
		self.cuepoints = [];
		if(self.$content)
		{
			self.$content.empty().remove();
		}
		self.super_kill();
	}
	
	
	self.convertTimeCodeToSeconds = function(timeString)
	{
		var timeArray = timeString.split(":");
		
		var hours = Number( timeArray[ 0 ] ) * 60 * 60;
		var minutes = Number( timeArray[ 1 ] ) * 60;
		var seconds = Number( timeArray[ 2 ] );
		
		var totalTime = hours + minutes + seconds;
		return totalTime;
	}
	
	
	self.createCues = function( cue_nodes )
	{
		for( var i = 0; i < cue_nodes.length; i++ )
		{
			var node = $( cue_nodes[ i ] );
			
			var starttime 	= Number( node.attr( 'time' ) );
			if( node.attr( 'starttime' ) )
			{
				starttime 	= Number( node.attr( 'starttime' ) );
			}
			var endtime 	= Number( node.attr( 'endtime' ) );
			if( !endtime )
			{
				endtime = starttime + 0.5;
			}
			
			if( node.attr( 'func' ))
			{
				var cueFunc = self.model.findFunc( node.attr( 'func' ) ) ;
			}
			
			var cue = { id: node.attr('id'), start_time: starttime, end_time: endtime, event: node.attr( 'event' ), func: cueFunc };
			
			self.cuepoints.push( cue )
		}
	}
	
	self.timeUpdate = function( t )
	{	
		var new_time = t; // Math.round( t );
		if( new_time != self.currentTime )
		{
			self.currentTime = new_time;
			
			if( self.current_cue )
			{
				if( self.current_cue.end_time < new_time )
				{
					self.endCue( self.current_cue )
					self.current_cue = null;
				}
			}
			var cue = self.findCue( self.currentTime );
			
			
			if( cue )
			{
				
				if( cue != self.current_cue )
				{
					self.doCue( cue );
					self.current_cue = cue;					
				}
			}
		}
	}
	
	self.doCue = function( cue )
	{	if( cue.event )
		{	
			self.screen_view.doClickById( cue.event );
		}
		
		if( cue.func )
		{		
			cue.func() ;
		}
	}
	
	self.endCue = function( cue )
	{
		if( cue.endevent )
		{
			self.screen_view.doClickById( cue.endevent );
		}
	}
	
	self.findCue = function( timecode )
	{
		var cue = null;
		for( var i = 0; i < self.cuepoints.length; i++ )
		{
			var cuepoint = self.cuepoints[ i ];
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
		if(cue)
		{
			//if ( devmode ) console.log( 'Log FIND Q ' + cue.id + ' - ' + cue.start_time + ' event: ' + cue.event + ' func: ' + cue.func )
		}
		
		return cue;
	}
	
}
TimedElementView.prototype = ScreenElementView;
