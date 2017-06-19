function SubScreenView( m )
{		
	var self = this ;
	ScreenElementView.call(self, m);
		
	self.subScreenObject = new SubScreen( self.xml_node, self );
	self.autoload = true;
	
	self.setContent = function()
	{
		self.$div.addClass('screen');
		self.$div.addClass('notloaded');
		
		if( self.xml_node.attr('autoload') == 'false' )
		{
			self.autoload = false;
		}
		
		if( self.xml_node.attr('scroll') == 'true' )
		{
			self.$div.addClass( 'scrolling' )
		}
		
		self.$div.data('subScreenView', self )
		
		//if ( devmode ) console.log( 'Log AUTOLOAD ' + self.model.id + ' ' + self.autoload )
		if( self.autoload )
		{
			self.load();
		}
		
		self.base_setContent();
		
	}
	
	self.unload = function(  )
	{
		//if ( devmode ) console.log( 'Log UNLOAD ' + self.subScreenObject.id)
		if( self.loaded )
		{
			self.$div.addClass('notloaded');
			self.loaded = false;
			self.subScreenObject.kill();
			//self.subScreenObject.hide();
		}
	}
	
	self.load = function()
	{
		if( !self.loaded )
		{
			self.$div.removeClass('notloaded');
			self.loaded = true;
			//if ( devmode ) console.log( 'Log LOAD SUB SCREEN ' + self.model.id  )
			self.subScreenObject.dispatcher.bind( 'loaded', self.subScreenLoaded );
			//if ( devmode ) console.log( 'Log CALLING SUB SCREN INIT' )
			self.subScreenObject.initScreen( self.$div );
		}
	}
	
	self.subScreenLoaded = function(  )
	{
		
		self.subScreenObject.show();
	}
	
	self.super_kill = self.kill;
	self.kill = function(  )
	{
		
		self.subScreenObject.kill();
		
		self.super_kill()
	}
	
}
SubScreenView.prototype = ScreenElementView;