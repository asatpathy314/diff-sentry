// This script controls the popup UI for the extension

// Load settings when popup opens
document.addEventListener('DOMContentLoaded', () => {
  // Load user settings
  chrome.storage.sync.get(['donationsEnabled', 'randomSelection', 'preferredProjects', 'usePreferredOnly'], (result) => {
    // Update toggle states based on saved settings
    document.getElementById('enable-donations').checked = result.donationsEnabled;
    document.getElementById('random-projects').checked = result.randomSelection;
    document.getElementById('use-preferred-repos').checked = result.usePreferredOnly || false;
    
    // Add information about GitHub links
    updateGitHubSection();
    
    // Load preferred repositories
    loadPreferredRepositories(result.preferredProjects || []);
  });
  
  // Set up event listeners
  setupEventListeners();
});

// Show information about GitHub links
function updateGitHubSection() {
  // Create GitHub links info container if it doesn't exist
  if (!document.getElementById('github-links-info')) {
    const settingsContainer = document.querySelector('.settings');
    
    const githubInfoContainer = document.createElement('div');
    githubInfoContainer.className = 'settings-item';
    githubInfoContainer.id = 'github-links-info';
    githubInfoContainer.innerHTML = `
      <div style="display: flex; align-items: center; width: 100%;">
        <span style="flex-grow: 1;">GitHub Links</span>
        <span style="color: #4CAF50; font-size: 14px; font-weight: 500;">Enabled ✓</span>
      </div>
      <div style="margin-top: 8px; font-size: 12px; color: #666;">
        Automatically find open source projects on GitHub when you check out online.
      </div>
      <button id="explore-projects" style="
        margin-top: 8px;
        background: #0366d6;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        width: 100%;
      ">Explore Projects</button>
    `;
    
    settingsContainer.appendChild(githubInfoContainer);
    
    // Add event listener for the explore projects button
    document.getElementById('explore-projects').addEventListener('click', () => {
      // Open GitHub trending page
      chrome.tabs.create({ url: 'https://github.com/trending' });
    });
  }
}

// Load and display preferred repositories
function loadPreferredRepositories(repositories) {
  const reposList = document.getElementById('preferred-repos-list');
  
  // Clear the list
  reposList.innerHTML = '';
  
  // If no repositories, show empty state
  if (!repositories || repositories.length === 0) {
    reposList.innerHTML = '<div class="repo-item empty-state">No preferred repositories yet</div>';
    return;
  }
  
  // Add each repository to the list
  repositories.forEach(repo => {
    const repoItem = document.createElement('div');
    repoItem.className = 'repo-item';
    repoItem.innerHTML = `
      <div class="repo-name" title="${repo.name}">${repo.name}</div>
      <button class="remove-repo" data-repo-name="${repo.name}">×</button>
    `;
    reposList.appendChild(repoItem);
    
    // Add event listener for remove button
    const removeButton = repoItem.querySelector('.remove-repo');
    removeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      removePreferredRepository(repo);
    });
  });
}

// Add a repository to the preferred list
function addPreferredRepository(repo) {
  chrome.storage.sync.get(['preferredProjects'], (result) => {
    const preferredProjects = result.preferredProjects || [];
    
    // Check if repository already exists
    const exists = preferredProjects.some(existing => 
      existing.name === repo.name && existing.html_url === repo.html_url
    );
    
    if (!exists) {
      // Add to preferred repositories
      preferredProjects.push(repo);
      
      // Save back to storage
      chrome.storage.sync.set({ preferredProjects }, () => {
        // Reload the list
        loadPreferredRepositories(preferredProjects);
      });
    }
  });
}

// Remove a repository from the preferred list
function removePreferredRepository(repoToRemove) {
  chrome.storage.sync.get(['preferredProjects'], (result) => {
    let preferredProjects = result.preferredProjects || [];
    
    // Filter out the repository to remove
    preferredProjects = preferredProjects.filter(repo => 
      repo.name !== repoToRemove.name
    );
    
    // Save back to storage
    chrome.storage.sync.set({ preferredProjects }, () => {
      // Reload the list
      loadPreferredRepositories(preferredProjects);
    });
  });
}

// Open repository selection popup
function openRepoSelector() {
  chrome.windows.create({
    url: chrome.runtime.getURL('src/select-project.html?mode=select'),
    type: 'popup',
    width: 400,
    height: 600
  });
}

// Set up event listeners for the UI
function setupEventListeners() {
  // Enable/disable popups toggle
  document.getElementById('enable-donations').addEventListener('change', (e) => {
    chrome.storage.sync.set({ donationsEnabled: e.target.checked });
  });
  
  // Use preferred repositories only toggle
  document.getElementById('use-preferred-repos').addEventListener('change', (e) => {
    chrome.storage.sync.set({ usePreferredOnly: e.target.checked });
  });
  
  // Random project selection toggle
  document.getElementById('random-projects').addEventListener('change', (e) => {
    chrome.storage.sync.set({ randomSelection: e.target.checked });
  });
  
  // Manage projects button
  document.getElementById('manage-projects').addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://github.com/trending' });
  });
  
  // Add preferred repository button
  document.getElementById('add-preferred-repo').addEventListener('click', () => {
    openRepoSelector();
  });
  
  // Add event listeners for header buttons
  const headerButtons = document.querySelectorAll('.header-actions button');
  
  // Settings button
  headerButtons[0].addEventListener('click', () => {
    toggleSection('settings-section');
  });
  
  // About button
  headerButtons[1].addEventListener('click', () => {
    toggleSection('about-section');
  });
}

// Toggle visibility of sections
function toggleSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

// Listen for messages from select-project.html
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ADD_PREFERRED_REPO' && message.repo) {
    addPreferredRepository(message.repo);
  }
}); 