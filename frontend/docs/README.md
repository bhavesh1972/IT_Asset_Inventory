# MPMKVVCL IT Asset Management System - Documentation

## Overview

The MPMKVVCL IT Asset Management System is a comprehensive web-based application for tracking and managing IT assets across the organization. Built with React 19 and Vite, it provides a complete solution for asset lifecycle management, from procurement to disposal.

**Version:** 2.0
**Policy Reference:** MD/MK/CGM(HR&A)/2659-2660 dated: 30-06-2023

## Key Features

### 1. **Asset Management**
- Register and track IT equipment (desktops, laptops, printers, servers, etc.)
- Record detailed asset information (serial numbers, models, specifications)
- Track warranty status and expiry dates
- Manage asset lifecycle from purchase to disposal

### 2. **Transfer Management**
- Generate digital gate passes for asset transfers
- Track asset movement between locations and departments
- Maintain complete transfer history
- Record authorized personnel for each transfer

### 3. **User Roles & Permissions**
- **Master Admin:** Full system access, configuration management
- **Corporate Admin:** Asset management and reporting
- **Circle User:** View-only access for their circle

### 4. **Hierarchy Management**
- Multi-level organizational structure (Region → Circle → Division → Subdivision → DC)
- Customizable hierarchy configuration
- Hierarchical asset filtering and reporting

### 5. **Reporting & Analytics**
- Real-time dashboard with key metrics
- Asset distribution by type, location, and status
- Warranty expiry tracking and alerts
- Buyback eligibility reporting
- Export capabilities for reports

### 6. **Document Management**
- Link policy circulars, purchase orders, and invoices to assets
- Maintain digital records of all asset-related documents
- Reference government circulars and office orders

## Technology Stack

- **Frontend:** React 19.2.4
- **Build Tool:** Vite 6
- **UI Components:** Custom components with inline styles
- **Icons:** Lucide React
- **Charts:** Recharts
- **Date Handling:** Moment.js with timezone support (IST)
- **Deployment:** GitHub Pages

## Data Storage

**Current:** In-memory state management (data persists only during session)

**Recommended Migration:**
- Frontend database using **SQL.js** or **PouchDB**
- LocalStorage for persistence
- IndexedDB for larger datasets
- Future: Backend API with PostgreSQL/MySQL

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Default Login Credentials

### Master Admin
- **Login ID:** `admin`
- **Password:** `Pass@123`

### Corporate Admin
- **Login ID:** `ams_corporate`
- **Password:** `Pass@123`

### Circle Users
Multiple circle user accounts are pre-configured for different regions and circles.

## Project Structure

```
IT_Asset_Inventory/
├── src/
│   ├── constants/           # Application constants
│   │   ├── theme.js        # Theme colors and design tokens
│   │   ├── masterData.js   # Device types, makes, users
│   │   ├── hierarchy.js    # Organizational structure
│   │   ├── initialData.js  # Sample data
│   │   └── index.js        # Barrel export
│   ├── utils/              # Utility functions
│   │   ├── dateUtils.js    # Date formatting (moment.js)
│   │   ├── warrantyUtils.js # Warranty calculations
│   │   ├── assetUtils.js   # Asset utilities
│   │   ├── csvUtils.js     # CSV import/export
│   │   ├── permissionUtils.js # User permissions
│   │   └── index.js        # Barrel export
│   ├── ITAssetManagement.jsx # Main application component
│   ├── index.jsx           # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Documentation Index

1. [User Guide](./USER_GUIDE.md) - How to use the system
2. [Module Documentation](./MODULES.md) - Detailed module descriptions
3. [Data Structure](./DATA_STRUCTURE.md) - Database schema and data models
4. [API Documentation](./API.md) - Future API endpoints (for backend integration)
5. [Database Migration Guide](./DATABASE_MIGRATION.md) - How to add persistent storage

## Support & Maintenance

For issues, feature requests, or contributions:
- GitHub Repository: https://github.com/bhavesh1972/IT_Asset_Inventory
- Report issues: https://github.com/bhavesh1972/IT_Asset_Inventory/issues

## License

Proprietary - MPMKVVCL Internal Use Only
