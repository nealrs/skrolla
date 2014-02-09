// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  if (tab.url) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
    
    //alert(tab.url);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.extension.onRequest.addListener(checkForValidUrl);
