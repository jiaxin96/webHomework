window.onload = function () {
	//  对应按钮是否可以点击
	var buttonState = {
		'A' : true,
		'B' : true,
		'C' : true,
		'D' : true,
		'E' : true,
		'Sum' : false
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


	function checkSum() {
		for (var i in hasNum) {
			if (hasNum[i] == false) return false;
		}
		return true;
	}

	function enableSum() {
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
		for (var i in buttonState) {
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
		for (var i in buttonState) {
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

