function EventAction(xml_node, scrn_view, id){
	
	var self = this ;
	self.DEFAULT_DS_NAME = "ds";	
	
	self.id = id ;
	self.screen_view = scrn_view;
	self.tween_array = self.screen_view.tween_array;
	self.screen = scrn_view.screen;
	self.oXML = xml_node;

	self.active_element;
	
	self.attribReplace = function(text, elm)
	{
		if (!text) return null;

		if (text.indexOf('ATTR_') > -1)
		{
			var attrib = text.split('ATTR_')[1];
			return elm.screen.oXML.attr(attrib);
		}

		return text;
	}

	self.activate = function(elm)
	{
		self.active_element = elm;
		var actn = self.oXML ;
		var target = self.getTargetElement();
		var $div = null;
		if( target )
		{
			$div = target.getDiv();
		}
		
		// adds option to set $div to first found classname within a target element
		// element_id.find_class or [ITEM].find_class
		// this will not work with mutiple elements (i think )
		if( self.target_id.indexOf('.')>-1 && actn.nodeName != "link" )
		{
			if( $div )
			{
				$div = $div.find( '.'+self.target_id.split('.')[1] );
			}
			else
			{
				$div = $( self.screen_view.$div ).find( self.target_id );
			}
		}
		
		
		switch(actn.nodeName)
		{
			case "anim":
				var settings = new Object();
				settings.delay = parseNumberString( $(actn).attr('animdelay'));
				settings.ease = $(actn).attr('animease');
				settings.type = $(actn).attr('anim');
				if( !settings.type )
				{
					settings.type = $(actn).attr('type');
				}
				
				if( $(actn).attr('complete') )
				{
					settings.onComplete = self.screen_view.doEventById;
					settings.onCompleteParams = [ $(actn).attr('complete') ];
				}
				
				settings.time = parseNumberString( $(actn).attr('animtime'));
				if( !target )
				{
					if ( devmode ) console.warn('ANIM - NO TARGET %o', actn)
				}
				else
				{
					target.doTween( settings );
				}
//				this.screen_view.doTween(target, settings)
				break;
				
			case "remove":
			
				
				if(target)
				{
					target.view.removeFromScreen()
				}
				break;
			
		case "timer":
		case "media":
	
				
				var delay = 0;
				if( $( actn ).attr( 'delay' ) )
				{
					delay = parseNumberString( $( actn ).attr( 'delay' ) );
				}
				
				var frame = $( actn ).attr( 'frame' ) || null;
				
				var func = function(){ if ( devmode ) console.warn( 'Media event - No Action' ) }
				
				
				if( target )
				{
					if ( target.view instanceof AudioPlayerView && soundbankObj.hasSound(target.view.src_url))
					{
						target = soundbankObj.getSound(target.view.src_url);
					}
					
					var action  = $( actn ).attr( 'action' );
				
					switch( action )
					{
						case "play": 
								func = target.view.play;
							break;
						case "pause": 
								func = target.view.pause;
							break;
						case "stop": 
								func = target.view.stop;
							break;
						case "reset": 
								func = target.view.reset;
							break;
						case "reverse": 
								func = target.view.reverse;
							break;
					}
				}
				if( delay>0 )
				{
					self.tween_array.push( TweenMax.delayedCall( delay, func ) );
				}
				else
				{
					if (frame)
					{
						func(frame);
					}
					else
					{
						func();
					}
				}	
				break;
				
			case "toggle":
				
				if( ! self.targetCheck( $div ) )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION "'+actn.nodeName+'" - NO TARGET %o', actn)
				}
				else
				{
					if( $div.css('opacity') <=0 )
					{
						TweenMax.set( $div, { autoAlpha: 1, display: 'block' } ) ;
					}
					else
					{
						TweenMax.set( $div, { autoAlpha: 0, display: 'none' } ) ;
					}
				}
				break;
			case "show":
			
				if( ! self.targetCheck( $div ) )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION "'+actn.nodeName+'" - NO TARGET %o', actn)
				}
				else
				{
					var delay = 0;
					
					if( $( actn ).attr( 'delay' ) )
					{
						delay = parseNumberString( $( actn ).attr( 'delay' ) );
					}
					
					if(delay)
					{
						TweenMax.set( $div, { delay:delay, autoAlpha: 1, display: 'block' } ) ;
					}
					else
					{
						if ( devmode ) console.log( 'Log: SHOW> %o' , $div );
						TweenMax.set( $div, { autoAlpha: 1, display: 'block' } ) ;
					}
				}
				break;
			case "hide":
				
				if( ! self.targetCheck( $div ) )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION "'+actn.nodeName+'" - NO TARGET %o', actn)
				}
				else
				{
					var delay = 0;
					
					if( $( actn ).attr( 'delay' ) )
					{
						delay = parseNumberString( $( actn ).attr( 'delay' ) );
					}
					
					if(delay)
					{
						TweenMax.set( $div, { delay:delay, autoAlpha: 0, display: 'none' } ) ;
					}
					else
					{
						TweenMax.set( $div, { autoAlpha: 0, display: 'none' } ) ;
					}
				}
				break;
				
			case "enable":
				if( !target.enable )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION '+actn.nodeName+'" - NO TARGET.enable() %o', actn)
				}
				else
				{
					target.enable();
				}
				break;
				
			case "disable":
				if( !target.disable )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION '+actn.nodeName+'" - NO TARGET.disable() %o', actn)
				}
				else
				{
					target.disable();
				}
				break;
				
			case "dialogue":
				var actnClone = $(actn).clone();
				var _dialogue_function = function()
				{
					
					
					if ( actnClone.attr('xml') )
					{
						actnClone.attr('xml', self.attribReplace(actnClone.attr('xml'), elm) )
					}
											
					if ( actnClone.attr('resource') )
					{
						actnClone.attr('resource', self.attribReplace(actnClone.attr('resource'), elm) )
					}
								
					if ( actnClone.attr('title') )
					{
						actnClone.attr('title', self.attribReplace(actnClone.attr('title'), elm) )
					}
			
					actnClone.attr('width', self.attribReplace(actnClone.attr('width'), elm) );
					actnClone.attr('height', self.attribReplace(actnClone.attr('height'), elm) )
			
					if( masterObj.getDialogueById(actnClone.attr('id')) )
					{
						openDialogue( actnClone.attr('id') )
					}
					else
					{
					
						var oDialogue = new DialogueScreen( actnClone );
						
						currentDialogue = oDialogue;
						navObj.navDir = "menu";
						loadCurrentDialogue();
					}
				}
				
				var delay = parseNumberString( actnClone.attr('delay') )
				
				if( delay>0 )
				{
					self.tween_array.push( TweenMax.delayedCall( delay, _dialogue_function) );
				}
				else
				{
					_dialogue_function();
				}
				
				break;
			case "link":
				var link_url = self.attribReplace($(actn).text(), elm);
				var target_window_name = $(actn).attr('target');
				var target_window_specs = $(actn).attr('specs');
				if( target_window_name )
				{
					window.open( link_url, target_window_name, target_window_specs );
				}
				else
				{
					window.open( link_url, "_blank" );
				}
				break;
			
			case "jump":
				var screenId = $(actn).text();
				
				
				var delay = parseNumberString( $(actn).attr('delay') )
				var _jump_function = function(){ jumpScreen( screenId ) ; }
				if( delay>0 )
				{
					TweenMax.delayedCall( delay, _jump_function);
				}
				else
				{
					_jump_function();
				}
				
				
				break;
			
			case "topic":
				var topicId = $(actn).text();
				
				
				var delay = parseNumberString( $(actn).attr('delay') )
				var _function = function(){ loadTopic( topicId ) ; }
				if( delay>0 )
				{
					TweenMax.delayedCall( delay, _function);
				}
				else
				{
					_function();
				}
				
				
				break;
				
			case "function":
			
				var func_name = $(actn).attr('name');
				var delay = parseNumberString( $(actn).attr('delay') );// * 1000;
				var arg = $(actn).text();
				/*
				if( arg )
				{
					eval(func_name)( arg );
				}
				else
				{
					eval(func_name)();
				}
				*/
				var target_func = null;
				var target_func_is_function = false;
				if(target && target.view)
				{
					var target_func = target.view[ func_name ];
					if( $.isFunction ( target_func ) )
					{
						target_func_is_function = true;
					}
				}
				
				var templateView = self.screen.templateView;
				var template_func = templateView[ func_name ];
				
				var screenView = self.screen.view;
				var screen_view_func = screenView[ func_name ];
				
				
				var screen_func = self.screen[ func_name ];
				
				var parent_screen_view_func = null;
				if( self.screen.parentScreenView )
				{
					parent_screen_view_func = self.screen.parentScreenView[ func_name ]
				}
				
				var callback_function = null
				
				
				if( target_func_is_function )
				{
					if( arg )
					{
						callback_function = function(){ $.proxy( target_func, target.view )(arg) };
					}
					else
					{
						callback_function = function(){ $.proxy( target_func, target.view )() };
					}
				}
				else if( $.isFunction ( template_func ) )
				{
					if( arg )
					{
						callback_function = function(){ $.proxy( template_func, templateView )(arg) };
					}
					else
					{
						callback_function = function(){ $.proxy( template_func, templateView )() };
					}
				}
				else if( $.isFunction ( screen_func) )
				{ 
					if( arg )
					{
						callback_function = function(){ $.proxy( screen_func, self.screen )(arg) };
					}
					else
					{
						callback_function = function(){ $.proxy( screen_func, self.screen )() };
					}
				}
				else if( $.isFunction ( screen_view_func ) )
				{
					if( arg )
					{
						callback_function = function(){ $.proxy( screen_view_func, self.screen.view )(arg) };
					}
					else
					{
						callback_function = function(){ $.proxy( screen_view_func, self.screen.view )() };
					}
					
				}
				else if( $.isFunction ( parent_screen_view_func ) )
				{
					if( arg )
					{
						callback_function = function(){ $.proxy( parent_screen_view_func, self.screen.parentScreenView )(arg) };
					}
					else
					{
						callback_function = function(){ $.proxy( parent_screen_view_func, self.screen.parentScreenView )() };
					}
					
				}
				else
				{
					var global_func = window[ func_name ];
					if ( $.isFunction ( global_func ) )
					{
						if( arg )
						{
							callback_function = function(){ global_func(arg) };
						}
						else
						{
							callback_function = function(){ global_func() };
						}
					}
				}
				if( callback_function )
				{
					if(delay)
					{
						self.tween_array.push( TweenMax.delayedCall(delay, callback_function) );
					}
					else
					{
						callback_function();
					}
				}
				//setTimeout( callback_function  , delay );
				break;
			case "event":
				var event_id = $(actn).attr('id');
				var delay = parseNumberString( $(actn).attr('delay') );
				var itemName = $(actn).attr('item') ;
				var itemList = null;
				if( itemName )
				{
					itemList = itemName.split(',');
				}
				
				var exception_id = $(actn).attr('exception') ;
				
				
				if( exception_id == '[ITEM]' && self.active_element )
				{
					if ( devmode ) console.log( 'Log: self.active_element ID ' + self.active_element.id)
					exception_id = self.active_element.id
				}
				
				if( event_id.indexOf( '[ITEM]' ) > -1 )
				{
					event_id = event_id.split( '[ITEM]' ).join( self.active_element.id );
				}
				
				if( itemList )
				{
					for( var i = 0; i < itemList.length; i++ )
					{
						var item_id = itemList[ i ];
						
						
						
						if( exception_id != item_id )
						{
							var item = self.screen_view.getScreenElementById( item_id );
						
							var eventfunc = function(){ self.screen_view.doClickById( event_id, item ); };
						
							if( delay > 0 )
							{
								self.tween_array.push( TweenMax.delayedCall(delay, eventfunc) );
							}
							else
							{
								eventfunc();
							}
						}
					}
				}
				else
				{
						
					var eventfunc = function(){ self.screen_view.doClickById( event_id ); };
					
					if( delay > 0 )
					{
						self.tween_array.push( TweenMax.delayedCall(delay, eventfunc) );
					}
					else
					{
						eventfunc();
					}
				
				}
				
			break;
			case "screenevent":
				var event_id = $(actn).attr('id');

				if (self.id == 'resourceBtn' && (event_id == 'watch' || event_id == 'visit' || event_id == 'read' ))
				{
					event_id = self.screen_view.resourceType;
				}
				
				var delay = parseNumberString( $(actn).attr('delay') );
				
				var targetScreen = getScreenById( $(actn).attr('target'), this.screen_view.screen ) ;
				
				
				if( $(actn).attr('target') == "parent" )
				{
									
					targetScreen = self.screen.parentScreen ;
				}
				// console.log("targetScreen: %O", targetScreen.view ) ;
				
				if( targetScreen )
				{
					var eventfunc = function(){ targetScreen.view.doClickById(event_id, elm); };
					if( delay > 0 )
					{
						self.tween_array.push( TweenMax.delayedCall(delay, eventfunc) );
					}
					else
					{
						eventfunc();
					}
				}
				else
				{
					if ( devmode ) console.warn("Screen Event - " + event_id + " - called on bad screen id: " +  $(actn).attr('target')) ;
				}
			break;
			case "filter":
				if ( devmode ) console.warn( 'WARN: FILTER DISABLED. Use "class" instead. (<class add="addClass" remove="removeClass" delay="timedelay" time="durtation">item</class>)' );

				break;
			case "class": // <class add="addClass" remove="removeClass" delay="timedelay" time="durtation">item</class>
			
				if( ! self.targetCheck( $div ) )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION "'+actn.nodeName+'" - NO TARGET %o', actn)
				}
				else
				{
					var removeclass = null;
					var addclass = null;
					if( $(actn).attr('add') )
					{
						addclass = $(actn).attr('add');
					}
					if( $(actn).attr('remove') )
					{
						removeclass = $(actn).attr('remove');
					}
					var d = Number( $(actn).attr('delay') );
					var t = Number( $(actn).attr('time') );
					
					if(!t)
					{
						t = 0;
					}
					if( d > 0 )
					{
						if( addclass )    TweenMax.to( $div, t, { delay: d, className: "+="+addclass } );
						if( removeclass ) TweenMax.to( $div, t, { delay: d, className: "-="+removeclass } );
					}
					else
					{
						if( addclass )    TweenMax.to( $div, t, { className: "+="+addclass } );
						if( removeclass ) TweenMax.to( $div, t, { className: "-="+removeclass } );
					}
				}
				break;
			case "translate":
			
				if( ! self.targetCheck( $div ) )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION "'+actn.nodeName+'" - NO TARGET %o', actn)
				}
				else
				{
					//  <translate x="300" y="80" rotation="-90" animtime="" animdelay="" animease="">table1</translate>
					var settings = new Object();
					
					if( $(actn).attr('animdelay') )
					{
						settings.delay = parseNumberString( $(actn).attr('animdelay') );
					}
					if( $(actn).attr('delay') )
					{
						settings.delay = parseNumberString( $(actn).attr('delay') );
					}
					if( $(actn).attr('animease') )
					{
						settings.ease = $(actn).attr('animease');
					}
					
					if( $(actn).attr('x') )
					{
						settings.x = parseNumberString( $(actn).attr('x') );
					}
					
					if( $(actn).attr('y') )
					{
						settings.y = parseNumberString( $(actn).attr('y') );
					}
					
					if( $(actn).attr('left') )
					{
						settings.left = parseNumberString( $(actn).attr('left') );
					}
					
					if( $(actn).attr('top') )
					{
						settings.top = parseNumberString( $(actn).attr('top') );
					}
					
					if( $(actn).attr('alpha') )
					{
						settings.autoAlpha = parseNumberString( $(actn).attr('alpha') );
					}

					
					if( $(actn).attr('z') )
					{
						settings.zIndex = $(actn).attr('z');
					}
					if( $(actn).attr('scale') )
					{
						settings.scale = parseNumberString( $(actn).attr('scale') );
					}
					
					if( $(actn).attr('rotation') )
					{
						settings.rotation = parseNumberString( $(actn).attr('rotation') );
					}
					
					var time = 0;
					if( $(actn).attr('animtime') )
					{
						time = parseNumberString( $(actn).attr('animtime') );
					}	
					
					if( $(actn).attr('complete') )
					{
						settings.onComplete = self.screen_view.doEventById;
						settings.onCompleteParams = [ $(actn).attr('complete') ];
					}
					
					if( $(actn).attr('repeat') )
					{
						settings.repeat = parseNumberString( $(actn).attr('repeat'));
					}
					
					if( $(actn).attr('yoyo') == "true" )
					{
						settings.yoyo = true;
					}
					
					if( $(actn).attr('origin') )
					{
						settings.transformOrigin = $(actn).attr('origin');
					}
					
					if( $(actn).attr('height') )
					{
						settings.height = $(actn).attr('height');
					}					
										
					if( $(actn).attr('width') )
					{
						settings.width = $(actn).attr('width');
					}					
					
					tweenTo( $div, time, settings );
				}
			break;
				
			case "scroll":
				var id = $(actn).attr('id');
				var delay = null
				if( $(actn).attr('delay') )
				{
					delay = Number( $(actn).attr('delay') );
				}
				if( id )
				{
					if( !$div )
					{
						$div = $( '#'+id) ;
					}
					
					if($div)
					{
						if( delay )
						{
							TweenMax.delayedCall( delay, scrollToDiv, [ $div ] );
						}
						else
						{
							scrollToDiv( $div );
						}
					}
				}
				else
				{
					var time = Number( $(actn).attr('time') );
					var yposition = Number( $(actn).attr('y') );
					var xposition = Number( $(actn).attr('x') );
					
					var scroll_settings = {};
					if( !isNaN(yposition) )
					{
						scroll_settings.y = yposition
					}
					if( !isNaN(xposition) )
					{
						scroll_settings.x = xposition
					}
					
					if( delay > 0 )
					{
						self.tween_array.push( tweenTo( window, time, { delay: delay, scrollTo:scroll_settings } ) );
					}
					else
					{
						self.tween_array.push( tweenTo( window, time, { scrollTo:scroll_settings } ) );
					}
				}
//				this.screen_view.doTween(target, settings)

				
			break ;
				
			case "screencompleted":
				self.screen.screenCompleted();
				
			break ;
			
			case "log":
				if ( devmode ) console.log( 'EVENT LOG (screen:' + self.screen.id + ') - ' + $(actn).text() )
				
			break ;
				
			case "check":
				self.performCheck( actn )
				
			break ;
				
			case "feedback":
				self.screen_view.applyFeedback( $(actn).attr( 'id' ) )
				
			break ;
			
			case "dataset":
				//Note: <dataset datasetId="topic2" dataId="q1">1</dataset> 
								
				var datasetId = $(actn).attr('datasetId') || self.DEFAULT_DS_NAME; // Defaults to the name 'ds' if none was specified
				var dataId = $(actn).attr('dataId');

				var setOnce = $(actn).attr('setOnce') == "true";
				if (setOnce && masterObj.runtimeCustomData.getData(datasetId, dataId))
				{
					// Data already exists!
					return;
				}
				
				var data = $(actn).text();
				
				var ifMoreThan = $(actn).attr('ifMoreThan') == "true";
				if (ifMoreThan)
				{
					var storedData = Number(masterObj.runtimeCustomData.getData(datasetId, dataId))
					if (Number(data) <= storedData)
					{
						// New data isn't more than
						return;
					}
				}
				
				var saveToLMS = $(actn).attr('saveToLMS') == "true";
				
				masterObj.runtimeCustomData.setData(datasetId, dataId, data, saveToLMS);
				
			break ;
			
			case "datashow":
			
				var datasetId = $(actn).attr('datasetId') || "ds"; // Defaults to the name 'ds' if none was specified
				var dataId = $(actn).attr('dataId');
				var className = $(actn).text();
				var data = masterObj.runtimeCustomData.getData(datasetId, dataId);
				$("." + className).empty().append(data);
			
			break;
			
			case "stagger":
			
				if( ! self.targetCheck( $div ) )
				{
					if ( devmode ) console.warn('(screen:' + self.screen.id + ') ACTION "'+actn.nodeName+'" - NO TARGET %o', actn)
				}
				else
				{
					//  <translate x="300" y="80" rotation="-90" animtime="" animdelay="" animease="">table1</translate>
					var settings = new Object();
					
					if( $(actn).attr('animdelay') )
					{
						settings.delay = parseNumberString( $(actn).attr('animdelay') );
					}
					if( $(actn).attr('delay') )
					{
						settings.delay = parseNumberString( $(actn).attr('delay') );
					}
					if( $(actn).attr('animease') )
					{
						settings.ease = $(actn).attr('animease');
					}
					
					if( $(actn).attr('x') )
					{
						settings.x = parseNumberString( $(actn).attr('x') );
					}
					
					if( $(actn).attr('y') )
					{
						settings.y = parseNumberString( $(actn).attr('y') );
					}
					
					if( $(actn).attr('left') )
					{
						settings.left = parseNumberString( $(actn).attr('left') );
					}
					
					if( $(actn).attr('top') )
					{
						settings.top = parseNumberString( $(actn).attr('top') );
					}
					
					if( $(actn).attr('alpha') )
					{
						settings.autoAlpha = parseNumberString( $(actn).attr('alpha') );
					}
					
					if( $(actn).attr('display') )
					{
						settings.display = $(actn).attr('display');
					}

					
					if( $(actn).attr('z') )
					{
						settings.zIndex = $(actn).attr('z');
					}
					if( $(actn).attr('scale') )
					{
						settings.scale = parseNumberString( $(actn).attr('scale') );
					}
					
					if( $(actn).attr('rotation') )
					{
						settings.rotation = parseNumberString( $(actn).attr('rotation') );
					}
					
					var time = 0;
					if( $(actn).attr('animtime') )
					{
						time = parseNumberString( $(actn).attr('animtime') );
					}	
					
					
					if( $(actn).attr('start') )
					{
						settings.onStart = self.screen_view.doEventById;
						settings.onStartParams = [ $(actn).attr('start') ];
					}	
					
					if( $(actn).attr('complete') )
					{
						settings.onComplete = self.screen_view.doEventById;
						settings.onCompleteParams = [ $(actn).attr('complete') ];
					}
					
					if( $(actn).attr('repeat') )
					{
						settings.repeat = parseNumberString( $(actn).attr('repeat'));
					}
					
					if( $(actn).attr('yoyo') == "true" )
					{
						settings.yoyo = true;
					}
					
					if( $(actn).attr('origin') )
					{
						settings.transformOrigin = $(actn).attr('origin');
					}
					
					var _offset = 0;
					if( $(actn).attr('offset') );
					{
						_offset =  parseNumberString( $(actn).attr('offset'));
					}
					
					if( $(actn).attr('completeall') )
					{
						var staggertweens = TweenMax.staggerTo( $div, time, settings, _offset, self.screen_view.doClickById, [ $(actn).attr('completeall') ] );
					}
					else
					{
						var staggertweens = TweenMax.staggerTo( $div, time, settings, _offset );
					}
					
					for( var i = 0; i < staggertweens.length; i++ )
					{
						var tween = staggertweens[ i ];
						self.tween_array.push( tween );
					}
				}
			break;			
		}
	}
	
	// tests for a valid html element target
	self.targetCheck = function( target_element )
	{
		var rtn = false
		if( $( target_element ).length > 0 )
		{
			rtn = true;
		}
		return rtn;
	}
	
	self.getTargetElement = function(  )
	{
		var $action_xml = $( self.oXML );
		var target_id = '[ITEM]';
		var target = self.active_element;
		
		if( $action_xml.attr( 'target' ) )
		{
			target_id = $action_xml.attr( 'target' );
		}
		else if ( $action_xml.attr( 'id' ) )
		{
			target_id = $action_xml.attr( 'id' );
		}
		else if ( $action_xml.text() )
		{
			target_id = $action_xml.text();
		}
		
		self.target_id = target_id;
		
		if( target_id.indexOf('.')>-1)
		{
			target_id = target_id.split('.')[0];
		}

		if( target_id != "[ITEM]" )
		{
			if( self.active_element )
			{
				if( target_id.indexOf('[ITEM]')>-1 ) // if [ITEM] is part of target ID, split and join with active_element ID 
				{
					target_id = target_id.split( '[ITEM]' ).join(  self.active_element.id );
				}
			}
			target = self.screen_view.getScreenElementById( target_id );
		}
		
		if( target_id.indexOf('[PARENT]')>-1 ) 
		{
		
			var targetChildId = self.active_element.id;
			var targetChild = self.screen_view.getScreenElementById( targetChildId );
			var targetParentId = targetChild.sTarget;
				
			if (target_id == "[PARENT]") 
			{
				target_id = targetParentId;
			}
			else 
			{			
				target_id = target_id.split( '[PARENT]' ).join(  targetParentId );
			}
			target = self.screen_view.getScreenElementById( target_id );			
		}
		
		
		/*
		if( ( !target ) && ( target_id != '[ITEM]' ) )
		{
			if ( devmode ) console.warn( 'WARN: EVENT TARGET NOT FOUND ' + target_id );
		}
		*/
		return target
	}
	
	self.doDatasetCheck = function ( node )
	{
		var xmlNode = $(node);
		
		var datasetId = xmlNode.attr('datasetId') || self.DEFAULT_DS_NAME;
		var hasDataOf = xmlNode.attr('hasDataOf') || null;
		var dataId = xmlNode.attr('dataId') || null;
		var eventTrue = xmlNode.attr('eventTrue') || null;
		var eventFalse = xmlNode.attr('eventFalse') || null;
		var eventNoDataset = xmlNode.attr('eventNoDataset') || null;
		
		var dataset = masterObj.runtimeCustomData.getDataset(datasetId);
		if (dataset && dataset[dataId])
		{
			if(dataset[dataId] == hasDataOf)
			{
				self.screen_view.doEventById( eventTrue ) ;
			}
			else
			{
				self.screen_view.doEventById( eventFalse ) ;
			}
		}
		else
		{
			if (eventNoDataset) 
			{
				self.screen_view.doEventById( eventNoDataset ) ;
			}
			else 
			{
				self.screen_view.doEventById( eventFalse ) ;
			}
		}
	}	
	
	// <check datasetId="" screenId="" topicId="" variable="" value="" event="" />
	self.performCheck = function( node )
	{
		if ($(node).attr('dataId'))
		{
			self.doDatasetCheck( node );
			
			return;
		}	
		
		var checkScreen = self.screen ;
		if( $(node).attr('screenId'))
		{
			var screenId = $(node).attr('screenId') ;
			checkScreen = masterObj.getScreenById(screenId) ;
		}
		
		var topicId = null ;
		if( $(node).attr('topicId'))
		{
			var topicId = $(node).attr('topicId') ;
			var checkTopic = masterObj.getTopicById(topicId) ;
		}
		
		var variable = $(node).attr('variable');
		var value = $(node).attr('value');
		var true_event = $(node).attr('trueevent');	

		if( $(node).attr('event') )
		{
			true_event = $(node).attr('event');	
		}
		
		var false_event = $(node).attr('falseevent');		
		
		
		var variableToCheck ;
		if( topicId )
		{
			if( checkTopic )
			{
				variableToCheck = checkTopic[ variable ] ;
			}
		}
		else if( screenId )
		{
			if( checkScreen )
			{
				variableToCheck = checkScreen[ variable ] ;
			}
		}
		else
		{
			variableToCheck = masterObj.runtimeCustomData.getData('ds', $(node).attr('dataId'));
		}
		
		/*
		if ( devmode ) console.log("\n_______________________________________________PREFORM CHECK") ;
		if ( devmode ) console.log("          checkScreen: " + checkScreen ) ;
		if ( devmode ) console.log("          checkScreen.id: " + checkScreen.id ) ;
		if ( devmode ) console.log("          variable: " + variable ) ;
		if ( devmode ) console.log("          value: " + value ) ;
		if ( devmode ) console.log("          event: " + event ) ;
		if ( devmode ) console.log("          variableToCheck: " + variableToCheck ) ;
		*/
		
		if ( devmode ) console.log( 'Log: CHECK ' + String( variableToCheck ) + ' == ' + String( value ) )
	
		if( String( variableToCheck ) == String( value ))
		{
			//console.log("          MATCHING!" ) ;
			self.screen_view.doEventById( true_event ) ;
		}
		else
		{
			self.screen_view.doEventById( false_event ) ;
		}
	}
}