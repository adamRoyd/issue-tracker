function ScoreElementView(m)
{
	var self = this;
	ScreenElementView.call(self, m);

	self.contentstring = self.xml_node.text();

	self.stars = [];
	self.trigger_array = [];

	self.source = null;
	if (self.xml_node.attr('source'))
	{
		self.source = self.xml_node.attr('source');
	}
	self.initscore = 0;
	if (self.xml_node.attr('initscore'))
	{
		self.initscore = Number(self.xml_node.attr('initscore'));
	}
	self.maxscore = 100;
	if (self.xml_node.attr('maxscore'))
	{
		self.maxscore = Number(self.xml_node.attr('maxscore'));
	}
	self.passscore = 80;
	if (self.xml_node.attr('passscore'))
	{
		self.passscore = Number(self.xml_node.attr('passscore'));
	}
	if (self.xml_node.attr('incrementevent'))
	{
		self.incrementevent = self.xml_node.attr('incrementevent');
	}

	self.percent = 0;

	self.topic = null;
	if (self.xml_node.attr('topic'))
	{
		self.topic = masterObj.getTopicById(self.xml_node.attr('topic'));
	}

	self.score = self.initscore;
	self.displayScore = self.score;

	self.setContent = function ()
	{
		self.createTriggers();
		if (self.source)
		{
			self.score = Number(trackingObj.getCustomData(self.source));
			if (isNaN(self.score))
			{
				self.score = self.initscore;
			}
		}
		//self.$div.append( scorebg )
		self.bar = $('<div class="bar" />');
		self.$div.append(self.bar);
		self.$content = $('<div class="content" />');
		self.$div.append(self.$content);
		self.set(self.score);
		self.base_setContent();
	};

	self.createTriggers = function(  )
	{
		var trigger_nodes = self.xml_node.find('trigger');
		for( var i = 0; i < trigger_nodes.length; i++ )
		{
			var item = $( trigger_nodes[ i ] );
			var trigger = {};
			trigger.score = Number( item.attr('score') );
			trigger.eventid = item.attr('event');
			trigger.triggered = false;
			self.trigger_array.push( trigger )
		}
	};
	
	self.checkTriggers = function(  )
	{
		if( self.oldscore < self.displayScore )
		{
			for( var i = self.oldscore; i <= self.displayScore; i++ )
			{
				self.testTrigger( i );
			}
		}
		else
		{
			for( var i = self.displayScore; i <= self.oldscore; i++ )
			{
				self.testTrigger( i );
			}
		}
	};
	
	self.testTrigger = function( n )
	{
		
		for( var i = 0; i < self.trigger_array.length; i++ )
		{
			var item = self.trigger_array[ i ];
			if ( devmode ) console.log( 'Log: checkTriggers ' + n + ' || ' + item.score + ' || ' + item.eventid )
			if( ( item.score == n ) && ( !item.triggered ) )
			{
				item.triggered = true;
				self.screen_view.doClickById( item.eventid )
			}
		}
	}
	
	self.applyScore = function ()
	{
		self.content = self.contentstring ;
		self.content = self.content.split( '[score]' ).join( String( Math.round( self.displayScore ) ) );
		self.$content.empty().append(self.content);	/**/

		//var old_count = self.stars.length;
		var new_score = self.displayScore;

			//self.$content.find('.update_score').empty().append( $( '<p>' + new_score + '/' + self.maxscore + '</p>' ) );


		self.percent = ((new_score / self.maxscore) * 50) + 50;
		self.bar.css('width', self.percent + '%');
	};

	self.increase = function (n)
	{
		self.set(Number(self.score) + Number(n));

	};

	self.decrease = function (n)
	{
		self.set(Number(self.score) - Number(n));
	};

	self.reset = function ()
	{
		for( var i = 0; i < self.trigger_array.length; i++ )
		{
			var item = self.trigger_array[ i ];
			item.triggered = false;
		}
		self.displayScore = self.initscore;
		self.score = self.initscore;
		self.set(self.score);
		self.applyScore();
	};

	self.getPercentScore = function ()
	{
		return self.percent;
	};

	self.set = function (n)
	{
		self.oldscore = self.score;
		if ((n > self.score) && (n <= self.maxscore))
		{
			self.screen_view.doClickById(self.incrementevent);
		}
		self.score = n;

		if (self.score >= self.maxscore)
		{
			self.score = self.maxscore;
		}

		trackingObj.setCustomData(self.source, self.score);
		if (self.topic)
		{
			self.topic.setScore(Math.round((self.score / self.maxscore) * 100));
		}

		tweenTo(self, 1,
			{
				displayScore : self.score,
				onUpdate : self.applyScore,
				onComplete : self.checkTriggers
			}
		);

		if (self.score >= self.passscore)
		{
			self.screen_view.doClickById(self.xml_node.attr('passevent'));
		}
		else
		{
			self.screen_view.doClickById(self.xml_node.attr('failevent'));
		}
	};

}
ScoreElementView.prototype = ScreenElementView;
