
![DiffSentry Logo](/DiffSentry/src/components/images/diffsentryvert.png)

# DiffSentry

DiffSentry is an open-source platform designed to support and secure the open source ecosystem through two core features: transaction rounding for donations and vulnerability scanning.

## Overview

DiffSentry creates a sustainable support system for open source projects by:
1. Providing completely free automated security scanning to identify vulnerabilities in repositories
2. Rounding up financial transactions and directing the difference to open source projects

## Features

### Getting Started with Diff Sentry's CI

Our number one goal with this project is to make integrating vulnerability scanning
into your pipeline as pain free as possible. Which is why you can add it to your repo in 
just three steps.

1. Create a `.github` folder at the root of your respository.
2. Create a `workflows` folder in the `.github` folder.
3. Copy the file in `CI/sentry.yml` into your `workflows` folder.

Now you're done, and on every PR or commit to main DiffSentry will run our entire
vulnerability detection engine on the changes.

### Vulnerability Scanning

Our CI security features include:
- Automated code scanning to detect common vulnerabilities
- Detailed reports highlighting security issues
- Prioritization of vulnerabilities based on severity
- Explanations of how vulnerabilities can be fixed
- Suggestions for remediation steps
- Integration with common development workflows

### Transaction Rounding & Donations

DiffSentry's Chrome Extension allows users to:
- Connect their payment accounts securely
- Round up transactions to the nearest dollar (or other unit)
- Direct the spare change to open source projects of their choice
- Track their contribution history and impact

This creates a sustainable funding model for critical open source projects that form the backbone of our world's digital infrastructure.

## Running the Frontend and API Locally

### Prerequisites
- Node.js (v22 or higher)
- Python 3.13.2 
- API keys for Gemini API

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

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Your app should now be running at `http://localhost:5173`.

```bash
cd ..
cd backend
```

Create a conda environment (or venv if you prefer).

```bash
conda create -n "diff-sentry" python=3.13.2
```

Set the environment variables.

```bash
export GEMINI_API_KEY=APIKEY
```

Start the development server.

```bash
fastapi dev app/main.py
```

## Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add your feature"`  
4. Push to the branch: `git push origin feature/your-feature-name`  
5. Submit a pull request  

## Roadmap

- [ ] Expanded payment gateway support (Stripe, PayPal, etc.)  
- [ ] Improved dashboard with visual analytics  
- [ ] Community ranking system for project impact  
- [ ] AI-assisted vulnerability triage  
- [ ] Adding more agents to the CI pipeline.
- [ ] Diffhunk support on PR comments.

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

## Acknowledgements
- Thanks to all open source maintainers and contributors whose work powers the internet.  
- Inspired by the vision of a more sustainable, secure, and community-driven software future.
