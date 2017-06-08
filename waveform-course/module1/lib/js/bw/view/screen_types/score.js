function ScoreScreen( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	self.submitBtn;
	
	// object arrays
	self.optionArray 		= [];
	
	// settings
	self.eventRanges = [];
	
	
	self.custom_xml;
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{
		self.custom_xml = custom_xml_node;
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		
		for ( var i = 0; i < $(self.custom_xml).children().length; i++)
		{
			var xml_node = $(self.custom_xml).children() [ i ] ;
			// console.log( i + " - " + xml_node.nodeName );
			
			switch ( xml_node.nodeName )
			{
				case "range":			self.eventRanges.push(new self.Range($(xml_node)));
					break;
			}
		}
		
		return self.custom_element;
		
	}
	
	self.Range = function(oXML)
	{
		this.range = Number( oXML.attr( "score" ));		
		this.event =  oXML.attr( "event" );		
	}

	
	self.appendScoreFeedbacks = function()
	{
		var topicScorePercent = currentTopic.getScore();
	
		self.updateScoreDisplay(topicScorePercent);
		self.updateFeedbackData();
		
		// Pass or fail
		var events = [];
		if( topicScorePercent >= currentTopic.masteryScore )
		{
			currentTopic.setCompleted();
			events.push("pass");
		}
		else
		{
			events.push("fail");
			
			if ( devmode ) console.log( 'Log: FAIL attempts ' + currentTopic.locked)
			if( currentTopic.locked )
			{
				events.push("locked");
			}
		}
		
		var rangeEvent = self.getRangeEvent(topicScorePercent);
		if (rangeEvent) events.push(rangeEvent);
			
		trackingObj.updateTracking()
		
		self.dispatchEvents(events);
	}
	
	self.getRangeEvent = function(scorePecent)
	{
		var rangeEvent = "";
		
		for (var i = 0; i < self.eventRanges.length; i++)
		{
			var eventRange = self.eventRanges[i];
			if (scorePecent >= eventRange.range)
			{
				rangeEvent = eventRange.event;
			}
		}
		
		return rangeEvent;
	}
	
	self.dispatchEvents = function(events)
	{
		for (var i = 0; i < events.length; i++)
		{
			var event = events[i];
			self.doEventById(event);
		}
	}
	
	self.updateScoreDisplay = function(scorePecent)
	{
		var scoreString = scorePecent;
		if ( $(self.custom_xml).attr('scoretype') == 'count')
		{
			scoreString = currentTopic.getPassedCount();
		}
		
		 var scoreDataFields = $('.scoredata');
		 scoreDataFields.empty().append( scoreString );		
	}
		
	self.updateFeedbackData = function()
	{
		var feedback_text = "";
		var topic_refs = [];
		for( var i = 0; i < currentTopic.arScreens.length; i++ )
		{
			var item = currentTopic.arScreens[ i ];
			
			if( item.topicref && ( !item.getPassed() ) )
			{
				if( $.inArray( item.topicref, topic_refs ) == -1 )
				{
					topic_refs.push( item.topicref );
				}
			}
		}

		topic_refs.sort();
		
		for( var i = 0; i < topic_refs.length; i++ )
		{
			var item = topic_refs[ i ];
			var item_text =  self.screen.getVar( "failtext_" + item );
			
			feedback_text += item_text;
		}
		
		$('.feedbackdata').empty().append( feedback_text );
	}
		
	self.printCert = function()
	{
		console.log( "PRINT CERTIFICATE" )
	}
	
	self.restartQuiz = function()
	{
		currentTopic.reCreate(true);
	}
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{	
		if ( devmode ) console.log( 'Log SCORE LOADED' );
		self.super_screenLoaded();		
	}
	
	self.super_ready = self.ready;
	self.ready = function()
	{
		self.super_ready();
		
		self.appendScoreFeedbacks();
	}
	
}
ScoreScreen.prototype = ScreenView;