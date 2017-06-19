/**
* @author Andy Galletly
*/


function TimerView( m )
{
	var self = this;
	TimedElementView.call(self, m);
	
	self.timer_div = $('<div class="timer"></div>');
	self.timer_tween;

	self.time = Number( self.xml_node.attr("time") );

	self.progressPath;
	
	self.base_setContent = self.setContent;
	self.setContent = function()
	{
		self.$content = self.timer_div;
		self.base_setContent();
		
		self.appendChildren( self.xml_node )
		
		setTimeout( self.applyTimer , 0 );
	}
	
	self.applyTimer = function()
	{
		
		self.timer_tween = tweenTo( self.timer_div, self.time, { 
			onStart:  function(){
				var cue = self.findCue( 'start' );
				if( cue )
				{
					if( cue != self.current_cue )
					{
						self.doCue( cue );
					}
				}
				self.timeUpdate(  )
			}, 
			onUpdate:  function(){
				
				self.timeUpdate(  )
			}, 
			onComplete:  function(){
				var cue = self.findCue( 'end' );
				if( cue )
				{
					if( cue != self.current_cue )
					{
						self.doCue( cue );
					}
				}
			}, 
			ease:Linear.easeNone, 
			paused:true
		} )

		var progressId = "." + self.xml_node.attr("progressId") || null;
		if (progressId)
		{
			var pathId = "." + self.xml_node.attr("progressPath") || "path_progress";
			self.progressPath = $(progressId + " " + pathId);
		}
		
		self.timeUpdate( )
		
		if ( self.autoplay )
		{
			self.play();
		}
	}
	
	
	self.base_kill = self.kill;
	self.kill = function()
	{
		self.timer_tween.kill();
		self.base_kill()
	}
	
	self.play = function()
	{
		self.timer_tween.play();
	}
	
	self.pause = function()
	{
		self.timer_tween.pause();
	}
	
	self.stop = function()
	{
		self.timer_tween.pause();
	}
	
	self.reset = function()
	{
		self.current_cue = null;
		self.timer_tween.pause(0);
		self.timeUpdate();
	}
	
	self.timeUpdate = function( )
	{
		var new_time = Math.round( self.time * self.timer_tween.progress() );
		if(!new_time)
		{
			new_time = 0;
		}
		
		var displaytime = ( self.time - (self.time * self.timer_tween.progress()) )
		if( displaytime>self.time )
		{
			displaytime = self.time;
		}
		
		self.timer_div.empty().append( $( '<div class="clock time' + Math.round( self.timer_tween.progress() * 100 ) + '"><p>' + Math.ceil(displaytime)+ '</p>' ) );

		self.updateProgressIndicator();

		if( new_time != self.currentTime )
		{			
			self.currentTime = new_time;
						
			if( self.current_cue )
			{
				if( self.current_cue.end_time < new_time )
				{
					self.endCue( self.current_cue )
				}
			}
						
			var cue = self.findCue( self.currentTime );
			if( cue )
			{
				if( cue != self.current_cue )
				{
					self.doCue( cue );
				}
			}
		}
	}	
	
	self.updateProgressIndicator = function()
	{
		if (!self.progressPath) return;
		
		var percent = self.timer_tween.progress() * 100;
		TweenMax.to(self.progressPath, 0, {drawSVG:percent + "%", ease:Linear.easeNone}); // Power2.easeIn
	}
}
TimerView.prototype = TimedElementView;
