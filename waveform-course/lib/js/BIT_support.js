var sURL = "";
var sBITServer = "http://localhost:8000/";
var sBITUrl = "abc123/new";
var sBITcompany = "strFld_BWPrjFolder";
var bIsClientCapture = true;
function fnLaunchBIT(sBITPrjCode,sScoId,sScrId,bIsClientCapture,sWarnFilename) {
	sURL = sBITServer + sBITUrl;
	// sURL += "?prj="+sBITPrjCode+"&"
	sURL += "/"+sScoId+"_"+sScrId
	// if (bIsClientCapture) {sURL += "dmode=4&"} else {sURL += "dmode=8&"}
	// sURL += "company="+sBITcompany+"&"
	// sURL += "maintain=true";
	if(typeof(sWarnFilename) == "string"){
	    var sMsg = "The screen id has not been identified from the filename:\r"
	    sMsg += sWarnFilename + "\r";
		sMsg += "Please specify the location of the current screen when logging this issue."
	    alert(sMsg)
	}
	_fnNewWindow(sURL,"maintain","toolbar=0,menubar=0,scrollbars=1,resizable=1,status=1,location=0,directories=0,copyhistory=0,height=700,width=630,left=0,top=0")
}
function _fnNewWindow(pURL,pName,pWinAtts){
	var vWin = window.open(pURL,pName,pWinAtts);
	vWin.focus(); 
}
