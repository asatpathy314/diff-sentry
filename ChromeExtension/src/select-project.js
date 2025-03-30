// Variables to track state
let selectedProject = null;
let donationAmount = 0;
let purchaseAmount = 0;
let projectsList = [];

// When the page loads, get donation info and available projects
document.addEventListener('DOMContentLoaded', () => {
  // Get donation details from local storage
  chrome.storage.local.get(['pendingDonation'], (result) => {
    if (result.pendingDonation) {
      donationAmount = result.pendingDonation.donationAmount;
      purchaseAmount = result.pendingDonation.purchaseAmount;
      
      // Update the donation amount display
      document.getElementById('donation-amount').textContent = `$${parseFloat(donationAmount).toFixed(2)}`;
    }
  });
  
  // Load open source projects
  loadProjects();
  
  // Set up event listeners
  document.getElementById('donate-button').addEventListener('click', donateToSelectedProject);
  document.getElementById('cancel-button').addEventListener('click', closePopup);
});

// Load the list of projects to display
function loadProjects() {
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = ''; // Clear existing content
  
  // First try to load preferred projects
  chrome.storage.sync.get(['preferredProjects'], (result) => {
    let projects = [];
    
    if (result.preferredProjects && result.preferredProjects.length > 0) {
      // Use the preferred projects if available
      projects = result.preferredProjects;
    } else {
      // Fallback to the default list of projects
      projects = getDefaultProjects();
    }
    
    projectsList = projects;
    
    // Render each project
    projects.forEach(project => {
      const projectItem = createProjectElement(project);
      projectList.appendChild(projectItem);
    });
  });
}

// Get a default list of open source projects
function getDefaultProjects() {
  return [
    {
      id: 'react',
      name: 'React',
      description: 'A JavaScript library for building user interfaces',
      stars: '180k',
      language: 'JavaScript'
    },
    {
      id: 'vue',
      name: 'Vue.js',
      description: 'Progressive JavaScript framework for building UI',
      stars: '195k',
      language: 'JavaScript'
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      description: 'Open source machine learning framework',
      stars: '160k',
      language: 'C++'
    },
    {
      id: 'vscode',
      name: 'VS Code',
      description: 'Code editing. Redefined.',
      stars: '130k',
      language: 'TypeScript'
    },
    {
      id: 'linux',
      name: 'Linux Foundation',
      description: 'Supporting the Linux kernel and open source ecosystem',
      stars: '95k',
      language: 'C'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      description: 'JavaScript runtime built on Chrome\'s V8 engine',
      stars: '85k',
      language: 'JavaScript'
    },
    {
      id: 'python',
      name: 'Python',
      description: 'Programming language for general purpose development',
      stars: '40k',
      language: 'Python'
    },
    {
      id: 'mozilla',
      name: 'Mozilla Foundation',
      description: 'Supports Firefox and open web standards',
      stars: '30k',
      language: 'Various'
    }
  ];
}

// Create a UI element for a project
function createProjectElement(project) {
  const projectItem = document.createElement('div');
  projectItem.className = 'project-item';
  projectItem.dataset.id = project.id;
  
  // Create the project logo
  const projectLogo = document.createElement('div');
  projectLogo.className = 'project-logo';
  
  // Set a different logo for each project (just a placeholder)
  const logoContent = getLogoForProject(project.id);
  projectLogo.innerHTML = logoContent;
  
  // Create the project info section
  const projectInfo = document.createElement('div');
  projectInfo.className = 'project-info';
  
  // Create and add project name
  const projectName = document.createElement('div');
  projectName.className = 'project-name';
  projectName.textContent = project.name;
  
  // Create and add project description
  const projectDescription = document.createElement('div');
  projectDescription.className = 'project-description';
  projectDescription.textContent = project.description || 'Open source project';
  
  // Create and add project metadata
  const projectMeta = document.createElement('div');
  projectMeta.className = 'project-meta';
  const metaText = [];
  if (project.stars) metaText.push(`★ ${project.stars}`);
  if (project.language) metaText.push(project.language);
  projectMeta.textContent = metaText.join(' • ');
  
  // Add all elements to the project info container
  projectInfo.appendChild(projectName);
  projectInfo.appendChild(projectDescription);
  projectInfo.appendChild(projectMeta);
  
  // Add the logo and info to the project item
  projectItem.appendChild(projectLogo);
  projectItem.appendChild(projectInfo);
  
  // Add click event to select this project
  projectItem.addEventListener('click', () => {
    // Remove selection from any previously selected project
    document.querySelectorAll('.project-item.selected').forEach(item => {
      item.classList.remove('selected');
    });
    
    // Mark this project as selected
    projectItem.classList.add('selected');
    selectedProject = project;
    
    // Enable the donate button
    document.getElementById('donate-button').disabled = false;
  });
  
  return projectItem;
}

// Get an SVG icon for a project based on its ID
function getLogoForProject(projectId) {
  // Switch based on project ID to return different icons
  switch(projectId) {
    case 'react':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="2.25"/><path d="M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5z"/><path d="M12 4.5c-5.5 0-10 2.05-10 4.5s4.5 4.5 10 4.5 10-2.05 10-4.5-4.5-4.5-10-4.5zm0 9c-5.5 0-10-2.05-10-4.5M12 16.5c-5.5 0-10-2.05-10-4.5"/></svg>';
    case 'vue':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4.5l4 7 4-7h-8z"/><path d="M8 4.5l4 7 4-7h2l-6 10.5L6 4.5h2z"/></svg>';
    case 'nodejs':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21.35l-1.45-.82C5.4 17.18 2 14.08 2 10.2 2 7.22 4.42 4.8 7.4 4.8c1.55 0 3.03.61 4.1 1.62L12 7l.5-.58C13.57 5.41 15.05 4.8 16.6 4.8c2.98 0 5.4 2.42 5.4 5.4 0 3.88-3.4 6.98-8.55 10.33l-1.45.82z"/></svg>';
    case 'python':
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 6v6m0 6v.5m0-.5a3 3 0 0 1-3-3m3 3a3 3 0 0 0 3-3m-3-6a3 3 0 0 0-3 3m3-3a3 3 0 0 1 3 3m-3-6a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6z"/></svg>';
    default:
      // Default icon for other projects
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
  }
}

// Handle the donation process when a project is selected
function donateToSelectedProject() {
  if (!selectedProject) {
    return;
  }
  
  // Send message to process donation with the selected project
  chrome.runtime.sendMessage({
    type: 'PROCESS_DONATION',
    purchaseAmount: purchaseAmount,
    donationAmount: donationAmount,
    useRandomProject: false,
    projectInfo: selectedProject
  }, response => {
    if (chrome.runtime.lastError) {
      console.error('Error sending donation:', chrome.runtime.lastError);
    } else {
      console.log('Donation processed successfully');
    }
    
    // Close the popup
    closePopup();
  });
}

// Close this popup window
function closePopup() {
  // Clean up temporary storage
  chrome.storage.local.remove(['pendingDonation']);
  
  // Close the window
  window.close();
} 