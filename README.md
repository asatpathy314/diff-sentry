# DiffSentry

DiffSentry is an open-source platform designed to support and secure the open source ecosystem through two core features: transaction rounding for donations and vulnerability scanning..

## Roadmap

We built this as a hackathon project, but we're not just going to leave it on the side of the road. This is our roadmap over the next few months

- [ ] Remove Plaid integration (they take a pretty sizable cut) and link directly to open-source GitHub donation links.
- [ ] Add more configuration for the Google Chrome extension.
- [ ] Make backend truly multi-agentic (ideally for free, we'll see how we can do that). 
- [ ] Add PromptGuard for the backend. This is a stateless, open-source backend, so there isn't much prompt injection can do to affect us. However, threat actors could engineer their PRs in such a way that they avoid detection, so let's see how to defend agains that.
- [ ] Diffhunk support on PR comments.

## Overview
DiffSentry creates a sustainable support system for open source projects by:
1. Providing completely free automated security scanning to identify vulnerabilities in repositories
2. Rounding up financial transactions and directing the difference to open source projects

## Features

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

## Self-Hosting

We've chosen to host our backend on Heroku and host our frontend on Cloudflare. We have a simple deploy script you can follow in the `DiffSentry` folder for the frontend as long as you install Cloudflare's `wrangler` CLI. 

For the backend it gets a little more involved, and to be honest I would reccomend separating them out into separate repos and then using the `Procfile` attached for deployment.

## Contributing

We welcome contributions! Whether it's a typo or a major issue, we'd love for you to contribute your work.

1. Fork the repository  
2. Create a new branch: `git checkout -b feature/your-feature-name`  
3. Commit your changes: `git commit -m "Add your feature"`  
4. Push to the branch: `git push origin feature/your-feature-name`  
5. Submit a pull request  

## License

This project is licensed under the [GPL-3.0 License](LICENSE).

## Acknowledgements
- Thanks to all open source maintainers and contributors whose work powers the internet.  
- Inspired by the vision of a more sustainable, secure, and community-driven software future.