console.log("Content js is loaded");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getHighlightedText') {
        var highlightedText = window.getSelection().toString()
        
        sendResponse({ highlightedText: highlightedText })
    }
})