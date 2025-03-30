# Setting Up Plaid Integration

This guide will help you set up the Plaid integration for the Open Source Support Chrome extension.

## Prerequisites

1. [Plaid Developer Account](https://dashboard.plaid.com/signup)
2. Node.js and npm installed

## Server Setup

1. Navigate to the server directory:
   ```
   cd ChromeExtension/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Get your Plaid API credentials:
   - Log in to the [Plaid Dashboard](https://dashboard.plaid.com/)
   - Go to the "Team Settings" > "Keys"
   - Copy your Client ID and Sandbox Secret

4. Update the server.js file with your Plaid credentials:
   ```javascript
   const PLAID_CLIENT_ID = 'YOUR_CLIENT_ID';
   const PLAID_SECRET = 'YOUR_SECRET';
   ```

5. Start the server:
   ```
   npm run dev
   ```

## Testing Plaid Integration

1. Load the Chrome extension in developer mode
2. Click on the extension icon to open the popup
3. Click "Connect Bank Account" in the settings
4. You'll be redirected to the Plaid Link page
5. Click "Connect Your Account"
6. In the Plaid sandbox environment, use the following credentials:
   - Username: `user_good`
   - Password: `pass_good`
   - Any random code for MFA questions

7. After successful connection, the extension will show "Connected" status

## Sandbox Testing Notes

1. In sandbox mode, Plaid provides test accounts that simulate real banking data
2. You can use the [Sandbox Dashboard](https://dashboard.plaid.com/sandbox/transactions) to create test transactions
3. For testing purchase detection, create transactions with the "pending" status
4. The extension will detect these transactions and show donation prompts

## Moving to Production

When you're ready to move to production:

1. Update the Plaid environment in server.js:
   ```javascript
   const PLAID_ENV = PlaidEnvironments.development; // or PlaidEnvironments.production
   ```

2. Update your Plaid API credentials to use development/production keys
3. Set up secure storage for access tokens (e.g., a database)
4. Implement proper user authentication
5. Set up webhooks to receive transaction updates instead of polling

## Troubleshooting

- Check the browser console for any errors
- Ensure the server is running on port 8000
- Verify your Plaid API credentials
- For transaction detection issues, check the Network tab to see if API requests are working 