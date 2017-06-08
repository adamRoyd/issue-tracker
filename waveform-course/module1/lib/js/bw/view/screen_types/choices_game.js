function ChoicesGame(s)
{
	var self = this;
	ScreenView.call(self, s);
	self.view = self;

	self.super_screenLoaded = self.screenLoaded;
	self.custom_xml = null;

	self.subscreen_array = [];
	self.bank_array = [];
	self.bank_index = 0;

	self.$customdiv = null;
	self.$banksdiv = null;

	self.super_custom = self.custom;
	self.custom = function (xml_node)
	{
		self.custom_xml = $(xml_node);
		self.super_custom(self.custom_xml);
		self.$customdiv = self.custom_element.getDiv();
		self.$banksdiv = $('<div class="banks" />');
		self.$customdiv.append(self.$banksdiv);

		return self.custom_element;
	};
	
	self.gameScore = function (_args)
	{
		if (devmode) console.log('Log GAME SCORE %o', _args);
		var args = _args.split(',');
		var score_element = self.getScreenElementById(args[0]);
		var score = Number(args[1]);
		if ((!isNaN(score)) && score_element)
		{
			score_element.view.increase(score);
		}
	};

	self.checkBankOption = function (bank_id, choice)
	{
		var bank = getItemById(bank_id, self.bank_array);
		var rtn = false;
		if (bank.chosen_screen.chosen_option == choice)
		{
			rtn = true;
		}

		return rtn;
	};

	self.createBanks = function ()
	{
		var bank_xml = self.custom_xml.find('bank');
		for (var i = 0; i < bank_xml.length; i++)
		{
			var node = $(bank_xml[i]);

			var bank = new self.GameBank(node);
			self.bank_array.push(bank);

		}
	};

	self.createSubScreens = function (screen_nodes, target_id)
	{
		var subscreen_array = [];
		for (var i = 0; i < screen_nodes.children().length; i++)
		{
			var node = $(screen_nodes.children()[i]);

			if (!node.attr('target'))
			{
				node.attr('target', target_id);
			}
			if (!node.attr('bit'))
			{
				node.attr('bit', 'true');
			}
			if (!node.attr('autoload'))
			{
				node.attr('autoload', 'false');
			}

		}

		subscreen_array = self.createScreenElements(screen_nodes);

		return subscreen_array;
	};

	self.loadBank = function (bank_id)
	{
		if (self.current_bank)
		{
			self.current_bank.disable();
		}
		self.current_bank = getItemById(bank_id, self.bank_array);
		self.current_bank.loadScreen();
		self.transitionToBank();
	};

	self.transitionToBank = function ()
	{
		if (_respondo.desktop())
		{
			var new_y = 0 - self.current_bank.$div.position().top;
			TweenMax.to(self.$banksdiv, 0.5,
			{
				top : new_y,
				onComplete : self.killOldBank
			}
			);
		}
		else
		{
			self.killOldBank();
		}
		// some kind of animation? //
	};

	self.killOldBank = function ()
	{
		self.doClickById(self.current_bank.eventid);

		for (var i = 0; i < self.bank_array.length; i++)
		{
			var item = self.bank_array[i];
			if (item.id != self.current_bank.id)
			{
				item.unloadScreen();
			}
		}
	};

	self.nextBank = function ()
	{
		self.bank_index++;
		var bank = self.bank_array[self.bank_index];
		self.loadBank(bank.id);
	};

	self.setCompleted = function ()
	{
		self.screen.screenCompleted();
	};

	self.restart = function ()
	{
		var bank = self.bank_array[0];
		for (var i = 0; i < self.bank_array.length; i++)
		{
			bank = self.bank_array[i];
			bank.reset();
		}

		self.bank_index = 0;
		bank = self.bank_array[self.bank_index];
		self.loadBank(bank.id);
		
		self.doClickById( 'reset' );
		
	};

	self.screenLoaded = function ()
	{

		if (devmode) console.log('Log CHOICES GAME LOADED');
		self.super_screenLoaded();

		self.createBanks();
		var bank = self.bank_array[0];
		self.loadBank(bank.id);
	};


	self.GameBank = function (xml_node)
	{
		var gamebank = this;
		gamebank.setup = function ()
		{
			gamebank.id = xml_node.attr('id');
			gamebank.eventid = xml_node.attr('event');
			gamebank.switch_type = xml_node.attr('switch');
			if (xml_node.attr('switchbank'))
			{
				gamebank.switch_banks = xml_node.attr('switchbank').split(',');
			}

			gamebank.$div = $('<div class="bank" />'); // append screens to this div; (set autoload to false?)

			var bank_div_id = self.custom_element.view.idprefix + 'bank' + gamebank.id;

			gamebank.$div.attr('id', bank_div_id);

			self.$banksdiv.append(gamebank.$div);

			gamebank.screen_array = self.createSubScreens(xml_node, bank_div_id);
			if (gamebank.switch_type == 'random')
			{
				gamebank.setRandomScreen();
			}

			gamebank.chosen_screen = gamebank.screen_array[0];

		};

		gamebank.chooseScreen = function ()
		{
			switch (gamebank.switch_type)
			{
			case 'random':
				gamebank.setRandomScreen();
				break;
			case 'bank':
				gamebank.setBankScreen();
				break;
			case 'lowscore':
				gamebank.setLowscoreScreen();
				break;
			default:
				gamebank.chosen_screen = gamebank.screen_array[0];
				break;
			}
		};

		gamebank.setScreen = function (id)
		{
			gamebank.chosen_screen = getItemById(id, gamebank.screen_array);
		};

		gamebank.setBankScreen = function ()
		{
			var switchbanks = gamebank.switch_banks;

			gamebank.chosen_screen = null;

			for (var i = 0; i < gamebank.screen_array.length; i++)
			{
				var screen = gamebank.screen_array[i];
				var choices = $(screen.xml).attr('data').split(',');
				var pass = true;
				for (var j = 0; j < switchbanks.length; j++)
				{
					var bank_id = switchbanks[j];
					var bank_choice = choices[j];
					pass = self.checkBankOption(bank_id, bank_choice);
					if (!pass)
					{
						break;
					}
				}

				if (pass)
				{
					gamebank.chosen_screen = screen;

					break;
				}
			}

			if (!gamebank.chosen_screen)
			{
				gamebank.setDefaultScreen();
			}

		};

		gamebank.setLowscoreScreen = function ()
		{
			var scores_array = [];
			scores_array.push(
			{
				id : 'target',
				score : self.getScreenElementById('target').view.getPercentScore()
			}
			);
			scores_array.push(
			{
				id : 'reputation',
				score : self.getScreenElementById('reputation').view.getPercentScore()
			}
			);
			scores_array.push(
			{
				id : 'profile',
				score : self.getScreenElementById('profile').view.getPercentScore()
			}
			);
			scores_array = shuffleArray(scores_array);
			var lowest_score = scores_array[0];
			for (var i = 0; i < scores_array.length; i++)
			{
				var item = scores_array[i];

				if (item.score < lowest_score.score)
				{
					lowest_score = item;
				}
			}

			for (var j = 0; j < gamebank.screen_array.length; j++)
			{
				var screen = gamebank.screen_array[j];
				if ($(screen.xml).attr('data') == lowest_score.id)
				{
					gamebank.chosen_screen = screen;
				}
			}

			if (!gamebank.chosen_screen)
			{
				gamebank.setDefaultScreen();
			}
		};

		gamebank.setDefaultScreen = function ()
		{
			for (var i = 0; i < gamebank.screen_array.length; i++)
			{
				var screen = gamebank.screen_array[i];
				if ($(screen.xml).attr('data') == 'default')
				{
					gamebank.chosen_screen = screen;
				}
			}

			if (!gamebank.chosen_screen)
			{
				gamebank.setRandomScreen();
			}
		};

		gamebank.setRandomScreen = function ()
		{
			gamebank.screen_array = shuffleArray(gamebank.screen_array);
			gamebank.chosen_screen = gamebank.screen_array[0];
		};

		gamebank.loadScreen = function ()
		{
			gamebank.chooseScreen();
			gamebank.$div.addClass('active');
			gamebank.chosen_screen.view.load();
		};

		gamebank.disable = function ()
		{
			gamebank.$div.removeClass('active');
			//gamebank.chosen_screen.kill();
		};

		gamebank.unloadScreen = function ()
		{
			gamebank.$div.removeClass('active');
			if( gamebank.chosen_screen )
			{
				gamebank.chosen_screen.view.unload();
			}
		};

		gamebank.killScreen = function ()
		{
			gamebank.$div.removeClass('active');
			gamebank.chosen_screen.kill();
		};

		gamebank.reset = function ()
		{
			if( gamebank.chosen_screen )
			{
				gamebank.chosen_screen.view.unload();
				gamebank.chosen_screen = null;
			}
		};

		gamebank.setup();
	};

}
ChoicesGame.prototype = ScreenView;
