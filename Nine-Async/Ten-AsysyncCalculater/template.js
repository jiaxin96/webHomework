	// 表示是否被点击过
	var buttonState = {
		'A' : false,
		'B' : false,
		'C' : false,
		'D' : false,
		'E' : false,
		'Sum' : false
	};
	$('#control-ring-container li span').hide();
	$('#control-ring-container li').click(function (event) {
		console.log("11");
		var that = event.target;
		var LiNum = $(that).attr('class');
		$(that).css('background-color', 'rgba(48, 63, 159, 1)');
		if (buttonState[LiNum] == true) return;
		buttonState[LiNum] = true;
		var sib = $(that).siblings('li').css('background-color', 'gray');
		$(sib).attr('disable', 'true');
		$(this).children('span').show();
	});