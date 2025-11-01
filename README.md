# AutomationExercise Cypress Tests

This repository contains Cypress end-to-end tests for http://automationexercise.com.

Quick start (locally)

1. Install dependencies:

```bash
npm ci
```

2. Open Cypress GUI (interactive):

```bash
npm run cypress:open
```

3. Run headless tests with reporter (CI-friendly):

```bash
# runs headless on Chrome and generates HTML report in cypress/reports
npm run cypress:run:report
```

CI

The GitHub Actions workflow (`.github/workflows/ci.yml`) does the following:
- installs dependencies with `npm ci`
- runs `npm run cypress:run:report` (headless Chrome, reporter configured)
- uploads the `cypress/reports` folder as an artifact so you can download it from the workflow run
- attempts to publish the HTML report to GitHub Pages (gh-pages) so you can view it in-browser

Where to find things
- Tests: `cypress/e2e` (spec files)
- Modules / page objects: `cypress/modules` (e.g. `register`, `login`)
- Cypress config: `cypress.config.js`
- CI workflow: `.github/workflows/ci.yml`
