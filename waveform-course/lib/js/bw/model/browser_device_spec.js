/**
* @author Sam Dorrell
*/
function BrowserDeviceSpec( argDeviceSpec , argDesktopBrowserSpec , hasVideo, responsiveMode ) {	
	var self = this;	
	
	var deviceSpecArray = argDeviceSpec.split(" ").join().split("|");
	var desktopBrowserSpecArray = argDesktopBrowserSpec.split(" ").join().split("|");
	
	self.hasVideo 							= hasVideo;
	self.responsiveMode 				= responsiveMode;
	self.desktopBrowserSpecStr = "";
	self.deviceSpecStr  				= "";
	
	self.deviceSpec 							= {};
	self.deviceSpec.iPad					= false;
	self.deviceSpec.androidTab 		= false;
	self.deviceSpec.iPhone				= false;
	self.deviceSpec.androidPhone 	= false;
	self.deviceSpec.winDesktop		= false;
	self.deviceSpec.macDesktop 	= false;
	
	self.desktopBrowserSpec 					= {};
	self.desktopBrowserSpec.ffVersion 	= false;
	self.desktopBrowserSpec.chVersion = false;
	self.desktopBrowserSpec.ieVersion	= false;
	
	self.currentDevice = {};
	self.currentBrowser = {};	
	self.screenOrientationErrorShown	= false;
	
	self.deviceReport;
	
	for (i=0;i<deviceSpecArray.length;i++) {					
		currSpec = String(deviceSpecArray[i]).toLowerCase();
		specCode = currSpec.substr(0,2);
		
		switch (specCode) {
			case "ip":{
				if (currSpec == "iphone") {
					self.deviceSpec.iPhone = true;
				} else if  (currSpec == "ipad") {
					self.deviceSpec.iPad = true;
				}
				break;
			}
			case "an":{
				if (currSpec == "androidphone") {
					self.deviceSpec.androidPhone = true;
				} else if  (currSpec == "androidtab") {
					self.deviceSpec.androidTab = true;
				}
				break;
			}
			case "de":{
				self.deviceSpec.winDesktop = true;
				break;
			}
			case "ma":{
				self.deviceSpec.macDesktop = true;
				break;
			}
			default: {
				if ( devmode ) console.warn("unknown device. Please check devicespec in master.xml")
			}
		}
	}	
	if ( devmode ) console.log("self.deviceSpec = %O",self.deviceSpec)
	
	for (i=0;i<desktopBrowserSpecArray.length;i++) {					
		currSpec = String(desktopBrowserSpecArray[i]).toLowerCase();
		specCode = currSpec.substr(0,2);
		
		switch (specCode) {
			case "ch":{
				self.desktopBrowserSpec.chVersion = true;	
				break;
			}
			case "ff":{
				self.desktopBrowserSpec.ffVersion = true;			
				break;
			}
			case "ie":{
				var ieVersion = currSpec.substr(2);
				if ( $.isNumeric(ieVersion) ) {
					self.desktopBrowserSpec.ieVersion = Number(ieVersion);		
				}
				break;
			}
			default: {
				if ( devmode ) console.warn("unknown desktop browser. Please check desktopbrowserspec in master.xml")
			}
		}
	}
	if ( devmode ) console.log("self.desktopBrowserSpec = %O",self.desktopBrowserSpec)
	
	
	self.doStringReplacements = function () {
		self.constructBrowserSpecString();
		self.constructDeviceSpecString();			
		$("#errorBar").find(".browserSpec").html(self.desktopBrowserSpecStr)	
		$("#errorBar").find(".deviceSpec").html(self.deviceSpecStr)			
		$("#errorBar").find(".yourDevice").html(navigator.userAgent.toLowerCase())
	}
	
	self.constructBrowserSpecString = function () {
		var browserSpecArr = [];	
		if (self.desktopBrowserSpec.ffVersion){
			browserSpecArr.push("Firefox (latest version)");
		}
		if (self.desktopBrowserSpec.chVersion){
			browserSpecArr.push("Chrome (latest version)");
		}
		if (self.desktopBrowserSpec.ieVersion){
			browserSpecArr.push("Internet Explorer (version " + self.desktopBrowserSpec.ieVersion + " and above)");
		}
		self.desktopBrowserSpecStr = browserSpecArr.join(", ")
	}
	
	self.isDesktop = function () {
		var isDesktop = self.currentDevice.isMacDesktop || self.currentDevice.isWinDesktop;
		return isDesktop;
	}
	self.checkScreenSize = function () {
		var screen_width = document.documentElement.clientWidth;
		var screen_height = document.documentElement.clientHeight;
		if ( screen_width < 1014 && screen_height >= 1014 && !self.isDesktop() && !self.responsiveMode ) {
			if (!self.screenOrientationErrorShown) {
				self.screenOrientationError();
			}
		} else {
			self.screenOrientationOk();
		}
	}
	$(window).resize(self.checkScreenSize);
	
	self.constructDeviceSpecString = function () {
		var deviceSpecArr = [];	
		if (self.deviceSpec.winDesktop){
			deviceSpecArr.push("Win Desktop");
		}
		if (self.deviceSpec.macDesktop){
			deviceSpecArr.push("Mac Desktop");
		}
		if (self.deviceSpec.iPad){
			deviceSpecArr.push("iPad");
		}
		if (self.deviceSpec.iPhone){
			deviceSpecArr.push("iPhone");
		}
		if (self.deviceSpec.androidTab){
			deviceSpecArr.push("Android tablet");
		}
		if (self.deviceSpec.androidPhone){
			deviceSpecArr.push("Android phone");
		}
		self.deviceSpecStr = deviceSpecArr.join(", ")
	}
	
	self.checkDeviceSpec = function () {
		
		var passedDeviceChecks = true;
		
		self.currentDevice.isIPad = /ipad/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isIPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isIPod = /ipod/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isMac = /mac os x/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isMacDesktop = self.currentDevice.isMac && !(self.currentDevice.isIPad || self.currentDevice.isIPhone || self.currentDevice.isIPod);
		self.currentDevice.isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isBlackberry = /blackberry/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isIEMobile = /iemobile/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isOperaMini = /opera mini/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
		self.currentDevice.isAndroidTablet = false;
		self.currentDevice.isAndroidPhone = false;
		
		self.smallestSide = null;
		self.largestSide = null;
		{
			// sd - use document.documentElement.clientWidth instead of screen.width
			// -----------------------------------------------------------------------------------------------
			// http://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html
			// give your page a <meta name="viewport" content="width=device-width">, read out document.documentElement.clientWidth, and most browsers will give you the width of the layout viewport, which now equals the dips width 
			
			var screenWidth = document.documentElement.clientWidth; //screen.width;
			var screenHeight = document.documentElement.clientHeight; //screen.height;
			self.smallestSide = screenWidth < screenHeight ? screenWidth : screenHeight;
			self.largestSide = screenWidth > screenHeight ? screenWidth : screenHeight;
		}
		
		if ( self.currentDevice.isAndroid ) {
			// use simple screen size detection to determine phone or tablet
			// disadvantage is that super high resolution phones will report as tablets
			// Might want to link this detection in with the _respondo
			// http://www.webvanta.com/post/2012-04-08/how-to-reliably-tell-android-tablets-from-phones
			//
			// sd - update to make improve detection between tablets and phones
			// ---------------------------------------------------------------------------------------
			// - using document.documentElement.clientWidth instead of screen.width (see above)
			// - set to 420 to get best possible distintion between tablet and phone. Hudl2 (431x960), iPhone6 Plus (414x736)
			// - The only devices that fall into the wrong category for this distinction are not android (so this is ok!). 
			// - (For instance Microsoft Lumia 1520 phone (432 x 768 but not android) and Blackberry Passport phone (504 x 504 but not android) )
			// - source: http://mydevice.io/devices/
			if (self.smallestSide < 420) {
				self.currentDevice.isAndroidPhone = true;
			} else {
				self.currentDevice.isAndroidTablet = true;
			}
		}
		
		self.currentDevice.isWinDesktop = !(self.currentDevice.isIPad || self.currentDevice.isIPhone || self.currentDevice.isIPod || self.currentDevice.isMac || self.currentDevice.isWebOS || self.currentDevice.isBlackberry || self.currentDevice.isIEMobile || self.currentDevice.isOperaMini || self.currentDevice.isAndroid)
		
		self.deviceReport = "\nDevice spec check: "
			+ "\nisIPad = " + self.currentDevice.isIPad
			+ "\nisIPhone = " + self.currentDevice.isIPhone
			+ "\nisIPod = " + self.currentDevice.isIPod
			+ "\nisMacDesktop = " + self.currentDevice.isMacDesktop
			+ "\nisWebOS = " + self.currentDevice.isWebOS
			+ "\nisBlackberry = " + self.currentDevice.isBlackberry
			+ "\nisIEMobile = " + self.currentDevice.isIEMobile
			+ "\nisOperaMini = " + self.currentDevice.isOperaMini
			+ "\nisAndroid = " + self.currentDevice.isAndroid
			+ "\nisAndroidPhone = " + self.currentDevice.isAndroidPhone
			+ "\nisAndroidTablet = " + self.currentDevice.isAndroidTablet
			+ "\nisWinDesktop = " + self.currentDevice.isWinDesktop	
			+ "\nsmallestSide = " + self.smallestSide	
			+ "\nlargestSide = " + self.largestSide;		
		//console.log("self.deviceReport" + self.deviceReport)		
		
		// sd - uncomment for a more in depth report of the device specs within the error bar
		// $("#errorBar").find(".yourDevice").html(navigator.userAgent.toLowerCase() + "\r\n" + self.deviceReport);
		
		if ( 
			self.currentDevice.isIPod || 
			self.currentDevice.isWebOS || 
			self.currentDevice.isBlackberry || 
			self.currentDevice.isIEMobile || 
			self.currentDevice.isOperaMini 
		) {
			passedDeviceChecks = false;			
		}
		
		if (
			(self.currentDevice.isIPad && !self.deviceSpec.iPad)  ||
			(self.currentDevice.isAndroidTablet && !self.deviceSpec.androidTab) ||
			(self.currentDevice.isIPhone && !self.deviceSpec.iPhone) ||
			(self.currentDevice.isAndroidPhone && !self.deviceSpec.androidPhone) ||
			(self.currentDevice.isMacDesktop && !self.deviceSpec.macDesktop) ||
			(self.currentDevice.isWinDesktop && !self.deviceSpec.winDesktop) 
		) {
			passedDeviceChecks = false;			
		}
		
		if ( !passedDeviceChecks ) {			
			self.deviceError();
		} else {
			if ( devmode ) console.log("passed device checks!\n");
		}				
		
		return passedDeviceChecks;
	}
	
	self.isIECompatibilityModeError = function () {		
		// sd - adapted from : http://stackoverflow.com/questions/27912296/ie11-detect-whether-compatibility-view-is-on-via-javascript
	
		var isIECompatibilityModeError = false;
		//Set defaults
		var isIE = false;
		var trueVersion = 0;
		var actingVersion = 0;
		var compatibilityMode = false;

		//Try to find the Trident version number
		var trident = navigator.userAgent.match(/Trident\/(\d+)/);
		if (trident) {
			isIE = true;
			//Convert from the Trident version number to the IE version number
			trueVersion = parseInt(trident[1], 10) + 4;
		}

		//Try to find the MSIE number
		var msie = navigator.userAgent.match(/MSIE (\d+)/);
		if (msie) {
			isIE = true;
			//Find the IE version number from the user agent string
			actingVersion = parseInt(msie[1]);
		} else {
			//Must be IE 11 in "edge" mode
			actingVersion = trueVersion;
		}

		//If we have both a Trident and MSIE version number, see if they're different
		if (isIE && trueVersion > 0 && actingVersion > 0) {
			//In compatibility mode if the trident number doesn't match up with the MSIE number
			compatibilityMode = trueVersion != actingVersion;
		}
		
		if (compatibilityMode) {
			if (actingVersion < self.desktopBrowserSpec.ieVersion && trueVersion >= self.desktopBrowserSpec.ieVersion) {
				var isIECompatibilityModeError = true;
			}
		} 
		return isIECompatibilityModeError;
	}
	
	self.checkDesktopBrowserSpec = function () {
		var bIncFlashCheck = false;
		var passedChecks = false;
		var passedPluginChecks = true;
		var passedBrowserChecks = true;
		var isIECompatibilityModeError = false;
		
		// Opera 8.0+
		self.currentBrowser.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Firefox 1.0+
		self.currentBrowser.isFirefox = typeof InstallTrigger !== 'undefined';
		// At least Safari 3+: "[object HTMLElementConstructor]"
		self.currentBrowser.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// IE
		self.currentBrowser.isIE = $.browser.msie;
		// Chrome 1+
		self.currentBrowser.isChrome = !!window.chrome && !!window.chrome.webstore;
		// Blink engine detection
		self.currentBrowser.isBlink = (self.currentBrowser.isChrome || self.currentBrowser.isOpera) && !!window.CSS;
		
		// Internet Explorer 6-11
		// self.currentBrowser.isIE = /*@cc_on!@*/false || !!document.documentMode;
		// Edge 20+
		// self.currentBrowser.isEdge = !isIE && !!window.StyleMedia;
		/*
		console.log("\nBrowser spec check: ")
		console.log("isOpera = " + self.currentBrowser.isOpera)
		console.log("isFirefox = " + self.currentBrowser.isFirefox)
		console.log("isSafari = " + self.currentBrowser.isSafari)
		console.log("isIE = " + self.currentBrowser.isIE)
		console.log("isChrome = " + self.currentBrowser.isChrome)
		console.log("isBlink = " + self.currentBrowser.isBlink)
		*/
		if (self.currentBrowser.isOpera || self.currentBrowser.isSafari ) {
			passedBrowserChecks = false;			
		}
		if (self.currentBrowser.isFirefox && !self.desktopBrowserSpec.ffVersion) {
			passedBrowserChecks = false;			
		}
		if (self.currentBrowser.isChrome && !self.desktopBrowserSpec.chVersion) {
			passedBrowserChecks = false;
		}
		
		if ( self.currentBrowser.isIE ) {
			if (!self.desktopBrowserSpec.ieVersion) {
				passedBrowserChecks = false;
			} else if ( $.browser.version < self.desktopBrowserSpec.ieVersion ) {
				passedBrowserChecks = false;
				isIECompatibilityModeError = self.isIECompatibilityModeError();
			} else if( self.hasVideo && $.browser.version < 9 ) {
				bIncFlashCheck = true;
			}

			// IE8 in compatibility mode reports as being IE7 with documentMode 8
			if( $.browser.version < 8 ) {
				if( document.documentMode ) {
					if( document.documentMode < 8 ) {
						passedBrowserChecks = false;
					}
				} else {
					passedBrowserChecks = false;
				}
			}
			
			//Plug in checks
			if (bIncFlashCheck) {
				if ( !$.flash.hasVersion( iMinFlashVersion ) ) {
					passedPluginChecks = false;
				}
			}	
		}				
		
		if ( !passedBrowserChecks ) {	
			if (isIECompatibilityModeError) {
				if ( devmode ) console.warn("ieCompatibilityModeError");		
				self.ieCompatibilityModeError();		
			} else {
				if ( devmode ) console.warn("browserError");				
				self.browserError();				
			}
		} else if (!passedPluginChecks) {
			self.pluginError();
		} else {
			passedChecks = true;
			if ( devmode ) console.log("passed windows desktop browser checks!\n");
		}				
		return passedChecks;
	}
	
	self.doErrorChecks = function () {
		if ( devmode ) console.log("doErrorChecks");
		self.checkDeviceSpec();
		
		if (self.currentDevice.isWinDesktop) {
			self.checkDesktopBrowserSpec();			
		}

		self.checkScreenSize();
	}
	
	self.showError = function( error ) {
		$("#errorBar").addClass(error)
		$("#errorBar").find(".closeBtn").click(function(){
			self.closePluginError();
			$("#errorBar").find(".closeBtn").unbind("click");
		});
	}
	self.hideError = function( error ) {
		$("#errorBar").removeClass(error)
	}
	self.pluginError = function() {
		if ( devmode ) console.warn("pluginError\n")
		self.showError( 'pluginError' );
	}
	self.browserError = function() {
		if ( devmode ) console.warn("browserError\n")
		self.showError( 'browserError' );
	}
	self.deviceError = function() {
		if ( devmode ) console.warn("deviceError\n")
		self.showError( 'deviceError' );
	}
	self.ieCompatibilityModeError = function() {
		if ( devmode ) console.warn("ieCompatibilityModeError\n")
		self.showError( 'ieCompatibilityModeError' );
	}
	self.screenOrientationError = function() {
		self.screenOrientationErrorShown = true;
		if ( devmode ) console.warn("screenOrientationError\n");
		self.showError( 'screenOrientationError' );
	}
	self.screenOrientationOk = function() {
		self.hideError( 'screenOrientationError' );
	}
	self.closePluginError = function() {
		$("#errorBar").removeClass();
	}
	
	self.doStringReplacements();
}
