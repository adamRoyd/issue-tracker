/**
* @author Andy Galletly
*/
function DialogueScreen(xml_node) 
{
	var self = this ;
	Screen.call(self, xml_node);

	self.type = "dialogue";
	
	if(!self.screentype)
	{
		self.screentype = 'text_graphic';
	}
		
	self.closebutton = Boolean( self.oXML.attr("closebtn") != "false" );
	
	self.height = self.oXML.attr("height");
	self.width = self.oXML.attr("width");
	self.x = '50%';
	
	self.useTopBar = true ;
	if( self.oXML.attr("topbar") == "false")
	{
		self.useTopBar = false ;
	}
	
	
	self.y = self.oXML.attr("y");
	if( !self.oXML.attr("y") )
	{
		self.y = ( 644/2)  - (self.height/2);
	}
	
	self.closeX = null ;
	if( self.oXML.attr("closeX"))
	{
		self.closeX = parseInt( self.oXML.attr("closeX"));
	}
	
	self.closeY = null ;
	if( self.oXML.attr("closeY"))
	{
		self.closeY = parseInt( self.oXML.attr("closeY"));
	}
		
	self.oTarget;
	
	self.super_loadXML = self.loadXML;
	self.loadXML = function()
	{
		if( !$( self.oXML ).attr( 'xml' ) )
		{
			var xml_data = self.oXML;
			self.xmlReady( xml_data );
		}
		else
		{
			self.super_loadXML();
		}
	}
	
	self.finaliseDisplay = function ()
	{	
		self.attachTopBar() ;
		self.attachTitle() ;
		self.attachCloseButton() ;
	}
	
	self.attachTopBar = function()
	{		
		if( self.useTopBar )
		{
			self.dialogueTopBar = $( '<div class="dialogueTopBar"></div>' );
			$('#dialogueholder').append( self.dialogueTopBar );
		}
	}
	
	self.attachTitle = function()
	{
		var title = self.getVar( 'dialogue_title' );
		if( title )
		{
			var titleDiv = $( '<div class="dialogueTitle">' + title + '</div>' );
			self.dialogueTopBar.append(titleDiv);
		}
	}
	
	self.attachCloseButton = function()
	{
		if(self.closebutton)
		{
			if( !self.useTopBar )
			{
				var closeBtn = $( '<div class="dialogueCloseBtn"></div>' );
				closeBtn.css('position', 'absolute');
				
				if( !isNaN( self.closeX ))
				{
					closeBtn.css('left', self.closeX);
				}
				else
				{
					closeBtn.css('right', '10px');
				}
				
				if( !isNaN( self.closeY ))
				{
					closeBtn.css('top', self.closeY);
				}
				else
				{
					closeBtn.css('top', '10px');
				}
				
				closeBtn.append( getVarText( "dialogue_close_label" ));						
				$('#dialogueholder').append(closeBtn);
			}
			else
			{				
				var closeBtn = $( '<div class="dialogueCloseBtn"></div>' );
				closeBtn.css('position', 'absolute');
				closeBtn.css('top', '10px');
				self.dialogueTopBar.append(closeBtn);
			}
				
			applyClick
			(
				closeBtn,
			
				function()
				{
					closeDialogue();
				}
			);			
		}		
	}
}

DialogueScreen.prototype = Screen;