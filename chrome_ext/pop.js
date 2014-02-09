// pull user's current URL.
function main() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var url = tabs[0].url;
    //alert(url);
    //document.getElementById('frame').src = 'http://35d8941f.ngrok.com/ext/'+url.replace(/^(https?:\/\/)?/i,'');
	
		// open new tab instead of using iframe
		forwardURL = 'http://35d8941f.ngrok.com/ext/'+url.replace(/^(https?:\/\/)?/i,'');
		window.open(forwardURL, '_blank');
		
	});
}

document.addEventListener('DOMContentLoaded', function () {
	main();
});
