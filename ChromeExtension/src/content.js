// This content script will run on all web pages and detect purchases

// Add this function to check if we're on a Plaid or banking related page - for faster detection
function isBankingOrPlaidPage() {
  const url = window.location.href.toLowerCase();
  
  // More aggressive checks for Plaid/banking pages
  if (url.includes('plaid') || 
      url.includes('bank') || 
      url.includes('platypus') || 
      url.includes('login') || 
      url.includes('signin') ||
      url.includes('auth') ||
      url.includes('account')) {
    console.log('Banking/Plaid page detected via URL, skipping donation popup');
    return true;
  }
  
  // Check for Plaid-specific elements
  const plaidElements = document.querySelectorAll(
    '[data-testid*="plaid"], ' +
    '[class*="Plaid"], ' +
    '[id*="plaid"], ' +
    'iframe[src*="plaid"], ' +
    'div[data-institution], ' +
    'div[data-reactroot] form[id="plaidForm"]'
  );
  
  if (plaidElements.length > 0) {
    console.log('Plaid elements detected on page, skipping donation popup');
    return true;
  }
  
  // Check for banking UI elements
  const bankingElements = document.querySelectorAll(
    'input[type="password"], ' +
    'input[name*="password"], ' +
    'input[name*="username"], ' +
    'input[id*="login"], ' +
    'form[action*="login"], ' +
    'form[action*="auth"], ' +
    'button[data-testid="submit-credentials"], ' +
    'button[aria-label*="Continue to login"]'
  );
  
  if (bankingElements.length > 0) {
    console.log('Login elements detected, skipping donation popup');
    return true;
  }
  
  // Check page title and content for banking keywords
  const pageTitle = document.title.toLowerCase();
  if (pageTitle.includes('login') || 
      pageTitle.includes('sign in') || 
      pageTitle.includes('bank') || 
      pageTitle.includes('account') ||
      pageTitle.includes('plaid')) {
    console.log('Banking/login page title detected, skipping donation popup');
    return true;
  }
  
  // Check for specific text content that indicates we're in a banking or Plaid flow
  const pageText = document.body.innerText.toLowerCase();
  const bankingKeywords = [
    'connect your bank account',
    'select your bank',
    'sign in to your bank',
    'enter your credentials',
    'choose your financial institution',
    'powered by plaid',
    'secure bank connection'
  ];
  
  if (bankingKeywords.some(keyword => pageText.includes(keyword))) {
    console.log('Banking/Plaid content detected, skipping donation popup');
    return true;
  }
  
  return false;
}

// Use sophisticated methods to detect checkout pages
function detectCheckoutPage() {
  // IMMEDIATE CHECK: Skip if it's a banking or Plaid page
  if (isBankingOrPlaidPage()) {
    return false;
  }
  
  // Check for excluded pages first - don't show popup on these pages
  const excludedPatterns = [
    'plaid.com', 
    '/login', 
    '/signin', 
    '/auth', 
    'bank', 
    'banking',
    'account',
    'platypus',  // Exclude the First Platypus Bank shown in the screenshot
    'fintech',
    'financial',
    'password',
    'username',
    'credential'
  ];
  
  const currentUrl = window.location.href.toLowerCase();
  
  // Don't trigger on excluded pages
  if (excludedPatterns.some(pattern => currentUrl.includes(pattern))) {
    console.log('Page excluded from donation popup:', currentUrl);
    return false;
  }
  
  // 1. URL pattern matching
  const checkoutUrlPatterns = [
    '/checkout', '/cart', '/payment', '/order', '/purchase',
    'checkout.', 'payment.', 'pay.', 'secure.', 'cart.'
  ];
  
  const isCheckoutUrl = checkoutUrlPatterns.some(pattern => currentUrl.includes(pattern));
  
  // 2. Form elements detection
  const creditCardInputs = document.querySelectorAll('input[autocomplete="cc-number"], input[name*="card"], input[name*="credit"], input[id*="card"], input[id*="credit"], input[placeholder*="card"]');
  const expiryInputs = document.querySelectorAll('input[autocomplete="cc-exp"], input[name*="expir"], input[id*="expir"], input[placeholder*="expir"]');
  const cvvInputs = document.querySelectorAll('input[autocomplete="cc-csc"], input[name*="cvv"], input[id*="cvv"], input[name*="cvc"], input[id*="cvc"], input[placeholder*="security code"]');
  
  const hasPaymentForm = creditCardInputs.length > 0 && (expiryInputs.length > 0 || cvvInputs.length > 0);
  
  // Also check if this looks like a login page - if so, don't trigger
  const loginInputs = document.querySelectorAll('input[type="password"], input[name*="password"], input[id*="password"]');
  const usernameInputs = document.querySelectorAll('input[name*="username"], input[id*="username"], input[name*="email"], input[id*="email"]');
  const isLoginPage = loginInputs.length > 0 && usernameInputs.length > 0;
  
  if (isLoginPage) {
    console.log('Login page detected, skipping donation popup');
    return false;
  }
  
  // 3. Button detection 
  const checkoutButtonText = ['checkout', 'place order', 'pay now', 'submit order', 'complete purchase', 'buy now', 'confirm order'];
  const buttons = Array.from(document.querySelectorAll('button, input[type="submit"], a.button, .btn'));
  
  const hasCheckoutButton = buttons.some(btn => {
    const buttonText = (btn.textContent || btn.value || btn.innerText || '').toLowerCase();
    return checkoutButtonText.some(text => buttonText.includes(text));
  });
  
  // 4. E-commerce platform detection
  const platformSelectors = {
    'shopify': ['.shopify-payment-button', '.shopify-checkout'],
    'woocommerce': ['.woocommerce-checkout', '.wc-proceed-to-checkout'],
    'magento': ['.checkout-payment-method', '.opc-payment'],
    'bigcommerce': ['.checkout-step--payment', '.optimizedCheckout-form'],
    'squarespace': ['.sqs-checkout', '.checkout-container'],
    'stripe': ['.StripeElement', '.stripe-payment-form']
  };
  
  const platformMatches = Object.values(platformSelectors).some(selectors => 
    selectors.some(selector => document.querySelector(selector))
  );
  
  // 5. Order summary detection
  const orderSummarySelectors = [
    '.order-summary', '#order-summary', '.cart-summary', '.checkout-summary',
    '.payment-summary', '.purchase-summary', '[id*="order-summary"]', '[class*="order-summary"]'
  ];
  
  const hasOrderSummary = orderSummarySelectors.some(selector => document.querySelector(selector));
  
  // 6. Key phrases in page content
  const checkoutKeywords = [
    'checkout', 'payment', 'billing information', 'shipping address',
    'credit card', 'card number', 'expiration date', 'cvv',
    'complete your purchase', 'billing details', 'payment method'
  ];
  
  const pageText = document.body.innerText.toLowerCase();
  const hasCheckoutKeywords = checkoutKeywords.some(keyword => pageText.includes(keyword));
  
  // Check for bank-related keywords that indicate a banking page and NOT a checkout
  const bankingKeywords = [
    'account login', 'sign in to your account', 'banking', 'online banking',
    'username', 'password', 'forgot password', 'register', 'enroll',
    'secure login', 'access your account', 'plaid', 'bank connections'
  ];
  
  const isBankingPage = bankingKeywords.some(keyword => pageText.includes(keyword));
  
  if (isBankingPage) {
    console.log('Banking page detected, skipping donation popup');
    return false;
  }
  
  // Combine all signals - the more signals that match, the more confident we are
  let confidenceScore = 0;
  if (isCheckoutUrl) confidenceScore += 2;
  if (hasPaymentForm) confidenceScore += 3;
  if (hasCheckoutButton) confidenceScore += 2;
  if (platformMatches) confidenceScore += 3;
  if (hasOrderSummary) confidenceScore += 2;
  if (hasCheckoutKeywords) confidenceScore += 1;
  
  // Consider it a checkout page if confidence score is high enough
  return confidenceScore >= 4;
}

// Add this helper function at the top of the file
function safeChromeCall(callback) {
  try {
    if (chrome && chrome.runtime && chrome.runtime.id) {
      return callback();
    } else {
      console.log('Chrome extension context not available');
      return false;
    }
  } catch (error) {
    // Extension context was invalidated or Chrome API not available
    console.log('Extension context error:', error);
    return false;
  }
}

// Track if we're in a Plaid connection flow
let inPlaidConnectionFlow = false;

// Track if donation has been made in the current checkout session
let donationMadeInCurrentSession = false;

// Create a unique key for the current checkout session based on URL and visible content
function getCheckoutSessionKey() {
  // Extract the domain as the primary identifier
  const url = window.location.href;
  const domain = window.location.hostname;
  
  // Get the cart-specific part of the URL (anything after checkout or cart)
  let cartPath = '';
  const checkoutPaths = ['checkout', 'cart', 'basket', 'order'];
  
  for (const path of checkoutPaths) {
    const pathIndex = url.toLowerCase().indexOf(path);
    if (pathIndex > -1) {
      cartPath = url.substring(pathIndex);
      break;
    }
  }
  
  // Add some content from the page to make it more specific to this cart
  // Focus on price-related elements which indicate specific cart contents
  const priceElements = document.querySelectorAll('.price, .total, [class*="price"], [class*="total"]');
  let priceTexts = '';
  
  priceElements.forEach(el => {
    priceTexts += el.textContent.trim() + ';';
  });
  
  // Create a content hash that represents this specific cart's contents
  const contentHash = btoa(priceTexts.substring(0, 200)).substring(0, 20);
  
  // Create a domain-specific key that's cart-aware
  return `checkout-session-${domain}-${cartPath}-${contentHash}`;
}

// Set donation made flag in session storage
function markDonationMade() {
  donationMadeInCurrentSession = true;
  
  // Also store in session storage to persist across page refreshes within the same session
  try {
    const sessionKey = getCheckoutSessionKey();
    sessionStorage.setItem(sessionKey, 'donated');
    
    // Set a flag to disable the popup on refresh, which can be cleared to enable popups again
    // Comment this out to allow popups every refresh
    sessionStorage.setItem('disable-popup-on-refresh', 'false');
    
    console.log('Donation marked as complete for this checkout session:', sessionKey);
  } catch (e) {
    console.log('Error saving to session storage:', e);
  }
}

// Check if donation has been made in this session
function hasDonationBeenMade() {
  // In-memory flag is only for the current page
  if (donationMadeInCurrentSession) {
    console.log('Donation was made on this page (in-memory flag)');
    return true;
  }
  
  // Check session storage for this specific domain/cart
  try {
    const sessionKey = getCheckoutSessionKey();
    const donationStatus = sessionStorage.getItem(sessionKey);
    
    if (donationStatus === 'donated') {
      console.log('Donation was made for this specific cart:', sessionKey);
      return true;
    }
    
    // Check if we need to clean up old donation records
    // This prevents excessive accumulation of session records
    cleanupDonationRecords();
    
    return false;
  } catch (e) {
    console.log('Error reading from session storage:', e);
    return false;
  }
}

// Clean up old donation records but preserve the current domain's records
function cleanupDonationRecords() {
  try {
    const currentDomain = window.location.hostname;
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      
      // Only process our checkout session keys
      if (key && key.startsWith('checkout-session-')) {
        // If it's from a different domain, remove it
        if (!key.includes(`checkout-session-${currentDomain}`)) {
          console.log('Cleaning up donation record from different domain:', key);
          // Keep this commented out for testing - in production we would clear these
          // sessionStorage.removeItem(key);
        }
      }
    }
  } catch (e) {
    console.log('Error cleaning up donation records:', e);
  }
}

// Check if we're in a Plaid connection flow
function checkPlaidConnectionStatus() {
  safeChromeCall(() => {
    chrome.runtime.sendMessage({ type: 'CHECK_PLAID_CONNECTION_STATUS' }, (response) => {
      if (chrome.runtime.lastError) {
        console.log('Error checking Plaid connection status:', chrome.runtime.lastError);
        return;
      }
      
      if (response && response.isConnectingToPlaid) {
        inPlaidConnectionFlow = true;
        console.log('We are in a Plaid connection flow, donation popups disabled');
      }
    });
  });
}

// Run this check when the page loads
setTimeout(checkPlaidConnectionStatus, 500);

// Modify the first part of the detectPurchase function to check the connection flow
function detectPurchase() {
  // Skip if already donated in this session - but only if we have the special flag set
  // to prevent popup on refresh
  if (hasDonationBeenMade()) {
    console.log('Donation previously made, but allowing popup on refresh');
    // Don't return here to allow popup on refresh
  }
  
  // Quick check for banking/Plaid pages before doing any detection
  if (isBankingOrPlaidPage() || inPlaidConnectionFlow) {
    console.log('Banking page or Plaid connection in progress, skipping donation detection');
    return;
  }
  
  const isCheckoutPage = detectCheckoutPage();
  
  if (isCheckoutPage) {
    // First check if donations are enabled
    safeChromeCall(() => {
      chrome.storage.sync.get(['donationsEnabled'], (result) => {
        if (chrome.runtime.lastError) {
          console.log('Error accessing storage:', chrome.runtime.lastError);
          return;
        }
        
        if (result && result.donationsEnabled) {
          const purchaseAmount = extractPurchaseAmount() || parseFloat((Math.random() * 100).toFixed(2));
          
          // Notify the background script about the detected purchase
          safeChromeCall(() => {
            chrome.runtime.sendMessage({
              type: 'PURCHASE_DETECTED',
              amount: purchaseAmount
            }, response => {
              if (chrome.runtime.lastError) {
                console.log('Error sending message:', chrome.runtime.lastError);
              }
            });
          });
        }
      });
    });
  }
}

// Try to extract the actual purchase amount from the page
function extractPurchaseAmount() {
  // Common selectors for total amount elements
  const totalSelectors = [
    '.total', '.order-total', '.cart-total', '.grand-total', '.checkout-total',
    '#total', '#order-total', '#cart-total', '#grand-total', '#checkout-total',
    '[class*="total"]', '[id*="total"]',
    'span:contains("Total")', 'div:contains("Total")', 'td:contains("Total")',
    '.price', '.amount', '.sum'
  ];
  
  // Try each selector
  for (const selector of totalSelectors) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
      // Get text content
      const text = element.textContent.trim();
      
      // Look for currency patterns like $123.45, €123,45, etc.
      const currencyPattern = /[\$\€\£\¥]?\s*\d+[\.,]\d{2}/g;
      const matches = text.match(currencyPattern);
      
      if (matches && matches.length > 0) {
        // Get the last match which is often the total (vs subtotal)
        const amountStr = matches[matches.length - 1].replace(/[^\d\.]/g, '');
        const amount = parseFloat(amountStr);
        if (!isNaN(amount) && amount > 0) {
          return amount;
        }
      }
    }
  }
  
  // If no amount found, return null
  return null;
}

// Process a donation after user confirms
function processDonation(purchaseAmount, donationAmount, useRandomProject, projectInfo) {
  console.log('Processing donation:', { purchaseAmount, donationAmount, useRandomProject, projectInfo });
  
  // If a specific project was provided, use it directly
  if (!useRandomProject && projectInfo) {
    safeChromeCall(() => {
      chrome.runtime.sendMessage({
        type: 'PROCESS_DONATION',
        purchaseAmount,
        donationAmount,
        useRandomProject: false,
        projectInfo
      }, response => {
        if (chrome.runtime.lastError) {
          console.log('Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('Donation processed successfully');
          
          // Force update the popup UI if it's open
          chrome.runtime.sendMessage({
            type: 'UPDATE_DONATION_STATS'
          });
        }
      });
    });
    return;
  }
  
  // Get the list of preferred projects or use a random certified project
  safeChromeCall(() => {
    chrome.storage.sync.get(['preferredProjects', 'randomSelection'], async (result) => {
      if (chrome.runtime.lastError) {
        console.log('Error accessing storage:', chrome.runtime.lastError);
        return;
      }
      
      let projectToSupport = null;
      
      // If user chose to select a project or we have no preferred projects
      if (useRandomProject || !result.preferredProjects || result.preferredProjects.length === 0) {
        // Get a random project from a list of verified open source projects
        projectToSupport = await getRandomOpenSourceProject();
      } else {
        // Choose a random project from the user's preferred list
        const randomIndex = Math.floor(Math.random() * result.preferredProjects.length);
        projectToSupport = result.preferredProjects[randomIndex];
      }
      
      if (projectToSupport) {
        // Send the donation info to the background script for processing
        safeChromeCall(() => {
          chrome.runtime.sendMessage({
            type: 'PROCESS_DONATION',
            purchaseAmount,
            donationAmount,
            useRandomProject,
            projectInfo: projectToSupport
          }, response => {
            if (chrome.runtime.lastError) {
              console.log('Error sending message:', chrome.runtime.lastError);
            } else {
              console.log('Donation processed successfully');
              
              // Force update the popup UI if it's open
              chrome.runtime.sendMessage({
                type: 'UPDATE_DONATION_STATS'
              });
            }
          });
        });
      } else {
        alert('Sorry, we could not process your donation at this time. Please try again later.');
      }
    });
  });
}

// Get a random open source project from a predefined list
async function getRandomOpenSourceProject() {
  // In a production app, this would come from an API or database
  // For demonstration, we'll use a list of popular open source projects
  const popularProjects = [
    {
      id: 'react',
      name: 'React',
      fullName: 'facebook/react',
      description: 'A JavaScript library for building user interfaces',
      stars: 180000,
      url: 'https://github.com/facebook/react'
    },
    {
      id: 'vue',
      name: 'Vue.js',
      fullName: 'vuejs/vue',
      description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework',
      stars: 195000,
      url: 'https://github.com/vuejs/vue'
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      fullName: 'tensorflow/tensorflow',
      description: 'An open source machine learning framework',
      stars: 160000,
      url: 'https://github.com/tensorflow/tensorflow'
    },
    {
      id: 'vscode',
      name: 'VS Code',
      fullName: 'microsoft/vscode',
      description: 'Visual Studio Code',
      stars: 130000,
      url: 'https://github.com/microsoft/vscode'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      fullName: 'nodejs/node',
      description: 'Node.js JavaScript runtime',
      stars: 85000,
      url: 'https://github.com/nodejs/node'
    }
  ];
  
  // Randomly select a project
  const randomIndex = Math.floor(Math.random() * popularProjects.length);
  return popularProjects[randomIndex];
}

// Create and inject the donation popup
function createDonationPopup(purchaseAmount, donationAmount) {
  // Remove any existing popups
  const existingPopup = document.getElementById('oss-donation-popup');
  if (existingPopup) {
    existingPopup.remove();
  }
  
  // Create the popup container
  const popup = document.createElement('div');
  popup.id = 'oss-donation-popup';
  popup.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-family: Arial, sans-serif;
    padding: 15px;
  `;
  
  // Popup content
  popup.innerHTML = `
    <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
      <h3 style="margin: 0; font-size: 16px; color: #333;">Support Open Source</h3>
      <p style="margin: 5px 0 0; font-size: 14px; color: #666;">
        Round up your $${purchaseAmount.toFixed(2)} purchase to support open source?
      </p>
    </div>
    <div style="margin-bottom: 15px;">
      <p style="margin: 0; font-size: 14px; color: #333;">
        Donation amount: <strong>$${donationAmount}</strong>
      </p>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <button id="oss-choose-project" style="
        background: #f0f0f0;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Choose Project</button>
      <button id="oss-donate-random" style="
        background: #4CAF50;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      ">Donate</button>
      <button id="oss-cancel" style="
        background: none;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 14px;
        color: #999;
      ">Skip</button>
    </div>
  `;
  
  // Add the popup to the page
  document.body.appendChild(popup);
  
  // Store popup info in session storage to make it persistent
  try {
    sessionStorage.setItem('oss-active-popup', JSON.stringify({
      timestamp: Date.now(),
      domain: window.location.hostname,
      purchaseAmount,
      donationAmount,
      pendingInteraction: true
    }));
  } catch (e) {
    console.log('Error saving popup state to session storage:', e);
  }
  
  // Check if the user has connected their bank account
  safeChromeCall(() => {
    chrome.storage.sync.get(['plaidConnected'], (result) => {
      if (chrome.runtime.lastError) {
        console.log('Error accessing storage:', chrome.runtime.lastError);
        popup.remove();
        return;
      }
      
      if (!result.plaidConnected) {
        // If not connected, update the popup to prompt connection
        popup.innerHTML = `
          <div style="border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">
            <h3 style="margin: 0; font-size: 16px; color: #333;">Support Open Source</h3>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;">
              Connect your bank account to make donations.
            </p>
          </div>
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; font-size: 14px; color: #333;">
              Securely connect with Plaid to round up purchases.
            </p>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <button id="oss-connect-bank" style="
              background: #4CAF50;
              color: white;
              border: none;
              padding: 8px 12px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
              flex-grow: 1;
              margin-right: 10px;
            ">Connect Bank</button>
            <button id="oss-cancel" style="
              background: none;
              border: none;
              padding: 8px 12px;
              cursor: pointer;
              font-size: 14px;
              color: #999;
            ">Skip</button>
          </div>
        `;
        
        // Set up event handler for the connect bank button
        document.getElementById('oss-connect-bank').addEventListener('click', () => {
          // Clear the active popup marker
          sessionStorage.removeItem('oss-active-popup');
          
          // Set local state to prevent further popups
          inPlaidConnectionFlow = true;
          console.log('Connect Bank button clicked, setting Plaid connection flow state');
          
          // Notify the background script
          safeChromeCall(() => {
            chrome.runtime.sendMessage({ type: 'START_PLAID_LINK' }, response => {
              if (chrome.runtime.lastError) {
                console.log('Error sending message:', chrome.runtime.lastError);
                // Reset the local state if there was an error
                inPlaidConnectionFlow = false;
              }
            });
          });
          
          // Remove the popup
          popup.remove();
          
          // Continue with checkout if there was a pending one
          continueWithCheckout();
        });
        
        document.getElementById('oss-cancel').addEventListener('click', () => {
          // Clear the active popup marker when user cancels
          sessionStorage.removeItem('oss-active-popup');
          
          popup.remove();
          
          // Continue with checkout if there was a pending one
          continueWithCheckout();
        });
        
        return;
      }
      
      // Set up event handlers for donation buttons
      document.getElementById('oss-choose-project').addEventListener('click', () => {
        console.log('Choose Project button clicked...');
        
        // Clear the active popup marker
        sessionStorage.removeItem('oss-active-popup');
        
        // Extract values from the donation amount display to ensure correct values
        const amountDisplay = popup.querySelector('p strong');
        let donationAmountValue = donationAmount;
        
        if (amountDisplay) {
          const displayedAmount = parseFloat(amountDisplay.textContent.replace('$', ''));
          if (!isNaN(displayedAmount)) {
            donationAmountValue = displayedAmount.toString();
          }
        }
        
        // Store donation info for the project selection popup
        chrome.storage.local.set({
          pendingDonation: {
            purchaseAmount: purchaseAmount,
            donationAmount: donationAmountValue
          }
        }, () => {
          // Mark donation as made in this session
          markDonationMade();
          
          // Open the project selection popup
          chrome.runtime.sendMessage({
            type: 'OPEN_PROJECT_SELECTOR'
          });
          
          // Remove the current popup
          popup.remove();
          
          // We'll handle the checkout continuation after the project selection popup is closed
          document.addEventListener('OSS_PROJECT_SELECTED', () => {
            continueWithCheckout();
          }, { once: true });
        });
      });
      
      document.getElementById('oss-donate-random').addEventListener('click', () => {
        // Clear the active popup marker
        sessionStorage.removeItem('oss-active-popup');
        
        // Process donation to a random project
        console.log('Donate button clicked, processing random donation...');
        
        // Extract values from the donation amount display to ensure correct values
        const amountDisplay = popup.querySelector('p strong');
        if (amountDisplay) {
          const displayedAmount = parseFloat(amountDisplay.textContent.replace('$', ''));
          if (!isNaN(displayedAmount)) {
            donationAmount = displayedAmount.toString();
          }
        }
        
        // Mark donation as made in this session
        markDonationMade();
        
        processDonation(purchaseAmount, donationAmount, true);
        popup.remove();
        
        // Continue with checkout if there was a pending one
        continueWithCheckout();
      });
      
      document.getElementById('oss-cancel').addEventListener('click', () => {
        // Clear the active popup marker when user cancels
        sessionStorage.removeItem('oss-active-popup');
        
        popup.remove();
        
        // Continue with checkout if there was a pending one
        continueWithCheckout();
      });
    });
  });
  
  // Add a mutation observer to ensure the popup stays in the DOM
  const popupObserver = new MutationObserver((mutations) => {
    if (!document.body.contains(popup)) {
      // Popup was removed from DOM, add it back if user hasn't interacted yet
      const popupData = sessionStorage.getItem('oss-active-popup');
      if (popupData) {
        try {
          const data = JSON.parse(popupData);
          if (data && data.pendingInteraction) {
            console.log('Popup was removed from DOM, re-adding it');
            document.body.appendChild(popup);
          }
        } catch (e) {
          console.log('Error parsing popup data:', e);
        }
      }
    }
  });
  
  // Start observing the DOM
  popupObserver.observe(document.body, { childList: true, subtree: true });
  
  // Make sure the popup is still around even if page changes
  return popup;
}

function continueWithCheckout() {
  const event = new CustomEvent('OSS_DONATION_HANDLED');
  document.dispatchEvent(event);
}

// Listen for the PROJECT_SELECTED message from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'PROJECT_SELECTED') {
    // Dispatch the custom event to continue checkout
    document.dispatchEvent(new CustomEvent('OSS_PROJECT_SELECTED'));
  }
});

// Listen for the custom event from the injected script
document.addEventListener('SHOW_DONATION_POPUP', (event) => {
  // Check if there's already an active donation popup
  const existingPopup = document.getElementById('oss-donation-popup');
  if (existingPopup) {
    console.log('Donation popup already active, not showing another one');
    return;
  }
  
  // Also check session storage for an active popup that might have been removed from DOM
  const popupData = sessionStorage.getItem('oss-active-popup');
  if (popupData) {
    try {
      const data = JSON.parse(popupData);
      if (data && data.pendingInteraction) {
        console.log('Active popup found in session storage, restoring it');
        createDonationPopup(data.purchaseAmount, data.donationAmount);
        return;
      }
    } catch (e) {
      console.log('Error parsing popup data:', e);
    }
  }
  
  // Skip if a donation has already been made in this session AND we have the special flag set
  // This allows popups on page refresh since we're not setting the flag
  if (hasDonationBeenMade()) {
    console.log('Donation previously made, but allowing popup on refresh');
    // Don't return here to allow popup on refresh
  }
  
  // Skip if we're in a banking page or Plaid connection flow
  if (isBankingOrPlaidPage() || inPlaidConnectionFlow) {
    console.log('Donation popup prevented - banking page or Plaid connection in progress');
    return;
  }
  
  // Add aggressive quick check for banking elements before showing popup
  const bankingElements = document.querySelectorAll(
    'input[type="password"], ' +
    'form[id*="login"], ' +
    'div[class*="plaid"], ' +
    'iframe[src*="plaid"]'
  );
  
  if (bankingElements.length > 0) {
    console.log('Banking elements detected just before showing popup, aborting');
    return;
  }
  
  const { purchaseAmount, donationAmount } = event.detail;
  createDonationPopup(purchaseAmount, donationAmount);
});

// Reset donation state for current session
function resetDonationState() {
  donationMadeInCurrentSession = false;
  
  // Also clear the session storage for this specific checkout session
  try {
    const sessionKey = getCheckoutSessionKey();
    sessionStorage.removeItem(sessionKey);
    console.log('Donation state reset for current checkout session:', sessionKey);
  } catch (e) {
    console.log('Error resetting donation state:', e);
  }
}

// Make the popup appear faster by reducing polling intervals
window.addEventListener('load', () => {
  // Add an exception handler around initialization code
  try {
    // Reset the in-memory donation flag on each page load
    // This ensures each new page/cart gets its own donation opportunity
    resetDonationState();
    console.log('Reset donation state for new page/cart - popup will appear after refresh');
    
    // Check if there's an active popup from a previous page session
    const popupData = sessionStorage.getItem('oss-active-popup');
    if (popupData) {
      try {
        const data = JSON.parse(popupData);
        if (data && data.pendingInteraction) {
          console.log('Restoring active popup from previous session');
          // Wait a short time for page to fully initialize
          setTimeout(() => {
            createDonationPopup(data.purchaseAmount, data.donationAmount);
          }, 1000);
          return; // Skip other detection since we're restoring a popup
        }
      } catch (e) {
        console.log('Error parsing popup data:', e);
      }
    }
    
    // Immediately check for banking pages and exit early if detected
    if (isBankingOrPlaidPage()) {
      console.log('Banking page detected on load, skipping all donation detection');
      return;
    }
    
    // Initial checkout flow integration - run immediately
    integrateWithCheckoutFlow();
    detectPurchase();
    
    // Re-run integration with reduced intervals for faster detection
    const checkoutInterval = setInterval(() => {
      // Check if extension context is still valid before continuing
      if (!safeChromeCall(() => true)) {
        clearInterval(checkoutInterval);
        clearInterval(purchaseInterval);
        return;
      }
      
      // Skip if it's a banking page
      if (isBankingOrPlaidPage()) {
        return;
      }
      
      integrateWithCheckoutFlow();
    }, 2000); // Reduced from 5000ms to 2000ms
    
    // Fallback periodic check with reduced interval
    const purchaseInterval = setInterval(() => {
      // Check if extension context is still valid before continuing
      if (!safeChromeCall(() => true)) {
        clearInterval(checkoutInterval);
        clearInterval(purchaseInterval);
        return;
      }
      
      // Skip if it's a banking page
      if (isBankingOrPlaidPage()) {
        return;
      }
      
      detectPurchase();
    }, 3000); // Reduced from 10000ms to 3000ms
  } catch (error) {
    console.log('Error initializing checkout detection:', error);
  }
});

// Integrate with the page's checkout flow
function integrateWithCheckoutFlow() {
  const isCheckoutPage = detectCheckoutPage();
  
  if (!isCheckoutPage) {
    return; 
  }
  
  // Identify checkout forms
  const forms = document.querySelectorAll('form');
  const checkoutForms = Array.from(forms).filter(form => {
    const formId = form.id.toLowerCase();
    const formClass = form.className.toLowerCase();
    const formAction = (form.action || '').toLowerCase();
    
    return (
      formId.includes('checkout') || formId.includes('payment') ||
      formClass.includes('checkout') || formClass.includes('payment') ||
      formAction.includes('checkout') || formAction.includes('payment') ||
      form.querySelector('input[type="credit-card"], input[name*="card"], input[autocomplete="cc-number"]')
    );
  });
  
  // Find payment buttons
  const paymentButtonSelectors = [
    'button[type="submit"]', 
    'input[type="submit"]', 
    'button.checkout-button',
    'button.place-order',
    'button[id*="payment"]', 
    'button[id*="checkout"]',
    'button[id*="submit"]',
    'button.payment-button',
    '.payment-button',
    '#place-order',
    '#checkout-button',
    '.checkout-button'
  ];
  
  const paymentButtons = [];
  paymentButtonSelectors.forEach(selector => {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => paymentButtons.push(button));
  });
  
  // Filter payment buttons based on text content
  const filteredPaymentButtons = paymentButtons.filter(button => {
    const buttonText = (button.textContent || button.value || '').toLowerCase();
    return (
      buttonText.includes('pay') || 
      buttonText.includes('checkout') || 
      buttonText.includes('place order') || 
      buttonText.includes('buy') ||
      buttonText.includes('purchase') ||
      buttonText.includes('confirm')
    );
  });
  
  checkoutForms.forEach(form => {
    // Only attach if not already attached
    if (!form.dataset.ossListenerAttached) {
      form.dataset.ossListenerAttached = 'true';
      
      form.addEventListener('submit', function(event) {
        handleCheckoutAction(event);
      });
    }
  });
  
  filteredPaymentButtons.forEach(button => {
    // Only attach if not already attached
    if (!button.dataset.ossListenerAttached) {
      button.dataset.ossListenerAttached = 'true';
      
      button.addEventListener('click', function(event) {
        handleCheckoutAction(event, false);
      });
    }
  });
  
  // Look for payment processor iframes
  const paymentFrames = [
    'iframe[name*="stripe"]',
    'iframe[src*="stripe"]',
    'iframe[src*="paypal"]',
    'iframe[src*="checkout"]',
    'iframe[src*="payment"]'
  ];
  
  paymentFrames.forEach(selector => {
    const frames = document.querySelectorAll(selector);
    frames.forEach(frame => {
      if (!frame.dataset.ossListenerAttached) {
        frame.dataset.ossListenerAttached = 'true';
        
        frame.addEventListener('load', function() {
          handleCheckoutAction(null, false);
        });
      }
    });
  });
  
  // Monitor URL changes that might indicate checkout progression
  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      
      // If URL contains checkout or payment indicators
      if (/checkout|payment|order|purchase|confirm/i.test(location.href)) {
        setTimeout(() => {
          // Try to detect purchases after the page has loaded
          handleCheckoutAction(null, false);
        }, 1000);
      }
    }
  });
  
  urlObserver.observe(document, { subtree: true, childList: true });
}

// Handle checkout action (form submission or button click)
function handleCheckoutAction(event, preventDefault = true) {
  // Skip if a donation has already been made in this session AND we have the special flag set
  if (hasDonationBeenMade()) {
    console.log('Checkout action detected but showing popup on refresh');
    // Continue to show popup even if donation was made previously
  }

  chrome.storage.sync.get(['donationsEnabled'], (result) => {
    if (result.donationsEnabled) {
      // Extract the purchase amount from the page
      const purchaseAmount = extractPurchaseAmount();
      
      if (purchaseAmount) {
        // If we found a purchase amount, notify the background script
        chrome.runtime.sendMessage({
          type: 'PURCHASE_DETECTED',
          amount: purchaseAmount
        });
        
        if (preventDefault && event) {
          event.preventDefault();
          
          // Store the original submitter for later use
          const submitter = event.submitter;
          const form = event.target;
          
          // Store this info in session storage
          sessionStorage.setItem('oss-pending-checkout', JSON.stringify({
            timestamp: Date.now(),
            formId: form.id,
            formAction: form.action
          }));
          
            // After showing the popup, we'll proceed with form submission
          document.addEventListener('OSS_DONATION_HANDLED', function() {
            // Continue with form submission
            if (submitter) {
              submitter.click();
            } else {
              form.submit();
            }
          }, { once: true });
        }
      } else {
        // Fallback to a random amount if we couldn't extract one
        const fallbackAmount = parseFloat((Math.random() * 100).toFixed(2));
        
        chrome.runtime.sendMessage({
          type: 'PURCHASE_DETECTED',
          amount: fallbackAmount
        });
        
        // Similar handling for form submission
        if (preventDefault && event) {
          event.preventDefault();
          
          const submitter = event.submitter;
          const form = event.target;
          
          sessionStorage.setItem('oss-pending-checkout', JSON.stringify({
            timestamp: Date.now(),
            formId: form.id,
            formAction: form.action
          }));
          
          document.addEventListener('OSS_DONATION_HANDLED', function() {
            if (submitter) {
              submitter.click();
            } else {
              form.submit();
            }
          }, { once: true });
        }
      }
    }
  });
}

// Cleanup old session storage records to prevent them from persisting too long
function cleanupOldSessionRecords() {
  try {
    // Get current domain
    const currentDomain = window.location.hostname;
    const keysToRemove = [];
    
    // Get all keys in session storage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      
      // Process checkout session keys
      if (key && key.startsWith('checkout-session-')) {
        // If it's from a different domain, remove it 
        if (!key.includes(`-${currentDomain}-`)) {
          console.log('Cleaning up donation record from different domain:', key);
          keysToRemove.push(key);
        } else {
          console.log('Keeping donation record for current domain:', key);
        }
      }
      
      // Also handle active popup data for different domains
      if (key === 'oss-active-popup') {
        // Check if it belongs to this domain
        try {
          const popupData = JSON.parse(sessionStorage.getItem(key));
          // If we can't determine the domain, leave it alone
          if (popupData && popupData.domain && popupData.domain !== currentDomain) {
            console.log('Cleaning up popup data from different domain:', popupData.domain);
            keysToRemove.push(key);
          }
        } catch (e) {
          console.log('Error parsing popup data during cleanup:', e);
        }
      }
    }
    
    // Now remove all the identified keys
    keysToRemove.forEach(key => {
      sessionStorage.removeItem(key);
    });
    
    if (keysToRemove.length > 0) {
      console.log(`Cleaned up ${keysToRemove.length} session storage records from other domains`);
    }
  } catch (e) {
    console.log('Error cleaning up session storage:', e);
  }
}

// Run cleanup on page load
setTimeout(cleanupOldSessionRecords, 1000); 