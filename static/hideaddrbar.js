$(function(){
hideAddressBar();
});

function hideAddressBar(){
	if (navigator.userAgent.match(/Android/i)) {
		window.scrollTo(0,0); // reset in case prev not scrolled
		var nPageH = $(document).height();
		var nViewH = window.outerHeight;
		
		if (nViewH > nPageH ) {
			nViewH = nViewH / window.devicePixelRatio;
			$('BODY').css('height',nViewH + 'px');
		}
	window.scrollTo(0,1);
	} else {
			addEventListener("load", function() {
				setTimeout(hideURLbar, 0);
				setTimeout(hideURLbar, 500);
			}, false);
		}

	function hideURLbar(){
		if(!pageYOffset){
			window.scrollTo(0,1);
		}
	}

return this;
}