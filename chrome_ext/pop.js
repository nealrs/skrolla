// pull user's current URL.
function main() {
	var url = 'sdf';
	
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    url = tabs[0].url;
    console.log(url);
    alert(url);
	});
	
	alert(url);
	//console.log(url);
	document.getElementById('merp').innerHTML = url;
	document.getElementById('frame').src = 'http://35d8941f.ngrok.com/ext/'+url.replace(/^(https?:\/\/)?/i,'');

}

document.addEventListener('DOMContentLoaded', function () {
	main();
});
