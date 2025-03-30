// GitHub API base URL
const GITHUB_API_URL = 'https://api.github.com';

// Array to store preferred projects
let preferredProjects = [];

// Load saved preferences when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set up event listeners
  document.getElementById('search-button').addEventListener('click', searchProjects);
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchProjects();
    }
  });
  
  document.getElementById('save-preferences').addEventListener('click', savePreferences);
  
  // Load existing preferred projects
  loadPreferredProjects();
});

// Load preferred projects from storage
function loadPreferredProjects() {
  chrome.storage.sync.get(['preferredProjects'], (result) => {
    if (result.preferredProjects && result.preferredProjects.length > 0) {
      preferredProjects = result.preferredProjects;
      
      // Clear the no projects message
      const noPreferred = document.getElementById('no-preferred');
      if (noPreferred) {
        noPreferred.style.display = 'none';
      }
      
      // Display each preferred project
      const preferredList = document.getElementById('preferred-list');
      
      preferredProjects.forEach(project => {
        const projectElement = createProjectElement(project, true);
        preferredList.appendChild(projectElement);
      });
    }
  });
}

// Search for projects using GitHub API
async function searchProjects() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();
  
  if (!searchTerm) {
    return;
  }
  
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '<div class="loading">Searching projects...</div>';
  
  try {
    // Search for repositories with the given name
    const response = await fetch(`${GITHUB_API_URL}/search/repositories?q=${encodeURIComponent(searchTerm)}&sort=stars&order=desc`);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      // Clear previous results
      searchResults.innerHTML = '';
      
      // Display search results (limit to top 10)
      const topResults = data.items.slice(0, 10);
      
      topResults.forEach(repo => {
        // Create project object
        const project = {
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || 'No description available',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          url: repo.html_url,
          language: repo.language || 'Unknown'
        };
        
        // Check if already in preferred list
        const isPreferred = preferredProjects.some(p => p.id === project.id);
        
        // Create and append the project element
        const projectElement = createProjectElement(project, isPreferred);
        searchResults.appendChild(projectElement);
      });
    } else {
      searchResults.innerHTML = '<div class="empty-state">No projects found matching your search</div>';
    }
  } catch (error) {
    console.error('Error searching projects:', error);
    searchResults.innerHTML = '<div class="empty-state">Error searching projects. Please try again.</div>';
  }
}

// Create HTML element for a project
function createProjectElement(project, isPreferred) {
  const projectItem = document.createElement('div');
  projectItem.className = 'project-item';
  projectItem.dataset.id = project.id;
  
  // Create checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'project-checkbox';
  checkbox.checked = isPreferred;
  checkbox.dataset.id = project.id;
  
  // Add event listener to the checkbox
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      addToPreferred(project);
    } else {
      removeFromPreferred(project.id);
    }
  });
  
  // Create project info
  const projectInfo = document.createElement('div');
  projectInfo.className = 'project-info';
  
  projectInfo.innerHTML = `
    <div class="project-name">
      <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.fullName}</a>
    </div>
    <div class="project-description">${project.description}</div>
    <div class="project-meta">
      <span class="stars">★ ${formatNumber(project.stars)}</span>
      <span>🍴 ${formatNumber(project.forks)}</span>
      <span>${project.language}</span>
    </div>
  `;
  
  // Append elements
  projectItem.appendChild(checkbox);
  projectItem.appendChild(projectInfo);
  
  return projectItem;
}

// Add a project to the preferred list
function addToPreferred(project) {
  // Check if already in the list
  if (!preferredProjects.some(p => p.id === project.id)) {
    preferredProjects.push(project);
    
    // Add to the preferred list UI
    const preferredList = document.getElementById('preferred-list');
    const noPreferred = document.getElementById('no-preferred');
    
    if (noPreferred) {
      noPreferred.style.display = 'none';
    }
    
    // Check if it's not already in the UI
    if (!preferredList.querySelector(`[data-id="${project.id}"]`)) {
      const projectElement = createProjectElement(project, true);
      preferredList.appendChild(projectElement);
    }
  }
}

// Remove a project from the preferred list
function removeFromPreferred(projectId) {
  preferredProjects = preferredProjects.filter(p => p.id !== projectId);
  
  // Remove from search results UI if present
  const searchItem = document.querySelector(`#search-results [data-id="${projectId}"] input`);
  if (searchItem) {
    searchItem.checked = false;
  }
  
  // Remove from preferred list UI
  const preferredItem = document.querySelector(`#preferred-list [data-id="${projectId}"]`);
  if (preferredItem) {
    preferredItem.remove();
  }
  
  // Show empty state if needed
  if (preferredProjects.length === 0) {
    const noPreferred = document.getElementById('no-preferred');
    if (noPreferred) {
      noPreferred.style.display = 'block';
    }
  }
}

// Save preferences back to storage
function savePreferences() {
  chrome.storage.sync.set({ preferredProjects }, () => {
    // Show saved confirmation
    const saveButton = document.getElementById('save-preferences');
    const originalText = saveButton.textContent;
    
    saveButton.textContent = 'Preferences Saved!';
    saveButton.disabled = true;
    
    setTimeout(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    }, 2000);
  });
}

// Format numbers for display (e.g. 1000 -> 1k)
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num;
} 