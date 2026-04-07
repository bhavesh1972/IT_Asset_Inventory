# Data Structure Documentation

## Asset Object

```javascript
{
  id: "AST-2023-001",                    // Unique identifier
  gatePassNo: "1000000037",              // Gate pass number
  deviceCode: 19,                        // Device type code
  deviceName: "All In One PC",           // Device type name
  makeCode: 121,                         // Make/brand code
  makeName: "Acer",                      // Make/brand name
  model: "Veriton Z4680G",              // Model name
  serialNo: "UXVW6SI215312157FC0700",   // Serial number
  purchaseDate: "2023-04-12",           // ISO date string
  warrantyEnd: "2024-03-29",            // ISO date string
  bookValue: 45000,                     // Number (INR)
  invoiceNo: "INV-2023-0412-001",       // Invoice reference
  poNo: "PO-2023-ACER-0012",            // PO reference
  status: "Beyond Warranty Period",      // Status string
  region: "Corporate Office",            // Region name
  circle: "HQ-Bhopal",                  // Circle name
  division: "Finance Department",        // Division name
  subdivision: "Accounts Section",       // Sub-division name
  dc: "Accounts DC",                    // DC name
  office: "Finance Section",            // Office name
  assignedTo: "Narendra Chouhan",       // Person name
  designation: "Account Officer",        // Designation
  mobile: "6232913049",                 // Mobile number
  room: "13",                           // Room number
  transferCount: 0,                     // Number of transfers
  docReferences: [                      // Document references array
    {
      type: "Government Circular",
      refNo: "MD/MK/CGM(HR&A)/2659-2660",
      date: "2023-06-30",
      note: "IT Equipment Policy Circular"
    }
  ],
  createdAt: "2023-04-12T14:36:42",    // ISO timestamp
  createdBy: "Admin"                    // Username
}
```

## Transfer Object

```javascript
{
  id: "TRF-001",                        // Unique identifier
  assetId: "AST-2023-002",              // Reference to asset
  gatePassNo: "1000000041",             // Gate pass for transfer

  // From location
  fromRegion: "Corporate Office",
  fromCircle: "HQ-Bhopal",
  fromDivision: "Finance Department",
  fromSubdivision: "Accounts Section",
  fromDC: "Accounts DC",
  fromOffice: "Finance Section",
  fromPerson: "Old Employee",
  fromDesignation: "Assistant",

  // To location
  toRegion: "Corporate Office",
  toCircle: "HQ-Bhopal",
  toDivision: "IT Department",
  toSubdivision: "SCADA Section",
  toDC: "SCADA DC",
  toOffice: "SCADA Section, O/o MPCZ",
  toPerson: "Rameshwar Chaturvedi",
  toDesignation: "GM",
  toMobile: "9406913378",

  // Transfer metadata
  reason: "Departmental transfer",
  authorizedBy: "Siddharth Jain",
  authorizedDesignation: "Manager IT",
  authorizedOffice: "Corporate Office",
  authorizedMobile: "9876500000",
  transferDate: "2023-09-01",
  place: "Bhopal",
  createdBy: "Admin",
  createdAt: "2023-09-01T10:00:00"
}
```

## User Object

```javascript
{
  id: 1,                                // Unique identifier
  loginName: "Admin",                   // Display name
  loginId: "admin",                     // Login username
  password: "Pass@123",                 // Password (plaintext - needs hashing)
  fullName: "siddharth_jain",          // Full name
  role: "Master Admin",                 // Role name
  accessLevel: 1,                       // 1=Master, 2=Corporate, 3=Circle
  circleCode: 0,                        // Circle code (0 for admin)
  regionCode: 0,                        // Region code (0 for admin)
  status: "enabled",                    // enabled/disabled
  designation: "Manager IT",            // Designation
  mobile: "9876500000",                // Mobile number
  empCode: "SDHJAIN001"                // Employee code
}
```

## History Object

```javascript
{
  id: "H001",                           // Unique identifier
  assetId: "AST-2023-001",              // Reference to asset
  action: "Created",                     // Action type
  details: "Asset registered in system", // Action description
  performedBy: "Admin",                 // Username
  timestamp: "2023-04-12T14:36:42"     // ISO timestamp
}
```

## Buyback Object

```javascript
{
  id: "BB-001",                         // Unique identifier
  assetId: "AST-2019-004",              // Reference to asset
  bookValue: 25000,                     // Original book value
  buybackValue: 2950,                   // Calculated buyback value
  buybackDate: "2024-01-15",           // Date of buyback
  vendor: "Buyback Vendor Ltd",         // Vendor/buyer name
  notes: "Asset disposal",              // Additional notes
  createdBy: "Admin",
  createdAt: "2024-01-15T10:00:00"
}
```

## Device Type Object

```javascript
{
  code: 1,                              // Unique code
  name: "Desktop"                       // Device type name
}
```

## Make Object

```javascript
{
  code: 11,                             // Unique code
  name: "Acer",                         // Make/brand name
  deviceCode: 1                         // Reference to device type
}
```

## Hierarchy Structure

```javascript
{
  "Region Name": {
    "Circle Name": {
      "Division Name": {
        "Sub-Division Name": ["DC 1", "DC 2"]
      }
    }
  }
}
```

Example:
```javascript
{
  "Corporate Office": {
    "HQ-Bhopal": {
      "IT Department": {
        "SCADA Section": ["SCADA DC"],
        "Network Section": ["Network DC"]
      }
    }
  }
}
```
