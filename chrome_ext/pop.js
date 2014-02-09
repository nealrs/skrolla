// pull user's current URL.
function main() {
	//var url='';	
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var url = tabs[0].url;
    console.log(url);
    //alert(url);
    document.getElementById('frame').src = 'http://35d8941f.ngrok.com/ext/'+url.replace(/^(https?:\/\/)?/i,'');

	});
	
	//alert(url);
	//document.getElementById('frame').src = 'http://35d8941f.ngrok.com/ext/'+url.replace(/^(https?:\/\/)?/i,'');
}

document.addEventListener('DOMContentLoaded', function () {
	main();
});
