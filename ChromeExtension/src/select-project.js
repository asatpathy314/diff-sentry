// Variables to track state
let selectedProject = null;
let donationAmount = 0;
let purchaseAmount = 0;
let projectsList = [];

// When the page loads, get donation info and available projects
document.addEventListener('DOMContentLoaded', () => {
  loadPendingDonationInfo();
  fetchGitHubProjects();
  setupEventListeners();
});

// Load pending donation information
function loadPendingDonationInfo() {
  chrome.storage.local.get(['pendingDonation'], (result) => {
    if (result.pendingDonation) {
      const { purchaseAmount, donationAmount } = result.pendingDonation;
      
      // Update UI
      document.getElementById('donation-amount').textContent = `$${donationAmount}`;
      document.getElementById('purchase-amount').textContent = `$${purchaseAmount.toFixed(2)}`;
    } else {
      // If there's no pending donation info, use default values
      document.getElementById('donation-amount').textContent = '$0.25';
      document.getElementById('purchase-amount').textContent = '$9.75';
    }
  });
}

// Fetch trending GitHub projects
async function fetchGitHubProjects() {
  try {
    // Show loading state
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '<div class="loading">Loading projects...</div>';
    
    // Fetch trending repositories from GitHub API
    const response = await fetch('https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=25');
    
    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      projectList.innerHTML = '<div class="empty-state">No projects found</div>';
      return;
    }
    
    // Clear loading state
    projectList.innerHTML = '';
    
    // Add projects to the list
    data.items.forEach(repo => {
      const projectItem = document.createElement('div');
      projectItem.className = 'project-item';
      projectItem.setAttribute('data-project-id', repo.id);
      
      // Build HTML for the project item
      projectItem.innerHTML = `
        <div class="project-info">
          <div class="project-header">
            <img src="${repo.owner.avatar_url}" alt="${repo.owner.login}" class="project-avatar">
            <div class="project-name-container">
              <div class="project-name">${repo.full_name}</div>
              <div class="project-stats">
                <span title="Stars">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="#ffd33d">
                    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.192L.819 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                  </svg>
                  ${repo.stargazers_count.toLocaleString()}
                </span>
                <span title="Forks">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="#8b949e">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
                  </svg>
                  ${repo.forks_count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div class="project-description">${repo.description || 'No description available'}</div>
        </div>
        <button class="select-project-btn">Select</button>
      `;
      
      // Add the project to the list
      projectList.appendChild(projectItem);
      
      // Add event listener for the select button
      const selectButton = projectItem.querySelector('.select-project-btn');
      selectButton.addEventListener('click', () => {
        selectProject(repo);
      });
    });
    
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    document.getElementById('project-list').innerHTML = 
      '<div class="error-state">Failed to load projects. Please try again later.</div>';
  }
}

// Set up event listeners
function setupEventListeners() {
  // Search input for filtering projects
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      filterProjects(searchTerm);
    });
  }
  
  // Random selection button
  const randomButton = document.getElementById('select-random');
  if (randomButton) {
    randomButton.addEventListener('click', selectRandomProject);
  }
}

// Filter projects based on search input
function filterProjects(searchTerm) {
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const projectName = item.querySelector('.project-name').textContent.toLowerCase();
    const projectDescription = item.querySelector('.project-description').textContent.toLowerCase();
    
    if (projectName.includes(searchTerm) || projectDescription.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Select a random project
function selectRandomProject() {
  const visibleProjects = Array.from(document.querySelectorAll('.project-item'))
    .filter(item => item.style.display !== 'none');
  
  if (visibleProjects.length === 0) {
    alert('No projects available to select');
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * visibleProjects.length);
  const randomProject = visibleProjects[randomIndex];
  
  // Find the project data by ID
  const projectId = randomProject.getAttribute('data-project-id');
  
  // Highlight the selected project
  visibleProjects.forEach(p => p.classList.remove('selected'));
  randomProject.classList.add('selected');
  
  // Scroll to the selected project
  randomProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Simulate click on the select button after a short delay
  setTimeout(() => {
    const selectButton = randomProject.querySelector('.select-project-btn');
    selectButton.click();
  }, 500);
}

// Handle project selection
function selectProject(projectData) {
  // Open GitHub repository in new tab
  window.open(projectData.html_url, '_blank');
  
  // Show confirmation and close window after a brief delay
  const projectList = document.getElementById('project-list');
  const header = document.querySelector('.header');
  
  // Hide the project list
  projectList.style.display = 'none';
  
  // Update header
  header.innerHTML = `
    <div class="success-header">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16" fill="#0366d6">
        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      <h2>Opening GitHub Repository</h2>
      <p><strong>${projectData.full_name}</strong></p>
      <div class="buttons">
        <button id="close-window" class="close-btn">Close</button>
      </div>
    </div>
  `;
  
  // Add event listener for close button
  document.getElementById('close-window').addEventListener('click', () => {
    window.close();
  });
  
  // Close the window automatically after 2 seconds
  setTimeout(() => {
    window.close();
  }, 2000);
} 