# AutomationExercise Cypress Tests

This repository contains Cypress end-to-end tests for http://automationexercise.com.

What is included
- Cypress configuration and example tests for: user registration, valid login, invalid login.
- Reusable selectors and custom commands in `cypress/support` for code reuse.
- GitHub Actions workflow to run tests and upload reports.

Quick start (locally)

1. Install dependencies:

```powershell
npm ci
```

2. Open Cypress GUI:

```powershell
npm run cypress:open
```

3. Run headless tests (generates mochawesome json report):

```powershell
npm run cypress:run:report
npm run report:merge
npm run report:generate
```

CI

The GitHub Actions workflow (`.github/workflows/ci.yml`) installs dependencies and runs:

- `npm run cypress:run:report`
- merges and generates an HTML report from mochawesome output
- uploads the `cypress/reports` folder as an artifact

Notes
- Selectors are centralized in `cypress/support/selectors.js` and logic lives in `cypress/support/commands.js`.
- The tests create test users using a random email to avoid collisions.
