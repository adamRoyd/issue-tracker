function ColumnSort( s )
{		
	var self = this ;
	ScreenView.call(self, s);
	self.view = self ;
	
	// elements
	self.$customdiv;
	self.submitBtn;
	self.resetBtn;
	
	// elements
	self.table;
	self.rowHolder;
	self.titleHolder;
	
	// buttons
	self.submitBtn;
	self.resetBtn;
	
	// object arrays
	self.columnArray 		= [];
	self.rowArray 			= [];
	
	// settings
	self.row_left_pos 		= 10;
	self.width 					= 500;
	self.optionwidth 		= 100;
	self.randomise 			= false;
	self.radiomode			= true;
	self.correctRemain 	= false;
	
	self.attempted = false;
	self.passed = false;
	
	self.maxAttempts = -1 ;
	self.attempts = 0 ;
	
	self.custom_xml;
	
	self.groupIds = [];
	
	self.super_custom = self.custom;
	self.custom = function( custom_xml_node )
	{
		
		if ( devmode ) console.log( 'Log: COLUMN SORT CUSTOM' )
		
		self.custom_xml = $( custom_xml_node );
		self.super_custom( self.custom_xml );
		self.$customdiv = self.custom_element.view.$div;
		
		self.width = self.custom_xml.attr('width');
		
		for ( var i = 0; i < self.custom_xml.children().length; i++)
		{
			var xml_node = self.custom_xml.children() [ i ] ;
			switch ( xml_node.nodeName )
			{
				case "settings": 	self.createSettings( $( xml_node ) ) ;
					break;
				
				case "column": 		self.columnArray.push( new self.column( $( xml_node ), self.columnArray.length + 1 ) );
					break;
				
				case "row":			self.rowArray.push( new self.row( $( xml_node ), self.rowArray.length + 1 ) );
					break;
					
				case "fb": 			self.createFeedback( $( xml_node ) );
					break;
			}
		}
		
		self.table = $( '<table>' );
		self.$customdiv.append( self.table );
		
		var groupCount = Math.max(self.groupIds.length, 1);
		var groupId;
		for (var i=0; i < groupCount; i++)
		{
			if (i < self.groupIds.length)
			{
				groupId = self.groupIds[i];
			}
			else
			{
				groupId = "";
			}
		
			self.createColumns(groupId);
			
			if( self.randomise )
			{
				self.rowArray = shuffleArray( self.rowArray );
			}
			
			self.createRows(groupId);
			
		}
		
		return self.custom_element;
	}

	
	self.createSettings = function(xml_node)
	{
		self.optionwidth = xml_node.attr( 'optwidth' );
		self.optionheight = xml_node.attr( 'optheight' );
		self.randomise = Boolean( xml_node.attr( 'randomise' ) != 'false' );
		self.radiomode = Boolean( xml_node.attr( 'radiomode' ) != 'false' );
		self.correctRemain = Boolean( xml_node.attr( 'correctremain' ) == 'true' );
		
		if( xml_node.attr( "max_attempts" ))
		{
			self.maxAttempts = Number ( xml_node.attr( "max_attempts" )) ;
		}
	}
	
	
	self.feedback = function( xml_node )
	{
		var feedback = this;
		feedback.id = xml_node.attr( "id" );
		feedback.xml_node = xml_node;
	}
	
	self.createColumns = function(groupId)
	{
		self.titleHolder = $('<tr class="heading"><th class="empty"></th></tr>');
		for(var i=0; i<self.columnArray.length; i++)
		{
			var oCol = self.columnArray[i];
			if (!(groupId == "" || oCol.groupId == groupId)) continue;

			oCol.titlediv = $('<th width="'+self.optionwidth+'" style="width:'+self.optionwidth+'px">'+oCol.title+'</th>');
			self.titleHolder.append(oCol.titlediv);
		}
		
		self.table.append( self.titleHolder );
	}
	
	self.createRows = function(groupId)
	{
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			if (!(groupId == "" || row.groupId == groupId)) continue;
			
			row.table_row = $('<tr>');
			//row.table_row.css('width', 	self.width);
			
			var rowstatement = $('<td class="statement">' + row.text + '</td>');
			
			if( isOdd( i ) )
			{
				row.table_row.addClass( 'odd' );
			}
			else
			{
				row.table_row.addClass( 'even' );
			}
				
			row.table_row.append( rowstatement );
			
			self.table.append(row.table_row);
			
			for(var j = 0; j<self.columnArray.length; j++)
			{
				var column = self.columnArray[j];
				if (!(groupId == "" || column.groupId == groupId)) continue;
							
				var column_radio = $('<div class="radio" id="'+ self.screen.id + '_row' + row.id + '_option' + column.id + '"></div>');
				var radio_holder = $('<td class="radiocell">');
				
				column_radio.row = row;
				
				column_radio.id = column.id;
				
				if( !self.radiomode )
				{
					column_radio.addClass( 'checkbox' );
				}
				
				row.rowOptions.push( column_radio )
				
				radio_holder.append( column_radio )
				
				row.table_row.append(radio_holder);
				
			}
			
			if (row.spacer)
			{
				self.table.append( $('<tr class="spacer">') );
			}
			
		}
		
	}
	
	self.initOptions = function()
	{
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			
			for(var j = 0; j<row.rowOptions.length; j++)
			{
				var option = row.rowOptions[ j ];
				
				var rowheight = row.table_row.height() 
				
				applyClick(
					option,
					
					function () {
						var elm = $( this ).data( 'elm' );
						self.selectOption( elm );
					}
					
				);
			}
		}
	}
	
	
	self.enableOptions = function()
	{
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			
			for(var j = 0; j<row.rowOptions.length; j++)
			{
				var option = row.rowOptions[j];
				
				enableElement(option)
			}
		}
	
	}
	
	self.disableOptions = function()
	{
		
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			
			for(var j = 0; j<row.rowOptions.length; j++)
			{
				var option = row.rowOptions[j];
				disableElement(option)
			}
		}
	
	}
	
	self.resetOptions = function(forceReset)
	{
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			if (!forceReset && (self.correctRemain && row.isCorrect))
				continue;

			if (row.selectedOption)
				row.selectedOption.removeClass( "selected" );
			
			row.selectedOption = null;			
			row.isCorrect = false;
				
			for(var j = 0; j<row.rowOptions.length; j++)
			{
				var option = row.rowOptions[j];
				
				if( option.tick )
				{
					option.tick.remove();
				}
				
				
				option.data('selected', false);
				option.removeClass( "selected" );
				option.removeClass( "over" );

				enableElement(option)
			}
		}
	
	
	}
	
	self.column = function( xml_node, id )
	{
		// column object
		var column = this;
		column.id 		= id;
		column.title		= xml_node.text();
		column.groupId = xml_node.attr("groupId") || "1";
		
		if (self.groupIds.indexOf(column.groupId) < 0)
		{
			self.groupIds.push(column.groupId);
		}
	}
	
	self.row = function( xml_node, id )
	{
		// row object
		var row = this;
		row.id				= id;
		row.text		= xml_node.text();
		row.correctColumn = xml_node.attr( 'correct' ).split( ',' );
		row.groupId = xml_node.attr("groupId") || "1";		
		row.spacer = xml_node.attr("spacer") == "true";		
		row.rowOptions = [];
		row.selectedOption = null;
		row.isCorrect;
		
		row.selectedOptions = function()
		{
			var selected_array = [];
			for( var i = 0; i < row.rowOptions.length; i++ )
			{
				var item = row.rowOptions[ i ];
				if( item.data('selected') )
				{
					selected_array.push( item );
				}
			}
			return selected_array;
		}
		
	}
	
	self.selectOption = function( radio )
	{
		var row = radio.row;
		
		if(	self.radiomode )
		{
			for( var i = 0; i < row.rowOptions.length; i++ )
			{
				var item = row.rowOptions[ i ];
				if( item.data('selected') )
				{
					item.data( 'selected', false );
					item.removeClass( 'selected' );
					item.removeClass( "over" );
					enableElement( item )
				}
			}
		}
		
		if( radio.data('selected') )
		{
			enableElement(radio)
			radio.removeClass( 'selected' );
			radio.removeClass( 'over' );
			radio.data( 'selected', false );
		}
		else
		{
			
			if(	self.radiomode )
			{
				disableElement(radio)
			}
			radio.addClass( 'selected' );
			radio.data( 'selected', true );
		}
		
		row.selectedOption = radio;
		
		self.checkEnableSubmit();
	}
	
	self.checkEnableSubmit = function()
	{
		var do_enable_submit = true;
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			
			if( row.selectedOptions().length<1 )
			{
				do_enable_submit = false;
			}
		}
		
		if( do_enable_submit )
		{
			self.enableSubmit();
		}
		else
		{
			self.disableSubmit();
		}
	}
	
	self.enableSubmit = function()
	{
		enableContentButton( self.submitBtn );
	}
	self.disableSubmit = function()
	{
		disableContentButton( self.submitBtn );
	}
	self.disableReset = function()
	{
		disableContentButton( self.resetBtn );
	}
	
	self.enableReset = function()
	{	
		enableContentButton( self.resetBtn );
	}
	
	self.showTicks = function(  )
	{
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			
			for(var j = 0; j<row.rowOptions.length; j++)
			{
				var option = row.rowOptions[j];
				
				
				if( inArray( option.id , row.correctColumn ) )
				{
					if( !self.screen.getScored() )
					{
						option.tick = $('<div class="tick"></div>')
						option.append( option.tick )
					}
					
				}
				
			}
		}
	};
	
	self.submit = function()
	{
		self.screen.setAnswered( true ); 
		self.disableOptions();
		
		var correct_count = 0;
		var incorrect_count = 0;
		var total_correct_options = 0;
		for(var i = 0; i<self.rowArray.length; i++)
		{
			var row = self.rowArray[i];
			
			var row_incorrect = 0;
			
			for(var j = 0; j<row.rowOptions.length; j++)
			{
				var option = row.rowOptions[j];
				
				
				if( inArray( option.id , row.correctColumn ) )
				{
					if( !option.data( 'selected' ) )
					{
						incorrect_count++;
					}
					else
					{
						row.isCorrect = true;						
						correct_count++
					}
					total_correct_options ++;
				}
				else
				{
					if( option.data( 'selected' ) )
					{
						incorrect_count++;
					}
				}
				
				if (option.data( 'selected' ))
				{
					var event = "row_" + i + "col_" + j;
					console.log(event);
					self.view.doClickById(event);
				}
			}
		}
		var is_passsed = false;
		var feedback_id = 'fail'
				
		if( ( correct_count == total_correct_options ) && ( incorrect_count < 1 ) )
		{
			is_passsed = true;
			feedback_id = 'pass';
			self.screen.pass();
		}
		else if( correct_count > 0 )
		{
			feedback_id = 'partial';
			self.screen.partial();
			
		}
		else
		{
			feedback_id = "fail";
			if( self.attempts >= self.maxAttempts )
			{
				self.screen.fail();
			}
		}
		
		if( self.maxAttempts > 0 )
		{
			if ( devmode ) console.log("		attempts based") ;
			self.attempts++ ;
			
			if( feedback_id != "pass" )
			{
				if ( devmode ) console.log("		haven't passed") ;
				if( self.attempts <= self.maxAttempts )
				{
					if ( devmode ) console.log("		attempts left") ;
					
					feedback_id = "fail_attempt" ;					
				}
			}
		}
		
		
		if( feedback_id != "fail_attempt" )
		{
			self.showTicks() ;
		}
		
		//disableContentButton( self.submitBtn );
	
		if( self.resetBtn && ( !self.screen.getScored() ) )
		{
			enableContentButton( self.resetBtn );
		}
		
		if( self.resetBtn && ( !self.screen.getScored() ) )
		{
			if( feedback_id != "pass" )
			{
				if( self.maxAttempts > 0 )
				{
					if( self.maxAttempts >= self.attempts )
					{
						self.enableReset() ;
					}
				}
				else
				{
					self.enableReset() ;
				}
			}
			
			self.disableSubmit();
		}
		self.applyFeedback( feedback_id ) ;
		self.doClickById('submit')
	}

	self.forceReset = function()
	{
		self.reset(true);
	}
	
	self.reset = function(forceReset)
	{
		self.removeFeedback();
		
		self.resetOptions(forceReset)
		
		disableContentButton( self.resetBtn );
		
		self.doClickById( 'reset' );
	}
	
	
	// screen elements ready
	self.super_screenLoaded = self.screenLoaded;
	self.screenLoaded = function()
	{
		
		self.submitBtn = self.getScreenElementById( 'submitBtn' );
		self.resetBtn = self.getScreenElementById( 'resetBtn' );
		self.initOptions()
		self.enableOptions();
		
		if ( devmode ) console.log( 'Log MCQ LOADED' );
		self.super_screenLoaded();
	}
	
}
ColumnSort.prototype = ScreenView;