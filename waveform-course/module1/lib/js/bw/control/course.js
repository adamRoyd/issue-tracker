
var js_array = [];

var anticache = ""; //"?r="+Math.random(10);

var devmode = true;

if (typeof loadXMLAsJavascript != 'undefined' && loadXMLAsJavascript == true) {
    js_array.push("lib/js/complied_xml.js" + anticache);
}

js_array.push("lib/js/plugins/jPlayer/jquery.jplayer.min.js" + anticache);
js_array.push("lib/js/plugins/SnapSVGAnimator/js/vendor/snap.svg/snap.svg-min.js" + anticache);
js_array.push("lib/js/plugins/SnapSVGAnimator/js/SnapSVGAnimator.min.js" + anticache);

js_array.push("lib/js/bw/control/respondo.js" + anticache);
js_array.push("lib/js/bw/utils/utils.js" + anticache);
js_array.push("lib/js/bw/view/view_utils.js" + anticache);
js_array.push("lib/js/bw/control/tracking.js" + anticache);

js_array.push("lib/js/bw/view/screen_elements/sprite.js" + anticache);

js_array.push("lib/js/bw/view/menu.js" + anticache);

js_array.push("lib/js/bw/view/preloader.js" + anticache);
js_array.push("lib/js/bw/view/v_screen.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/choices_game.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/mcq.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/column_sort.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/sliding_scale.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/score.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/photostory.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/drag_drop.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/list_sort.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/mcq_graphical.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/parallax.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/wipe_reveal_h.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/text_graphic.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/glossary.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/scrollmanager.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/multimcq.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/resource_screen.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/resource_button.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/resource_video.js" + anticache);
js_array.push("lib/js/bw/view/screen_types/custom.js" + anticache);

js_array.push("lib/js/bw/view/v_screen_element.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/text_object.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/line.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/box.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/screenlist.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/topicbutton.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/pagecounter.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/image.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/status.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/button.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/tabs.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/pointer.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/slider_reveal.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/slider_control.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/timed_element.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/timeline.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/timer.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/video_player.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/audio_player.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/subscreen_screen_element_view.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/sub_dialogue.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/score.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/edge.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/wipes.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/svg.js" + anticache);
js_array.push("lib/js/bw/view/screen_elements/svg_anim.js" + anticache);

js_array.push("lib/js/bw/model/browser_device_spec.js" + anticache);
js_array.push("lib/js/bw/model/master.js" + anticache);
js_array.push("lib/js/bw/model/coursetext.js" + anticache);
js_array.push("lib/js/bw/model/screen/screen.js" + anticache);
js_array.push("lib/js/bw/model/screen/sub_screen.js" + anticache);
js_array.push("lib/js/bw/model/screen/topic_screen.js" + anticache);
js_array.push("lib/js/bw/model/screen/dialogue_screen.js" + anticache);
js_array.push("lib/js/bw/model/screen/sub_dialogue.js" + anticache);
js_array.push("lib/js/bw/model/screen/menu_screen.js" + anticache);
js_array.push("lib/js/bw/model/screen/nav_screen.js" + anticache);
js_array.push("lib/js/bw/model/screen/soundbank_screen.js" + anticache);
js_array.push("lib/js/bw/model/screen_element.js" + anticache);
js_array.push("lib/js/bw/model/screen_event.js" + anticache);
js_array.push("lib/js/bw/model/trigger_event.js" + anticache);
js_array.push("lib/js/bw/model/event_action.js" + anticache);
js_array.push("lib/js/bw/model/sequence_event.js" + anticache);
js_array.push("lib/js/bw/model/topic.js" + anticache);
js_array.push("lib/js/bw/model/navigation.js" + anticache);
js_array.push("lib/js/bw/model/soundbank.js" + anticache);
js_array.push("lib/js/bw/model/runtime_data.js" + anticache);
//js_array.push("lib/js/bw/screentypes/sliding_scale.js" + anticache);
//js_array.push("lib/js/bw/screentypes/column_sort.js" + anticache);
//js_array.push("lib/js/bw/screentypes/mcq.js" + anticache);
//js_array.push("lib/js/bw/screentypes/drag_drop.js" + anticache);
//js_array.push("lib/js/bw/screentypes/list_sort.js" + anticache);
//js_array.push("lib/js/bw/screentypes/mcq_graphical.js" + anticache);
//js_array.push("lib/js/bw/screentypes/parallax.js" + anticache);
//js_array.push("lib/js/bw/screentypes/photostory.js" + anticache);
//js_array.push("lib/js/bw/screentypes/text_graphic.js" + anticache);
//js_array.push("lib/js/bw/screentypes/wipe_reveal_h.js" + anticache);


for (var i = 0; i < js_array.length; i++)
{
	var item = js_array[i];
	js_array[i] = item;
}

var loadedResources = {};

function processResources(resources)
{
	var hasAllResources = true;
	for (var i = 0; i < resources.length; i++)
	{

		if (!loadedResources[resources[i]])
		{
			hasAllResources = false;
		}
		loadedResources[resources[i]] = true;
	}
	if (hasAllResources)
	{
		return true;
	}
	else
	{
		return false;
	}

}

function loadJS() 
{
    if (typeof loadCompiledCSSandJavascriptAndXML != 'undefined' && loadCompiledCSSandJavascriptAndXML == true) 
    {
        jsLoaded();
    } 
    else 
    {
        Modernizr.load(
            {
                load: js_array,
                complete: jsLoaded
            }
        );
    }
}


var currentTopic;
var currentScreen;
var currentDialogue;
var menuScreen;

var previousScreen;

var _respondo = null;

var masterObj = null;
var coursetextObj = null;
var trackingObj = null;
var menuObj = null;
var navObj = null;
var soundbankObj = null;

var coursetext_ready = false;
var master_ready = false;
var lms_ready = false;

function jsLoaded()
{
	initMaster();
	initCourseText();
}

function resetLMS()
{
	try {
		// ACTION
		trackingObj.trackingConnection.resetLMS();
		trackingObj.readTrackingFromLMS();
	}
	catch (e) {
	   if ( devmode ) console.log( 'Log CATCH ERROR %o', e )
	}
}

function initMaster()
{
		
	masterObj = new Master();
	masterObj.init("lib/xml/master.xml");
	
	trackingObj = new Tracking(masterObj);
	try {
		_editor();
	}
	catch(err) {
		if ( devmode ) console.log( 'Log NO EDITOR %o', err );
	}
	
}

function initCourseText()
{
	coursetextObj = new CourseText();
	coursetextObj.init("lib/xml/coursetext.xml");
}

function coursetextXMLReady()
{
	coursetext_ready = true;
	courseReady();
}

function masterXMLReady()
{
	master_ready = true;
	courseReady();


}

function bookmarkResume()
{
	// console.log( "bookmarkResume " + trackingObj.getBookmark() );
	jumpScreen(String(trackingObj.getBookmark()));
	menuObj.inTopic();
}

function bookmarkMenu()
{
	closeDialogue();
	menuObj.showMenu();
}

function updateTracking()
{
	trackingObj.updateTracking();
}

function courseReady()
{
	if (master_ready && coursetext_ready)
	{
		trackingObj.init();
		_respondo = new Respondo();
		// console.log("course ready");
		_respondo.init();
		
		navObj = new Nav();
		navObj.createNav();

		soundbankObj = new Soundbank();
		soundbankObj.init();
		
		menuObj = new Menu(masterObj);
		menuObj.createUI();
		
		//masterObj.courseReady();
		if (isIE()) {
			$("body").addClass("ie")
		}			
		
		TweenMax.delayedCall( 1.5, masterObj.browserDeviceSpec.doErrorChecks );
	}
}

function menuReady()
{
	console.log("menuReady in course - does nothing") ;
	
	// check if there is a menu in masterObj, load autoTopic if not.
	//console.log("%c IS THERE A BOOKMARK? : %o", "color: red; background: yellow;", trackingObj ) ;	
	bookmarkSequence() ;
}

function loadTopic(topicID)
{
	navObj.navDir = "default";
	//navObj.showContent();
	masterObj.loadTopic(topicID);

	navObj.showTopicTitle(currentTopic.sLabel);
	navObj.inTopic();
	navObj.initNav();
	
	menuObj.inTopic();
}

function allowEnableNext()
{
	
	if (!currentTopic || !currentScreen) { return false; }
		
	if (currentScreen.next_locked) { return false; }
	
	if ( !currentScreen.getShowing() ) { return false; }
	
	if (!currentScreen.getCompleted() && !masterObj.isDevUnlockScreenMode()) { return false; }

	// Check if there's another page in topic to nav to
	if (currentTopic.iCurrentPos < currentTopic.arScreens.length - 1){ return true; }

	// If we are on the final page of the topic but we have a reference to a page
	if (currentScreen.nextRef && masterObj.getScreenById(currentScreen.nextRef)) { return true; }
	
	// No page in topic to nav to so nav to next topic if there is one
	if (masterObj.bNavBetweenTopics)
	{
		// Check if there's another topic to nav to
		if (masterObj.iCurrentPos < masterObj.arTopics.length) { return true; }
	}

	return false;
}

function allowEnableBack()
{
	// default to not enable back
	var enable_back = false;
	
	// no back, if there's no current screen or topic
	if (!currentTopic || !currentScreen) { enable_back = false; }
	
	// if the current screen has back locked 
	if (currentScreen.back_locked) 
	{ 
		enable_back = false; 
	}
	
	
	if ( !currentScreen.getShowing() ) { enable_back = false; }


	// Check if there's another page in topic to nav to
	if (currentTopic.iCurrentPos > 0){ enable_back = true; }

	var previous_screen = currentTopic.arScreens[ currentTopic.iCurrentPos-1 ]
	
	// If we are on the first page of the topic but we have a reference to a page
	if ( currentScreen.backRef ) 
	{
		var backref_screen = masterObj.getScreenById(currentScreen.backRef)
		if( backref_screen )
		{
			previous_screen = backref_screen;
			enable_back = true; 
		}
	}
	
	if( previous_screen )
	{
		// if the current or previous screens are scored we should not allow the back button
		if( previous_screen.scored || currentScreen.scored )
		{
			enable_back = false;
		}
		else
		{
			enable_back = true;
		}
	}
	
	// No page in topic to nav to so nav to next topic if there is one
	if ( ( !previous_screen ) && ( masterObj.bNavBetweenTopics ) )
	{
		// Check if there's another topic to nav to
		if (masterObj.iCurrentPos > 0) { enable_back = true; }
	}

	return enable_back;

}

function unlockNext()
{
	currentScreen.next_locked = false;
	enableNext();
}

function forceEnableNext()
{
	if (currentTopic.iCurrentPos < currentTopic.arScreens.length - 1)
	{
		navObj.navScreen.enableBtn(navObj.navScreen.nextBtn );
	}
}

function enableNext()
{
	
	if (allowEnableNext())
	{
		navObj.initNav() ;
	}
}

function openExit()
{
	openDialogue("exit");
}

function openHelp()
{
	openDialogue("help");
}

function openGlossary()
{
	openLink(getVarText("glossaryLink"));
}

function openResources()
{
	var resource_name = "resources";

	if (currentTopic && currentTopic.resourcesID)
	{
		resource_name = currentTopic.resourcesID;
	}

	if (currentScreen && currentScreen.resourcesID)
	{
		resource_name = currentScreen.resourcesID;
	}

	// console.log( "OPEN RESOURCE " + resource_name );

	openDialogue(resource_name);
}

function openDialogue(id, vars)
{
	hideInvisibleButtons();

	masterObj.loadDialogue(id, vars);
}

function closeDialogue()
{
	showInvisibleButtons();
	if (currentDialogue)
	{
		menuObj.menuScreen.doClickById("onDialogueClose_" + currentDialogue.id);
	}

	navObj.closeDialogue();
}

function backButtonPressed()
{
	navObj.backButtonPressed();
}

function nextButtonPressed()
{
	navObj.nextButtonPressed();
}

function goNext()
{

	navObj.navDir = "next";
	
	var jumpScreenId;
	if (currentScreen.nextRef && masterObj.getScreenById(currentScreen.nextRef))
	{
		jumpScreen(currentScreen.nextRef);
		return;
	}	
	
	var scrn = currentTopic.arScreens[0];
	if (currentTopic.iCurrentPos < currentTopic.arScreens.length - 1)
	{
		navObj.disableBackNext();
				
		currentTopic.iCurrentPos++;

		//load screen
		scrn = currentTopic.arScreens[currentTopic.iCurrentPos];
		masterObj.loadScreen(scrn);
	}
	else
	{
		// Go to next topic
		
		navObj.disableBackNext();
		
		// increment topic
		masterObj.iCurrentPos++;
		currentTopic = masterObj.arTopics[masterObj.iCurrentPos];
				
		// zero topicScreenIndex
		currentTopic.iCurrentPos=0;
		
		//load screen
		scrn = currentTopic.arScreens[currentTopic.iCurrentPos];
		masterObj.loadScreen(scrn);
	}
}

function goBack()
{
	navObj.navDir = "back";
	
	var jumpScreenId;
	if (currentScreen.backRef && masterObj.getScreenById(currentScreen.backRef))
	{
		jumpScreen(currentScreen.backRef);
		return;
	}		
	
	var scrn = currentTopic.arScreens[currentTopic.arScreens.length - 1];
	if (currentTopic.iCurrentPos > 0)
	{
		navObj.disableBackNext();
		currentTopic.iCurrentPos--;
		// console.log("GO BACK "+currentTopic.iCurrentPos)
		scrn = currentTopic.arScreens[currentTopic.iCurrentPos];
		masterObj.loadScreen(scrn);
	}
	else
	{
		navObj.disableBackNext();
		masterObj.iCurrentPos--;
		// console.log("GO NEXT "+currentTopic.iCurrentPos)
		currentTopic = masterObj.arTopics[masterObj.iCurrentPos];
		currentTopic.iCurrentPos = currentTopic.arScreens.length-1;
		scrn = currentTopic.arScreens[currentTopic.iCurrentPos];
		masterObj.loadScreen(scrn);
	}
}

function returnToMenu()
{
	
	masterObj.returnToMenu()
	trackingObj.setLessonLocation( 'menu' );
	trackingObj.updateTracking() ;
}

function exitCourse()
{
	//trackingObj.closeCourse();
	top.close();
}

function getPrevIntro()
{
	var ret_obj = null;
	var arr = currentTopic.arScreens;
	var curScrnObj = currentScreen;
		for (var i = 0; i < arr.length; i++)
		{
			var scrn = arr[i];
			if (scrn == curScrnObj)
			{
				break;
			}
			if (scrn.bHasIntro)
			{
				ret_obj = scrn;
			}
		}
		return ret_obj;
}


function loadMenuScreen()
{
	// console.log("course.js > Load current screen");

	menuScreen = masterObj.getMenuById("menuscreen");
	menuObj.menuScreen = menuScreen;

	menuScreen.initScreen($('#menuscreen'));
}

function bookmarkSequence()
{
	var bookmarked_screen = trackingObj.getBookmark();
	console.log("bookmarked_screen: " +bookmarked_screen) ;
	
	// is there a bookmark?	
	if (bookmarked_screen && (masterObj.getDialogueById("bookmark"))  || trackingObj.sLesson_location == "menu" )
	{
		menuObj.startMenu();
		
		// yes - show bookmark dialogue_screen
		// override here to skip bookmark dialogue by going directly to bookmarked screen
		if( trackingObj.sLesson_location != "menu" )
		{
			openDialogue("bookmark");
		}
		else
		{
			menuScreen.show() ;			
		}
	}
	else
	{
		// no there is no bookmark
		
		// allow masterObj to check for autoTopic and load that if there is one, otherwise returkn false
		if( !masterObj.loadAutoTopic())
		{
			// there is no bookmark, and no autoTopic, so show the menu
			menuScreen.show() ;
		}
		
		TweenMax.delayedCall( 0, showSplashDialogue );
	}

}

function showSplashDialogue()
{
	
	// is there a splash dialogue?
	if (masterObj.splashDialogue)
	{
		// yes - show it. This will display over the autoTopic if there is also one of those.
		openDialogue(masterObj.splashDialogue);
	}
}

function loadCurrentDialogue( args )
{

	if (currentDialogue)
	{

		if (currentScreen)
		{
			currentScreen.view.disable();
		}

		// console.log("course.js > Load current dialogue");

		if (navObj)
		{
			navObj.showDialogueWindow();
		}
		
		currentDialogue.initScreen($('#dialogueholder'), args);

	}
}

function screenReady(type)
{

	switch (type)
	{
		case "menu":
			

			menuReady();

			/*
			tweenTo($('#menuscreen'), 0.3,{	autoAlpha : 1, display : 'block'	});
			tweenTo($('#screenHolder_menuscreen'), 0.3,	{ autoAlpha : 1, display : 'block' } );
			*/
			/*
			menuObj.showMenu();
			menuObj.disableMenuButtons();
			menuObj.enableMenuButtons();
			*/
			
			
			
			break;
		case "dialogue":
			navObj.initDialogueWindow();
			
			
			break;
		case "sub":
			// nothin'
			break;
		case "navigation":
		
			break ;
		default:
			// updateTracking();
			// hideMenu();
			// navObj.showContent();
			break;
	}
}

function hideMenu()
{
	menuObj.hideMenu();
}

function unlockFirstTopic()
{
	menuObj.unlockFirstTopic() ;
}


var sound_muted = false;
function muteSound()
{
	sound_muted = true;
	
	var $sounds = $('.jp-flat-audio');
	if( $sounds.length>0 )
	{
		$sounds.data('control').reset();
	}
}

function unmuteSound()
{
	sound_muted = false;
	var $sounds = $('.jp-flat-audio');
	if( $sounds.length>0 )
	{
		$sounds.data('control').play();
	}
}

function startMenu()
{
	menuObj.startMenu();
}

function initAudio()
{
	soundbankObj.initAudio();
}