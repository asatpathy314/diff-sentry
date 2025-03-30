# Open Source Support Chrome Extension

A Chrome extension that enables users to support open source projects through micro-donations based on their online purchases.

## Features

- Automatically detects online purchases using Plaid integration
- Prompts users to round up their purchase to the nearest dollar
- Allows users to choose specific open source projects to support or donate to random verified projects
- Tracks donation history and impact

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the ChromeExtension directory
5. The extension will now be installed and ready to use

## How It Works

1. The extension uses Plaid to detect when you're making an online purchase
2. A small popup appears asking if you want to round up to the nearest dollar
3. You can choose to donate to a specific open source project or let the system choose for you
4. The rounded-up amount is donated to the selected project

## Development

This extension is built using:

- HTML/CSS/JavaScript
- Chrome Extension APIs
- Plaid for financial transaction detection

To build the extension for production:

```
npm install
npm run build
```

## Privacy

The extension only accesses transaction data with your explicit permission through Plaid's secure API. No sensitive financial information is stored in the extension.

## License

MIT 