// Get link token from URL parameters
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const linkToken = urlParams.get('link_token');
  
  if (!linkToken) {
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>Error: No link token provided</h2></div>';
  } else {
    // Create the iframe with the link token
    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('src/plaid-link.html') + `?link_token=${linkToken}`;
    iframe.setAttribute('allowtransparency', 'true');
    document.getElementById('iframe-container').appendChild(iframe);
    
    // Listen for messages from the iframe
    window.addEventListener('message', function(event) {
      // Make sure message is from our iframe
      if (event.source === window.frames[0]) {
        // Forward message to the extension
        chrome.runtime.sendMessage(event.data);
        
        // Handle close requests
        if (event.data.type === 'CLOSE_PLAID_LINK') {
          window.close();
        }
      }
    });
  }
}); 