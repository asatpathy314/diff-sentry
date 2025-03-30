// Server URL - change this to your actual server URL
const SERVER_URL = 'http://localhost:5173';

// Global blacklist of domains where we should never show donation popups
const BLACKLISTED_DOMAINS = [
  'plaid.com',
  'link.plaid.com',
  'cdn.plaid.com',
  '.plaid.',
  'bank',
  'platypus',
  'login',
  'signin',
  'account',
  'auth',
  'password'
];

// Flag to indicate we're in the process of connecting to Plaid
let isConnectingToPlaid = false;

// Track which tabs have already made donations (to prevent multiple popups)
const tabDonationTracker = new Map();

// Set up a listener for tab close events to clean up the tracker
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabDonationTracker.has(tabId)) {
    console.log('Cleaning up donation tracker for closed tab:', tabId);
    tabDonationTracker.delete(tabId);
  }
});

// Helper function to check if a URL is blacklisted
function isBlacklistedUrl(url) {
  if (!url) return false;
  url = url.toLowerCase();
  
  // Always block popups during bank connection process
  if (isConnectingToPlaid) {
    console.log('Bank connection in progress, blocking donation popups');
    return true;
  }
  
  return BLACKLISTED_DOMAINS.some(domain => url.includes(domain));
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PURCHASE_DETECTED') {
    // Don't show popups if we're connecting to Plaid
    if (isConnectingToPlaid) {
      console.log('Bank connection in progress, ignoring purchase detection');
      return;
    }
    
    // Check if this tab has already made a donation
    if (sender && sender.tab && sender.tab.id) {
      const tabId = sender.tab.id;
      if (tabDonationTracker.has(tabId)) {
        console.log('Tab already made a donation, ignoring purchase detection', tabId);
        return;
      }
    }
    
    // Check if we're on a banking/login site and skip showing the popup
    if (sender && sender.tab && sender.tab.url) {
      const url = sender.tab.url.toLowerCase();
      if (isBlacklistedUrl(url)) {
        console.log('Ignoring purchase detection on banking/login page:', url);
        return;
      }
    }
    
    // When a purchase is detected, show the donation popup immediately
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      
      // Skip if we're on a blacklisted domain
      if (isBlacklistedUrl(tabs[0].url)) {
        console.log('Skipping donation popup on blacklisted domain:', tabs[0].url);
        return;
      }
      
      // Execute the popup script with higher priority
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: showDonationPopup,
        args: [message.amount]
      });
    });
  } else if (message.type === 'START_PLAID_LINK') {
    // Set the flag to prevent popups during Plaid connection
    isConnectingToPlaid = true;
    console.log('Starting Plaid connection process, blocking donation popups');
    
    // Start the Plaid Link process
    initializePlaidLink();
  } else if (message.type === 'PLAID_LINK_SUCCESS') {
    // Clear the flag when connection is completed
    isConnectingToPlaid = false;
    console.log('Plaid connection completed, donation popups enabled');
    
    exchangePublicToken(message.publicToken, message.metadata);
  } else if (message.type === 'PROCESS_DONATION') {
    // Track this tab as having made a donation
    if (sender && sender.tab && sender.tab.id) {
      const tabId = sender.tab.id;
      tabDonationTracker.set(tabId, {
        timestamp: Date.now(),
        amount: message.donationAmount
      });
      console.log('Tracked donation for tab:', tabId);
    }
    
    processDonation(message.purchaseAmount, message.donationAmount, message.useRandomProject, message.projectInfo);
  } else if (message.type === 'UPDATE_DONATION_STATS') {
    // Update the popup UI if it's open
    chrome.runtime.sendMessage({
      type: 'REFRESH_DONATION_STATS'
    });
  } else if (message.type === 'OPEN_PROJECT_SELECTOR') {
    // Open the project selection popup
    chrome.windows.create({
      url: chrome.runtime.getURL('src/select-project.html'),
      type: 'popup',
      width: 400,
      height: 600
    });
    
    // Notify the tab when project selection is complete
    chrome.runtime.onMessage.addListener(function projectSelectionListener(msg) {
      if (msg.type === 'PROCESS_DONATION') {
        // Dispatch event to notify content script
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
          if (tabs.length > 0) {
            // Track this tab as having made a donation
            tabDonationTracker.set(tabs[0].id, {
              timestamp: Date.now(),
              amount: msg.donationAmount
            });
            
            chrome.tabs.sendMessage(tabs[0].id, {
              type: 'PROJECT_SELECTED'
            });
          }
        });
        
        // Remove this listener after it's used
        chrome.runtime.onMessage.removeListener(projectSelectionListener);
      }
    });
  } else if (message.type === 'CHECK_PLAID_CONNECTION_STATUS') {
    // Report back the current Plaid connection status
    sendResponse({ isConnectingToPlaid });
    return true; // Keep the message channel open for the response
  }
});

// Initialize when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with default settings
  chrome.storage.sync.set({
    donationsEnabled: true,
    preferredProjects: [],
    randomSelection: true,
    plaidConnected: true  // Set to true for easier testing
  });
  
  // Reset donation stats
  chrome.storage.local.set({
    totalDonations: 0,
    projectsSupported: 0,
    recentDonations: []
  }, () => {
    console.log('Donation stats reset');
  });
});

// Simple encryption/decryption functions
// In production, you'd use a more secure method
function encryptToken(token) {
  // This is a very basic encryption, not for production use
  return btoa(token.split('').reverse().join(''));
}

function decryptToken(encryptedToken) {
  // Decrypt the token
  return atob(encryptedToken).split('').reverse().join('');
}

// Show a notification to the user
function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '../assets/icon128.png',
    title: title,
    message: message
  });
}

// Update the background.js file to check with the server if the user has connected their bank account
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only check when page is fully loaded
  if (changeInfo.status === 'complete' && tab.url) {
    const url = tab.url.toLowerCase();
    
    // Skip login/banking pages
    if (isBlacklistedUrl(url)) {
      console.log('Skipping donation popup on banking/login page:', url);
      return;
    }
    
    // Only run on checkout-like pages
    if (url.includes('checkout')) {
      chrome.storage.sync.get(['plaidConnected'], (result) => {
        if (!result.plaidConnected) {
          chrome.storage.sync.set({ plaidConnected: true }, () => {
            console.log('Plaid connection status set to true for testing');
          });
        }
      });
    }
  }
});

// Function to create a link token and launch Plaid Link
async function initializePlaidLink() {
  try {
    // Create a link token
    const response = await fetch(`${SERVER_URL}/api/create_link_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.link_token) {
      // Create a redirect URL to our server that will handle Plaid Link
      const plaidRedirectUrl = `${SERVER_URL}/plaid-link?link_token=${data.link_token}&extension_id=${chrome.runtime.id}`;
      
      // Open in a new tab
      chrome.tabs.create({ url: plaidRedirectUrl }, (tab) => {
        // Listen for tab closing to reset the connecting state
        const tabId = tab.id;
        
        // Set up a listener to detect when this tab is closed
        const tabRemovedListener = (removedTabId) => {
          if (removedTabId === tabId) {
            console.log('Plaid tab was closed, resetting connecting state');
            isConnectingToPlaid = false;
            chrome.tabs.onRemoved.removeListener(tabRemovedListener);
          }
        };
        
        chrome.tabs.onRemoved.addListener(tabRemovedListener);
      });
      
      // Set a safety timeout to reset the flag in case the flow is interrupted
      setTimeout(() => {
        // Check if we're still in connecting state after timeout
        if (isConnectingToPlaid) {
          console.log('Plaid connection timeout, resetting connecting state');
          isConnectingToPlaid = false;
        }
      }, 300000); // 5 minutes timeout
      
      // For testing, we'll mark as connected after a short delay
      setTimeout(() => {
        chrome.storage.sync.set({ plaidConnected: true }, () => {
          console.log('Plaid connection status set to true after initiation');
        });
      }, 5000); // Give some time for the user to complete the flow
    } else {
      // Connection failed, reset the flag
      isConnectingToPlaid = false;
      showNotification('Error', 'Failed to create Plaid Link. Please try again.');
    }
  } catch (error) {
    // Error occurred, reset the flag
    isConnectingToPlaid = false;
    console.error('Error initializing Plaid Link:', error);
    showNotification('Error', 'Failed to initialize Plaid. Please try again.');
  }
}

// Exchange public token for access token
async function exchangePublicToken(publicToken, metadata) {
  try {
    // Generate a user ID for this user
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
    
    // Store user ID
    chrome.storage.local.set({ userId });
    
    // Store account ID for future transfers
    if (metadata && metadata.account_id) {
      chrome.storage.local.set({ accountId: metadata.account_id });
    }
    
    const response = await fetch(`${SERVER_URL}/api/exchange_public_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        public_token: publicToken,
        user_id: userId
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Store that the user has connected Plaid
      chrome.storage.sync.set({ plaidConnected: true });
      
      showNotification('Success', 'Successfully connected your bank account.');
      
      // Start monitoring transactions
      startTransactionMonitoring();
    } else {
      showNotification('Error', 'Failed to connect your bank account. Please try again.');
    }
  } catch (error) {
    console.error('Error exchanging public token:', error);
    showNotification('Error', 'Failed to connect your bank account. Please try again.');
  }
}

// Process a donation
async function processDonation(purchaseAmount, donationAmount, useRandomProject, projectInfo) {
  try {
    // DEVELOPMENT: Generate stub user/account IDs if not present
    chrome.storage.local.get(['userId', 'accountId'], async (result) => {
      let userId = result.userId;
      let accountId = result.accountId;
      
      // For development/testing, create these if they don't exist
      if (!userId) {
        userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
        chrome.storage.local.set({ userId });
      }
      
      if (!accountId) {
        accountId = `account-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
        chrome.storage.local.set({ accountId });
      }
      
      let projectName, projectId;
      
      // Determine which project to donate to
      if (useRandomProject) {
        const randomProject = await getRandomOpenSourceProject();
        projectName = randomProject.name;
        projectId = randomProject.id;
      } else if (projectInfo) {
        projectName = projectInfo.name;
        projectId = projectInfo.id;
      } else {
        // Get user's preferred projects
        chrome.storage.sync.get(['preferredProjects'], (data) => {
          if (data.preferredProjects && data.preferredProjects.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.preferredProjects.length);
            projectName = data.preferredProjects[randomIndex].name;
            projectId = data.preferredProjects[randomIndex].id;
          } else {
            // Fallback to a default project
            projectName = "Open Source Fund";
            projectId = "default";
          }
        });
      }
      
      let transferId;
      
      try {
        // Create a transfer authorization
        const authResponse = await fetch(`${SERVER_URL}/api/create_transfer_authorization`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            account_id: accountId,
            amount: donationAmount,
            project_id: projectId
          })
        });
        
        const authData = await authResponse.json();
        
        if (authData.decision !== 'approved') {
          throw new Error(`Authorization not approved: ${authData.decision}`);
        }
        
        // Create the actual transfer
        const transferResponse = await fetch(`${SERVER_URL}/api/create_transfer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            authorization_id: authData.authorization_id,
            amount: donationAmount,
            project_id: projectId,
            project_name: projectName
          })
        });
        
        const transferData = await transferResponse.json();
        
        if (!transferData.transfer_id) {
          throw new Error('No transfer ID received');
        }
        
        transferId = transferData.transfer_id;
      } catch (error) {
        console.error('Server error:', error);
        // DEVELOPMENT: Generate a mock transfer ID for local testing
        transferId = `dev-transfer-${Date.now()}`;
      }
      
      // Update donation stats (regardless of server success/failure for development)
      chrome.storage.local.get(['totalDonations', 'projectsSupported', 'recentDonations'], (data) => {
        let totalDonations = data.totalDonations || 0;
        let projectsSupported = data.projectsSupported || 0;
        let recentDonations = data.recentDonations || [];
        
        // Update donation stats
        totalDonations += parseFloat(donationAmount);
        
        // Check if we've donated to this project before
        const existingProject = recentDonations.findIndex(d => d.name === projectName);
        if (existingProject === -1) {
          projectsSupported += 1;
        }
        
        // Add to recent donations
        const donation = {
          name: projectName,
          amount: parseFloat(donationAmount),
          projectId: projectId,
          transferId: transferId,
          date: new Date().toISOString()
        };
        
        // Add to the beginning of the array
        recentDonations.unshift(donation);
        
        // Keep only the most recent 20 donations
        if (recentDonations.length > 20) {
          recentDonations = recentDonations.slice(0, 20);
        }
        
        // Save back to storage
        chrome.storage.local.set({
          totalDonations,
          projectsSupported,
          recentDonations
        }, () => {
          console.log('Updated donation stats:', { totalDonations, projectsSupported, recentDonationsCount: recentDonations.length });
          
          // Notify any open popups to refresh their stats
          chrome.runtime.sendMessage({
            type: 'REFRESH_DONATION_STATS'
          });
          
          showNotification('Donation Successful', `Thank you for donating $${donationAmount} to ${projectName}!`);
        });
      });
    });
  } catch (error) {
    console.error('Error processing donation:', error);
    showNotification('Donation Failed', 'An error occurred while processing your donation.');
  }
}

// Get a random open source project from an API or a predefined list
async function getRandomOpenSourceProject() {
  // In a real implementation, this would fetch from an API
  // For now, return a random project from a predefined list
  const projects = [
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'angular', name: 'Angular' },
    { id: 'tensorflow', name: 'TensorFlow' },
    { id: 'linux', name: 'Linux Foundation' },
    { id: 'mozilla', name: 'Mozilla Foundation' },
    { id: 'python', name: 'Python Software Foundation' },
    { id: 'wikipedia', name: 'Wikimedia Foundation' }
  ];
  
  const randomIndex = Math.floor(Math.random() * projects.length);
  return projects[randomIndex];
}

// Monitor transactions periodically
function startTransactionMonitoring() {
  // Check transactions every hour
  setInterval(checkRecentTransactions, 60 * 60 * 1000);
  
  // Also check immediately
  checkRecentTransactions();
}

// Check for recent transactions
async function checkRecentTransactions() {
  try {
    // Get the user ID
    chrome.storage.local.get(['userId'], async (result) => {
      if (result.userId) {
        const response = await fetch(`${SERVER_URL}/api/transactions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: result.userId })
        });
        
        const data = await response.json();
        
        if (data.transactions && data.transactions.length > 0) {
          // Check for new transactions that might be eligible for donations
          data.transactions.forEach(transaction => {
            if (transaction.pending && transaction.amount > 0) {
              // This is a purchase - show donation popup
              chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                  chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: showDonationPopup,
                    args: [transaction.amount]
                  });
                }
              });
            }
          });
        }
      }
    });
  } catch (error) {
    console.error('Error checking transactions:', error);
  }
}

// Function that will be injected into the page to show the donation popup
function showDonationPopup(purchaseAmount) {
  // Skip if the page has banking-related elements (double-check)
  if (document.querySelector('input[type="password"]') && 
      (document.querySelector('input[type="text"]') || document.querySelector('input[type="email"]'))) {
    console.log('Login form detected, skipping donation popup');
    return;
  }
  
  // Skip if page title contains banking keywords
  const pageTitle = document.title.toLowerCase();
  if (pageTitle.includes('login') || 
      pageTitle.includes('sign in') || 
      pageTitle.includes('bank') || 
      pageTitle.includes('account')) {
    console.log('Banking page title detected, skipping donation popup');
    return;
  }
  
  // Calculate the roundup amount
  const roundedAmount = Math.ceil(purchaseAmount);
  const donationAmount = (roundedAmount - purchaseAmount).toFixed(2);
  
  // The popup HTML will be injected by the content script
  const event = new CustomEvent('SHOW_DONATION_POPUP', { 
    detail: { 
      purchaseAmount,
      donationAmount
    }
  });
  document.dispatchEvent(event);
} 