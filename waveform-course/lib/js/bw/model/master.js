/**
* Master model version 0.1
* @author Andy Galletly
*/

function Master() {
	//LMS DATA
	var self = this;
	
	
	self.dispatcher = $(document.createElement('div'));	
	self.dispatcher.attr('id', ('dispatcher_master' ));
	
	self.projectCode;
	self.clientBITmode
	self.bDevMode;
	self.bCheatMode = false;
	self.bDevUnlockMode = false;
	self.bDevUnlockScreenMode = false;
	
	self.responsiveMode = false;
	
	self.sLesson_status
	self.sLesson_location;
	self.sSuspend_data;
	self.iRaw_score;
	self.arInteractionsArray;
	self.bHasMenu = true;
	self.bNavBetweenTopics = false;
	self.splashDialogue ;
	self.showLMSAlert = true ;
	self.bSkipIntro = false;
	
	self.bBookmark = true;
	
	self.oXML;
	self.arTopics = new Array();
	self.arDialogues = new Array();
	self.arMenuScreens = new Array();
	self.arNavScreens = new Array();
	self.arSoundBanks = new Array();
	
	self.iCurrentPos = 0;
	
	self.bMaintainCompletion
	self.iPreviousScore

	self.runtimeCustomData = new RuntimeCustomData();
	
	self.init = function (sXML)
	{
		doc = $(document);
		win = $(window);
		loadXML(sXML, self.xmlReady);
	}

	self.xmlReady = function (data)
	{
		self.oXML = data;
		// console.log("master.js Course > xmlReady");
		self.initMasterSettings();
		self.createDialogues();
		self.createMenuScreens();
		self.createNavScreens();
		self.createSoundBanks();
		self.createTopics();

		masterXMLReady();
	}
	
	self.courseReady = function()
	{
		_respondo.dispatcher.bind('updateSize', self.updateSize);
		
		
		//if( !self.bHasMenu)
			
		TweenMax.delayedCall( 1, self.loadAutoTopic ) ;
	}

	self.loadAutoTopic = function()
	{
		var autoTopicObj = self.getTopicById( self.autotopic ) ;
		
		if ( devmode ) console.log( "autotopic: " + self.autotopic ) ;
		if ( devmode ) console.log( "autoTopicObj: %o", autoTopicObj ) ;
		
		if( self.autotopic)
		{
			$('#contentholder').show(); 
			loadTopic( self.autotopic );
			return true ;
		}
		else
		{
			return false ;
		}
	}
	
	self.updateSize = function()
	{
		closeDialogue();
	}
	
	self.initMasterSettings = function ()
	{

		var master_node = $( $( self.oXML ).children()[ 0 ] )

		if( master_node.attr("title") )
		{
			self.courseTitle = String( master_node.attr("title") );
			document.title = self.courseTitle;
		}
		
		self.desktoplayout = 'fixed';
		if( master_node.attr("desktoplayout") )
		{
			self.desktoplayout = master_node.attr("desktoplayout");
		}
		
		switch(self.desktoplayout)
		{
			case 'fixed':
				$('body').addClass('fixed_layout');
				break;
			case 'scroll':
				$('body').addClass('scrolling_layout');
				break;
		}
		
		if( master_node.attr("bitprjcode") )
		{
			self.projectCode = master_node.attr("bitprjcode");
		}
		
		if( master_node.attr("completionmode") )
		{
			self.completionMode = String( master_node.attr("completionmode"));
		}
		
		if( master_node.attr("clientbitmode") )
		{
			self.clientBITmode = Boolean( master_node.attr("clientbitmode") == "true" );
		}
		
		if( master_node.attr("skipintro") )
		{
			self.bSkipIntro = Boolean( master_node.attr("skipintro") == "true" );
		}
		
		if( master_node.attr( "devmode" ) )
		{
			self.bDevMode = Boolean( master_node.attr( "devmode" ) == "true" );
		}
		devmode = self.bDevMode;
		
		/* flags for internal testing */
		if (self.bDevMode && !self.clientBITmode ) {				
			$("body").addClass("devMode");
		} else {
			$("body").addClass("releaseMode");
		}
		
		if( master_node.attr( "devunlockmode" ) )
		{
			self.bDevUnlockMode = Boolean( master_node.attr( "devunlockmode" ) == "true" );
		}
		
		if( master_node.attr( "cheatmode" ) )
		{
			self.bCheatMode = Boolean( master_node.attr( "cheatmode" ) == "true" );
		}
		
		if( master_node.attr( "devunlockscreenmode" ) )
		{
			self.bDevUnlockScreenMode = Boolean( master_node.attr( "devunlockscreenmode" ) == "true" );
		}
		
		if( master_node.attr( "showlmsalert" ) )
		{
			self.showLMSAlert = Boolean( master_node.attr( "showlmsalert" ) == "true" );
		}
		
		if( master_node.attr( "responsive" ) )
		{
			self.responsiveMode = Boolean( master_node.attr( "responsive" ) == "true" );
		}
		
		var deviceSpec="";
		if( master_node.attr( "devicespec" ) ) 
		{
			deviceSpec = master_node.attr( "devicespec" );
		}		
		
		var desktopBrowserSpec="";
		if( master_node.attr( "desktopbrowserspec" ) )	
		{
			desktopBrowserSpec = master_node.attr( "desktopbrowserspec" );
		}		
		
		var hasVideo = false;
		if( master_node.attr( "hasvideo" ) ) 
		{
			hasVideo = Boolean( master_node.attr( "hasvideo" ) == "true" );
		}		
		
		self.browserDeviceSpec = new BrowserDeviceSpec( deviceSpec , desktopBrowserSpec , hasVideo, self.responsiveMode )
		
		if( master_node.attr( "menu" ) )
		{
			self.bHasMenu = Boolean( master_node.attr( "menu" ) == "true" );
		}
		
		if( master_node.attr( "autotopic" ) )
		{
			self.autotopic = master_node.attr( "autotopic" );
			if( self.autotopic == "-1" )
			{
				self.autotopic = null ;
			}
		}
		
		if( master_node.attr( "navbetweentopics" ) )
		{
			self.bNavBetweenTopics = Boolean( master_node.attr( "navbetweentopics" ) == "true" );
		}
		
		
		if( master_node.attr( "splashdialogue" ) )
		{
			self.splashDialogue = master_node.attr( "splashdialogue" ) ;
		}
		
		if( master_node.attr( "pagecounttype" ) )
		{
			self.pagecounttype = master_node.attr( "pagecounttype" ) ;
		}
		if( master_node.attr( "pagecountalign" ) )
		{
			self.pagecountalign = master_node.attr( "pagecountalign" ) ;
		}
		self.pagecountallowjump = Boolean(master_node.attr( "pagecountallowjump" ) == "true" ) ;
		
	}

	self.resetAssessment = function ()
	{		
		currentTopic.reCreate(true);
		loadTopic(currentTopic.id);
	}

	self.createTopics = function ()
	{
		self.arTopics = [];
		$(self.oXML).find('topic').each(function ()
		{
			var topic = new Topic($(this));
			self.arTopics.push(topic);
		}
		)
	}

	self.createDialogues = function ()
	{
		var dialogues = new Array();
		$(self.oXML).find('dialogue').each(function ()
		{
			var oDialogue = new DialogueScreen($(this));
			dialogues.push(oDialogue);
		}
		)
		self.arDialogues = dialogues;
		dialogues = null;
	}

	self.createMenuScreens = function ()
	{
		var menuscreens = new Array();
		$(self.oXML).find('menu').each(function ()
		{
			var menuScreen = new MenuScreen($(this));
			menuscreens.push(menuScreen);
		}
		)
		self.arMenuScreens = menuscreens;
		menuscreens = null;
	}

	self.createNavScreens = function ()
	{
		var navscreens = new Array();
		$(self.oXML).find('navigation').each(function ()
		{
			var oNavScreen = new NavScreen($(this));
			navscreens.push(oNavScreen);
		}
		)
		self.arNavScreens = navscreens;
		navscreens = null;
	}

	self.createSoundBanks = function ()
	{
		$(self.oXML).find('soundbank').each(function ()
		{
			var oSoundBank = new SoundbankScreen($(this));
			self.arSoundBanks.push(oSoundBank);
		}
		)
	}

	self.updateLMSVars = function (pQuitting)
	{
		//send lesson_location, lesson_status, raw score
		self.sLesson_status = self.getLessonStatus();

		var arLMS = new Array();
		arLMS[0] = self.sLesson_location;
		arLMS[1] = self.sLesson_status;
		arLMS[2] = self.sSuspend_data;
		if (!isNaN(self.iRaw_score))
		{
			arLMS[3] = self.iRaw_score;
			if (self.bMaintainCompletion)
			{
				if (!isNaN(self.iPreviousScore) && (self.iPreviousScore >= self.iRaw_score))
				{
					arLMS[3] = self.iPreviousScore;
				}
			}
		}
		else
		{
			arLMS[3] = "noscore";
		}
		arLMS[4] = null;
		if (self.arInteractionsArray.length > 0)
		{
			if (self.bMaintainCompletion)
			{
				if (self.iRaw_score >= self.iPreviousScore)
				{
					arLMS[4] = self.arInteractionsArray;
				}
			}
			else
			{
				arLMS[4] = self.arInteractionsArray;
			}
		}
		arLMS[5] = pQuitting;
		updateSCORMSupport(arLMS[0], arLMS[1], arLMS[2], arLMS[3], arLMS[4], arLMS[5]);
	}

	self.getMenuById = function (id)
	{
		
	
		var rtn = null;
		for (var i = 0; i < self.arMenuScreens.length; i++)
		{
			var menuScreen = self.arMenuScreens[i];
			if (id == menuScreen.id)
			{
				rtn = menuScreen;
				break;
			}
		}

		return rtn;
	}

	self.getNavById = function (id)
	{
		
		var rtn = null;
		for (var i = 0; i < self.arNavScreens.length; i++)
		{
			var oNavScreen = self.arNavScreens[i];
			if (id == oNavScreen.id)
			{
				rtn = oNavScreen;
				break;
			}
		}

		return rtn;
	}
	
	self.getSoundbankById = function (id)
	{
		for (var i = 0; i < self.arSoundBanks.length; i++)
		{
			var oSoundBank = self.arSoundBanks[i];
			if (id == oSoundBank.id)
			{
				return oSoundBank;
			}
		}

		return null;
	}
	
	self.getDialogueById = function (id)
	{
		var rtn = null;
		for (var i = 0; i < self.arDialogues.length; i++)
		{
			var oDialogue = self.arDialogues[i];
			if (id == oDialogue.id)
			{
				rtn = oDialogue;
				break;
			}
		}

		return rtn;
	}

	self.getPreviousTopic = function()
	{
		if( self.iCurrentPos>0 )
		{
			return self.arTopics[ self.iCurrentPos-1 ];
		}
		else
		{
			return false;
		}
	}
	
	self.getTopicById = function (id)
	{
		var rtn = null;
		for (var i = 0; i < self.arTopics.length; i++)
		{
			var topic = self.arTopics[i];
			if (id == topic.id)
			{
				rtn = topic;
				break;
			}
		}

		return rtn;
	}
	
	self.areTopicsUnlocked = function (unlockTopics)
	{
		if (!unlockTopics) return false;
		
		var topicGroups = self.stringToTopicGroupArray(unlockTopics);
		for (var i = 0; i < topicGroups.length; i++)
		{
			var topicGroup = topicGroups[i];
			if (!self.isTopicGroupComplete(topicGroup))
			{
				return false;
			}
		}
		
		return true;
	}
	
	self.isTopicGroupComplete = function(topicGroup)
	{
		var completeCount = 0;
		for (var i = 0; i < topicGroup.topicList.length; i++)
		{
			var unlockTopic = self.getTopicById( topicGroup.topicList[i] );
			if( (unlockTopic && unlockTopic.completed) || !unlockTopic)
			{
				completeCount++;
			}
		}
		
		return completeCount >= topicGroup.reqTopicsCount;
	}
	
	self.stringToTopicGroupArray = function(unlockTopics)
	{
		// 1,2,3
		// 5,6,8:2]
		// 5,6,7
		
		var topicList = unlockTopics.split("[");
		
		var unlockTopics = [];
		var topicGroups = [];
		for (var i = 0; i < topicList.length; i++)
		{
			var topicItem = topicList[i];
			
			if (topicItem.indexOf(']') > -1)
			{
				// Topic group notation is like this [5,6,8:2]
				// First remove the brackets
				topicItem = topicItem.split(']')[0];
				var reqTopicsSplit = topicItem.split(':');
				var reqTopicsCount = reqTopicsSplit.length > 1 ? reqTopicsSplit[1] : 1;
				var topicIds = reqTopicsSplit[0].split(',');
				var topicGroup = new self.topicGroup(topicIds, reqTopicsCount);
				
				topicGroups.push(topicGroup);
			}
			else
			{
				var ungroupedTopicIds = topicItem.split(',');
				unlockTopics = unlockTopics.concat(ungroupedTopicIds);
			}
		}
		
		if (unlockTopics.length > 0)
		{
			topicGroups.push(new self.topicGroup(unlockTopics, unlockTopics.length));
		}
		
		return topicGroups;
	}
	
	self.topicGroup = function(topicList, reqTopicsCount) 
	{
		this.reqTopicsCount = Number(reqTopicsCount);
		this.topicList = topicList;
	};

	self.getTopicPositionById = function (id)
	{
		var rtn = null;
		for (var i = 0; i < self.arTopics.length; i++)
		{
			var topic = self.arTopics[i];
			if (id == topic.id)
			{
				rtn = i;
				return rtn;
			}
		}

		return rtn;
	}

	self.getScreenById = function (id)
	{
		var rtn = null;
		for (var i = 0; i < self.arTopics.length; i++)
		{
			var topic = self.arTopics[i];
			for (var j = 0; j < topic.arScreens.length; j++)
			{
				var screen = topic.arScreens[j];
				if (id == screen.id)
				{
					rtn = screen;
					break;
				}
			}
		}

		return rtn;
	}

	self.getScreenPosById = function (id)
	{
		var i = 0;
		var bFoundScreen = false;
		for (; i < currentTopic.arScreens.length; i++)
		{
			var scrn = currentTopic.arScreens[i];
			if (id == scrn.id)
			{
				bFoundScreen = true;
				break;
			}
		}
		if (!bFoundScreen)
		{
			var errorMsg = "Screen ID: '" + id + "' not found in current topic."
				if ( devmode ) console.error(errorMsg)
		}
		return i;
	}

	self.getScreenPos = function (screenObj)
	{
		var pos = 0;
		var topic = self.getTopicById(screenObj.topicId);
		for (var i = 0; i < topic.arScreens.length; i++)
		{
			var scrn = topic.arScreens[i];
			if (screenObj == scrn)
			{
				pos = i + 1;
			}
		}

		return pos;
	}

	self.isDevUnlockScreenMode = function()
	{
		if( devmode && self.bDevUnlockScreenMode )
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	self.loadTopic = function (id)
	{
	//	navObj.navDir = "default"
		if( menuObj.menuScreen )
		{
			if( menuObj.menuScreen.is_showing )
			{
				hideMenu()
			}
		}

		
		currentTopic = self.getTopicById(id);

		self.iCurrentPos = self.getTopicPositionById(id);

		if (currentTopic.getAssessment())
		{
			currentTopic.reCreate();
		}

		var scrn = currentTopic.arScreens[0]
		// console.log("menu.js loadTopic > current topic: " + currentTopic.id + " " + currentTopic.sLabel + " scrn " + scrn)
		
		currentTopic.iCurrentPos = 0;
		
		self.loadScreen(scrn)
		
		
	}
	self.bitDiv = null;	
	self.bitTextArea = null ; 
	
	self.updateBITButton = function()
	{
		if( self.bDevMode )
		{
			if( !self.bitDiv )
			{
			
				self.bitDiv = $( '<div id="BIT" />')
				self.bitDiv.append( $( '<button id="BITbtn">BIT</button>' ) ); 
				//self.bitDiv.append( $( '<p id="BITtext"></p>' ) );
				self.bitTextArea = $('<input type="text" id="BITInput" />');

				$('#courseholder').append(self.bitDiv);
				self.bitDiv.css('z-index', 1100);
				self.bitDiv.css('position', 'absolute');
				$('#BITbtn').click(function ()
				{
					masterObj.openBit()
				}
				);
				$(self.bitTextArea).addClass('BITtextInput');
				self.bitDiv.append(self.bitTextArea);

				if (!self.clientBITmode)
				{
					self.bitDiv.append($('<button id="BITGobtn">Go</button>'));
					$('#BITGobtn').addClass('bitGo');
					$('#BITGobtn').click(function ()
					{
						masterObj.goBit()
					}
					);
					
				    // auto bind default enter to Go button.
					self.bitTextArea.keyup(function (e) {
					    var code = (e.keyCode ? e.keyCode : e.which);
					    if (code == 13) {
					        self.goBit();
					    }
					});					
				}
			}

			self.bitTextArea = $('#BITInput')
			self.bitTextArea.empty();

			if( currentScreen )
			{
				self.bitTextArea.val(currentScreen.id);
			}
			

		}
	}
	
	self.openBit = function( id )
	{
		var sBITPrjCode = self.projectCode;
		var bIsClientCapture = self.clientBITmode;
		
		if( !id )
		{
			if( currentScreen )
			{
				var id = currentScreen.id;
			}
		}
		
		if( id )
		{
			var sScoId = id.split("_")[0]
			var sScrId = id.split("_")[1]

			fnLaunchBIT( sBITPrjCode, sScoId, sScrId, bIsClientCapture );
		}
		else
		{
			fnLaunchBIT( sBITPrjCode, 'na', 'na', bIsClientCapture );
		}
	}
	
	self.goBit = function()
	{		
		var screenId = $('#BITInput').val();
		if( currentScreen )
		{
			if( screenId == currentScreen.id )
			{
				currentScreen.kill() ;
				currentScreen = null ;
			}
		}
		if ( devmode ) console.log("GO BIT: " + screenId ) ;
		
		jumpScreen( screenId ) ;
	}
	
	self.loadScreenObj = function( screenObj )
	{
		navObj.navDir = 'next';
		hideMenu()
		self.iCurrentPos = self.getTopicPositionById( screenObj.topicId );
		currentTopic = self.getTopicById( screenObj.topicId );
		currentTopic.iCurrentPos = self.getScreenPos( screenObj )-1;
		
		currentTopic.markPreviousScreensCompleted( screenObj.id );
		
		self.loadScreen( screenObj );
	}
	
	self.loadScreen = function( scrn )
	{
		navObj.disableBackNext();
		
		// move to navigation ?? 
		if( currentScreen != scrn )
		{
			closeDialogue();
			if(currentScreen)
			{
				currentScreen.disable();
				previousScreen = currentScreen;
				//currentScreen.view.removeScreen();
			}
			if ( devmode ) console.log( 'LOG: SETTING CURRENT SCREEN ' + scrn.id );
			currentScreen = scrn;
			
			
			
			currentTopic = currentScreen.topic;
			self.dispatcher.trigger( 'changingscreen' ) ;
			self.dispatcher.trigger( 'changedscreen' ) ;
			self.updateBITButton();
			
			currentScreen.dispatcher.bind( 'loaded', self.currentScreenLoaded );
			
			currentScreen.initScreen($('#contentholder'));
			
			
			
		}
		else
		{
			currentTopic = currentScreen.topic;
		}
	}
	
	self.currentScreenLoaded = function()
	{
		
		currentScreen.dispatcher.unbind( 'loaded', self.currentScreenLoaded );
		
		if( previousScreen )
		{
			previousScreen.dispatcher.bind( 'ready_to_leave', self.showNewScreen );
			previousScreen.prepareToLeave();
			
		}
		else
		{
			self.showNewScreen();
		}
	}
	
	self.showNewScreen = function( ) 
	{
		hideMenu();
		updateTracking();
		navObj.showContent();
	}
	
	self.loadDialogue = function( id, vars )
	{
		var oDialogue = self.getDialogueById(id)
		
		if( oDialogue )
		{			
			if( currentDialogue )
			{
				if( currentDialogue.view )
				{
					currentDialogue.view.removeScreen();
				}
			}
			currentDialogue = oDialogue;
			loadCurrentDialogue( vars );
		}
	}
	
	self.getCompletionMode = function()
	{
		return self.completionMode;
	}
	
	self.returnToMenu = function()
	{
		navObj.disableBackNext();
		if( currentScreen )
		{
			currentScreen.dispatcher.bind( 'ready_to_leave', self.showMenu );
			currentScreen.prepareToLeave();
			
		}
		else
		{
			self.showMenu();
		}
	}
	
	self.showMenu = function( id )
	{
		if( id )
		{
			if ( devmode ) console.warn( 'Log SHOW MENU %o' , id )
		}
		if( currentScreen )
		{	
			if ( devmode ) console.warn( 'WARN: UNBINDING ' +currentScreen.id );
			currentScreen.dispatcher.unbind( 'ready_to_leave' );
		}
		trackingObj.updateTracking();

		
		if (currentScreen)
		{
			if (currentScreen)
			{
				currentScreen.leave();
			}
		}

			if ( devmode ) console.warn( 'WARN: SETTING CURRENT SCREEN TO NULL ' + currentScreen.id );
		currentScreen = null;
		previousScreen = null;
		currentTopic = null;

		navObj.hideContent();
		navObj.hideNav();
		navObj.inMenu();
		menuObj.showMenu();
		self.updateBITButton();
		trackingObj.updateTracking();

	}
}