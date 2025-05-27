# Nutrient Custom Scrollbar

A React application featuring custom scrollbar components for PDF viewing, built with Vite and integrating Nutrient Web SDK.

## Tech Stack

- **React 19.1.0** - Modern React with latest features
- **Vite 6.3.5** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Nutrient Web SDK** - PDF processing and viewing (loaded via CDN) [getting-started guides for other Web frameworks](https://www.nutrient.io/sdk/web/getting-started/)
- **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

This is a Vite + React TypeScript project with custom scrollbar functionality for PDF documents. The project uses modern React 19 features, integrates Nutrient Web SDK for PDF processing, and is configured with ESLint for code quality.

## Dependencies

### Runtime Dependencies
- Nutrient Web SDK v1.3.0 (loaded via CDN from `https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.3.0/nutrient-viewer.js`)

### Development Dependencies
All other dependencies are managed through npm and listed in `package.json`.

## Development Notes

- Uses ES modules (type: "module")
- Configured with React refresh for hot reloading
- TypeScript support included
- ESLint configured with React hooks and refresh plugins
- Nutrient Web SDK (v1.3.0) loaded via CDN for PDF functionality
- Custom scrollbar implementation for enhanced PDF viewing experience
