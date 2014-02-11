// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url) {
    chrome.pageAction.show(tabId);    
    //alert(tab.url);
  }
};

// Called when the user clicks on the browser action.
chrome.pageAction.onClicked.addListener(function(tab) {
  var url = tab.url;
  forwardURL = 'http://dev.skrol.la/ext/'+url.replace(/^(https?:\/\/)?/i,'');
  window.open(forwardURL, '_blank');

});

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.tabs.onActivated.addListener(checkForValidUrl);