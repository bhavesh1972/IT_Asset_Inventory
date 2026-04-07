# MPMKVVCL IT Asset Management System

A modern IT Asset Management system built with React 19 and Vite for fast development and optimized production builds.

## Features

- Track IT assets including computers, laptops, printers, and more
- Manage asset assignments, warranties, and transfers
- Visualize asset data with interactive charts
- Document management with policy circular references
- Advanced filtering and search capabilities

## Tech Stack

- **React 19.2.4** - Modern React with latest features
- **Vite 6** - Lightning-fast build tool and dev server
- **Recharts** - Interactive data visualization
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

## Available Scripts

### `npm run dev` or `npm start`

Runs the app in development mode with Vite's fast HMR (Hot Module Replacement).\
Open [http://localhost:3000/IT_Asset_Inventory/](http://localhost:3000/IT_Asset_Inventory/) to view it in your browser.

The page updates instantly when you make changes.\
Vite starts in ~500ms compared to 30+ seconds with traditional tools.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Locally preview the production build before deploying.\
Runs a local server to test the built application.

### `npm test`

Launches the test runner (Vitest) in watch mode.\
Tests run instantly with Vite's fast transformation.

### `npm run deploy`

Builds and deploys the app to GitHub Pages.\
Automatically runs `npm run build` and pushes to the `gh-pages` branch.

## Deployment

This project is configured to deploy to GitHub Pages at:
https://bhavesh1972.github.io/IT_Asset_Inventory

To deploy:
```bash
npm run deploy
```

## Project Structure

```
IT_Asset_Inventory/
├── src/
│   ├── ITAssetManagement.jsx  # Main application component
│   ├── index.jsx               # Application entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── vite.config.js             # Vite configuration
└── package.json
```

## Learn More

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Recharts Documentation](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
