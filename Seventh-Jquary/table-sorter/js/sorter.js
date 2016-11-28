window.onload = function() {
	$('table').each(function() {
		$(this).find('th').each(function(order) {
			$(this).click(function(event) {
			var that = event.target;
			mySort($(that), $(that).parents('table'), order+1);
		});
		});
	});
}
function mySort(aimTh, aimTable, aimCol) {
	var aorder = true; 
	$(aimTh).siblings('th').removeClass('sortedAscend sortedDescend');
	if ($(aimTh).hasClass('sortedDescend')) {$(aimTh).attr('class', 'sortedAscend');}
	else if ($(aimTh).hasClass('sortedAscend')) {$(aimTh).attr('class', 'sortedDescend'); aorder = false;}
	else $(aimTh).attr('class', 'sortedAscend');
	var tbody = $(aimTable).children('tbody');
	 $(tbody).append($(tbody).find('tr').sort(myCom(aorder,aimCol)));
}

myCom = function(aorder, aimCol) {
	return function(a, b) {
		if (aorder) {
			return $(a).find('td:nth-child(' + aimCol + ')').html()  >     $(b).find('td:nth-child(' + aimCol + ')').html();
		}
		else {
			return $(a).find('td:nth-child(' + aimCol + ')').html()  <     $(b).find('td:nth-child(' + aimCol + ')').html();
		}
	};
}