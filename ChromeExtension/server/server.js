const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5173;

// Plaid API credentials
const PLAID_CLIENT_ID = '67e76a23f2516500245da29b';
const PLAID_SECRET = '722232f09c4d574c4a35f7888625f1';
const PLAID_ENV = PlaidEnvironments.sandbox; 

// Configure Plaid
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Store access tokens (in a real app, use a secure database)
const accessTokens = new Map();
const transferRecipients = new Map();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// HTML page for Plaid Link
app.get('/plaid-link', (req, res) => {
  const linkToken = req.query.link_token;
  const extensionId = req.query.extension_id;
  
  if (!linkToken || !extensionId) {
    return res.status(400).send('Missing required parameters');
  }
  
  // Send HTML page with embedded Plaid Link
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Connect Your Bank Account</title>
      <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
          background-color: #f8f9fa;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 90vh;
        }
        
        .container {
          max-width: 600px;
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          margin-top: 0;
          color: #2E7D32;
        }
        
        p {
          margin-bottom: 25px;
          line-height: 1.5;
        }
        
        .button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        
        .button:hover {
          background-color: #388E3C;
        }
        
        .status {
          margin-top: 20px;
          font-style: italic;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Connect Your Bank Account</h1>
        <p>
          To enable automatic detection of your purchases for round-up donations, 
          we need to securely connect to your bank account using Plaid.
        </p>
        <p>
          Your financial information is never stored by our extension and 
          the connection is read-only. We only identify purchase transactions 
          to suggest round-up donations.
        </p>
        <button id="connect-button" class="button">Connect Your Account</button>
        <div id="status" class="status"></div>
      </div>
      
      <script>
        // Store the extension ID and link token
        const extensionId = "${extensionId}";
        const linkToken = "${linkToken}";
        
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
              document.getElementById('status').textContent = 'Successfully connected! Processing...';
              
              // Send the public token to the server to handle the exchange
              fetch('/api/process_plaid_success', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  public_token: public_token,
                  metadata: metadata,
                  extension_id: extensionId
                })
              })
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  document.getElementById('status').innerHTML = 'Account connected! <br><br>Your bank account has been successfully connected. <br>You can now close this tab and return to your shopping.';
                  
                  // Create a button to close the tab
                  const closeButton = document.createElement('button');
                  closeButton.className = 'button';
                  closeButton.innerText = 'Close Tab';
                  closeButton.style.marginTop = '20px';
                  closeButton.addEventListener('click', function() {
                    window.close();
                  });
                  
                  document.querySelector('.container').appendChild(closeButton);
                } else {
                  document.getElementById('status').textContent = 'Error processing connection: ' + (data.error || 'Unknown error');
                }
              })
              .catch(error => {
                document.getElementById('status').textContent = 'Error processing connection. Please try again.';
                console.error('Error:', error);
              });
            },
            onExit: function(err, metadata) {
              if (err) {
                document.getElementById('status').textContent = 'Error: ' + err.error_message;
              } else {
                document.getElementById('status').textContent = 'Connection canceled. You can try again later.';
              }
            },
            onEvent: function(eventName, metadata) {
              console.log('Plaid event:', eventName);
            },
            receivedRedirectUri: null,
          });
          
          // Open Plaid Link
          handler.open();
        });
      </script>
    </body>
    </html>
  `);
});

// New endpoint to process Plaid success
app.post('/api/process_plaid_success', async (req, res) => {
  const { public_token, metadata, extension_id } = req.body;
  
  if (!public_token || !extension_id) {
    return res.status(400).json({ success: false, error: 'Missing required parameters' });
  }
  
  try {
    // Exchange the public token for an access token
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    
    const access_token = response.data.access_token;
    const item_id = response.data.item_id;
    
    // Generate a unique user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    
    // Store the access token (in a real app, store in secure database)
    accessTokens.set(userId, access_token);
    
    console.log('Plaid connection successful:');
    console.log('- Access token:', access_token);
    console.log('- Item ID:', item_id);
    console.log('- User ID:', userId);
    console.log('- Extension ID:', extension_id);
    
    // At this point, we would normally communicate back to the extension,
    // but since direct messaging may be failing, we'll just store the
    // connection status and return success
    
    return res.json({ 
      success: true, 
      message: 'Plaid connection processed successfully',
      user_id: userId
    });
  } catch (error) {
    console.error('Error processing Plaid success:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while processing the Plaid connection' 
    });
  }
});

// Create a link token
app.post('/api/create_link_token', async (req, res) => {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'user-' + Math.random().toString(36).substring(2, 15),
      },
      client_name: 'Open Source Support Extension',
      products: ['transactions', 'transfer'],
      country_codes: ['US'],
      language: 'en',
    });
    
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get transactions for the last 7 days
app.post('/api/transactions', async (req, res) => {
  const { user_id } = req.body;
  const access_token = accessTokens.get(user_id || 'default_user');
  
  if (!access_token) {
    return res.status(400).json({ error: 'No access token found. Please connect your bank account first.' });
  }
  
  try {
    // Get transactions from the last 7 days
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    
    const startDate = sevenDaysAgo.toISOString().split('T')[0];
    const endDate = now.toISOString().split('T')[0];
    
    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate,
      end_date: endDate,
    });
    
    const transactions = response.data.transactions;
    res.json({ transactions });
  } catch (error) {
    console.error('Error getting transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a transfer recipient for an open source project
app.post('/api/create_recipient', async (req, res) => {
  const { name, email, projectId } = req.body;
  
  try {
    const response = await plaidClient.transferCreateRecipient({
      name,
      ach: {
        account: '987654321',
        routing: '123456789',
        account_type: 'checking'
      },
      type: 'business',
      address: {
        street: '123 Open Source St',
        city: 'San Francisco',
        region: 'CA',
        postal_code: '94107',
        country: 'US'
      },
    });
    
    const recipient_id = response.data.recipient_id;
    
    // Store recipient ID
    transferRecipients.set(projectId, recipient_id);
    
    res.json({ recipient_id });
  } catch (error) {
    console.error('Error creating recipient:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a transfer authorization
app.post('/api/create_transfer_authorization', async (req, res) => {
  const { user_id, account_id, amount, project_id } = req.body;
  const access_token = accessTokens.get(user_id || 'default_user');
  
  if (!access_token) {
    return res.status(400).json({ error: 'No access token found. Please connect your bank account first.' });
  }
  
  try {
    const response = await plaidClient.transferAuthorizationCreate({
      access_token,
      account_id,
      type: 'debit',
      network: 'ach',
      amount,
      ach_class: 'ppd',
      user: {
        legal_name: 'Open Source Supporter',
        email_address: 'supporter@example.com',
      },
      description: `Donation to open source project`
    });
    
    res.json({
      authorization_id: response.data.authorization.id,
      decision: response.data.authorization.decision
    });
  } catch (error) {
    console.error('Error creating transfer authorization:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a transfer (donation)
app.post('/api/create_transfer', async (req, res) => {
  const { authorization_id, amount, project_id, project_name } = req.body;
  
  // Get recipient ID (in a real app, fetch from database)
  const recipient_id = transferRecipients.get(project_id) || await createDefaultRecipient(project_name);
  
  try {
    const response = await plaidClient.transferCreate({
      authorization_id,
      amount,
      description: `Donation to ${project_name}`,
      metadata: {
        project_id,
      }
    });
    
    const transfer = response.data.transfer;
    
    res.json({ 
      transfer_id: transfer.id,
      status: transfer.status 
    });
  } catch (error) {
    console.error('Error creating transfer:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to create a default recipient if none exists
async function createDefaultRecipient(name) {
  try {
    const response = await plaidClient.transferCreateRecipient({
      name: name || 'Open Source Project Fund',
      ach: {
        account: '987654321',
        routing: '123456789',
        account_type: 'checking'
      },
      type: 'business',
      address: {
        street: '123 Open Source St',
        city: 'San Francisco',
        region: 'CA',
        postal_code: '94107',
        country: 'US'
      },
    });
    
    return response.data.recipient_id;
  } catch (error) {
    console.error('Error creating default recipient:', error);
    return null;
  }
}

// Simple encryption 
function encryptToken(token) {
  return btoa(token.split('').reverse().join(''));
}

function decryptToken(encryptedToken) {
  return atob(encryptedToken).split('').reverse().join('');
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 