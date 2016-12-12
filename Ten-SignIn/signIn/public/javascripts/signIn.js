window.onload = function () {
	$('input').focus(function() {
        $('.errorMs').html("");
        $('.error').hide();
    });
}