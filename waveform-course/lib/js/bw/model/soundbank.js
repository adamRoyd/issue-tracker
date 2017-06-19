/**
* Navigation v0.1
* @author Andy Galletly
*/
function Soundbank()
{
	var self = this ;
	self.$div = $('#soundholder');
	self.courseHolder = $('#courseholder');
	self.oMaster = masterObj;
	self.soundScreen ;
	self.soundRegister = {};
	
	// Called by course.js at courseReady()
	self.init = function()
	{		
		if ( devmode ) console.log("soundbank.init()") ;
		
		self.loadsoundScreen() ;
	};
	
	self.loadsoundScreen = function()
	{		
		self.soundScreen = masterObj.getSoundbankById( "globalsound" ) ;
		
		self.soundScreen.setSoundModel( self ) ;
		self.soundScreen.initScreen($('#soundholder'));
		
		self.soundScreen.dispatcher.bind( 'setupComplete', self.soundScreenSetupComplete  ) ;
	}
	
	self.soundScreenSetupComplete = function()
	{
		if (devmode) console.log("soundScreenSetupComplete");
	}
	
	// Has to be called by user interaction to circumvent iPad restrictions
	self.initAudio = function()
	{
		if (devmode) console.log("initAudio");
		var screenElms = self.soundScreen.view.arScreenElements;
		
		for (var i=0; i < screenElms.length; i++)
		{
			var elm = screenElms[i];
			if (!(elm.view instanceof AudioPlayerView)) continue;
			
			var url = elm.view.src_url;
			if (self.soundRegister[url]) continue;
			
			elm.view.initPlayback();
			self.soundRegister[url] = elm;
		}
	}
	
	self.hasSound = function(url)
	{
		return self.soundRegister[url] != null;
	}
	
	self.getSound = function(url)
	{
		return self.soundRegister[url];
	}
	
}