# Module Documentation

This document describes all modules and features in the MPMKVVCL IT Asset Management System.

## Table of Contents

1. [Dashboard](#1-dashboard)
2. [Asset Management](#2-asset-management)
3. [Transfer & Gate Pass](#3-transfer--gate-pass)
4. [Buyback Module](#4-buyback-module)
5. [Activity Log](#5-activity-log)
6. [Document References](#6-document-references)
7. [Reports](#7-reports)
8. [Equipment Master](#8-equipment-master)
9. [User Management](#9-user-management)
10. [Dropdown Settings](#10-dropdown-settings)
11. [Hierarchy Manager](#11-hierarchy-manager)

---

## 1. Dashboard

**Access:** All users
**Path:** `/dashboard`

### Features

#### Statistics Cards
- **Total Assets:** Overall asset count
- **Within Warranty:** Assets with active warranty
- **Beyond Warranty:** Warranty expired assets
- **Expiring Soon:** Warranty expiring within 90 days
- **Under Repair:** Assets currently being repaired
- **Buyback Eligible:** Assets older than 5 years

#### Hierarchical Filters
Filter assets by organizational structure:
- Region
- Circle
- Division
- Sub-Division
- Distribution Center (DC)

#### Visual Analytics
- **Device Type Distribution:** Pie chart showing asset breakdown by device type
- **Regional Distribution:** Pie chart showing asset distribution across regions
- **Bar Chart:** Asset counts by category

#### Quick Actions
- View recent activities
- Navigate to asset list
- Access reports
- View warranty alerts

---

## 2. Asset Management

### 2.1 Asset List

**Access:** All users
**Path:** `/asset-list`

#### Features
- **Search & Filter:**
  - Text search (serial number, person name, office, model)
  - Filter by region, device type, status, warranty status
- **Asset Table Columns:**
  - Gate Pass Number
  - Device Type
  - Make & Model
  - Serial Number
  - Assigned To (Person & Designation)
  - Location (Division & Region)
  - Status
  - Warranty Status & Expiry Date
  - Book Value
  - Buyback Eligibility
  - Actions (View, Edit, Transfer)

#### Actions
- **View:** See complete asset details
- **Edit:** Modify asset information (Admin/Corporate Admin only)
- **Transfer:** Initiate asset transfer (Admin/Corporate Admin only)

### 2.2 Add/Edit Asset

**Access:** Master Admin, Corporate Admin
**Path:** `/add-asset`

#### Asset Information Fields

**Basic Information:**
- Device Type (dropdown)
- Make/Brand (filtered by device type)
- Model
- Serial Number
- Purchase Date
- Warranty End Date
- Book Value
- Invoice Number
- Purchase Order Number

**Location Details:**
- Region
- Circle
- Division
- Sub-Division
- Distribution Center
- Office Name
- Room Number

**Assignment Details:**
- Assigned To (Person Name)
- Designation
- Mobile Number

**Status:**
- Within Warranty Period
- Beyond Warranty Period
- Under Repair
- In Transit
- Disposed
- Lost/Stolen

#### Document References
Attach multiple document references:
- Document Type (PO, Invoice, Circular, etc.)
- Reference Number
- Date
- Notes

#### Validation
- Required fields validation
- Serial number uniqueness check
- Date validation (purchase date < warranty end)
- Mobile number format validation

### 2.3 Bulk Import

**Access:** Master Admin, Corporate Admin
**Path:** `/bulk-import`

#### Features
- CSV file upload
- Automatic field mapping
- Validation before import
- Error reporting for invalid records
- Bulk asset creation

#### CSV Format
Required columns:
- deviceCode, makeName, model, serialNo
- purchaseDate, warrantyEnd, bookValue
- region, circle, division, subdivision, dc
- assignedTo, designation, mobile
- status, invoiceNo, poNo

---

## 3. Transfer & Gate Pass

### 3.1 Transfer Asset

**Access:** Master Admin, Corporate Admin
**Path:** `/transfer`

#### Features
- Select asset from dropdown or from asset list
- Record transfer details:
  - **From Location:** Current location details
  - **To Location:** Destination details
  - **Transfer Information:**
    - Receiving person name, designation, mobile
    - Receiving office
    - Transfer reason
    - Authorized by (name, designation, office, mobile)
    - Transfer date
    - Place

#### Process Flow
1. Select asset to transfer
2. Fill in destination and receiving person details
3. Provide authorization details
4. Generate gate pass
5. Update asset location
6. Record in transfer history

### 3.2 Gate Pass List

**Access:** All users
**Path:** `/gate-pass-list`

#### Features
- View all gate passes (initial issues + transfers)
- **Columns:**
  - Gate Pass Number
  - Type (Initial Issue / Transfer)
  - Device & Serial Number
  - Issued To (Person & Office)
  - Date
  - Actions (View, Print)

#### Gate Pass Document
- Complete asset details
- From and To locations
- Receiving person information
- Authorization details
- Transfer date and place
- Signatures section

---

## 4. Buyback Module

**Access:** Master Admin, Corporate Admin
**Path:** `/buyback`

#### Eligibility Criteria
- Assets purchased 5+ years ago
- Automatic eligibility calculation

#### Buyback Value Calculation
- Formula: (Book Value × 10%) + 18% GST
- Example: ₹50,000 book value → ₹5,900 buyback value

#### Features
- List eligible assets
- Record buyback transactions
- Track buyback history
- Generate buyback reports

#### Buyback Record Fields
- Asset details
- Book value
- Calculated buyback value
- Buyback date
- Vendor/buyer information
- Notes

---

## 5. Activity Log

**Access:** All users
**Path:** `/history`

#### Features
- Complete audit trail of all actions
- **Tracked Actions:**
  - Asset created
  - Asset updated
  - Asset transferred
  - Status changed
  - User actions

#### Log Entry Format
- Timestamp (IST timezone)
- Asset ID
- Action type
- Action details
- Performed by (user)

#### Filtering
- Filter by asset ID
- Filter by action type
- Date range filtering
- User filtering

---

## 6. Document References

**Access:** All users
**Path:** `/documents`

#### Features
- Centralized document repository
- View all documents linked to assets
- **Document Types:**
  - Purchase Orders
  - Invoices
  - Government Circulars
  - Office Orders
  - Work Orders
  - Warranty Cards
  - AMC Agreements
  - Service Reports

#### Document Information
- Type
- Reference Number
- Date
- Related Asset
- Notes

---

## 7. Reports

**Access:** All users
**Path:** `/reports`

### Report Types

#### 7.1 Asset Summary Report
- Total assets by type
- Total book value
- Warranty status breakdown
- Regional distribution

#### 7.2 Warranty Expiry Report
- Assets expiring within selected timeframe
- Grouping by month
- Export to CSV

#### 7.3 Transfer Summary Report
- Total transfers by region
- Transfer frequency analysis
- Most transferred assets

#### 7.4 Custom Reports
- Filter by date range
- Filter by location
- Filter by device type
- Export options (CSV, Print)

---

## 8. Equipment Master

**Access:** Master Admin only
**Path:** `/equipment-master`

### 8.1 Device Type Management
- Add new device types
- Edit existing types
- Assign device codes
- Delete unused types

### 8.2 Make/Brand Management
- Add makes/brands
- Link to device types
- Edit make information
- Delete unused makes

#### Device Type - Make Relationship
- One-to-many relationship
- Each make belongs to one device type
- Example: "Dell" make belongs to "Laptop" device type

---

## 9. User Management

**Access:** Master Admin only
**Path:** `/user-management`

### Features

#### User Roles
1. **Master Admin (Level 1)**
   - Full system access
   - Configuration management
   - User management
   - All CRUD operations

2. **Corporate Admin (Level 2)**
   - Asset management
   - Transfer operations
   - Report generation
   - No user management

3. **Circle User (Level 3)**
   - View-only access
   - Limited to assigned circle
   - Reports for own circle

#### User Fields
- Login ID
- Password
- Full Name
- Employee Code
- Role/Access Level
- Circle Code (for Circle Users)
- Region Code
- Designation
- Mobile Number
- Status (Enabled/Disabled)

#### User Actions
- Add new user
- Edit user details
- Change password
- Enable/Disable account
- Assign role and permissions

---

## 10. Dropdown Settings

**Access:** Master Admin only
**Path:** `/dropdown-settings`

### Configurable Dropdowns

#### Status Options
- Add custom status values
- Edit existing status
- Delete unused status
- Reorder status options

#### Designations
- Manage designation list
- Add organizational roles
- Edit designation names
- Remove obsolete designations

#### Document Types
- Add document categories
- Edit document types
- Remove unused types

### Purpose
Allows organization-specific customization without code changes.

---

## 11. Hierarchy Manager

**Access:** Master Admin only
**Path:** `/hierarchy-manager`

### Features

#### Organizational Structure
Five-level hierarchy:
1. **Region** (e.g., Corporate Office, Bhopal Region, Gwalior Region)
2. **Circle** (e.g., HQ-Bhopal, Bhopal City Circle, Gwalior O&M Circle)
3. **Division** (e.g., IT Department, Bhopal Urban Division-1)
4. **Sub-Division** (e.g., SCADA Section, Arera Colony Sub-Division)
5. **DC** (Distribution Center, e.g., SCADA DC, Arera DC)

#### Management Operations
- **Add:** Create new hierarchy nodes at any level
- **Rename:** Update node names
- **Delete:** Remove unused nodes (with cascade warning)
- **View:** Collapsible tree view of hierarchy

#### Use Cases
- Organizational restructuring
- New office/circle setup
- Division mergers or splits
- DC additions

### Important Notes
- Changes affect asset categorization
- Existing asset locations are not automatically updated
- Hierarchical filters use this structure
- Reports group by hierarchy levels

---

## Module Dependencies

```
Dashboard
  ↓
Asset List ←→ Add/Edit Asset
  ↓
Transfer Asset → Gate Pass List
  ↓
Buyback Module
  ↓
Activity Log (tracks all above)
  ↓
Reports (analyzes all above)

Configuration Modules (Master Admin only):
- Equipment Master
- User Management
- Dropdown Settings
- Hierarchy Manager
```

## Common Features Across Modules

### Search & Filter
Most list views include:
- Text search
- Hierarchical filters
- Status filters
- Date range filters

### Export Capabilities
- CSV export
- Print-friendly views
- PDF generation (via browser print)

### Responsive Design
- Mobile-friendly interface
- Collapsible sidebars
- Adaptive layouts
- Touch-friendly controls

### Validation
- Required field checks
- Format validation
- Business rule validation
- Duplicate detection
