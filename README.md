# MPMKVVCL IT Asset Management System v2.0

A full-stack IT Asset Management System with React frontend and Node.js + PostgreSQL backend.

## Project Structure

```
IT_Asset_Inventory/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── constants/    # Constants (theme, master data, hierarchy)
│   │   ├── utils/        # Utility functions
│   │   ├── services/     # API service layer
│   │   └── ...
│   ├── public/           # Static assets
│   └── package.json
│
├── backend/              # Express + Sequelize backend
│   ├── src/
│   │   ├── models/      # Sequelize models
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Business logic
│   │   └── config/      # Database config
│   ├── server.js        # Main server file
│   └── package.json
│
├── logs/                # Application logs
├── docs/                # Documentation
├── .env                 # Environment variables
├── ecosystem.config.js  # PM2 development config
└── ecosystem.production.config.js  # PM2 production config
```

## Tech Stack

### Frontend
- **React 19.2.4** - UI library
- **Vite 6** - Build tool
- **Moment.js** - Date/time handling with timezone support
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Sequelize** - ORM
- **PostgreSQL** - Database
- **PM2** - Process manager

## Prerequisites

- Node.js 18+
- PostgreSQL database
- PM2 (for process management)

## Installation

### 1. Install Dependencies

```bash
# Install all dependencies (root, frontend, backend)
npm run install:all
```

### 2. Configure Environment

Create/update `.env` file:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:REDACTED@DB_HOST_REDACTED:5432/wfms_devdb?sslmode=require
POSTGRES_USER=postgres
POSTGRES_PASSWORD=REDACTED
POSTGRES_PORT=5432
DB_SCHEMA=public
DB_SSL=true

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Development

### Start Both Frontend & Backend (with PM2)

```bash
npm run dev
```

This starts:
- Backend API on `http://localhost:3001`
- Frontend dev server on `http://localhost:5173`

### Start Frontend Only

```bash
npm run dev:frontend
```

### Start Backend Only

```bash
npm run dev:backend
```

### View Logs

```bash
npm run logs
```

### Stop All Processes

```bash
npm run stop
```

## Production Deployment

### Build Frontend

```bash
npm run build:frontend
```

This creates `frontend/dist/` folder.

### Start Production Server

```bash
npm run deploy:prod
```

This starts the backend in cluster mode with PM2, serving the built frontend.

## API Endpoints

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get single asset
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Transfers
- `GET /api/transfers` - Get all transfers
- `POST /api/transfers` - Create transfer

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user

### Device Types & Makes
- `GET /api/device-types` - Get device types
- `POST /api/device-types` - Create device type
- `GET /api/makes` - Get makes
- `POST /api/makes` - Create make

### History
- `GET /api/history` - Get activity history
- `POST /api/history` - Log activity

### Buybacks
- `GET /api/buybacks` - Get buybacks
- `POST /api/buybacks` - Create buyback

### Settings
- `GET /api/settings/:key` - Get setting by key
- `PUT /api/settings/:key` - Update setting

## Database Models

All models use UUIDs for primary keys:

- **Asset** - IT assets with all details
- **Transfer** - Asset transfer records
- **User** - System users with roles
- **History** - Activity audit log
- **Buyback** - Asset buyback records
- **DeviceType** - Device type master
- **Make** - Brand/make master
- **Settings** - System settings (JSONB)

## Default Login

**Master Admin:**
- Login ID: `admin`
- Password: `Pass@123`

**Corporate Admin:**
- Login ID: `ams_corporate`
- Password: `Pass@123`

## PM2 Commands

```bash
# List all processes
pm2 list

# Monitor processes
pm2 monit

# View logs
pm2 logs

# Restart specific app
pm2 restart it-asset-backend

# Stop all
pm2 stop all

# Delete all processes
pm2 delete all
```

## Documentation

- [User Guide](./frontend/docs/USER_GUIDE.md)
- [Module Documentation](./frontend/docs/MODULES.md)
- [Data Structure](./frontend/docs/DATA_STRUCTURE.md)

## License

Proprietary - MPMKVVCL Internal Use Only
