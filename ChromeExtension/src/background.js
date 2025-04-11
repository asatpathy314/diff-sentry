// Server URL - change this to your actual server URL
const SERVER_URL = 'http://localhost:5173';

// Global blacklist of domains where we should never show donation popups
const BLACKLISTED_DOMAINS = [
  'github.com',
  'login',
  'signin',
  'account',
  'auth',
  'password'
];

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
  
  return BLACKLISTED_DOMAINS.some(domain => url.includes(domain));
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PURCHASE_DETECTED') {
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
        console.log('Ignoring purchase detection on blacklisted page:', url);
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
  } else if (message.type === 'MARK_POPUP_SHOWN') {
    // Track this tab as having made a donation
    if (sender && sender.tab && sender.tab.id) {
      const tabId = sender.tab.id;
      tabDonationTracker.set(tabId, {
        timestamp: Date.now()
      });
      console.log('Tracked popup for tab:', tabId);
    }
  } else if (message.type === 'OPEN_PROJECT_SELECTOR') {
    // Open the project selection popup
    chrome.windows.create({
      url: chrome.runtime.getURL('src/select-project.html'),
      type: 'popup',
      width: 400,
      height: 600
    });
  }
});

// Initialize when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with default settings
  chrome.storage.sync.set({
    donationsEnabled: true,
    preferredProjects: [],
    randomSelection: true
  });
});

// Show a notification to the user
function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '../assets/icon128.png',
    title: title,
    message: message
  });
}

// Get a random open source project from GitHub to donate to
async function getRandomOpenSourceProject() {
  try {
    // Use GitHub's trending repositories as a source of open source projects
    // This can be replaced with a more curated list in a production environment
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc');
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      // Get a random project from the top results
      const randomIndex = Math.floor(Math.random() * Math.min(20, data.items.length));
      const randomProject = data.items[randomIndex];
      
      return {
        name: randomProject.full_name,
        description: randomProject.description,
        stars: randomProject.stargazers_count,
        html_url: randomProject.html_url,
        owner: {
          login: randomProject.owner.login,
          avatar_url: randomProject.owner.avatar_url
        }
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching random project:', error);
    return null;
  }
}

// Function to show the donation popup
function showDonationPopup(purchaseAmount) {
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