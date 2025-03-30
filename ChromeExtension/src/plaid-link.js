// Get the link token from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const linkToken = urlParams.get('link_token');

document.getElementById('connect-button').addEventListener('click', function() {
  if (!linkToken) {
    document.getElementById('status').textContent = 'Error: No link token found. Please try again.';
    return;
  }
  
  // Show status
  document.getElementById('status').textContent = 'Connecting to Plaid...';
  
  // Initialize Plaid Link
  const handler = Plaid.create({
    token: linkToken,
    onSuccess: function(public_token, metadata) {
      console.log('Plaid Link success metadata:', metadata);
      document.getElementById('status').textContent = 'Successfully connected! Processing...';
      
      // Ensure that an account was selected
      if (!metadata || !metadata.accounts || metadata.accounts.length === 0) {
        document.getElementById('status').textContent = 'Error: No account selected. Please try again.';
        return;
      }
      
      // Get the first account information
      const account = metadata.accounts[0];
      
      // Send the public token and account data to the parent window
      window.parent.postMessage({
        type: 'PLAID_LINK_SUCCESS',
        publicToken: public_token,
        metadata: {
          account_id: account.id,
          account_name: account.name,
          account_type: account.type,
          account_subtype: account.subtype
        }
      }, '*');
      
      // Close this tab after 2 seconds
      setTimeout(() => {
        if (window.parent !== window) {
          // If in iframe, message parent to close
          window.parent.postMessage({
            type: 'CLOSE_PLAID_LINK'
          }, '*');
        } else {
          window.close();
        }
      }, 2000);
    },
    onExit: function(err, metadata) {
      if (err) {
        document.getElementById('status').textContent = 'Error: ' + err.error_message;
      } else {
        document.getElementById('status').textContent = 'Connection canceled. You can try again later.';
      }
      
      // Notify parent window of exit
      window.parent.postMessage({
        type: 'PLAID_LINK_EXIT',
        error: err ? err.error_message : null
      }, '*');
    },
    onEvent: function(eventName, metadata) {
      // Optionally track Link events
      console.log('Plaid event:', eventName);
      
      // Report events to parent window
      window.parent.postMessage({
        type: 'PLAID_LINK_EVENT',
        event: eventName,
        metadata: metadata
      }, '*');
    },
    receivedRedirectUri: null,
  });
  
  // Open Plaid Link
  handler.open();
}); 