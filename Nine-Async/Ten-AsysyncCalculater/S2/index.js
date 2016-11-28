window.onload = function () {
	//  对应按钮是否可以点击
	var buttonState = {
		'A' : true,
		'B' : true,
		'C' : true,
		'D' : true,
		'E' : true,
		'Sum' : false,
		'apb' : true,
		'newLayout' : false
	};
	var hasNum = {
		'A' : false,
		'B' : false,
		'C' : false,
		'D' : false,
		'E' : false
	}
	$('.icon').mouseover(initLayout);
	$('#control-ring-container .button').click(function(event) {
		if(canClick(event.target))
		{
			action(event.target);
		}
	});
	$('#info-bar').click(dealWithSum);

	$('#apb').click(function(event) {

		if (buttonState['apb'])
		{
			buttonState['newLayout'] = false;
			buttonState['apb'] = false;
			startAction();
		}
	});

	function startAction() {
		var a = new Array(5);
		a[0] = 'A'; a[1] = 'B'; a[2] = 'C'; a[3] = 'D'; a[4] = 'E';
		autoAction($('#A'), a, 0);
	}

	function autoAction(aim, a, dex) {
		if (buttonState['newLayout']) return;
		$(aim).children('span').show();
		$(aim).css('background-color', 'rgba(48, 63, 159, 1)');
		disableOthers(aim);
		if (!buttonState['newLayout']) {
			(function (aim) {
				$.get('/'+$(aim).attr('id'), function(data) {
					enableOthers(aim);
					$(aim).children('span').html(data);
					setDown(aim);
					if (dex < 4) {
						if (!buttonState['newLayout'])
							autoAction($('#'+a[dex+1]), a, dex+1);
					} else {
						enableSum();
						calculate();
						buttonState['apb'] = true;
					}

				});
			})(aim);
		}
	}



	function checkSum() {
		for (var i in hasNum) {
			if (hasNum[i] == false) return false;
		}
		return true;
	}

	function enableSum() {
		console.log('sum');
		$('#info-bar, .sum').css('background-color', 'rgba(48, 63, 159, 1)');
		buttonState['Sum'] = true;
	}

	function action(aim) {
		$(aim).children('span').show();
		$(aim).css('background-color', 'rgba(48, 63, 159, 1)');
		disableOthers(aim);
		$.get('/'+$(aim).attr('id'), function(data) {
			setDown(aim);
			enableOthers(aim);
			$(aim).children('span').html(data);
			if (checkSum()) {
				enableSum();
			}
		});
	}

	function enableOthers(aim) {
		var buttonName = $(aim).attr('id');
		// $(aim).siblings('.button').css('background-color', 'rgba(48, 63, 159, 1)');
		for (var i in hasNum) {
			if (i != buttonName && !hasNum[i]) {
				buttonState[i] = true;
				$('#'+i).css('background-color', 'rgba(48, 63, 159, 1)');
			}
		}
	}
	function dealWithSum() {
		if (buttonState['Sum']) {
			calculate();
		}
	}

	function calculate() {
		var num = {
			'A' : 0,
			'B' : 0,
			'C' : 0,
			'D' : 0,
			'E' : 0
		};
		var sum = 0;
		for(var i in num) {
			var s = $('#'+i).children('span').html();
			sum += (s -1 + 1);
		}
		$('#info-bar .sum').html(sum + "");
		$('#info-bar, .sum').css('background-color', 'rgba(159, 161, 155, 1)');
		buttonState['Sum'] = false;
	}

	function setDown(aim) {
		var buttonName = $(aim).attr('id');
		$(aim).css('background-color', 'rgba(159, 161, 155, 1)');
		buttonState[buttonName] = false;
		hasNum[buttonName] = true;
	}

	function canClick(aim) {
		var buttonName = $(aim).attr('id');
		return (buttonState[buttonName] && !hasNum[buttonName]);
	}



	function disableOthers(aim) {
		var buttonName = $(aim).attr('id');
		$(aim).siblings('.button').css('background-color', 'rgba(159, 161, 155, 1)');
		for (var i in hasNum) {
			if (i != buttonName) {
				buttonState[i] = false;
			}
		}
	}

	function initLayout() {
		$('#control-ring-container .button span').hide();
		for (var i in buttonState) {
			buttonState[i] = true;
			$('#'+i).children('span').html('...');
		}
		buttonState['Sum'] = false;
		for (j in hasNum) {
			hasNum[j] = false;
		}
		$('.button').css('background-color', 'rgba(48, 63, 159, 1)');
		$('.sum, #info-bar').css('background-color', 'rgba(159, 161, 155, 1)');
		$('.sum').html("");
	}
};

