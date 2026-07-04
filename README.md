# Personal Website

This is my personal website, built with React using Create React App. It includes the source code for my portfolio/personal site and can be run locally for development or built for production deployment.

## Project Setup

To run this website locally, you need to have the following installed:

- Git
- Node.js
- npm

Node.js includes npm, so installing Node.js should also install npm.

## Cloning the Repository

Open PowerShell or a terminal and run:

```bash
git clone https://github.com/JacobMckenna/mywebsite.git
```

Then move into the project folder:

```bash
cd mywebsite
```

## Installing Dependencies

Before running the site, install the required project dependencies:

```bash
npm install
```

This downloads everything needed for the React app to run locally.

## Running the Website Locally

Start the development server with:

```bash
npm start
```

Then open the site in your browser at:

```text
http://localhost:3000
```

The page will automatically reload when changes are made to the code.

## Common Setup Issues on Windows

### `git` is not recognized

If you see an error like:

```text
git : The term 'git' is not recognized
```

Git is either not installed or is not available in your system PATH.

Install Git for Windows, then close and reopen PowerShell. After installation, confirm Git works by running:

```bash
git --version
```

### `npm` is not recognized

If you see an error like:

```text
npm : The term 'npm' is not recognized
```

Node.js/npm is either not installed or PowerShell has not refreshed after installation.

Install the Node.js LTS version, then close and reopen PowerShell. Confirm Node and npm are installed by running:

```bash
node -v
npm -v
```

### PowerShell blocks `npm.ps1`

If you see an error like:

```text
npm.ps1 cannot be loaded because running scripts is disabled on this system
```

PowerShell is blocking npm scripts because of the execution policy.

Run this command in PowerShell:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

When prompted, type:

```text
Y
```

Then close and reopen PowerShell.

As a temporary workaround, you can also run npm using:

```bash
npm.cmd install
npm.cmd start
```

## Available Scripts

In the project directory, you can run the following commands.

### `npm install`

Installs all dependencies needed for the project.

### `npm start`

Runs the website in development mode.

Open:

```text
http://localhost:3000
```

to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the website for production in the `build` folder.

This creates an optimized version of the site that can be deployed.

### `npm run eject`

This command exposes the full Create React App configuration.

This is a one-way operation and usually should not be used unless full control over the build setup is needed.

## Deployment

This website is configured for automatic GitHub deployment.

Changes pushed or merged into the main deployment branch are handled through the workflows and Firebase configuration files included in the project.

## Technologies Used

- React
- Create React App
- JavaScript
- HTML/CSS
- Firebase/GitHub deployment workflow

## Notes

This README is focused on setting up, running, and deploying the personal website locally and through the existing deployment workflow.
