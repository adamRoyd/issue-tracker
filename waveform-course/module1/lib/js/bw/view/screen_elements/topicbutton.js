function TopicbuttonElementView( m )
{		
	var self = this ;
	BoxElementView.call(self, m);
	
	self.topic_id = $(self.model.xml).attr("topic");
	self.topic = null;
	
	self.super_setContent = self.setContent;
	self.setContent = function(  )
	{
		self.setupTopicListener();
		self.super_setContent();
	};
	
	self.super_setReady = self.setReady;
	self.setReady = function()
	{
		
		self.$div.find( '.wf-topic-label' ).empty().append( self.topic.sLabel )
		self.$div.find( '.wf-topic-longlabel' ).empty().append( self.topic.sLongLabel )
		self.$div.find( '.wf-topic-duration' ).empty().append( self.topic.sDuration )
		
		self.super_setReady();
	}
	
	self.updateStatus = function()
	{
		var notattemptedCount = 0 ;
		var incompleteCount = 0 ;
		var completedCount = 0 ;
		var lockedCount = 0 ;
		
		switch( self.topic.getStatus() )
		{
			case 'notattempted' : notattemptedCount++ ; break ;
			case 'incomplete' : incompleteCount++ ; break ;
			case 'completed' : completedCount++ ; break ;
			case 'passed' : completedCount++ ; break ;
			case 'locked' : lockedCount++ ; break ;
		}			 
		
		
		var totalStatus = "notattempted" ;
		
		if( completedCount > 0 )
		{
			totalStatus = "completed" ;
		}
		
		if( notattemptedCount > 0 )
		{
			totalStatus = "notattempted" ;
		}
		
		if( notattemptedCount > 0 && completedCount > 0 )
		{
			totalStatus = "incomplete" ;
		}
		
		if( incompleteCount > 0 )
		{
			totalStatus = "incomplete" ;
		}
		
		if( lockedCount > 0 )
		{
			totalStatus = "locked" ;
		}
		
		self.$div.removeClass( 'notattempted' );
		self.$div.removeClass( 'incomplete' );
		self.$div.removeClass( 'completed' );
		self.$div.removeClass( 'passed' );
		self.$div.removeClass( 'locked' );
		
		self.$div.addClass( totalStatus );
	}
	
	self.setupTopicListener = function()
	{
		self.topic = masterObj.getTopicById( self.topic_id );
		
		self.topic.dispatcher.bind( 'statusupdated', self.updateStatus  ) ;
		self.updateStatus();
	}
	
	self.super_clickable = self.clickable; 
	self.clickable = function()
	{
		return Boolean( self.super_clickable() || self.topic )
	}
	
	self.super_click = self.click; 
	self.click = function(  )
	{
		loadTopic( self.topic_id );
		self.super_click();
	};
	
}
TopicbuttonElementView.prototype = BoxElementView;