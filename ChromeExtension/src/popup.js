// This script controls the popup UI for the extension

// Load settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  // Load user settings
  chrome.storage.sync.get(['donationsEnabled', 'randomSelection', 'preferredProjects', 'plaidConnected'], (result) => {
    // Update toggle states based on saved settings
    document.getElementById('enable-donations').checked = result.donationsEnabled;
    document.getElementById('random-projects').checked = result.randomSelection;
    
    // Check if Plaid is connected and update UI accordingly
    if (result.plaidConnected) {
      showPlaidConnected();
    } else {
      showPlaidConnect();
    }
  });
  
  // Load actual donation statistics from storage
  loadDonationStats();
  
  // Set up event listeners
  setupEventListeners();
  
  // Listen for refresh stats messages
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'REFRESH_DONATION_STATS') {
      loadDonationStats();
    }
  });
});

// Show Plaid Connected UI
function showPlaidConnected() {
  // Create connect button container if it doesn't exist
  if (!document.getElementById('plaid-status')) {
    const settingsContainer = document.querySelector('.settings');
    
    const plaidContainer = document.createElement('div');
    plaidContainer.className = 'settings-item';
    plaidContainer.id = 'plaid-status';
    plaidContainer.innerHTML = `
      <div style="display: flex; align-items: center; width: 100%;">
        <span style="flex-grow: 1;">Bank Account</span>
        <span style="color: #4CAF50; font-size: 14px; font-weight: 500;">Connected ✓</span>
      </div>
      <button id="disconnect-plaid" style="
        margin-top: 8px;
        background: none;
        border: 1px solid #ccc;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        width: 100%;
      ">Disconnect</button>
    `;
    
    settingsContainer.appendChild(plaidContainer);
    
    // Add event listener for disconnect button
    document.getElementById('disconnect-plaid').addEventListener('click', () => {
      // Reset Plaid connection
      chrome.storage.sync.set({ plaidConnected: false });
      
      // Clear stored tokens
      chrome.storage.local.remove(['plaidAccessToken', 'plaidItemId', 'encryptedAccessToken']);
      
      // Refresh the UI
      plaidContainer.remove();
      showPlaidConnect();
    });
  }
}

// Show Plaid Connect UI
function showPlaidConnect() {
  // Create connect button container if it doesn't exist
  if (!document.getElementById('plaid-status')) {
    const settingsContainer = document.querySelector('.settings');
    
    const plaidContainer = document.createElement('div');
    plaidContainer.className = 'settings-item';
    plaidContainer.id = 'plaid-status';
    plaidContainer.innerHTML = `
      <div style="display: flex; align-items: center; width: 100%;">
        <span style="flex-grow: 1;">Bank Account</span>
        <span style="color: #f44336; font-size: 14px; font-weight: 500;">Not Connected</span>
      </div>
      <button id="connect-plaid" style="
        margin-top: 8px;
        background: #4CAF50;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        width: 100%;
      ">Connect Bank Account</button>
    `;
    
    settingsContainer.appendChild(plaidContainer);
    
    // Add event listener for connect button
    document.getElementById('connect-plaid').addEventListener('click', () => {
      // Start Plaid Link process
      chrome.runtime.sendMessage({ type: 'START_PLAID_LINK' });
    });
  }
}

// Load and display donation statistics from storage
function loadDonationStats() {
  console.log('Loading donation stats...');
  
  // Get real donation data from storage
  chrome.storage.local.get(['totalDonations', 'projectsSupported', 'recentDonations'], (result) => {
    console.log('Retrieved stats:', result);
    
    let totalDonations = 0;
    let projectsSupported = 0;
    let recentDonations = [];
    
    if (result.totalDonations !== undefined) {
      totalDonations = result.totalDonations;
    } else {
      // If stats don't exist, initialize them
      chrome.storage.local.set({ totalDonations: 0 });
    }
    
    if (result.projectsSupported !== undefined) {
      projectsSupported = result.projectsSupported;
    } else {
      chrome.storage.local.set({ projectsSupported: 0 });
    }
    
    if (result.recentDonations && result.recentDonations.length > 0) {
      // Only show the 3 most recent donations
      recentDonations = result.recentDonations.slice(0, 3);
    } else {
      // If no donations yet, ensure the array is initialized
      chrome.storage.local.set({ recentDonations: [] });
    }
    
    // Update the UI
    updateStatsUI(totalDonations, projectsSupported, recentDonations);
  });
}

// Update the statistics UI
function updateStatsUI(totalDonations, projectsSupported, recentDonations) {
  // Update the stats section
  document.querySelectorAll('.stats-value')[0].textContent = `$${totalDonations.toFixed(2)}`;
  document.querySelectorAll('.stats-value')[1].textContent = projectsSupported;
  
  // Clear and update recent donations list
  const projectList = document.querySelector('.project-list');
  projectList.innerHTML = '';
  
  if (recentDonations.length === 0) {
    // Show empty state
    const emptyState = document.createElement('div');
    emptyState.className = 'project-item';
    emptyState.innerHTML = `
      <span style="color: #888; font-style: italic;">No donations yet</span>
      <span></span>
    `;
    projectList.appendChild(emptyState);
  } else {
    // Show actual donations
    recentDonations.forEach(donation => {
      const projectItem = document.createElement('div');
      projectItem.className = 'project-item';
      projectItem.innerHTML = `
        <span>${donation.name}</span>
        <span>$${donation.amount.toFixed(2)}</span>
      `;
      projectList.appendChild(projectItem);
    });
  }
}

// Set up event listeners for the UI
function setupEventListeners() {
  // Enable/disable donations toggle
  document.getElementById('enable-donations').addEventListener('change', (e) => {
    chrome.storage.sync.set({ donationsEnabled: e.target.checked });
  });
  
  // Random project selection toggle
  document.getElementById('random-projects').addEventListener('change', (e) => {
    chrome.storage.sync.set({ randomSelection: e.target.checked });
  });
  
  // Manage projects button
  document.getElementById('manage-projects').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/manage-projects.html') });
  });
  
  // Start Supporting Open Source button - navigate to extensions page
  document.getElementById('support-open-source').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://extensions/' });
  });
} 