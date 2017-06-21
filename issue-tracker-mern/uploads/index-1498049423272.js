//detect device
var isMobileOrTabletDevice = {
    Android: function () {
        return Boolean(navigator.userAgent.match(/Android/i));
    },
    BlackBerry: function () {
        return Boolean(navigator.userAgent.match(/BlackBerry/i));
    },
    iOS: function () {
        return Boolean(navigator.userAgent.match(/iPhone|iPad|iPod/i));
    },
    Opera: function () {
        return Boolean(navigator.userAgent.match(/Opera Mini/i));
    },
    WindowsMobile: function () {
        return Boolean(navigator.userAgent.match(/IEMobile/i));
    },
    Surface: function () {
        return Boolean(navigator.userAgent.match(/Mozilla.*Windows NT.*; Touch/i));
    },
    any: function () {
        return (isMobileOrTabletDevice.Android() || isMobileOrTabletDevice.BlackBerry() || isMobileOrTabletDevice.iOS() || isMobileOrTabletDevice.Opera() || isMobileOrTabletDevice.WindowsMobile() || isMobileOrTabletDevice.Surface());
    }
};
var const_NA = new String('na');		// constant not applicable string
var vGbl_CourseLaunched	= new Boolean(false);		// true if the course has been launched
if(typeof(vPageExt) != "string"){
	vPageExt = ".htm";	
}
function _SCO() { }
function _Assessment() { }
function _Logon(pbIncLogon, pbIncSurname, pbIncFirstname, pbIncUsername, pbUsernameIsEmail, pbIncYOB, pbIncDept, pbUsernameIsNumeric, pbIncLoc, pbIncJobRole, pbConfirm) {
	this.spIncLogon					= verify(pbIncLogon,'boolean','_Logon > spIncLogon');
	if (pbIncLogon == true) {
		this.spLogon_IncSurname		= verify(pbIncSurname,'boolean','_Logon > spLogon_IncSurname');
		this.spLogon_IncFirstname	= verify(pbIncFirstname,'boolean','_Logon > spLogon_IncFirstname');
		this.spLogon_IncYOB			= verify(pbIncYOB,'boolean','_Logon > spLogon_IncYOB');
		this.spLogon_IncDept		= verify(pbIncDept,'boolean','_Logon > spLogon_IncDept');
		this.spLogon_IncLocation	= verify(pbIncLoc,'boolean','_Logon > spLogon_IncLocation');
		this.spLogon_IncJobRole		= verify(pbIncJobRole,'boolean','_Logon > spLogon_IncJobRole');
		this.spLogon_IncUsername	= verify(pbIncUsername,'boolean','_Logon > spLogon_IncUsername');
		this.spLogon_UNameIsEmail	= verify(pbUsernameIsEmail,'boolean','_Logon > spLogon_UNameIsEmail');
		this.spLogon_UNameIsNumeric = verify(pbUsernameIsNumeric,'boolean','_Logon > spLogon_UNameIsNumeric');
		this.spLogon_Confirm		= verify(pbConfirm,'boolean','_Logon > spLogon_Confirm');
	} else {
		this.spLogon_IncSurname		= false;
		this.spLogon_IncFirstname	= false;
		this.spLogon_IncYOB			= false;
		this.spLogon_IncDept		= false;
		this.spLogon_IncUsername	= false;
		this.spLogon_UNameIsEmail	= false;
		this.spLogon_UNameIsNumeric = false;
		this.spLogon_IncJobRole		= false;
		this.spLogon_IncLocation	= false;
		this.spLogon_Confirm		= false;
	}
	this.sLog_Surname	= 'na';
	this.sLog_Firstname	= 'na';
	this.sLog_YOB		= 'na';
	this.sLog_Dept		= 'na';
	this.sLog_Username	= 'na';
	this.sLog_JobRole	= 'na';
	this.sLog_Location	= 'na';
	if (pbIncLogon == true) {
		if ((this.spLogon_IncSurname == false) && (this.spLogon_IncFirstname == false) && (this.spLogon_IncYOB == false) && (this.spLogon_IncDept == false) && (this.spLogon_IncUsername == false) && (this.spLogon_UNameIsEmail == false) && (this.spLogon_IncJobRole == false) && (this.spLogon_IncLocation == false)) {
			_Logon_err(0);
		}
	}
	if (this.spLogon_IncDept == true) {
		if(typeof(vPr_DeptList) == 'object') {
			if (vPr_DeptList.length < 1) {
				_Logon_err(1); // missing list
				this.spLogon_IncDept = false;
			}
		} else {
			_Logon_err(1); // missing list
			this.spLogon_IncDept = false;
		}
	}
	if (this.spLogon_IncLocation == true) {
		if(typeof(vPr_LocationList) == 'object') {
			if (vPr_LocationList.length < 1) {
				_Logon_err(2); // missing list
				this.spLogon_IncLocation = false;
			}
		} else {
			_Logon_err(2); // missing list
			this.spLogon_IncLocation = false;
		}
	}
	if (this.spLogon_IncJobRole == true) {
		if(typeof(vPr_RoleList) == 'object') {
			if (vPr_RoleList.length < 1) {
				_Logon_err(3); // missing list
				this.spLogon_IncJobRole = false;
			}
		} else {
			_Logon_err(3); // missing list
			this.spLogon_IncJobRole = false;
		}
	}
	if ((this.spLogon_UNameIsEmail == true) && (this.spLogon_UNameIsNumeric == true)) {
		_Logon_err(4);
	}
}
function _Logon_err(pVal) {
	var vMsg = new String();
	switch(pVal) {
		case 0: vMsg = 'You cannot have a log on screen but fail to select any logon elements to include.'; break;
		case 1: vMsg = 'You cannot select to include a department list as it has not been defined.'; break;
		case 2: vMsg = 'You cannot select to include a location list as it has not been defined.'; break;
		case 3: vMsg = 'You cannot select to include a job role list as it has not been defined.'; break;
		case 4: vMsg = 'You cannot have both the user name as an email address and as a numeric value.'; break;
		default: vMsg = 'Unrecognised error code passed to _Logon_err'
	}
	alert(vMsg)
}
function _SplashScreen(pTheme,pLanguage,pScreenReaderSupport,pScreenReaderQuest,pDebug,pDebugMsg,pResizeSplashWindow,pSplashWinWidth,pSplashWinHeight,pSplashTop,pSplashLeft,pCentreWindow, pIncAutoLaunch, pAutoLaunchTimeOut, pSupportCDROM, pSupportOnline, pMinColourDepth, pOSSupport, pBrowserSupport, pCookiesRequired, pIncSplashImg, pIncSplashFlash, pSplashToolTip, pIncStartButton, pIncScreenReaderButton, pIncScreenReaderInfoBut, pIncChangeThemeButton, pIncProjectDescriptionButton, pIncTestVolumeLevels, pIncChangeLang, pIncSystemCheckButton, pIncProjectTitle, pIncProjectDescription, pIncVerison, pIncPublishDate, pIncRubric, pRubric, pIncPlugInCheck, pIncWMP6, pIncWMP7, pIncWMP9, pIncWMP10,pIncQuickTime, pIncShockWave, pBrowserError, pResError, pWMPError, pFlashError, pQTimeError, pShockError, pColorError, pOSError, pCDROMError, pOnlineError, pJSError, pCookiesError, pSupportSCORM1_2, pSupportNETg, pSupportSkillSoft, pSupportTrac2, pOpenWinWidth, pOpenWinHeight, pOpenFullScr, pOfflineOnlyError, pOnlineOnlyError, pIncUserName, pUserNameMaxLength, pUserNameMinLength, pIncUserNameIsEmail,pIncAudioOnBut,pIncAudioOffBut,pbIncLogon, pbIncSurname, pbIncFirstname, pbIncUsername, pbUsernameIsEmail, pbIncYOB, pbIncDept, pbUsernameIsNumeric, pbIncSplashLoc, pbIncSplashJobRole, pbConfirm, pSupportBWContentTrack,pCourseTimeout,pTimeout,pTimeoutMsg,pIncFlashVer,pSplashWinOpen) {
	this.spTheme				= verify(pTheme,'int','_SplashScreen > spTheme');
	this.spLanguage				= verify(pLanguage,'str_lang','_SplashScreen > spLanguage');
	this.spScreenReaderSupport	= verify(pScreenReaderSupport,'yes_no_ask','_SplashScreen > spScreenReaderSupport');	// define if this course offers screen reader support
	this.spAudioState			= vPr_AudioState //course audio state, default is true. Is changed to false when clicking the audio_off button on the splash screen
	if (this.spScreenReaderSupport == 'ask') {
		this.spScreenReaderQuest = verify(pScreenReaderQuest,'str_1_255','_SplashScreen > spScreenReaderQuest');
	} else {
		this.spScreenReaderQuest = const_NA;
	}
	this.spOpenFullScr	= verify(pOpenFullScr,'boolean','_SplashScreen > spOpenFullScr');
	this.spOpenAtWidth	= verify(pOpenWinWidth,'int','_SplashScreen > spOpenAtWidth');
	this.spOpenAtHeight = verify(pOpenWinHeight,'int','_SplashScreen > spOpenAtHeight');
	this.spSplashWinOpen = pSplashWinOpen;
	this.spLogon = new _Logon(pbIncLogon, pbIncSurname, pbIncFirstname, pbIncUsername, pbUsernameIsEmail, pbIncYOB, pbIncDept, pbUsernameIsNumeric, pbIncSplashLoc, pbIncSplashJobRole, pbConfirm)
	this.spDebug			= verify(pDebug,'boolean','_SplashScreen > spDebug');
	if (this.spDebug) {
		this.spDebugMsg		= verify(pDebugMsg,'str_1_255','_SplashScreen > spDebugMsg');
	} else {
		this.spDebugMsg		= const_NA;
	}
	if (! this.spDebug) {
		document.oncontextmenu  = function() {return false;} // prevent right clicking on a page
		document.onmousewheel  = function() {return false;}	// prevent CTRL & roll mouse
	}
	this.spAllowResize			= verify(pResizeSplashWindow,'boolean','_SplashScreen > spAllowResize');
	if (this.spAllowResize) {
		this.spWinWidth		= verify(pSplashWinWidth,'int','_SplashScreen > spWinWidth');
		this.spWinHeight	= verify(pSplashWinHeight,'int','_SplashScreen > spWinHeight');
		this.spCentreWindow	= verify(pCentreWindow,'boolean','_SplashScreen > spCentreWindow');
		if (this.spCentreWindow) {
			this.spWinTop		= ((screen.height - this.spWinHeight) / 2);
			this.spWinLeft		= ((screen.width - this.spWinWidth) / 2);
		} else {
			this.spWinTop		= verify(pSplashTop,'int','_SplashScreen > spWinTop');
			this.spWinLeft		= verify(pSplashLeft,'int','_SplashScreen > spWinLeft');
		}
	} else {
		this.spWinWidth		= 0;
		this.spWinHeight	= 0;
		this.spWinTop		= 0;
		this.spWinLeft		= 0;
		this.spCentreWindow	= false;
	}
	this.spIncAutoLaunch	= verify(pIncAutoLaunch,'boolean','_SplashScreen > spIncAutoLaunch');
	if (this.spIncAutoLaunch) {
		if (this.spScreenReaderSupport == 'yes') {
			this.spIncAutoLaunch	 = false;
			this.spAutoLaunchTimeOut = 0;
		} else {
			this.spAutoLaunchTimeOut = verify(pAutoLaunchTimeOut,'int_0_100','_SplashScreen > spAutoLaunchTimeOut');
		}
	} else {
		this.spAutoLaunchTimeOut = 0;
	}
	this.spSupportCDROM		= verify(pSupportCDROM,'boolean','_SplashScreen > spSupportCDROM');
	this.spSupportOnline	= verify(pSupportOnline,'boolean','_SplashScreen > pSupportOnline');
	this.spMinColourDepth	= verify(pMinColourDepth,'int_colour_depth','_SplashScreen > spMinColourDepth');
	this.spOSSupport		= verify(pOSSupport,'str_1_255','_SplashScreen > spOSSupport');
	this.spBrowserSupport	= verify(pBrowserSupport,'str_1_255','_SplashScreen > spBrowserSupport');
	this.spCookiesRequired  =  verify(pCookiesRequired,'str_1_255','_SplashScreen > spCookiesRequired');
	this.spIncPlugInCheck  = verify(pIncPlugInCheck,'boolean','_SplashScreen > spIncPlugInCheck');
	this.spErrorMsg = const_NA;
	if (this.spIncPlugInCheck) {
		this.spIncWMP6		= verify(pIncWMP6,'boolean','_SplashScreen > spIncWMP6');
		this.spIncWMP7		= verify(pIncWMP7,'boolean','_SplashScreen > pIncWMP7');
		this.spIncWMP9		= verify(pIncWMP9,'boolean','_SplashScreen > pIncWMP9');
		this.spIncWMP10		= verify(pIncWMP10,'boolean','_SplashScreen > pIncWMP10');
		this.spIncFlashVer 	= pIncFlashVer;
		this.spIncQuickTime	= verify(pIncQuickTime,'boolean','_SplashScreen > pIncQuickTime');
		this.spIncShockWave	= verify(pIncShockWave,'boolean','_SplashScreen > pIncShockWave');
		this.spWMPError		= verify(unescape(pWMPError),'str_1_2000','_SplashScreen > pWMPError');
		this.spFlashError	= verify(unescape(pFlashError),'str_1_2000','_SplashScreen > pFlashError)');
		this.spQTimeError	= verify(unescape(pQTimeError),'str_1_2000','_SplashScreen > pQTimeError');
		this.spShockError	= verify(unescape(pShockError),'str_1_2000','_SplashScreen > pShockError');
		this.spCDROMError	= verify(unescape(pCDROMError),'str_1_2000','_SplashScreen > pCDROMError');
	} else {
		this.spIncWMP6		= false;
		this.spIncWMP7		= false;
		this.spIncWMP9		= false;
		this.spIncWMP10		= false;
		this.spIncFlash5	= false;
		this.spIncFlash6	= false;
		this.spIncFlash7	= false;
		this.spIncFlash8	= false;
		this.spIncQuickTime	= false;
		this.spIncShockWave	= false;
		this.spWMPError		= const_NA;
		this.spFlashError	= const_NA;
		this.spQTimeError	= const_NA;
		this.spShockError	= const_NA;
		this.spCDROMError	= const_NA;
	}
	this.spBrowserError		= verify(unescape(pBrowserError),'str_1_2000','_SplashScreen > pBrowserError');
	this.spResError			= verify(unescape(pResError),'str_1_2000','_SplashScreen > pResError');
	this.spJSError			= verify(unescape(pJSError),'str_1_2000','_SplashScreen > pJSError');
	this.spCookiesError		= verify(unescape(pCookiesError),'str_1_2000','_SplashScreen > pCookiesError');
	this.spColorError		= verify(unescape(pColorError),'str_1_2000','_SplashScreen > pColorError');
	this.spOSError			= verify(unescape(pOSError),'str_1_2000','_SplashScreen > pOSError');
	this.spOnlineError		= verify(unescape(pOnlineError),'str_1_2000','_SplashScreen > pOnlineError');
	this.spOfflineOnlyError = verify(unescape(pOfflineOnlyError),'str_1_2000','_SplashScreen > pOfflineOnlyError');
	this.spOnlineOnlyError	= verify(unescape(pOnlineOnlyError),'str_1_2000','_SplashScreen > pOnlineOnlyError');
	try {
		for(var i=0; i<vKeywords.length; i++){
			switch(vKeywords[i]){
				case "[ERROR_COLOR]": this.spColorError = vReplaceKeywords[i]; break; 
				case "[ERROR_SCR_RES]": this.spResError = vReplaceKeywords[i]; break; 
				case "[ERROR_BROWSER]": this.spBrowserError = vReplaceKeywords[i]; break; 
				case "[ERROR_COOKIE]": this.spCookiesError = vReplaceKeywords[i]; break; 
				case "[ERROR_FLASH]": this.spFlashError = vReplaceKeywords[i]; break; 
				case "[ERROR_WMP]": this.spWMPError = vReplaceKeywords[i]; break; 
				case "[ERROR_JAVA]": this.spJSError = vReplaceKeywords[i]; break; 
				case "[ERROR_OS]": this.spOSError = vReplaceKeywords[i]; break; 
			}
		}
	} catch(e){}
	this.spSupportSCORM1_2	= verify(pSupportSCORM1_2,'boolean','_SplashScreen > pSupportSCORM1_2');
	this.spSupportNETg		= verify(pSupportNETg,'boolean','_SplashScreen > pSupportNETg');
	this.spSupportSkillSoft	= verify(pSupportSkillSoft,'boolean','_SplashScreen > pSupportSkillSoft');
	this.spSupportTrac2		= verify(pSupportTrac2,'boolean','_SplashScreen > pSupportTrac2');
	this.spSupportBWContentTracking	= verify(pSupportBWContentTrack,'boolean','_SplashScreen > pSupportBWContentTrack');
	if (this.spSupportSCORM1_2 && this.spSupportNETg && this.spSupportSkillSoft && this.spSupportTrac2) { _SplashScreen_err(3) }
	this.spIncSplashImg		= verify(pIncSplashImg,'boolean','_SplashScreen > pIncSplashImg');
	this.spIncSplashFlash	= verify(pIncSplashFlash,'boolean','_SplashScreen > pIncSplashFlash');
	this.spSplashToolTip	= pSplashToolTip; //tooltips not mandatory
	if (this.spIncSplashImg && this.spIncSplashFlash) { _SplashScreen_err(1) }
	this.spIncTitle			= verify(pIncProjectTitle,'boolean','_SplashScreen > pIncProjectTitle');
	this.spIncDescription	= verify(pIncProjectDescription,'boolean','_SplashScreen > pIncProjectDescription');
	this.spIncVersion		= verify(pIncVerison,'boolean','_SplashScreen > pIncVerison');
	this.spIncPublishDate	= verify(pIncPublishDate,'boolean','_SplashScreen > pIncPublishDate');
	this.spIncRubric		= verify(pIncRubric,'boolean','_SplashScreen > pIncRubric');
	if (this.spIncRubric) {
		this.spRubric		= verify(unescape(pRubric),'str_1_2000','_SplashScreen > spRubric');
	} else {
		this.spRubric		= const_NA;
	}
	this.spIncStartBut		= verify(pIncStartButton,'boolean','_SplashScreen > spIncStartBut');
	this.spIncScreenReaderBut	= verify(pIncScreenReaderButton,'boolean','_SplashScreen > spIncScreenReaderBut');
	this.spIncScreenReaderInfoBut	= verify(pIncScreenReaderInfoBut,'boolean','_SplashScreen > spIncScreenReaderInfoBut');
	this.spIncChangeThemeBut	= verify(pIncChangeThemeButton,'boolean','_SplashScreen > spIncChangeThemeBut');
	this.spIncProjectDescriptionBut	= verify(pIncProjectDescriptionButton,'boolean','_SplashScreen > spIncProjectDescriptionBut');
	this.spIncTestVolumeLevels	= verify(pIncTestVolumeLevels,'boolean','_SplashScreen > spIncTestVolumeLevels');
	this.spIncChangeLang		= verify(pIncChangeLang,'boolean','_SplashScreen > spIncChangeLang');
	this.spIncSystemCheckButton	= verify(pIncSystemCheckButton,'boolean','_SplashScreen > spIncSystemCheckButton');
	this.spIncAudioOnButton	= verify(pIncAudioOnBut,'boolean','_SplashScreen > spIncAudioOnButton');
	this.spIncAudioOffButton	= verify(pIncAudioOffBut,'boolean','_SplashScreen > spIncAudioOffButton');
	if (this.spIncStartBut == true) {
		if (vButtons[0].btId == 'na') { _SplashScreen_err(16); }
	} else {
		if (vButtons[0].btId != 'na') { _SplashScreen_err(17); }
	}
	if ((this.spScreenReaderSupport == 'yes') || (this.spScreenReaderSupport == 'ask')) {
		if (this.spIncScreenReaderBut) { 
			_SplashScreen_err(2);
			this.spIncScreenReaderBut = false;
		} 
	}
	if (typeof(pIncUserName) == 'boolean') {
		this.spIncUserName			= verify(pIncUserName,'boolean','_SplashScreen > spIncUserName');
		this.spUserNameMaxLength	= verify(pUserNameMaxLength,'int','_SplashScreen > spUserNameMaxLength');
		this.spUserNameMinLength	= verify(pUserNameMinLength,'int','_SplashScreen > spUserNameMinLength');
		this.spIncUserNameIsEmail	= verify(pIncUserNameIsEmail,'boolean','_SplashScreen > spIncUserNameIsEmail');
	} else {
		this.spIncUserName			= false;
		this.spUserNameMaxLength	= 0;
		this.spUserNameMinLength	= 0;
		this.spIncUserNameIsEmail	= false;
	}
	this.spCourseTimeout			= verify(pCourseTimeout,'boolean','_SplashScreen > spCourseTimeout');
	this.spTimeout					= verify(pTimeout,'int','_SplashScreen > spTimeout');
	this.spTimeoutMsg				= pTimeoutMsg;
}
function _SplashScreen_err(pVal) {
	var vMsg = new String();
	switch(pVal) {
		case 0: vMsg = 'You cannot have an autolaunch if you have screen reader support.'; break;
		case 1: vMsg = 'You cannot have an a splash image and splash flash file.'; break;
		case 2: vMsg = 'You cannot have a screen reader button if the course has been defined as a screen reader version.'; break;
		case 3: vMsg = 'You cannot support multiple LMS configuration'; break;
		case 4: vMsg = 'You cannot include a flash movie and the about screen reader button.  The flash file should be full screen.'; break;
		case 5: vMsg = 'You cannot include a flash movie and a have the course title display on the splash screen. This should be in the flash file.  The flash file should be full screen.'; break;
		case 6: vMsg = 'You cannot include a flash movie and a have the course description display on the splash screen. This should be in the flash file.  The flash file should be full screen.'; break;
		case 7: vMsg = 'You cannot include a flash movie and a have the course version number display on the splash screen. This should be in the flash file.  The flash file should be full screen.'; break;
		case 8: vMsg = 'You cannot include a flash movie and a have the course publish date on the splash screen. This should be in the flash file.  The flash file should be full screen.'; break;
		case 9: vMsg = 'You cannot include a flash movie and a have the course start rubric on the splash screen. This should be in the flash file.  The flash file should be full screen.'; break;
		case 10: vMsg = 'You cannot include a flash movie and the start course button.  The flash file should be full screen.'; break;
		case 11: vMsg = 'You cannot include a flash movie and the about screen reader button.  The flash file should be full screen.'; break;
		case 12: vMsg = 'You cannot include a flash movie and the change theme button.  The flash file should be full screen.'; break;
		case 13: vMsg = 'You cannot include a flash movie and the include project description button.  The flash file should be full screen.'; break;
		case 14: vMsg = 'You cannot include a flash movie and the test volumes button.  The flash file should be full screen.'; break;
		case 15: vMsg = 'You cannot include a flash movie and the change language button.  The flash file should be full screen.'; break;
		case 15: vMsg = 'You cannot include a flash movie and the system check button.  The flash file should be full screen.'; break;
		case 16: vMsg = 'You have defined to include a start button but have failed to set this on the project setting screen.'; break;
		case 17: vMsg = 'You have defined NOT to include a start button yet on the project setting screen you defined one to be inclued in the UI.'; break;
		case 18: vMsg = 'You have defined to include a user name field AND to include the auto launch time out.  You can not include the auto launch time out.'; break;
		case 19: vMsg = 'You cannot include a flash movie and the audio on button.  The flash file should be full screen.'; break;
		case 20: vMsg = 'You cannot include a flash movie and the audio off button.  The flash file should be full screen.'; break;
		default: vMsg = 'Unrecognised error code passed to _SplashScreen_err'
	}
	alert(vMsg)
}
function fnRenderIndex(pReplaceInnerHTML) {
	var vHTML = new String();
	if (! doErrorChecks()) {
		vHTML = "<span class=errorMsg>" + vIObj.errorMsg + "</span>"
	} else {
		if (vIObj.spAllowResize) {
			if(parent.window.location.toString().indexOf("en_index_offline") != -1){
				parent.window.resizeTo(vIObj.spWinWidth,vIObj.spWinHeight);
				parent.window.moveTo(vIObj.spWinLeft,vIObj.spWinTop);
			}
		}
		if (vIObj.spIncAutoLaunch) {
			setTimeout('fnLaunch()',(vIObj.spAutoLaunchTimeOut*1000))
			return;
		}
		if (vIObj.spIncSplashImg) {
			vHTML = '<span id="imgSplash" class="cssSplashImg" title="' + vIObj.spSplashToolTip + '" '
			if (!vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += ' onclick="fnLaunch()" style="cursor: hand;"'
			}
			vHTML += '> </span>'
		} 
		if(vIObj.spIncSplashFlash){
			vHTML += '<span class="cssSplashImg" title="' + unescape(vIObj.spSplashToolTip) + '"><OBJECT name="myFlash" id="myFlash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" WIDTH="100%" HEIGHT="100%"><PARAM NAME=menu VALUE=false><PARAM NAME=movie VALUE="assets/ui_splash.swf"><PARAM NAME=play VALUE=true><PARAM NAME=quality VALUE=high><PARAM NAME=scale VALUE=false><EMBED name="myFlash" src="assets/ui_splash.swf" quality=high play=true bgcolor=#FFFFFF WIDTH="100%" HEIGHT="100%" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" name="myFlash" swliveconnect=true></EMBED></OBJECT></span>'
		}
		if (vIObj.spIncTitle) {
			if (! vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += '<div id=divTitle class=cssSplashDivPrjTitle onclick="fnLaunch()" style="cursor: hand;">'
			} else {
				vHTML += "<div id=divTitle class=cssSplashDivPrjTitle>"
			}
			vHTML += "<p class=cssSplashPPrjTitle>" + vPr_Title + "</p></div>"
		}
		if (vIObj.spIncDescription) {
			if (! vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += '<div id=divDcpt class=cssSplashDivPrjDcpt onclick="fnLaunch()" style="cursor: hand;">'
			} else {
				vHTML += "<div id=divDcpt class=cssSplashDivPrjDcpt>"
			}
			vHTML += "<p class=cssSplashPPrjDcpt>" + vPr_Description + "</p></div>"
		}
		if (vIObj.spIncVersion) {
			if (! vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += '<div id=divVer class=cssSplashDivPrjVer onclick="fnLaunch()" style="cursor: hand;">'
			} else {
				vHTML += "<div id=divVer class=cssSplashDivPrjVer>"
			}
			vHTML += "<p class=cssSplashPPrjVer>" + vPr_Verison + "</p></div>"
		}
		if (vIObj.spIncPublishDate) {
			if (! vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += '<div id=divPub class=cssSplashDivPubinfo onclick="fnLaunch()" style="cursor: hand;">'
			} else {
				vHTML += "<div id=divPub class=cssSplashDivPubinfo>"
			}
			vHTML += "<p class=cssSplashPPubinfo>" + vPr_PublishDate + "</p></div>"
		}
		if (vIObj.spIncRubric) {
			if (! vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += '<div id=divRubric class=cssSplashDivRubric onclick="fnLaunch()" style="cursor: hand;">'
			} else {
				vHTML += "<div id=divRubric class=cssSplashDivRubric>"
			}
			vHTML += "<p class=cssSplashPRubric>" + vIObj.spRubric + "</p></div>"
		}
		if (typeof(vPr_AddHTML) != "undefined") {
			if (! vIObj.spIncStartBut && !vIObj.spIncAudioOnButton && !vIObj.spIncAudioOffButton) {
				vHTML += '<div id=divAddHTML class=cssSplashDivAddHTML onclick="fnLaunch()" style="cursor: hand;">'
			} else {
				vHTML += "<div id=divAddHTML class=cssSplashDivAddHTML>"
			}
			vHTML += "<p class=cssSplashPAddHTML>" + vPr_AddHTML + "</p></div>"
		}
		if (vIObj.spIncUserName) {
			if (vIObj.spIncAutoLaunch) {
				_SplashScreen_err(18);
			} else {
				vHTML += '<input id="txtUserName" class="csstxtUserName" '
				vHTML += ' maxlength=' + vIObj.spUserNameMaxLength;
				vHTML += '>';
			}
		}
		if (vIObj.spIncStartBut) { vHTML += vButtons[0].btHTML }
		if (vIObj.spIncScreenReaderBut) 
		{
		    vHTML += vButtons[1].btHTML;
		}
		if (vIObj.spIncScreenReaderInfoBut)		{ vHTML += vButtons[2].btHTML }
		if (vIObj.spIncChangeThemeBut)			{ vHTML += vButtons[15].btHTML }
		if (vIObj.spIncProjectDescriptionBut)		{ vHTML += vButtons[3].btHTML }
		if (vIObj.spIncTestVolumeLevels)		{ vHTML += vButtons[24].btHTML }
		if (vIObj.spIncChangeLang)			{ vHTML += vButtons[16].btHTML }
		if (vIObj.spIncSystemCheckButton)		{ vHTML += vButtons[17].btHTML }
		if (vIObj.spIncAudioOnButton)		{ vHTML += vButtons[38].btHTML }
		if (vIObj.spIncAudioOffButton)		{ vHTML += vButtons[39].btHTML }
		vHTML += fnRenderIndex_Logon();
	}
	document.getElementById("divIndexMain").innerHTML = vHTML;

	if (isMobileOrTabletDevice.any()) {
	    var but = document.getElementById("but_start_reader");
	    but.disabled = true;
	    but.title = "Not available";
	    but.value = "Not available";
	    but.style.backgroundColor = "transparent";
	    but.style.color = "grey";
	    but.style.border = "none";
	    but.style.backgroundImage = "none";
	    but.style.cursor = "default";
	    but.style.width = "250px";
	}

	vIndexRendered = true;
}
function fnRenderIndex_Logon() {
	var sHTML		= new String();				// return HTML, blank if no log on required
	var iMinStartAge = new Number(16);			// defines the age of the min age of student
	var iAvgStartAge = new Number(18);			// defines the staring age of the average age of student to preset the drop down
	var iYearNow	= new Date().getYear();		// current year used for the year of birth drop down
	iYearNow = iYearNow - iMinStartAge;
	var iYearStart	= new Number(iYearNow - 75); // defines the limit of the year of birth drop down
	var iNbrObjects = new Number(1);
	if (vIObj.spLogon.spIncLogon == true) {
		sHTML += '<div id="divLogon">'
			if (vIObj.spLogon.spLogon_IncFirstname == true) {
				sHTML += '<input id="txtLogon_Forename" class="csstxtLogon_Forename" maxlength=128 onclick=fnNull() tabindex="' + iNbrObjects.toString() + '">';
				iNbrObjects ++;
			}
			if (vIObj.spLogon.spLogon_IncSurname == true) {
				sHTML += '<input id="txtLogon_Surname" class="csstxtLogon_Surname" maxlength=128 onclick=fnNull() tabindex="' + iNbrObjects.toString() + '">';
				iNbrObjects ++;
			}
			if (vIObj.spLogon.spLogon_IncUsername == true) {
				sHTML += '<input id="txtLogon_Username" class="csstxtLogon_Username" maxlength=128 ';
				if (vIObj.spLogon.spLogon_UNameIsNumeric == true) {
					sHTML += ' onkeypress="return fnTestNumeric()"';
				}
				sHTML += ' onclick=fnNull() tabindex="' + iNbrObjects.toString() + '">';
				iNbrObjects ++;
			}
			if (vIObj.spLogon.spLogon_IncYOB == true) {
				sHTML += '<span id="spnyob" class="cssspnyob" tabindex="' + iNbrObjects.toString() + '">';
				sHTML += '<select id=selyob>';
				for (i=iYearNow; i>iYearStart; i--) {
					if (i==(iYearNow-(iAvgStartAge-iMinStartAge))) {
						sHTML += '<option selected value="'+ i.toString() +'">'+ i.toString() + '</option>';
					} else {
						sHTML += '<option value="'+ i.toString() +'">'+ i.toString() + '</option>';
					}
				}
				iNbrObjects ++;
				sHTML += '</select>';
				sHTML += '</span>';
			}
			if (vIObj.spLogon.spLogon_IncDept) {
				sHTML += '<span id="spndept" class="cssspndept" tabindex="' + iNbrObjects.toString() + '">';
				sHTML += '<select id=selDeptList>';
				for (i=0; i<(vPr_DeptList.length); i++) {
					sHTML += '<option value="'+ vPr_DeptList[i] +'">'+ vPr_DeptList[i] + '</option>';
				}
				iNbrObjects ++;
				sHTML += '</select>';
				sHTML += '</span>';
			}
			if (vIObj.spLogon.spLogon_IncLocation) {
				sHTML += '<span id="spnlocation" class="cssspnlocation" tabindex="' + iNbrObjects.toString() + '">';
				sHTML += '<select id=selLocationList>';
				for (i=0; i<(vPr_LocationList.length); i++) {
					sHTML += '<option value="'+ vPr_LocationList[i] +'">'+ vPr_LocationList[i] + '</option>';
				}
				iNbrObjects ++;
				sHTML += '</select>';
				sHTML += '</span>';
			}
			if (vIObj.spLogon.spLogon_IncJobRole) {
				sHTML += '<span id="spnjobrole" class="cssspnjobrole" tabindex="' + iNbrObjects.toString() + '">';
				sHTML += '<select id=selJobRoleList>';
				for (i=0; i<(vPr_RoleList.length); i++) {
					sHTML += '<option value="'+ vPr_RoleList[i] +'">'+ vPr_RoleList[i] + '</option>';
				}
				iNbrObjects ++;
				sHTML += '</select>';
				sHTML += '</span>';
			}
		sHTML += '</div>'; // end of divLogon
	}
	return sHTML
}
function fnNull() {return false;}
function fnTestNumeric() {
	var key;
	var keychar;
	key 	= window.event.keyCode;
	keychar = String.fromCharCode(key);
	if ((key==null) || (key==0) || (key==8) || (key==9) || (key==13) || (key==27) ) {
		return true;
	} else {
		if ((("0123456789").indexOf(keychar) > -1)) {
			return true;
		} else {
			return false;
		}
	}
}
function fnWriteWebLogIframes() {
	var vObj = document.getElementById('divIndexMain')
	var sHTML = "";
	if (vIObj.spLogon.spIncLogon == true) {
		sHTML += '<iframe id="frmWebLog1" src="weblog.htm" style="width: 0px; height: 0px; position: absolute; top: 0px; left: 0px"></frame>'
		sHTML += '<iframe id="frmWebLog2" src="weblog.htm" style="width: 0px; height: 0px; position: absolute; top: 0px; left: 0px"></frame>'
	}
	vObj.innerHTML += sHTML;
}
function fnGetLogonVal(spObjId) {
	if (typeof(spObjId) == 'undefined') {
		return 'na';
	} else {
		try {
			sVal = document.getElementById(spObjId).value;
			if (sVal == '') {sVal = 'na'}
			return sVal;
		} catch(e) {return 'na'}
	}
}
var bLastWebLogTrack = new Boolean(false);
function fnWebLogTrackUsage() {
	if (vIObj.spLogon.spIncLogon == true) {
		try{
			iId_CurSCO			= ContentWindow.frmCentre.API.sId;
			iScrId_CurSCO		= ContentWindow.frmCentre.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.lesson_location");
			sScoStatus_CurSCO	= ContentWindow.frmCentre.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.lesson_status");
			sScoTime_CurSCO		= ContentWindow.frmCentre.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.total_time");
			sScoBucket_CurSCO	= ContentWindow.frmCentre.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.suspend_data");
			sScoRaw_CurSCO		= ContentWindow.frmCentre.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.score.raw");
			sScoMax_CurSCO		= ContentWindow.frmCentre.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.score.max");
		} catch(e){
			iId_CurSCO			= ContentWindow.parent.API.sId;
			iScrId_CurSCO		= ContentWindow.parent.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.lesson_location");
			sScoStatus_CurSCO	= ContentWindow.parent.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.lesson_status");
			sScoTime_CurSCO		= ContentWindow.parent.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.total_time");
			sScoBucket_CurSCO	= ContentWindow.parent.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.suspend_data");
			sScoRaw_CurSCO		= ContentWindow.parent.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.score.raw");
			sScoMax_CurSCO		= ContentWindow.parent.vPr_Scos[iId_CurSCO].LMSGetValue("cmi.core.score.max");
		}
		sParam = new String()
		sParam += "scoid=" + iId_CurSCO + "&"
		sParam += "scr=" + iScrId_CurSCO + "&"
		sParam += "status=" + sScoStatus_CurSCO + "&"
		sParam += "time=" + sScoTime_CurSCO + "&"
		sParam += "bucket=" + sScoBucket_CurSCO + "&"
		sParam += "raw=" + sScoRaw_CurSCO + "&"
		sParam += "max=" + sScoMax_CurSCO + "&"
		sParam += "surname=" + vIObj.spLogon.sLog_Surname + "&"
		sParam += "firstname=" + vIObj.spLogon.sLog_Firstname + "&"
		sParam += "username=" + vIObj.spLogon.sLog_Username + "&"
		sParam += "yob=" + vIObj.spLogon.sLog_YOB + "&"
		sParam += "dept=" + vIObj.spLogon.sLog_Dept + "&"
		sParam += "location=" + vIObj.spLogon.sLog_Location + "&"
		sParam += "role=" + vIObj.spLogon.sLog_JobRole
		if (bLastWebLogTrack == true) {
			document.all.frmWebLog1.src = "weblog.htm?" + sParam
		} else {
			document.all.frmWebLog2.src = "weblog.htm?" + sParam
		}
		bLastWebLogTrack = ! bLastWebLogTrack
	}
}
function fnLaunch() {

	var vParamater = new String('');	// holds any paramaters to be passed forward
	var vTmp;						// working varient
	var vLnchPageBorder		= new String();			// full screen with borders
	var vLnchPageNoBorder	= new String();			// normal no borders
	var bUserNameErr		= new Boolean(false);	// true if an error in the user name
	if (vGbl_CourseLaunched == false) {
		if (vIObj.spLogon.spIncLogon == true) {
			vIObj.spLogon.sLog_Surname		= fnGetLogonVal('txtLogon_Surname');
			vIObj.spLogon.sLog_Firstname	= fnGetLogonVal('txtLogon_Forename');
			vIObj.spLogon.sLog_Username		= fnGetLogonVal('txtLogon_Username');
			vIObj.spLogon.sLog_YOB			= fnGetLogonVal('selyob');
			vIObj.spLogon.sLog_Dept			= fnGetLogonVal('selDeptList');
			vIObj.spLogon.sLog_Location		= fnGetLogonVal('selLocationList');
			vIObj.spLogon.sLog_JobRole		= fnGetLogonVal('selJobRoleList');
			var sErrMsg = new String("The following information must be entered:\r\r");
			var iErrCount = new Number(0);
			if ((vIObj.spLogon.spLogon_IncFirstname == true) && (vIObj.spLogon.sLog_Firstname == 'na')) {
				iErrCount ++;
				sErrMsg += iErrCount.toString() + " Your first name\r"
			}
			if ((vIObj.spLogon.spLogon_IncSurname == true) && (vIObj.spLogon.sLog_Surname == 'na')) {
				iErrCount ++;
				sErrMsg += iErrCount.toString() + " Your surname\r"
			}
			if ((vIObj.spLogon.spLogon_IncUsername == true) && (vIObj.spLogon.sLog_Username == 'na')) {
				iErrCount ++;
				sErrMsg += iErrCount.toString() + " Your username\r"
			}
			if (iErrCount > 0) {
				alert(sErrMsg);
				return;
			}
			if ((vIObj.spLogon.spLogon_IncUsername == true) && (vIObj.spLogon.spLogon_UNameIsEmail == true)) {
				if (((vIObj.spLogon.sLog_Username).indexOf('@') == -1) || ((vIObj.spLogon.sLog_Username).indexOf('.') == -1)) {
					alert("You must enter a valid email address for your user name");
					return;
				}
			}
			if (vIObj.spLogon.spLogon_Confirm == true) {
				var sMsg = new String()
				sMsg += "Please confirm the following details:\r\r"
				if (vIObj.spLogon.sLog_Firstname != 'na')	{ sMsg += "First Name: " + vIObj.spLogon.sLog_Firstname + "\r"}
				if (vIObj.spLogon.sLog_Surname != 'na')		{ sMsg += "Surname: " + vIObj.spLogon.sLog_Surname + "\r"}
				if (vIObj.spLogon.sLog_Username != 'na')	{ sMsg += "User name: " + vIObj.spLogon.sLog_Username + "\r"}
				if (vIObj.spLogon.sLog_YOB != 'na')			{ sMsg += "Year of Birth: " + vIObj.spLogon.sLog_YOB + "\r"}
				if (vIObj.spLogon.sLog_Dept != 'na')		{ sMsg += "Department: " + vIObj.spLogon.sLog_Dept + "\r"}
				if (vIObj.spLogon.sLog_JobRole != 'na')		{ sMsg += "Role: " + vIObj.spLogon.sLog_JobRole + "\r"}
				if (vIObj.spLogon.sLog_Location != 'na')	{ sMsg += "Location: " + vIObj.spLogon.sLog_Location + "\r"}
				sMsg += "\r\rSelect OK to continue if these details are correct else select Cancel to re-enter the details."
				if (window.confirm(sMsg) != true) {return}		
			}
		}
		if (vIObj.spIncUserName) {
			var sUserName = new String(document.getElementById('txtUserName').value);

			if (sUserName.length == 0) { alert("You must enter a user name."); bUserNameErr = true; }
			if (sUserName.length < vIObj.spUserNameMinLength) { alert("You must enter a user name of the correct length."); bUserNameErr = true; }
			if (vIObj.spIncUserNameIsEmail) {
				if ((sUserName.indexOf('.') == -1) || (sUserName.indexOf('@') == -1)) {alert("You must enter a valid email address."); bUserNameErr = true;}
			}
		}
		if (bUserNameErr == false) {
			vCourseTrack_TimeEnteredCourse = new Date().getTime();
			fnWriteWebLogIframes();
			if (vIObj.spScreenReaderSupport == 'ask') {
				if (window.confirm(vIObj.spScreenReaderQuest)) { 
					vIObj.spScreenReaderSupport = 'yes';
				} else {
					vIObj.spScreenReaderSupport = 'no';
				}
			}
			if (parent.window.location.toString().indexOf('?') > -1) {
				vTmp = parent.window.location.toString().split('?');
				vParamater = '?' + vTmp[1];
			}
			if (vIObj.spIncUserName) {
				if (vParamater == '') { 
					vParamater = '?unameentered=' + escape(sUserName) 
				} else {
					vParamater += '&unameentered=' + escape(sUserName);
				}
			}
			if (vParamater == '') { 
				vParamater = '?audioState=' + vIObj.spAudioState + '&scrReader=' +vIObj.spScreenReaderSupport;
			} else {
				vParamater += '&audioState=' + vIObj.spAudioState + '&scrReader=' +vIObj.spScreenReaderSupport;
			}
			vLnchPageBorder		= vIObj.spLanguage + '_frameset_border' + vPageExt + vParamater;
			vLnchPageNoBorder	= vIObj.spLanguage + '_frameset' + vPageExt + vParamater;
			vGbl_CourseLaunched = true;
			var agt=navigator.userAgent.toLowerCase();
			var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
			if(!isMobileOrTabletDevice.any())
			{	
      			var vNewWin = true;
      			try{vNewWin = (vIObj.spSplashWinOpen != 3)}catch(e){};
				if(vNewWin){
					if (vIObj.spOpenFullScr && is_ie) {
						if (screen.width > vIObj.spOpenAtWidth) {
							ContentWindow = window.open(vLnchPageBorder,'course','fullscreen');
						} else {
							ContentWindow = window.open(vLnchPageNoBorder,'course','fullscreen');
						}
					} else {
						ContentWindow = window.open(vLnchPageNoBorder,'course','width='+vIObj.spOpenAtWidth+',height='+vIObj.spOpenAtHeight+',location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0,screenX=0,screenY=0,personalbar=no,left=0,top=0');
					}
				} else {
					ContentWindow = top.window;
					document.location = vLnchPageNoBorder;
				}	
			}
			else
			{
				//open in same window
				ContentWindow = top.window;
				document.location = "en_frameset_tablet.htm";
			}
		}
	}
	if(ContentWindow){
		fnDisplayInProgress()
	} else {
		try{
			vHTML = vPr_PopupError
		} catch(e){
			vHTML = "Your internet settings are blocking pop-up windows, which means this course cannot run. Please de-activate your pop-up blocker before running the course again. Contact your IT department for help with this if necessary."
		}
		document.getElementById("divIndexMain").innerHTML = vHTML;
	}
	if (bUserNameErr == false) {
		try{ContentWindow.focus();} catch(e) {
			vGbl_CourseLaunched = false
			fnLaunch()
		}
	}

}
function fnFocus() {
	if (vGbl_CourseLaunched) {
		try {
			ContentWindow.focus();
		} catch(e) {}
	}
}
function fnDisplayInProgress() {
    document.getElementById("divIndexMain").innerHTML = "<p>Please do not close this window while the course is running. If you do so, your progress and/or score may not be recorded.</p>"
	document.getElementById("divIndexMain").className = 'cssdiv_inprogress'
}
function fnDisplayInDone() {
	document.getElementById("divIndexMain").innerHTML = "<p>You can now close this window.</p>"
	document.getElementById("divIndexMain").className = 'cssdiv_completed'
}
function doErrorChecks() {
	var vPassedError = true;
	var agt=navigator.userAgent.toLowerCase();
	var is_major = parseInt(navigator.appVersion);
	var is_minor = parseFloat(navigator.appVersion);
	var is_win   = ((agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1));
	var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));
	var is_win16 = ((agt.indexOf("win16")!=-1) || 
				(agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) || 
				(agt.indexOf("windows 16-bit")!=-1) );  
	var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
					(agt.indexOf("windows 16-bit")!=-1));
	var is_winme = ((agt.indexOf("win 9x 4.90")!=-1));
	var is_win2k = ((agt.indexOf("windows nt 5.0")!=-1));
	var is_winxp = ((agt.indexOf("windows nt 5.1")!=-1));
	var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
	var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
	var is_win32 = (is_win95 || is_winnt || is_win98 || 
					((is_major >= 4) && (navigator.platform == "Win32")) ||
					(agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));
	var is_linux = (agt.indexOf("linux")!=-1);
	var is_mac	 = (agt.indexOf("mac")!=-1);
	if(vIObj.spCookiesRequired == "required"){
		if (!navigator.cookieEnabled) {
			vIObj.errorMsg	= vIObj.spCookiesError; vPassedError = false; 
		}
	}
	if (screen.colorDepth < vIObj.spMinColourDepth)
	{
		if( !isMobileOrTabletDevice.any() )
		{
			vIObj.errorMsg = vIObj.spColorError;
			vPassedError = false;
		}
		/*else
		{
			//what should I be doing? Display course
			alert( "what should I be doing? Display course spMinColourDepth" );
		}*/
	}
	if (screen.width < vIObj.spOpenAtWidth)
	{
		if( !isMobileOrTabletDevice.any() )
		{
			vIObj.errorMsg = vIObj.spResError;
			vPassedError = false;
		}
		/*else
		{
			//what should I be doing? Display course
			alert( "what should I be doing? Display course spOpenAtWidth" );
		}*/
	} // end if
	if (!is_win && !is_linux && !is_mac) {
		vIObj.errorMsg	= vIObj.spOSError; vPassedError = false; 
	}
	if (is_win95 || is_winme) {
		vIObj.errorMsg	= vIObj.spOSError; vPassedError = false; 
	}
	var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
	var is_ie3    = (is_ie && (is_major < 4));
	var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
	var is_ie4up  = (is_ie && (is_major >= 4));
	var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
	var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
	var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
	var is_ie5_5up =(is_ie && !is_ie3 && !is_ie4 && !is_ie5);
	var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
	var is_ie6up  = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);
	var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
                && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
                && (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
    var is_nav2 = (is_nav && (is_major == 2));
    var is_nav3 = (is_nav && (is_major == 3));
    var is_nav4 = (is_nav && (is_major == 4));
    var is_nav4up = (is_nav && (is_major >= 4));
    var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
                          (agt.indexOf("; nav") != -1)) );
    var is_nav6 = (is_nav && (is_major == 5));
    var is_nav6up = (is_nav && (is_major >= 5));
    var is_gecko = (agt.indexOf('gecko') != -1);
	var is_opera = (agt.indexOf("opera") != -1)
	var is_safari = (is_mac && navigator.vendor.indexOf("Apple") != -1)
	if(is_opera){
		vIObj.errorMsg	= vIObj.spBrowserError; vPassedError = false; 
	}
	if(!is_nav){
		switch(vIObj.spBrowserSupport){
			case "IE5.0": 
			if (! is_ie5up) {vIObj.errorMsg	= vIObj.spBrowserError; vPassedError = false; }
			break;
			case "IE5.5": 
			if (! is_ie5_5up) {vIObj.errorMsg	= vIObj.spBrowserError; vPassedError = false; }
			break;
			case "IE6.0":
			if (! is_ie6up) {vIObj.errorMsg	= vIObj.spBrowserError; vPassedError = false; }
			default:
		}
	}
	if (vIObj.spIncPlugInCheck) {
		if(!is_nav){
			if (vIObj.spIncWMP6) {
				if (fHasWMP64 != true) {vIObj.errorMsg	= vIObj.spWMPError; vPassedError = false; }
			}
			if (vIObj.spIncWMP7) {
				if (fHasWMP7 != true) {vIObj.errorMsg	= vIObj.spWMPError; vPassedError = false; }
			}
			if (vIObj.spIncWMP9) {
				if (fHasWMP9 != true) {vIObj.errorMsg	= vIObj.spWMPError; vPassedError = false; }
			}
			if (vIObj.spIncWMP10) {
				if (fHasWMP10 != true) {vIObj.errorMsg	= vIObj.spWMPError; vPassedError = false; }
			}
		}
		if (vIObj.spIncFlashVer != 'na')
		{
			if( !isMobileOrTabletDevice.any() )
			{
				if (vFlashVersion < vIObj.spIncFlashVer)
				{
					vIObj.errorMsg = vIObj.spFlashError;
					vPassedError = false;
				}
			}
			/*else
			{
				//what should I be doing? Display course
				alert( "what should I be doing? Display course" );
			}*/
		}
	}
	return vPassedError;
}
function fnRelNoteLauncher() {
	if (vReleaseNotes) {
		var vRNotes = window.open("project/releasenotes/releasenotes.htm","","width=500,height=500,status=1,left=0,top=0")
		if(vRNotes){
			//do nowt
		} else {
			try{
				vHTML = vPr_PopupError
			} catch(e){
				vHTML = "Your internet settings are blocking pop-up windows, which means this course cannot run. Please de-activate your pop-up blocker before running the course again. Contact your IT department for help with this if necessary."
			}
			document.getElementById("divIndexMain").innerHTML = vHTML;
		}
	}
}
function fnDebugWindow(pFunc,pCmd,pVal){
	var vStrLen = pVal.toString().length;
	var vStylestart = "<font color=blue>";
	var vStyleend = "</font>";
	document.getElementById("main_debug").innerHTML += pFunc + ":" + pCmd + ": '" + vStylestart + pVal + "' (" + vStrLen + ")" + vStyleend + "<br>";
}
function fnMinimiseDebug(){
	var vDebugObj = document.getElementById("main_debug");
	var vMinObj = document.getElementById("main_debug_minimise");
	var vWinHeight = parseInt(vDebugObj.currentStyle.height);
	if(vWinHeight > "39"){
		vDebugObj.style.overflow = "hidden"
		vDebugObj.style.height = "39px";
		vMinObj.innerHTML = "<a href='javascript:fnMinimiseDebug()'>show</a>";
		vMinObj.title = "maximise";
	} else {
		vDebugObj.style.overflow = "auto"
		vDebugObj.style.height = "300px";
		vMinObj.innerHTML = "<a href='javascript:fnMinimiseDebug()'>hide</a>";
		vMinObj.title = "minimise";
	}
}
function fnCopyToClipboard(){
	if (window.clipboardData) {
		var vText = document.getElementById("main_debug").innerText
		window.clipboardData.setData("Text", vText);
	}
}