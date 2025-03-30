
![DiffSentry Logo](/DiffSentry/src/components/images/diffsentryvert.png)

# DiffSentry

DiffSentry is an open-source platform designed to support and secure the open source ecosystem through two core features: transaction rounding for donations and vulnerability scanning.

## Overview

DiffSentry creates a sustainable support system for open source projects by:
1. Rounding up financial transactions and directing the difference to open source projects
2. Providing automated security scanning to identify vulnerabilities in repositories

## Features

### Transaction Rounding & Donations

DiffSentry allows users to:
- Connect their payment accounts securely
- Round up transactions to the nearest dollar (or other unit)
- Direct the spare change to open source projects of their choice
- Track their contribution history and impact
- Set monthly donation limits and preferences

This creates a sustainable funding model for critical open source projects that form the backbone of our digital infrastructure.

### Vulnerability Scanning

Our security features include:
- Automated code scanning to detect common vulnerabilities
- Regular scans of connected repositories
- Detailed reports highlighting security issues
- Prioritization of vulnerabilities based on severity
- Suggestions for remediation steps
- Integration with common development workflows

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for data storage)
- API keys for payment processing (if using transaction rounding feature)

### Installation

Clone the repository:
```bash
git clone https://github.com/your-username/DiffSentry.git
cd DiffSentry
```

Install dependencies:
```bash
npm install
# or
yarn install
```

Set up environment variables:  
Create a `.env` file in the root directory with the following values:
```ini
MONGO_URI=your_mongodb_connection_string
PAYMENT_API_KEY=your_payment_api_key
SCANNER_API_KEY=your_scanner_api_key
```

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Your app should now be running at `http://localhost:3000`.

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add your feature"`  
4. Push to the branch: `git push origin feature/your-feature-name`  
5. Submit a pull request  

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and adhere to our [Contribution Guidelines](CONTRIBUTING.md).

## Roadmap

- [ ] GitHub OAuth Integration  
- [ ] Expanded payment gateway support (Stripe, PayPal, etc.)  
- [ ] Improved dashboard with visual analytics  
- [ ] Community ranking system for project impact  
- [ ] AI-assisted vulnerability triage  
- [ ] Localization support  

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Thanks to all open source maintainers and contributors whose work powers the internet.  
- Inspired by the vision of a more sustainable, secure, and community-driven software future.
