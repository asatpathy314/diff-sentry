
# Transaction Rounding & Donations

This document provides detailed information about DiffSentry's transaction rounding feature.

## How It Works

DiffSentry connects to your payment accounts and monitors transactions. When a purchase is made, the amount is rounded up to the nearest dollar (or your selected unit), and the difference is set aside for donation.

### Example

If you make a purchase of $3.45:
- The transaction is rounded up to $4.00
- The difference of $0.55 is collected for donation
- At the end of your specified period, these collected funds are donated to your selected open source projects

## Setting Up Transaction Rounding

### Connecting Payment Methods

DiffSentry supports connecting various payment methods:
- Credit/debit cards
- Bank accounts
- Digital wallets (PayPal, Venmo, etc.)

We use industry-standard encryption and never store your full payment details.

### Selecting Beneficiary Projects

You can choose from our curated list of open source projects or suggest new ones for inclusion. Projects are categorized by:
- Technology area (web frameworks, databases, etc.)
- Project size and reach
- Funding needs

### Configuring Donation Preferences

Customize your donation settings:
- Maximum monthly donation amount
- Rounding precision (nearest dollar, nearest 50¢, etc.)
- Donation frequency (weekly, monthly)
- Distribution across multiple projects

## Tracking Your Impact

The DiffSentry dashboard provides:
- Total donation amount to date
- Breakdown of donations by project
- Impact metrics based on project reports
- Tax-deductible donation receipts

## Security and Privacy

Your financial data security is our top priority:
- All payment integrations use bank-level encryption
- We maintain PCI DSS compliance
- Payment details are never stored on our servers
- We use tokenization for all transaction processing

## Frequently Asked Questions

**Q: Is there a minimum donation amount?**
A: No minimum is required, but transaction fees make small donations less efficient.

**Q: Can I change my supported projects?**
A: Yes, you can update your project selections at any time.

**Q: Is there a fee for using DiffSentry?**
A: We retain a small percentage (5%) to cover operating costs, with 95% going directly to projects.

**Q: Are donations tax-deductible?**
A: In most cases, yes. We provide receipts for all donations.