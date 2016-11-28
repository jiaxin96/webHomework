window.onload = function() {
	$(".button").click(function(event) {
		var ch = $(event.target).html();
		if (ch == "←") deleteChar();
		else if (ch == "=") getAns();
		else if (ch == "AC") clearAll();
		else addChar(ch);
	});
}

function getAns() {
	try {
		var pre = $(".inputAndAns").val();
		var t = eval($(".inputAndAns").val());
		$(".inputAndAns").val("");
		if (typeof(pre) != 'undefined' && typeof(t) != 'undefined')
			$(".expresion").val(pre + " = " + (t+""));
		else $(".expresion").val("0");
	} catch(e) {
		alert(e);
		clearAll();
	}
}

function clearAll() {
	$(".inputAndAns").html("");
}

function deleteChar() {
	var t = $(".inputAndAns").val();
	$(".inputAndAns").val(t.substr(0, t.length - 1));
}
function addChar(ch) {
	var t = $(".inputAndAns").val();
	$(".inputAndAns").val(t+ch);
}