// ============================================================
// MPMKVVCL — IT Asset Management System v2.0
// Policy: MD/MK/CGM(HR&A)/2659-2660 dated: 30-06-2023
// ============================================================

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  Monitor, Laptop, Printer, Server, Package, Search, Plus, Upload,
  ArrowRightLeft, FileText, History, BarChart2, LogOut, ChevronDown,
  ChevronRight, Filter, Download, Eye, Edit, Trash2, AlertTriangle,
  CheckCircle, Clock, X, RefreshCw, Calendar, Shield, Layers, Database,
  TrendingUp, Users, ChevronLeft, FileCheck, AlertCircle, Menu,
  Printer as PrintIcon, Settings, Key, Lock, UserPlus, Tag, Cpu,
  DollarSign, BookOpen, Bell, Save, RotateCcw, Info, Star, Building
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

// ============================================================
// THEME
// ============================================================
const T = {
  sidebar: "#1e1b4b", sidebarHover: "#312e81", sidebarActive: "#4c1d95",
  primary: "#7c3aed", primaryHover: "#6d28d9", primaryLight: "#ede9fe",
  primaryLighter: "#f5f3ff", accent: "#a855f7",
  success: "#10b981", successLight: "#d1fae5",
  warning: "#f59e0b", warningLight: "#fef3c7",
  danger: "#ef4444", dangerLight: "#fee2e2",
  info: "#3b82f6", infoLight: "#dbeafe",
  bg: "#f8fafc", card: "#ffffff", border: "#e2e8f0",
  text: "#1e293b", textMid: "#475569", textLight: "#94a3b8",
  orange: "#f97316", orangeLight: "#ffedd5",
};

// ============================================================
// POLICY CIRCULAR
// ============================================================
const POLICY_CIRCULAR = "MD/MK/CGM(HR&A)/2659-2660 dated: 30-06-2023";

// ============================================================
// INITIAL MASTER DATA (from Excel)
// ============================================================
const INITIAL_DEVICE_TYPES = [
  { code: 1, name: "Desktop" }, { code: 2, name: "Printer" },
  { code: 3, name: "UPS" }, { code: 4, name: "Laptop" },
  { code: 5, name: "Scanner" }, { code: 6, name: "LED TV" },
  { code: 7, name: "Mobile Phone" }, { code: 8, name: "Finger Biometric" },
  { code: 9, name: "IRIS" }, { code: 10, name: "Multifunction Printer" },
  { code: 11, name: "A3 Multifunction Printer" }, { code: 12, name: "Monitor" },
  { code: 13, name: "CPU" }, { code: 14, name: "Keyboard" },
  { code: 15, name: "Mouse" }, { code: 16, name: "LPRF Module" },
  { code: 17, name: "Telephones" }, { code: 18, name: "Dongle" },
  { code: 19, name: "All In One PC" }, { code: 20, name: "PoS Machine" },
  { code: 22, name: "Tablet" }, { code: 23, name: "Dot Matrix Printer" },
  { code: 24, name: "Assembled CPU" }, { code: 25, name: "Switch" },
  { code: 26, name: "Router" }, { code: 27, name: "QR Code Printer" },
];

const INITIAL_MAKES = [
  { code: 11, name: "Acer", deviceCode: 1 }, { code: 12, name: "Dell", deviceCode: 1 },
  { code: 13, name: "HCL", deviceCode: 1 }, { code: 14, name: "Assembled", deviceCode: 1 },
  { code: 21, name: "Samsung", deviceCode: 2 }, { code: 22, name: "HP", deviceCode: 2 },
  { code: 23, name: "Canon", deviceCode: 2 }, { code: 24, name: "Ricoh", deviceCode: 2 },
  { code: 25, name: "Brother", deviceCode: 2 }, { code: 26, name: "Epson", deviceCode: 2 },
  { code: 31, name: "BPE", deviceCode: 3 }, { code: 32, name: "Intex", deviceCode: 3 },
  { code: 33, name: "Uniline", deviceCode: 3 }, { code: 34, name: "Emerson", deviceCode: 3 },
  { code: 35, name: "Arrow", deviceCode: 3 }, { code: 36, name: "Luminous", deviceCode: 3 },
  { code: 37, name: "Cyber Power", deviceCode: 3 }, { code: 38, name: "ZEBION", deviceCode: 3 },
  { code: 41, name: "Acer", deviceCode: 4 }, { code: 42, name: "HP", deviceCode: 4 },
  { code: 43, name: "Lenovo", deviceCode: 4 }, { code: 44, name: "Dell", deviceCode: 4 },
  { code: 51, name: "Canon", deviceCode: 5 }, { code: 52, name: "Epson", deviceCode: 5 },
  { code: 61, name: "Samsung", deviceCode: 6 }, { code: 62, name: "Sony", deviceCode: 6 },
  { code: 63, name: "LG", deviceCode: 6 }, { code: 64, name: "Videocon", deviceCode: 6 },
  { code: 71, name: "Intex", deviceCode: 7 }, { code: 81, name: "Mantra", deviceCode: 8 },
  { code: 91, name: "Irishield", deviceCode: 9 },
  { code: 101, name: "Samsung", deviceCode: 10 }, { code: 102, name: "Canon", deviceCode: 10 },
  { code: 103, name: "HP", deviceCode: 10 }, { code: 104, name: "Brother", deviceCode: 10 },
  { code: 111, name: "HP", deviceCode: 11 }, { code: 112, name: "Samsung", deviceCode: 11 },
  { code: 113, name: "Brother", deviceCode: 11 }, { code: 114, name: "Canon", deviceCode: 11 },
  { code: 121, name: "Acer", deviceCode: 12 }, { code: 122, name: "HP", deviceCode: 12 },
  { code: 123, name: "Dell", deviceCode: 12 }, { code: 124, name: "Compaq", deviceCode: 12 },
  { code: 125, name: "Lenovo", deviceCode: 12 }, { code: 126, name: "HCL", deviceCode: 12 },
  { code: 127, name: "LG", deviceCode: 12 },
  { code: 131, name: "Dell", deviceCode: 13 }, { code: 132, name: "HP", deviceCode: 13 },
  { code: 133, name: "HCL", deviceCode: 13 }, { code: 134, name: "Assembled", deviceCode: 13 },
  { code: 135, name: "Lenovo", deviceCode: 13 }, { code: 136, name: "LG", deviceCode: 13 },
  { code: 137, name: "Acer", deviceCode: 13 },
  { code: 141, name: "HP", deviceCode: 14 }, { code: 142, name: "Acer", deviceCode: 14 },
  { code: 143, name: "Logitech", deviceCode: 14 }, { code: 144, name: "Dell", deviceCode: 14 },
  { code: 151, name: "HP", deviceCode: 15 }, { code: 152, name: "Acer", deviceCode: 15 },
  { code: 153, name: "Logitech", deviceCode: 15 }, { code: 154, name: "Dell", deviceCode: 15 },
  { code: 161, name: "DRMZ", deviceCode: 16 },
  { code: 171, name: "Binatone", deviceCode: 17 }, { code: 172, name: "Euroset", deviceCode: 17 },
  { code: 181, name: "D-Link", deviceCode: 18 },
  { code: 191, name: "Lenovo", deviceCode: 19 },
  { code: 244, name: "Acer", deviceCode: 19 },
  { code: 201, name: "Mosambee", deviceCode: 20 },
  { code: 221, name: "Lenovo", deviceCode: 22 },
  { code: 231, name: "EPSON", deviceCode: 23 },
  { code: 241, name: "ZEBION", deviceCode: 24 },
  { code: 242, name: "Cisco", deviceCode: 25 },
  { code: 243, name: "Cisco", deviceCode: 26 },
  { code: 245, name: "Udyama", deviceCode: 27 },
  { code: 246, name: "Apple", deviceCode: 7 },
  { code: 247, name: "Samsung", deviceCode: 7 },
  { code: 248, name: "Microsoft", deviceCode: 22 },
  { code: 249, name: "ELNOVA", deviceCode: 3 },
];

// ============================================================
// USER ROLES & INITIAL USERS (from Excel Login sheet)
// ============================================================
// access_level_code: 1=Master Admin, 2=Corporate Admin, 3=Circle User
const INITIAL_USERS = [
  { id: 1, loginName: "Admin", loginId: "admin", password: "Pass@123", fullName: "Siddharth Jain", role: "Master Admin", accessLevel: 1, circleCode: 0, regionCode: 0, status: "enabled", designation: "Manager IT", mobile: "9876500000", empCode: "SDHJAIN001" },
  { id: 2, loginName: "Corporate", loginId: "ams_corporate", password: "Pass@123", fullName: "Corporate Admin", role: "Corporate Admin", accessLevel: 2, circleCode: 0, regionCode: 0, status: "enabled", designation: "Account Officer", mobile: "9876500001", empCode: "CORP001" },
  { id: 3, loginName: "GM-O&M Bhopal", loginId: "gm_o&m_bhopal", password: "Pass@123", fullName: "GM-O&M Bhopal", role: "Circle User", accessLevel: 3, circleCode: 201, regionCode: 2, status: "enabled", designation: "General Manager", mobile: "6232913600", empCode: "93421418" },
  { id: 4, loginName: "GM-O&M Vidisha", loginId: "gm_o&m_vidisha", password: "Pass@123", fullName: "GM-O&M Vidisha", role: "Circle User", accessLevel: 3, circleCode: 207, regionCode: 2, status: "enabled", designation: "General Manager", mobile: "6232913800", empCode: "92386266" },
  { id: 5, loginName: "GM-City Bhopal", loginId: "gm_city_bhopal", password: "Pass@123", fullName: "GM-City Circle Bhopal", role: "Circle User", accessLevel: 3, circleCode: 203, regionCode: 2, status: "enabled", designation: "General Manager", mobile: "6232913400", empCode: "93326096" },
];

// ============================================================
// HIERARCHY
// ============================================================
const HIERARCHY = {
  "Corporate Office": {
    "HQ-Bhopal": {
      "IT Department": { "SCADA Section": ["SCADA DC"], "Network Section": ["Network DC"] },
      "Finance Department": { "Accounts Section": ["Accounts DC"], "Budget Section": ["Budget DC"] },
      "HR Department": { "Establishment": ["Estb. DC"] },
      "MD Office": { "MD Secretariat": ["MD DC"] },
    }
  },
  "Bhopal Region": {
    "Bhopal City Circle": {
      "Bhopal Urban Division-1": {
        "Arera Colony Sub-Division": ["Arera DC", "MP Nagar DC"],
        "Berasia Road Sub-Division": ["Berasia DC"],
        "Shyamla Hills Sub-Division": ["Shyamla DC"],
      },
      "Bhopal Urban Division-2": {
        "Habibganj Sub-Division": ["Habibganj DC", "New Market DC"],
        "Kolar Sub-Division": ["Kolar DC"],
      },
    },
    "Bhopal O&M Circle": {
      "Vidisha Division": { "Vidisha Sub-Division": ["Vidisha DC"], "Ganj Basoda Sub-Division": ["Ganj Basoda DC"] },
      "Rajgarh Division": { "Rajgarh Sub-Division": ["Rajgarh DC"] },
      "Narmadapuram Division": { "Narmadapuram Sub-Division": ["Narmadapuram DC"] },
      "Sehore Division": { "Sehore Sub-Division": ["Sehore DC"], "Ashta Sub-Division": ["Ashta DC"] },
      "Raisen Division": { "Raisen Sub-Division": ["Raisen DC"] },
      "Betul Division": { "Betul Sub-Division": ["Betul DC"] },
      "Harda Division": { "Harda Sub-Division": ["Harda DC"] },
    },
  },
  "Gwalior Region": {
    "Gwalior City Circle": {
      "Gwalior Urban Division": { "Lashkar Sub-Division": ["Lashkar DC"], "Morar Sub-Division": ["Morar DC"] },
    },
    "Gwalior O&M Circle": {
      "Gwalior Rural Division": { "Gwalior Rural Sub-Division": ["Gwalior Rural DC"] },
      "Bhind Division": { "Bhind Sub-Division": ["Bhind DC"] },
      "Morena Division": { "Morena Sub-Division": ["Morena DC"] },
      "Guna Division": { "Guna Sub-Division": ["Guna DC"] },
      "Sheopur Division": { "Sheopur Sub-Division": ["Sheopur DC"] },
      "Shivpuri Division": { "Shivpuri Sub-Division": ["Shivpuri DC"] },
      "Datia Division": { "Datia Sub-Division": ["Datia DC"] },
    },
  },
};

// Module-level mutable hierarchy — updated by HierarchyManager
let _H = JSON.parse(JSON.stringify(HIERARCHY));
const syncHierarchy = (h) => { _H = JSON.parse(JSON.stringify(h)); };

const ALL_REGIONS = () => Object.keys(_H);
const getCircles = (r) => r ? Object.keys(_H[r] || {}) : [];
const getDivisions = (r, c) => r && c ? Object.keys((_H[r] || {})[c] || {}) : [];
const getSubdivisions = (r, c, d) => r && c && d ? Object.keys(((_H[r] || {})[c] || {})[d] || {}) : [];
const getDCs = (r, c, d, s) => r && c && d && s ? (((_H[r] || {})[c] || {})[d] || {})[s] || [] : [];

// ============================================================
// STATUS VALUES (updated per requirement)
// ============================================================
const STATUS_OPTIONS = ["Within Warranty Period", "Beyond Warranty Period", "Under Repair", "In Transit", "Disposed", "Lost/Stolen"];

const DESIGNATIONS = [
  "CMD", "MD", "CGM", "GM", "DGM", "Chief Engineer", "Superintending Engineer",
  "Executive Engineer", "Assistant Engineer", "Junior Engineer",
  "Account Officer", "Senior Account Officer", "Manager IT", "Computer Operator",
  "MIS Executive", "Junior Engineer IT", "Superintendent", "Assistant Superintendent",
  "Steno", "Assistant", "Other"
];

const DOC_TYPES = ["Purchase Order", "Invoice", "Government Circular", "Office Order", "Work Order", "Warranty Card", "AMC Agreement", "Service Report", "Other"];

// ============================================================
// UTILITIES
// ============================================================
const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "-";
const formatDateTime = (d) => d ? new Date(d).toLocaleString("en-IN") : "-";
const isWarrantyExpired = (date) => date && new Date(date) < new Date();
const isWarrantyExpiringSoon = (date) => { if (!date) return false; const diff = (new Date(date) - new Date()) / 86400000; return diff > 0 && diff <= 90; };
const getWarrantyStatus = (date) => {
  if (!date) return { label: "Unknown", color: T.textLight };
  if (isWarrantyExpired(date)) return { label: "Beyond Warranty Period", color: T.danger };
  if (isWarrantyExpiringSoon(date)) return { label: "Expiring Soon", color: T.warning };
  return { label: "Within Warranty Period", color: T.success };
};
const getStatusColor = (s) => ({ "Within Warranty Period": T.success, "Beyond Warranty Period": T.danger, "Under Repair": T.warning, "In Transit": T.orange, "Disposed": T.textLight, "Lost/Stolen": "#7f1d1d" }[s] || T.textLight);
const newId = (p) => `${p}${Date.now()}`;
let GP_COUNTER = 1000000042;
const newGatePassNo = () => String(GP_COUNTER++);
const parseCSV = (text) => { const lines = text.trim().split("\n"); if (lines.length < 2) return []; const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, "")); return lines.slice(1).map(line => { const vals = line.split(",").map(v => v.trim().replace(/"/g, "")); const obj = {}; headers.forEach((h, i) => { obj[h] = vals[i] || ""; }); return obj; }); };
const yearsOld = (d) => d ? (new Date() - new Date(d)) / (365.25 * 24 * 3600 * 1000) : 0;
const buybackEligible = (d) => yearsOld(d) >= 5;
const buybackValue = (bookValue) => bookValue ? Math.round(bookValue * 0.10 * 1.18) : 0; // 10% + 18% GST

// ============================================================
// INITIAL SAMPLE ASSETS
// ============================================================
const INITIAL_ASSETS = [
  { id: "AST-2023-001", gatePassNo: "1000000037", deviceCode: 19, deviceName: "All In One PC", makeCode: 121, makeName: "Acer", model: "Veriton Z4680G", serialNo: "UXVW6SI215312157FC0700", purchaseDate: "2023-04-12", warrantyEnd: "2024-03-29", bookValue: 45000, invoiceNo: "INV-2023-0412-001", poNo: "PO-2023-ACER-0012", status: "Beyond Warranty Period", region: "Corporate Office", circle: "HQ-Bhopal", division: "Finance Department", subdivision: "Accounts Section", dc: "Accounts DC", office: "Finance Section", assignedTo: "Narendra Chouhan", designation: "Account Officer", mobile: "6232913049", room: "13", transferCount: 0, docReferences: [{ type: "Government Circular", refNo: POLICY_CIRCULAR, date: "2023-06-30", note: "IT Equipment Policy Circular" }], createdAt: "2023-04-12T14:36:42", createdBy: "Admin" },
  { id: "AST-2023-002", gatePassNo: "1000000038", deviceCode: 4, deviceName: "Laptop", makeCode: 44, makeName: "Dell", model: "Latitude 5520", serialNo: "DLLAT5520XY2023B456", purchaseDate: "2023-06-15", warrantyEnd: "2026-06-14", bookValue: 65000, invoiceNo: "INV-2023-0615-002", poNo: "PO-2023-DELL-0005", status: "Within Warranty Period", region: "Corporate Office", circle: "HQ-Bhopal", division: "IT Department", subdivision: "SCADA Section", dc: "SCADA DC", office: "SCADA Section, O/o MPCZ", assignedTo: "Rameshwar Chaturvedi", designation: "GM", mobile: "9406913378", room: "25", transferCount: 1, docReferences: [], createdAt: "2023-06-15T10:00:00", createdBy: "Admin" },
  { id: "AST-2023-003", gatePassNo: "1000000039", deviceCode: 2, deviceName: "Printer", makeCode: 22, makeName: "HP", model: "LaserJet Pro M404n", serialNo: "HPLJM404N2023C789", purchaseDate: "2023-07-01", warrantyEnd: "2024-06-30", bookValue: 18000, invoiceNo: "INV-2023-0701-003", poNo: "PO-2023-HP-0008", status: "Under Repair", region: "Bhopal Region", circle: "Bhopal City Circle", division: "Bhopal Urban Division-1", subdivision: "Arera Colony Sub-Division", dc: "Arera DC", office: "SE Office", assignedTo: "Priya Sharma", designation: "Executive Engineer", mobile: "9876543210", room: "08", transferCount: 2, docReferences: [], createdAt: "2023-07-01T09:00:00", createdBy: "Admin" },
  { id: "AST-2019-004", gatePassNo: "1000000040", deviceCode: 3, deviceName: "UPS", makeCode: 31, makeName: "BPE", model: "Online UPS 2KVA", serialNo: "BPEUPS2KVABPL2019D012", purchaseDate: "2019-01-10", warrantyEnd: "2021-01-09", bookValue: 25000, invoiceNo: "INV-2019-0110-004", poNo: "PO-2019-BPE-0002", status: "Beyond Warranty Period", region: "Bhopal Region", circle: "Bhopal City Circle", division: "Bhopal Urban Division-1", subdivision: "Arera Colony Sub-Division", dc: "Arera DC", office: "EE Office Bhopal", assignedTo: "Suresh Verma", designation: "Assistant Engineer", mobile: "9812345678", room: "04", transferCount: 0, docReferences: [], createdAt: "2019-01-10T11:00:00", createdBy: "Admin" },
];

const INITIAL_TRANSFERS = [
  { id: "TRF-001", assetId: "AST-2023-002", gatePassNo: "1000000041", fromRegion: "Corporate Office", fromCircle: "HQ-Bhopal", fromDivision: "Finance Department", fromSubdivision: "Accounts Section", fromDC: "Accounts DC", fromOffice: "Finance Section", fromPerson: "Old Employee", fromDesignation: "Assistant", toRegion: "Corporate Office", toCircle: "HQ-Bhopal", toDivision: "IT Department", toSubdivision: "SCADA Section", toDC: "SCADA DC", toOffice: "SCADA Section, O/o MPCZ", toPerson: "Rameshwar Chaturvedi", toDesignation: "GM", toMobile: "9406913378", reason: "Departmental transfer", authorizedBy: "Siddharth Jain", authorizedDesignation: "Manager IT", authorizedOffice: "Corporate Office", authorizedMobile: "9876500000", transferDate: "2023-09-01", place: "Bhopal", createdBy: "Admin", createdAt: "2023-09-01T10:00:00" },
];

const INITIAL_HISTORY = [
  { id: "H001", assetId: "AST-2023-001", action: "Created", details: "Asset registered in system", performedBy: "Admin", timestamp: "2023-04-12T14:36:42" },
  { id: "H002", assetId: "AST-2023-002", action: "Created", details: "Asset registered in system", performedBy: "Admin", timestamp: "2023-06-15T10:00:00" },
  { id: "H003", assetId: "AST-2023-002", action: "Transferred", details: "Transferred to SCADA Section (Gate Pass: 1000000041)", performedBy: "Admin", timestamp: "2023-09-01T10:00:00" },
  { id: "H004", assetId: "AST-2023-003", action: "Created", details: "Asset registered in system", performedBy: "Admin", timestamp: "2023-07-01T09:00:00" },
];

const INITIAL_BUYBACKS = [];

// ============================================================
// REUSABLE UI COMPONENTS
// ============================================================
const Badge = ({ color, bg, children, small }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: small ? "2px 8px" : "3px 10px", borderRadius: 20, fontSize: small ? 10 : 11, fontWeight: 600, color: color || "#fff", backgroundColor: bg || T.primary, whiteSpace: "nowrap" }}>{children}</span>
);

const Card = ({ children, style }) => (
  <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 20, ...style }}>{children}</div>
);

const Btn = ({ children, onClick, color, outline, small, disabled, icon, style }) => (
  <button onClick={onClick} disabled={disabled} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: small ? "6px 14px" : "9px 18px", borderRadius: 8, fontSize: small ? 12 : 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer", border: outline ? `1.5px solid ${color || T.primary}` : "none", background: outline ? "transparent" : (color || T.primary), color: outline ? (color || T.primary) : "#fff", opacity: disabled ? 0.6 : 1, transition: "all 0.15s", ...style }}>{icon && icon}{children}</button>
);

const SectionTitle = ({ children, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, borderBottom: `2px solid ${T.primaryLight}`, paddingBottom: 10 }}>
    <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: 0 }}>{children}</h3>
    {action}
  </div>
);

// Permission check helper
const canEdit = (user) => user && user.accessLevel <= 2;
const isMasterAdmin = (user) => user && user.accessLevel === 1;
const isCorporateAdmin = (user) => user && user.accessLevel === 2;
const isCircleUser = (user) => user && user.accessLevel === 3;

// ============================================================
// LOGIN
// ============================================================
function LoginPage({ onLogin, users }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      const u = users.find(u => (u.loginId === loginId || u.fullName === loginId || u.empCode === loginId) && u.password === password && u.status === "enabled");
      if (u) { onLogin(u); }
      else { setError("Invalid credentials or account disabled."); setLoading(false); }
    }, 700);
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#4c1d95 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Segoe UI',sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "48px 40px", width: 420, boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 64, height: 64, background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16, boxShadow: "0 8px 20px rgba(124,58,237,0.4)" }}>
            <Monitor size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: T.primary, margin: "0 0 4px" }}>MPMKVVCL</h1>
          <p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>IT Asset Management System</p>
          <p style={{ fontSize: 10, color: T.textLight, marginTop: 3 }}>Policy Circular: {POLICY_CIRCULAR}</p>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 6, textAlign: "center" }}>Sign In</h2>
        <p style={{ fontSize: 13, color: T.textMid, textAlign: "center", marginBottom: 24 }}>Enter your credentials to access the portal</p>
        {error && <div style={{ background: T.dangerLight, color: T.danger, borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}><AlertCircle size={16} /> {error}</div>}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 6 }}>Employee Code or Login ID</label>
          <input value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="Enter your employee code / login ID" onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: `2px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 6 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ width: "100%", padding: "11px 12px", borderRadius: 8, border: `2px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
        </div>
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "13px", background: loading ? "#a78bfa" : "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading ? "wait" : "pointer", boxShadow: "0 4px 15px rgba(124,58,237,0.4)" }}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <div style={{ marginTop: 20, background: T.primaryLighter, borderRadius: 8, padding: "10px 14px" }}>
          <p style={{ fontSize: 11, color: T.textMid, margin: "0 0 4px", fontWeight: 600 }}>Quick Login:</p>
          <p style={{ fontSize: 11, color: T.textLight, margin: 0 }}>Master Admin: <strong>admin</strong> / <strong>Pass@123</strong></p>
          <p style={{ fontSize: 11, color: T.textLight, margin: 0 }}>Corporate Admin: <strong>ams_corporate</strong> / <strong>Pass@123</strong></p>
          <p style={{ fontSize: 11, color: T.textLight, margin: 0 }}>Circle User: <strong>gm_city_bhopal</strong> / <strong>Pass@123</strong></p>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: T.textLight, marginTop: 16 }}>Authorized users only. All activities are logged.<br />© 2024 MPMKVVCL | IT Department</p>
      </div>
    </div>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
function Sidebar({ current, onNav, user }) {
  const [expanded, setExpanded] = useState({ assets: true });
  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    {
      id: "assets", label: "Asset Registry", icon: Database, children: [
        { id: "asset-list", label: "All Assets", icon: Layers },
        ...(canEdit(user) ? [{ id: "add-asset", label: "Add Asset", icon: Plus }] : []),
        ...(canEdit(user) ? [{ id: "bulk-import", label: "Bulk Import", icon: Upload }] : []),
      ]
    },
    {
      id: "transfers", label: "Asset Movement", icon: ArrowRightLeft, children: [
        ...(canEdit(user) ? [{ id: "transfer", label: "Transfer Asset", icon: ArrowRightLeft }] : []),
        { id: "gate-pass-list", label: "Gate Passes", icon: FileCheck },
      ]
    },
    { id: "buyback", label: "Buyback Module", icon: DollarSign },
    { id: "history", label: "Activity Log", icon: History },
    { id: "documents", label: "Doc References", icon: BookOpen },
    { id: "reports", label: "Reports", icon: TrendingUp },
    ...(isMasterAdmin(user) ? [
      { id: "settings", label: "Settings", icon: Settings, children: [
        { id: "equipment-master", label: "Equipment Master", icon: Cpu },
        { id: "user-management", label: "User Management", icon: Users },
        { id: "hierarchy-manager", label: "Hierarchy Manager", icon: Building },
        { id: "dropdown-settings", label: "Dropdown Settings", icon: Tag },
      ]}
    ] : []),
  ];

  const roleColors = { 1: T.danger, 2: T.info, 3: T.success };
  const roleLabels = { 1: "Master Admin", 2: "Corporate Admin", 3: "Circle User" };

  const NavItem = ({ item, depth = 0 }) => {
    const Icon = item.icon;
    const hasChildren = item.children?.length > 0;
    const isActive = current === item.id || item.children?.some(c => c.id === current);
    const isLeaf = current === item.id;
    return (
      <div>
        <div onClick={() => hasChildren ? toggle(item.id) : onNav(item.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: `10px ${14 + depth * 12}px`, cursor: "pointer", borderRadius: 8, margin: "2px 8px", background: isLeaf ? "rgba(167,139,250,0.25)" : "transparent", borderLeft: isLeaf ? "3px solid #a78bfa" : "3px solid transparent", transition: "all 0.15s" }}>
          <Icon size={16} color={isLeaf ? "#c4b5fd" : isActive ? "#a78bfa" : "rgba(255,255,255,0.6)"} />
          <span style={{ flex: 1, fontSize: 13, fontWeight: isLeaf ? 700 : 500, color: isLeaf ? "#e9d5ff" : isActive ? "#c4b5fd" : "rgba(255,255,255,0.75)" }}>{item.label}</span>
          {hasChildren && (expanded[item.id] ? <ChevronDown size={14} color="rgba(255,255,255,0.4)" /> : <ChevronRight size={14} color="rgba(255,255,255,0.4)" />)}
        </div>
        {hasChildren && expanded[item.id] && item.children.map(c => <NavItem key={c.id} item={c} depth={depth + 1} />)}
      </div>
    );
  };

  return (
    <div style={{ width: 240, minHeight: "100vh", background: T.sidebar, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#7c3aed,#a855f7)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Monitor size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>MPMKVVCL</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>IT Asset Management</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 12 }}>
        {navItems.map(item => <NavItem key={item.id} item={item} />)}
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 34, height: 34, background: `linear-gradient(135deg,${roleColors[user?.accessLevel] || T.primary},#a855f7)`, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{user?.fullName?.[0]}</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#e2e8f0" }}>{user?.fullName}</div>
            <div style={{ fontSize: 10 }}><span style={{ color: roleColors[user?.accessLevel], fontWeight: 700 }}>{roleLabels[user?.accessLevel]}</span></div>
          </div>
        </div>
        <button onClick={() => window.location.reload()} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, color: "#fca5a5", fontSize: 12, cursor: "pointer" }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ assets, transfers, history, onNav, user }) {
  const [filters, setFilters] = useState({ region: "", circle: "", division: "", subdivision: "", dc: "" });

  const filtered = useMemo(() => {
    let a = assets;
    if (filters.region) a = a.filter(x => x.region === filters.region);
    if (filters.circle) a = a.filter(x => x.circle === filters.circle);
    if (filters.division) a = a.filter(x => x.division === filters.division);
    if (filters.subdivision) a = a.filter(x => x.subdivision === filters.subdivision);
    if (filters.dc) a = a.filter(x => x.dc === filters.dc);
    return a;
  }, [assets, filters]);

  const stats = {
    total: filtered.length,
    withinWarranty: filtered.filter(a => !isWarrantyExpired(a.warrantyEnd)).length,
    beyondWarranty: filtered.filter(a => isWarrantyExpired(a.warrantyEnd)).length,
    expiringSoon: filtered.filter(a => isWarrantyExpiringSoon(a.warrantyEnd)).length,
    underRepair: filtered.filter(a => a.status === "Under Repair").length,
    buybackEligibleCount: filtered.filter(a => buybackEligible(a.purchaseDate)).length,
  };

  const typeData = useMemo(() => { const c = {}; filtered.forEach(a => { c[a.deviceName] = (c[a.deviceName] || 0) + 1; }); return Object.entries(c).map(([name, value]) => ({ name, value })); }, [filtered]);
  const regionData = useMemo(() => { const c = {}; assets.forEach(a => { const r = a.region.replace(" Region", "").replace(" Office", ""); c[r] = (c[r] || 0) + 1; }); return Object.entries(c).map(([name, value]) => ({ name, value })); }, [assets]);
  const COLORS = ["#7c3aed", "#a855f7", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];

  const StatCard = ({ label, value, icon: Icon, color, bg, sub }) => (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", border: `1px solid ${T.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.textLight, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</span>
        <div style={{ width: 36, height: 36, background: bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={color} /></div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: T.text }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: T.textLight, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>IT Asset Dashboard</h2>
        <p style={{ fontSize: 12, color: T.textLight, margin: 0 }}>Policy Circular: {POLICY_CIRCULAR}</p>
      </div>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Filter size={15} color={T.primary} />
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>Filter by MPMKVVCL Hierarchy</span>
          {Object.values(filters).some(Boolean) && <button onClick={() => setFilters({ region: "", circle: "", division: "", subdivision: "", dc: "" })} style={{ marginLeft: "auto", fontSize: 11, color: T.danger, background: T.dangerLight, border: "none", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>Clear All</button>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {[
            { label: "Region", key: "region", options: ALL_REGIONS(), reset: ["circle", "division", "subdivision", "dc"] },
            { label: "Circle", key: "circle", options: getCircles(filters.region), reset: ["division", "subdivision", "dc"] },
            { label: "Division", key: "division", options: getDivisions(filters.region, filters.circle), reset: ["subdivision", "dc"] },
            { label: "Sub-Division", key: "subdivision", options: getSubdivisions(filters.region, filters.circle, filters.division), reset: ["dc"] },
            { label: "DC", key: "dc", options: getDCs(filters.region, filters.circle, filters.division, filters.subdivision), reset: [] },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 11, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 4 }}>{f.label}</label>
              <select value={filters[f.key]} onChange={e => { const reset = {}; f.reset.forEach(r => { reset[r] = ""; }); setFilters(p => ({ ...p, [f.key]: e.target.value, ...reset })); }} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 12 }}>
                <option value="">All</option>
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard label="Total Assets" value={stats.total} icon={Database} color={T.primary} bg={T.primaryLight} />
        <StatCard label="Within Warranty" value={stats.withinWarranty} icon={CheckCircle} color={T.success} bg={T.successLight} />
        <StatCard label="Beyond Warranty" value={stats.beyondWarranty} icon={AlertTriangle} color={T.danger} bg={T.dangerLight} />
        <StatCard label="Expiring ≤90 Days" value={stats.expiringSoon} icon={Clock} color={T.warning} bg={T.warningLight} />
        <StatCard label="Under Repair" value={stats.underRepair} icon={RefreshCw} color={T.orange} bg={T.orangeLight} />
        <StatCard label="Buyback Eligible" value={stats.buybackEligibleCount} icon={DollarSign} color={T.info} bg={T.infoLight} sub="≥5 years old" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card><SectionTitle>Assets by Device Type</SectionTitle><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={typeData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">{typeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} /></PieChart></ResponsiveContainer></Card>
        <Card><SectionTitle>Assets by Region</SectionTitle><ResponsiveContainer width="100%" height={200}><BarChart data={regionData} margin={{ left: -20, right: 10, top: 5, bottom: 5 }}><XAxis dataKey="name" tick={{ fontSize: 10 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="value" fill={T.primary} radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <SectionTitle>⚠️ Warranty Alerts</SectionTitle>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {filtered.filter(a => isWarrantyExpired(a.warrantyEnd) || isWarrantyExpiringSoon(a.warrantyEnd)).length === 0
              ? <p style={{ color: T.textLight, fontSize: 13, textAlign: "center", padding: "20px 0" }}>No warranty alerts</p>
              : filtered.filter(a => isWarrantyExpired(a.warrantyEnd) || isWarrantyExpiringSoon(a.warrantyEnd)).map(a => {
                const ws = getWarrantyStatus(a.warrantyEnd);
                return (<div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                  <AlertTriangle size={16} color={ws.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{a.deviceName} — {a.makeName} {a.model}</div>
                    <div style={{ fontSize: 11, color: T.textLight }}>{a.assignedTo} | {a.office}</div>
                  </div>
                  <div><Badge color="#fff" bg={ws.color} small>{ws.label}</Badge><div style={{ fontSize: 10, color: T.textLight, marginTop: 2, textAlign: "right" }}>{formatDate(a.warrantyEnd)}</div></div>
                </div>);
              })}
          </div>
        </Card>
        <Card>
          <SectionTitle>Recent Activity</SectionTitle>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {[...history].reverse().slice(0, 8).map(h => (
              <div key={h.id} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 28, height: 28, background: T.primaryLight, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}><History size={13} color={T.primary} /></div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{h.action} — {h.assetId}</div>
                  <div style={{ fontSize: 11, color: T.textMid }}>{h.details}</div>
                  <div style={{ fontSize: 10, color: T.textLight }}>{formatDateTime(h.timestamp)} | {h.performedBy}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// ASSET LIST
// ============================================================
function AssetList({ assets, transfers, onNav, onSelectAsset, user }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ region: "", status: "", deviceCode: "", warranty: "" });
  const [viewAsset, setViewAsset] = useState(null);

  const filtered = useMemo(() => {
    let a = assets;
    if (search) a = a.filter(x => JSON.stringify(x).toLowerCase().includes(search.toLowerCase()));
    if (filters.region) a = a.filter(x => x.region === filters.region);
    if (filters.status) a = a.filter(x => x.status === filters.status);
    if (filters.deviceCode) a = a.filter(x => String(x.deviceCode) === filters.deviceCode);
    if (filters.warranty === "within") a = a.filter(x => !isWarrantyExpired(x.warrantyEnd));
    if (filters.warranty === "beyond") a = a.filter(x => isWarrantyExpired(x.warrantyEnd));
    if (filters.warranty === "soon") a = a.filter(x => isWarrantyExpiringSoon(x.warrantyEnd));
    // Circle users see only their circle's assets
    if (isCircleUser(user)) a = a.filter(x => x.circleCode === user.circleCode || x.region === user.regionName);
    return a;
  }, [assets, search, filters, user]);

  if (viewAsset) return <AssetDetail asset={viewAsset} transfers={transfers} onBack={() => setViewAsset(null)} onNav={onNav} onSelectAsset={onSelectAsset} user={user} />;

  const deviceTypes = [...new Map(assets.map(a => [a.deviceCode, a.deviceName])).entries()];

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Asset Registry</h2>
          <p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>{filtered.length} assets</p>
        </div>
        {canEdit(user) && (
          <div style={{ display: "flex", gap: 10 }}>
            <Btn small onClick={() => onNav("bulk-import")} outline color={T.primary} icon={<Upload size={14} />}>Bulk Import</Btn>
            <Btn small onClick={() => { onSelectAsset(null); onNav("add-asset"); }} color={T.primary} icon={<Plus size={14} />}>Add Asset</Btn>
          </div>
        )}
      </div>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 12, alignItems: "end" }}>
          <div style={{ position: "relative" }}>
            <Search size={15} color={T.textLight} style={{ position: "absolute", left: 10, top: 11 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search serial, person, office, model..." style={{ width: "100%", padding: "10px 10px 10px 32px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
          </div>
          <select value={filters.region} onChange={e => setFilters(p => ({ ...p, region: e.target.value }))} style={{ padding: "10px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 12 }}>
            <option value="">All Regions</option>
            {ALL_REGIONS().map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={filters.deviceCode} onChange={e => setFilters(p => ({ ...p, deviceCode: e.target.value }))} style={{ padding: "10px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 12 }}>
            <option value="">All Device Types</option>
            {deviceTypes.map(([code, name]) => <option key={code} value={String(code)}>{name}</option>)}
          </select>
          <select value={filters.status} onChange={e => setFilters(p => ({ ...p, status: e.target.value }))} style={{ padding: "10px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 12 }}>
            <option value="">All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filters.warranty} onChange={e => setFilters(p => ({ ...p, warranty: e.target.value }))} style={{ padding: "10px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 12 }}>
            <option value="">Warranty: All</option>
            <option value="within">Within Warranty</option>
            <option value="beyond">Beyond Warranty</option>
            <option value="soon">Expiring Soon</option>
          </select>
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: `2px solid ${T.border}` }}>
                {["Gate Pass", "Device Type", "Make / Model", "Serial No", "Assigned To", "Location", "Status", "Warranty", "Book Value", "Buyback", "Actions"].map(h => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={11} style={{ textAlign: "center", padding: 40, color: T.textLight }}>No assets found</td></tr>}
              {filtered.map((a, i) => {
                const ws = getWarrantyStatus(a.warrantyEnd);
                const bbEligible = buybackEligible(a.purchaseDate);
                return (
                  <tr key={a.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 700, color: T.primary, whiteSpace: "nowrap" }}>{a.gatePassNo}</td>
                    <td style={{ padding: "11px 14px" }}><Badge color={T.primary} bg={T.primaryLight} small>{a.deviceName}</Badge></td>
                    <td style={{ padding: "11px 14px" }}><div style={{ fontWeight: 600 }}>{a.makeName}</div><div style={{ fontSize: 11, color: T.textLight }}>{a.model}</div></td>
                    <td style={{ padding: "11px 14px", fontFamily: "monospace", fontSize: 11 }}>{a.serialNo}</td>
                    <td style={{ padding: "11px 14px" }}><div style={{ fontWeight: 600 }}>{a.assignedTo}</div><div style={{ fontSize: 11, color: T.textLight }}>{a.designation}</div></td>
                    <td style={{ padding: "11px 14px", fontSize: 11 }}><div>{a.division}</div><div style={{ color: T.textLight }}>{a.region}</div></td>
                    <td style={{ padding: "11px 14px" }}><Badge color="#fff" bg={getStatusColor(a.status)} small>{a.status}</Badge></td>
                    <td style={{ padding: "11px 14px" }}><Badge color="#fff" bg={ws.color} small>{ws.label}</Badge><div style={{ fontSize: 10, color: T.textLight, marginTop: 2 }}>{formatDate(a.warrantyEnd)}</div></td>
                    <td style={{ padding: "11px 14px", fontSize: 12 }}>₹{(a.bookValue || 0).toLocaleString("en-IN")}</td>
                    <td style={{ padding: "11px 14px" }}>
                      {bbEligible ? <Badge color="#fff" bg={T.success} small>Eligible</Badge> : <span style={{ fontSize: 11, color: T.textLight }}>{a.purchaseDate ? `${(5 - yearsOld(a.purchaseDate)).toFixed(1)}y left` : "-"}</span>}
                    </td>
                    <td style={{ padding: "11px 14px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setViewAsset(a)} title="View" style={{ background: T.primaryLight, border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}><Eye size={13} color={T.primary} /></button>
                        {canEdit(user) && <button onClick={() => { onSelectAsset(a); onNav("add-asset"); }} title="Edit" style={{ background: T.infoLight, border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}><Edit size={13} color={T.info} /></button>}
                        {canEdit(user) && <button onClick={() => { onSelectAsset(a); onNav("transfer"); }} title="Transfer" style={{ background: T.warningLight, border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}><ArrowRightLeft size={13} color={T.warning} /></button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// ASSET DETAIL
// ============================================================
function AssetDetail({ asset, transfers, onBack, onNav, onSelectAsset, user }) {
  const assetTransfers = transfers.filter(t => t.assetId === asset.id);
  const ws = getWarrantyStatus(asset.warrantyEnd);
  const bbEligible = buybackEligible(asset.purchaseDate);
  const bbValue = buybackValue(asset.bookValue);

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#fff", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}><ChevronLeft size={16} /> Back</button>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: "0 0 2px" }}>{asset.deviceName} — {asset.makeName} {asset.model}</h2>
          <p style={{ fontSize: 12, color: T.textMid, margin: 0 }}>Gate Pass: {asset.gatePassNo} | ID: {asset.id}</p>
        </div>
        {canEdit(user) && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <Btn small onClick={() => { onSelectAsset(asset); onNav("transfer"); }} color={T.warning} icon={<ArrowRightLeft size={14} />}>Transfer</Btn>
            <Btn small onClick={() => { onSelectAsset(asset); onNav("gate-pass-list"); }} outline color={T.primary} icon={<FileCheck size={14} />}>Gate Pass</Btn>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Asset Information</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["Device Type", asset.deviceName], ["Make Code", asset.makeCode], ["Make / OEM", asset.makeName], ["Model", asset.model], ["Serial Number", asset.serialNo], ["Gate Pass No", asset.gatePassNo], ["Purchase Date", formatDate(asset.purchaseDate)], ["Warranty End", formatDate(asset.warrantyEnd)], ["Invoice No", asset.invoiceNo], ["PO No", asset.poNo], ["Book Value", `₹${(asset.bookValue || 0).toLocaleString("en-IN")}`], ["Room", asset.room || "-"]].map(([l, v]) => (
                <div key={l}><div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div></div>
              ))}
            </div>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Location & Assignment</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["Assigned To", asset.assignedTo], ["Designation", asset.designation], ["Mobile", asset.mobile], ["Office", asset.office], ["Region", asset.region], ["Circle", asset.circle], ["Division", asset.division], ["Sub-Division", asset.subdivision], ["DC", asset.dc || "-"]].map(([l, v]) => (
                <div key={l}><div style={{ fontSize: 11, color: T.textLight, fontWeight: 600, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 600 }}>{v || "-"}</div></div>
              ))}
            </div>
          </Card>

          <Card>
            <SectionTitle>Transfer History ({assetTransfers.length} movements)</SectionTitle>
            {assetTransfers.length === 0 ? <p style={{ color: T.textLight, fontSize: 13 }}>No transfers recorded.</p>
              : assetTransfers.map((t, i) => (
                <div key={t.id} style={{ borderLeft: `3px solid ${T.primary}`, paddingLeft: 14, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Transfer #{i + 1} — GP: {t.gatePassNo}</span>
                    <Badge color="#fff" bg={T.info} small>{formatDate(t.transferDate)}</Badge>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 10, alignItems: "center", background: "#f8fafc", borderRadius: 8, padding: 10 }}>
                    <div><div style={{ fontSize: 11, color: T.textLight }}>FROM</div><div style={{ fontSize: 12, fontWeight: 600 }}>{t.fromPerson}</div><div style={{ fontSize: 11, color: T.textMid }}>{t.fromOffice}</div></div>
                    <ArrowRightLeft size={20} color={T.primary} />
                    <div><div style={{ fontSize: 11, color: T.textLight }}>TO</div><div style={{ fontSize: 12, fontWeight: 600 }}>{t.toPerson}</div><div style={{ fontSize: 11, color: T.textMid }}>{t.toOffice}</div></div>
                  </div>
                  <div style={{ fontSize: 11, color: T.textMid, marginTop: 6 }}>Reason: {t.reason} | Auth: {t.authorizedBy}</div>
                </div>
              ))}
          </Card>
        </div>

        <div>
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Status & Warranty</SectionTitle>
            <div style={{ marginBottom: 12 }}><div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>Current Status</div><Badge color="#fff" bg={getStatusColor(asset.status)}>{asset.status}</Badge></div>
            <div style={{ marginBottom: 12 }}><div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>Warranty Status</div><Badge color="#fff" bg={ws.color}>{ws.label}</Badge><div style={{ fontSize: 12, color: T.textMid, marginTop: 4 }}>Expires: {formatDate(asset.warrantyEnd)}</div></div>
            <div><div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>Total Transfers</div><div style={{ fontSize: 28, fontWeight: 800, color: T.primary }}>{asset.transferCount}</div></div>
          </Card>

          <Card style={{ marginBottom: 16, background: bbEligible ? "#f0fdf4" : "#fff", border: `1px solid ${bbEligible ? T.success : T.border}` }}>
            <SectionTitle>Buyback Policy</SectionTitle>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: T.textLight, marginBottom: 4 }}>Age of Asset</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.text }}>{yearsOld(asset.purchaseDate).toFixed(1)} years</div>
            </div>
            {bbEligible ? (
              <div>
                <Badge color="#fff" bg={T.success}>Buyback Eligible (≥5 years)</Badge>
                <div style={{ marginTop: 10, background: T.successLight, borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: T.textLight, marginBottom: 2 }}>Buyback Value (10% of Book Value + 18% GST)</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.success }}>₹{bbValue.toLocaleString("en-IN")}</div>
                  <div style={{ fontSize: 11, color: T.textMid, marginTop: 4 }}>Original Book Value: ₹{(asset.bookValue || 0).toLocaleString("en-IN")}</div>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: T.textMid }}>
                  <strong>Eligible Buyback Options:</strong>
                  <ul style={{ margin: "4px 0 0", paddingLeft: 16 }}>
                    <li>OEM / Vendor Buyback</li>
                    <li>IT Department Buyback</li>
                    <li>Employee Buyback</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <Badge color="#fff" bg={T.textLight}>Not Eligible Yet</Badge>
                <div style={{ fontSize: 12, color: T.textMid, marginTop: 8 }}>Eligible after 5 years from purchase date.<br />Remaining: {(5 - yearsOld(asset.purchaseDate)).toFixed(1)} years</div>
              </div>
            )}
          </Card>

          <Card>
            <SectionTitle>Document References</SectionTitle>
            {(!asset.docReferences || asset.docReferences.length === 0) ? <p style={{ color: T.textLight, fontSize: 12 }}>No documents attached.</p>
              : asset.docReferences.map((d, i) => (
                <div key={i} style={{ background: "#f8fafc", borderRadius: 8, padding: 10, marginBottom: 8, borderLeft: `3px solid ${T.info}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{d.refNo}</div>
                  <div style={{ fontSize: 11, color: T.textMid }}>{d.type} | {formatDate(d.date)}</div>
                  {d.note && <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>{d.note}</div>}
                </div>
              ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADD / EDIT ASSET
// ============================================================
function AddAsset({ editAsset, onSave, onNav, user, deviceTypes, makes, dropdownSettings }) {
  const empty = { deviceCode: "", deviceName: "", makeCode: "", makeName: "", model: "", serialNo: "", purchaseDate: "", warrantyEnd: "", bookValue: "", invoiceNo: "", poNo: "", status: "Within Warranty Period", region: "", circle: "", division: "", subdivision: "", dc: "", office: "", assignedTo: "", designation: "", mobile: "", room: "", docReferences: [] };
  const [form, setForm] = useState(editAsset ? { ...editAsset, bookValue: editAsset.bookValue || "" } : empty);
  const [docForm, setDocForm] = useState({ type: "", refNo: "", date: "", note: "" });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const filteredMakes = useMemo(() => form.deviceCode ? makes.filter(m => m.deviceCode === parseInt(form.deviceCode)) : [], [form.deviceCode, makes]);

  const validate = () => {
    const e = {};
    if (!form.deviceCode) e.deviceCode = "Required";
    if (!form.makeCode) e.makeCode = "Required";
    if (!form.serialNo) e.serialNo = "Required";
    if (!form.region) e.region = "Required";
    if (!form.assignedTo) e.assignedTo = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const id = editAsset ? editAsset.id : `AST-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    const gatePassNo = editAsset ? editAsset.gatePassNo : newGatePassNo();
    onSave({ ...form, id, gatePassNo, bookValue: parseFloat(form.bookValue) || 0, transferCount: editAsset?.transferCount || 0, createdBy: user.fullName, createdAt: editAsset?.createdAt || new Date().toISOString() });
    setSaved(true);
    setTimeout(() => { setSaved(false); onNav("asset-list"); }, 1500);
  };

  const addDoc = () => { if (!docForm.refNo) return; setForm(p => ({ ...p, docReferences: [...(p.docReferences || []), { ...docForm }] })); setDocForm({ type: "", refNo: "", date: "", note: "" }); };
  const removeDoc = (i) => setForm(p => ({ ...p, docReferences: p.docReferences.filter((_, idx) => idx !== i) }));

  const designations = dropdownSettings?.designations || DESIGNATIONS;

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNav("asset-list")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#fff", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}><ChevronLeft size={16} /> Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: 0 }}>{editAsset ? "Edit Asset" : "Add New Asset"}</h2>
      </div>

      {saved && <div style={{ background: T.successLight, color: T.success, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center", fontWeight: 600 }}><CheckCircle size={18} /> Asset {editAsset ? "updated" : "created"} successfully! Redirecting...</div>}

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Equipment Master (OEM)</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: errors.deviceCode ? T.danger : T.textMid, display: "block", marginBottom: 5 }}>Device Type <span style={{ color: T.danger }}>*</span></label>
                <select value={form.deviceCode} onChange={e => { const dt = deviceTypes.find(d => d.code === parseInt(e.target.value)); set("deviceCode")(e.target.value); set("deviceName")(dt?.name || ""); set("makeCode")(""); set("makeName")(""); setErrors(p => ({ ...p, deviceCode: null })); }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${errors.deviceCode ? T.danger : T.border}`, fontSize: 13 }}>
                  <option value="">-- Select Device Type --</option>
                  {deviceTypes.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                </select>
                {errors.deviceCode && <p style={{ color: T.danger, fontSize: 11, margin: "3px 0 0" }}>{errors.deviceCode}</p>}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: errors.makeCode ? T.danger : T.textMid, display: "block", marginBottom: 5 }}>OEM / Make <span style={{ color: T.danger }}>*</span></label>
                <select value={form.makeCode} onChange={e => { const mk = filteredMakes.find(m => m.code === parseInt(e.target.value)); set("makeCode")(e.target.value); set("makeName")(mk?.name || ""); setErrors(p => ({ ...p, makeCode: null })); }} disabled={!form.deviceCode} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${errors.makeCode ? T.danger : T.border}`, fontSize: 13, background: !form.deviceCode ? "#f8fafc" : "#fff" }}>
                  <option value="">-- Select Make --</option>
                  {filteredMakes.map(m => <option key={m.code} value={m.code}>[{m.code}] {m.name}</option>)}
                </select>
                {errors.makeCode && <p style={{ color: T.danger, fontSize: 11, margin: "3px 0 0" }}>{errors.makeCode}</p>}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Model No</label>
                <input value={form.model} onChange={e => set("model")(e.target.value)} placeholder="e.g., Veriton Z4680G" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: errors.serialNo ? T.danger : T.textMid, display: "block", marginBottom: 5 }}>Serial Number <span style={{ color: T.danger }}>*</span></label>
                <input value={form.serialNo} onChange={e => { set("serialNo")(e.target.value); setErrors(p => ({ ...p, serialNo: null })); }} placeholder="Unique hardware serial" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${errors.serialNo ? T.danger : T.border}`, fontSize: 13, boxSizing: "border-box" }} />
                {errors.serialNo && <p style={{ color: T.danger, fontSize: 11, margin: "3px 0 0" }}>{errors.serialNo}</p>}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Book Value (₹)</label>
                <input type="number" value={form.bookValue} onChange={e => set("bookValue")(e.target.value)} placeholder="Purchase price in INR" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
                {form.bookValue && <p style={{ fontSize: 11, color: T.info, margin: "3px 0 0" }}>Buyback value (after 5yrs): ₹{buybackValue(parseFloat(form.bookValue)).toLocaleString("en-IN")}</p>}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Room / Physical Location</label>
                <input value={form.room} onChange={e => set("room")(e.target.value)} placeholder="e.g., Room 13" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Purchase Date</label>
                <input type="date" value={form.purchaseDate} onChange={e => set("purchaseDate")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Warranty End Date</label>
                <input type="date" value={form.warrantyEnd} onChange={e => set("warrantyEnd")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Invoice Number</label>
                <input value={form.invoiceNo} onChange={e => set("invoiceNo")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>PO Number</label>
                <input value={form.poNo} onChange={e => set("poNo")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 5 }}>Status</label>
                <select value={form.status} onChange={e => set("status")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </Card>

          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Location (MPMKVVCL Hierarchy)</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "Region", field: "region", options: ALL_REGIONS(), reset: ["circle", "division", "subdivision", "dc"], required: true },
                { label: "Circle", field: "circle", options: getCircles(form.region), reset: ["division", "subdivision", "dc"] },
                { label: "Division", field: "division", options: getDivisions(form.region, form.circle), reset: ["subdivision", "dc"] },
                { label: "Sub-Division", field: "subdivision", options: getSubdivisions(form.region, form.circle, form.division), reset: ["dc"] },
                { label: "Distribution Centre", field: "dc", options: getDCs(form.region, form.circle, form.division, form.subdivision), reset: [] },
              ].map(f => (
                <div key={f.field}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: errors[f.field] ? T.danger : T.textMid, display: "block", marginBottom: 4 }}>{f.label}{f.required && <span style={{ color: T.danger }}> *</span>}</label>
                  <select value={form[f.field]} onChange={e => { const reset = {}; (f.reset || []).forEach(r => { reset[r] = ""; }); setForm(p => ({ ...p, [f.field]: e.target.value, ...reset })); setErrors(p => ({ ...p, [f.field]: null })); }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${errors[f.field] ? T.danger : T.border}`, fontSize: 13 }}>
                    <option value="">-- Select --</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Office Name</label>
                <input value={form.office} onChange={e => set("office")(e.target.value)} placeholder="e.g., Finance Section" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
            </div>
          </Card>

          <Card>
            <SectionTitle>Assigned Person</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: errors.assignedTo ? T.danger : T.textMid, display: "block", marginBottom: 4 }}>Assigned To <span style={{ color: T.danger }}>*</span></label>
                <input value={form.assignedTo} onChange={e => { set("assignedTo")(e.target.value); setErrors(p => ({ ...p, assignedTo: null })); }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${errors.assignedTo ? T.danger : T.border}`, fontSize: 13, boxSizing: "border-box" }} />
                {errors.assignedTo && <p style={{ color: T.danger, fontSize: 11, margin: "3px 0 0" }}>{errors.assignedTo}</p>}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Designation</label>
                <select value={form.designation} onChange={e => set("designation")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                  <option value="">-- Select --</option>
                  {designations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Mobile Number</label>
                <input value={form.mobile} onChange={e => set("mobile")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card style={{ position: "sticky", top: 24 }}>
            <SectionTitle>Document / Circular References</SectionTitle>
            <div style={{ background: T.infoLight, borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 11, color: T.info }}>
              <strong>Policy:</strong> {POLICY_CIRCULAR}
            </div>
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginBottom: 14 }}>
              {[["Document Type", "type", DOC_TYPES], ["Reference No / Circular No", "refNo", null], ["Date", "date", null], ["Notes", "note", null]].map(([label, key, options]) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: T.textMid, display: "block", marginBottom: 4 }}>{label}</label>
                  {options ? (
                    <select value={docForm[key]} onChange={e => setDocForm(p => ({ ...p, [key]: e.target.value }))} style={{ width: "100%", padding: "8px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontSize: 12 }}>
                      <option value="">-- Select --</option>
                      {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : key === "note" ? (
                    <textarea value={docForm[key]} onChange={e => setDocForm(p => ({ ...p, [key]: e.target.value }))} rows={2} style={{ width: "100%", padding: "8px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontSize: 12, resize: "vertical", boxSizing: "border-box" }} />
                  ) : (
                    <input type={key === "date" ? "date" : "text"} value={docForm[key]} onChange={e => setDocForm(p => ({ ...p, [key]: e.target.value }))} style={{ width: "100%", padding: "8px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontSize: 12, boxSizing: "border-box" }} />
                  )}
                </div>
              ))}
              <Btn small onClick={addDoc} color={T.primary} icon={<Plus size={13} />}>Add Reference</Btn>
            </div>
            {(form.docReferences || []).map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#f0f4ff", borderRadius: 8, padding: 10, marginBottom: 8 }}>
                <FileText size={14} color={T.info} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700 }}>{d.refNo}</div><div style={{ fontSize: 11, color: T.textMid }}>{d.type} | {formatDate(d.date)}</div>{d.note && <div style={{ fontSize: 11, color: T.textLight }}>{d.note}</div>}</div>
                <button onClick={() => removeDoc(i)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={14} color={T.danger} /></button>
              </div>
            ))}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
              <Btn onClick={handleSave} color={T.primary} icon={<CheckCircle size={16} />} style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>
                {editAsset ? "Update Asset" : "Save & Generate Gate Pass"}
              </Btn>
              <Btn onClick={() => onNav("asset-list")} outline color={T.textMid} style={{ width: "100%", justifyContent: "center" }}>Cancel</Btn>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BULK IMPORT
// ============================================================
function BulkImport({ onBulkSave, onNav, user, deviceTypes, makes }) {
  const [step, setStep] = useState(1);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState([]);
  const [done, setDone] = useState(false);
  const fileRef = useRef();

  const downloadTemplate = () => {
    const headers = "deviceCode,deviceName,makeCode,makeName,model,serialNo,purchaseDate,warrantyEnd,bookValue,invoiceNo,poNo,status,region,circle,division,subdivision,dc,office,assignedTo,designation,mobile,room";
    const sample = `19,All In One PC,121,Acer,Veriton Z4680G,SERIAL001,2024-01-01,2027-01-01,45000,INV001,PO001,Within Warranty Period,Corporate Office,HQ-Bhopal,IT Department,SCADA Section,SCADA DC,IT Office,John Doe,Junior Engineer IT,9876543210,Room 10`;
    const blob = new Blob([headers + "\n" + sample], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "asset_bulk_template.csv"; a.click();
  };

  const handleFile = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const parsed = parseCSV(ev.target.result);
      const errs = [];
      const seen = new Set();
      parsed.forEach((row, i) => {
        if (!row.serialNo) errs.push({ row: i + 2, msg: "Serial No missing" });
        if (seen.has(row.serialNo)) errs.push({ row: i + 2, msg: `Duplicate serial: ${row.serialNo}` });
        seen.add(row.serialNo);
        if (!row.region) errs.push({ row: i + 2, msg: "Region missing" });
        if (!row.assignedTo) errs.push({ row: i + 2, msg: "Assigned To missing" });
      });
      setRows(parsed); setErrors(errs); setStep(2);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    const assets = rows.map(row => ({ ...row, id: `AST-${new Date().getFullYear()}-${String(Date.now() + Math.random()).slice(-6)}`, gatePassNo: newGatePassNo(), deviceCode: parseInt(row.deviceCode) || 0, makeCode: parseInt(row.makeCode) || 0, bookValue: parseFloat(row.bookValue) || 0, transferCount: 0, docReferences: [{ type: "Government Circular", refNo: POLICY_CIRCULAR, date: "2023-06-30", note: "IT Equipment Policy" }], createdBy: user.fullName, createdAt: new Date().toISOString() }));
    onBulkSave(assets);
    setDone(true);
    setTimeout(() => { setDone(false); onNav("asset-list"); }, 2000);
  };

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNav("asset-list")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#fff", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}><ChevronLeft size={16} /> Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: 0 }}>Bulk Asset Import</h2>
      </div>

      {done && <div style={{ background: T.successLight, color: T.success, borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center", fontWeight: 600 }}><CheckCircle size={18} /> {rows.length} assets imported! Redirecting...</div>}

      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "#fff", borderRadius: 12, padding: "16px 20px", border: `1px solid ${T.border}` }}>
        {[{ n: 1, label: "Download Template" }, { n: 2, label: "Upload & Validate" }, { n: 3, label: "Review & Import" }].map((s, i) => (
          <div key={s.n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 50, background: step >= s.n ? T.primary : "#e2e8f0", color: step >= s.n ? "#fff" : T.textLight, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{s.n}</div>
              <span style={{ fontSize: 13, fontWeight: step === s.n ? 700 : 500, color: step === s.n ? T.primary : T.textMid }}>{s.label}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > s.n ? T.primary : "#e2e8f0", margin: "0 12px" }} />}
          </div>
        ))}
      </div>

      <Card>
        {step === 1 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <Download size={48} color={T.primary} style={{ marginBottom: 16 }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Download CSV Template</h3>
            <p style={{ color: T.textMid, marginBottom: 4 }}>Fill device code, make code from Equipment Master, then upload.</p>
            <p style={{ color: T.textLight, fontSize: 11, marginBottom: 20 }}>⚠️ Duplicate serial numbers will be automatically detected and flagged.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Btn onClick={downloadTemplate} color={T.primary} icon={<Download size={16} />}>Download CSV Template</Btn>
              <Btn onClick={() => setStep(2)} outline color={T.primary}>Skip to Upload</Btn>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Upload CSV File</h3>
            <div onClick={() => fileRef.current?.click()} style={{ border: `2px dashed ${T.primary}`, borderRadius: 12, padding: "40px 20px", textAlign: "center", cursor: "pointer", background: T.primaryLighter, marginBottom: 16 }}>
              <Upload size={40} color={T.primary} style={{ marginBottom: 12 }} />
              <p style={{ color: T.primary, fontWeight: 700, marginBottom: 4 }}>Click to upload CSV</p>
              <p style={{ color: T.textLight, fontSize: 12 }}>Max 1000 rows | Duplicates auto-detected</p>
            </div>
            <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} style={{ display: "none" }} />
            {rows.length > 0 && (
              <div>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <Badge color="#fff" bg={T.success}>{rows.length} rows parsed</Badge>
                  {errors.length > 0 && <Badge color="#fff" bg={T.danger}>{errors.length} errors found</Badge>}
                </div>
                {errors.length > 0 && <div style={{ background: T.dangerLight, borderRadius: 8, padding: 14, marginBottom: 12 }}>{errors.map((e, i) => <div key={i} style={{ fontSize: 12, color: T.danger, marginBottom: 4 }}>Row {e.row}: {e.msg}</div>)}</div>}
                <Btn onClick={() => setStep(3)} color={T.primary} icon={<ChevronRight size={16} />} disabled={errors.length > 0}>Review {rows.length} Records</Btn>
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Review {rows.length} Records</h3>
              <div style={{ display: "flex", gap: 10 }}>
                <Btn small onClick={() => setStep(2)} outline color={T.textMid} icon={<ChevronLeft size={14} />}>Back</Btn>
                <Btn small onClick={handleImport} color={T.success} icon={<CheckCircle size={14} />}>Confirm & Import All</Btn>
              </div>
            </div>
            <div style={{ overflowX: "auto", maxHeight: 400 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead><tr style={{ background: "#f8fafc" }}>{["#", "Device", "Make", "Model", "Serial No", "Assigned To", "Region", "Book Value"].map(h => <th key={h} style={{ padding: "8px 12px", textAlign: "left", borderBottom: `2px solid ${T.border}`, fontSize: 11, fontWeight: 700, color: T.textMid }}>{h}</th>)}</tr></thead>
                <tbody>{rows.map((row, i) => (<tr key={i} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                  <td style={{ padding: "8px 12px", color: T.textLight }}>{i + 1}</td>
                  <td style={{ padding: "8px 12px" }}>{row.deviceName || row.deviceCode}</td>
                  <td style={{ padding: "8px 12px" }}>{row.makeName || row.makeCode}</td>
                  <td style={{ padding: "8px 12px" }}>{row.model}</td>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 11 }}>{row.serialNo || <span style={{ color: T.danger }}>⚠ Missing</span>}</td>
                  <td style={{ padding: "8px 12px" }}>{row.assignedTo}</td>
                  <td style={{ padding: "8px 12px" }}>{row.region}</td>
                  <td style={{ padding: "8px 12px" }}>₹{parseFloat(row.bookValue || 0).toLocaleString("en-IN")}</td>
                </tr>))}</tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

// ============================================================
// TRANSFER
// ============================================================
function TransferAsset({ assets, selectedAsset, onTransfer, onNav, user }) {
  const [assetId, setAssetId] = useState(selectedAsset?.id || "");
  const asset = assets.find(a => a.id === assetId);
  const [form, setForm] = useState({ toRegion: "", toCircle: "", toDivision: "", toSubdivision: "", toDC: "", toOffice: "", toPerson: "", toDesignation: "", toMobile: "", authorizedBy: user.fullName, authorizedDesignation: user.designation, authorizedOffice: "Corporate Office, Bhopal", authorizedMobile: user.mobile, reason: "", place: "Bhopal", transferDate: new Date().toISOString().split("T")[0] });
  const [done, setDone] = useState(null);
  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const handleTransfer = () => {
    if (!asset || !form.toPerson || !form.toRegion) return;
    const gpNo = newGatePassNo();
    onTransfer({ id: newId("TRF-"), assetId: asset.id, gatePassNo: gpNo, fromRegion: asset.region, fromCircle: asset.circle, fromDivision: asset.division, fromSubdivision: asset.subdivision, fromDC: asset.dc, fromOffice: asset.office, fromPerson: asset.assignedTo, fromDesignation: asset.designation, ...form, createdBy: user.fullName, createdAt: new Date().toISOString() }, asset, { ...asset, region: form.toRegion, circle: form.toCircle, division: form.toDivision, subdivision: form.toSubdivision, dc: form.toDC, office: form.toOffice, assignedTo: form.toPerson, designation: form.toDesignation, mobile: form.toMobile, status: "In Transit" });
    setDone(gpNo);
  };

  if (done) return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <Card style={{ maxWidth: 500, margin: "60px auto", textAlign: "center", padding: 40 }}>
        <CheckCircle size={64} color={T.success} style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Transfer Successful!</h2>
        <p style={{ color: T.textMid, marginBottom: 20 }}>Gate Pass <strong>{done}</strong> generated.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn onClick={() => onNav("gate-pass-list")} color={T.primary} icon={<FileCheck size={16} />}>View Gate Pass</Btn>
          <Btn onClick={() => onNav("asset-list")} outline color={T.primary}>Back to Assets</Btn>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={() => onNav("asset-list")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#fff", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}><ChevronLeft size={16} /> Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: 0 }}>Transfer Asset</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Select Asset</SectionTitle>
            <select value={assetId} onChange={e => setAssetId(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
              <option value="">-- Select Asset --</option>
              {assets.map(a => <option key={a.id} value={a.id}>{a.gatePassNo} | {a.deviceName} {a.makeName} {a.model} — {a.serialNo}</option>)}
            </select>
            {asset && <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, marginTop: 14, fontSize: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Current Assignment</div>
              {[["Device", `${asset.deviceName} — ${asset.makeName} ${asset.model}`], ["Serial", asset.serialNo], ["Assigned To", asset.assignedTo], ["Office", asset.office], ["Region", asset.region]].map(([l, v]) => <div key={l} style={{ marginBottom: 4 }}><span style={{ color: T.textLight }}>{l}: </span><strong>{v}</strong></div>)}
            </div>}
          </Card>
          {asset && <Card>
            <SectionTitle>Authorized Person</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["Authorized By", "authorizedBy"], ["Designation", "authorizedDesignation"], ["Office", "authorizedOffice"], ["Mobile", "authorizedMobile"]].map(([label, field]) => (
                <div key={field}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>{label}</label>
                  <input value={form[field]} onChange={e => set(field)(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
          </Card>}
        </div>
        {asset && <div>
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Transfer To (New Location)</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Region *", field: "toRegion", options: ALL_REGIONS(), reset: ["toCircle", "toDivision", "toSubdivision", "toDC"] },
                { label: "Circle", field: "toCircle", options: getCircles(form.toRegion), reset: ["toDivision", "toSubdivision", "toDC"] },
                { label: "Division", field: "toDivision", options: getDivisions(form.toRegion, form.toCircle), reset: ["toSubdivision", "toDC"] },
                { label: "Sub-Division", field: "toSubdivision", options: getSubdivisions(form.toRegion, form.toCircle, form.toDivision), reset: ["toDC"] },
                { label: "DC", field: "toDC", options: getDCs(form.toRegion, form.toCircle, form.toDivision, form.toSubdivision), reset: [] },
              ].map(f => (
                <div key={f.field}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>{f.label}</label>
                  <select value={form[f.field]} onChange={e => { const reset = {}; (f.reset || []).forEach(r => { reset[r] = ""; }); setForm(p => ({ ...p, [f.field]: e.target.value, ...reset })); }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                    <option value="">-- Select --</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Office Name</label>
                <input value={form.toOffice} onChange={e => set("toOffice")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Receiving Person *</label>
                <input value={form.toPerson} onChange={e => set("toPerson")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Designation</label>
                <select value={form.toDesignation} onChange={e => set("toDesignation")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                  <option value="">-- Select --</option>
                  {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Mobile</label>
                <input value={form.toMobile} onChange={e => set("toMobile")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Transfer Date</label>
                <input type="date" value={form.transferDate} onChange={e => set("transferDate")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Place</label>
                <input value={form.place} onChange={e => set("place")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Reason for Transfer</label>
                <textarea value={form.reason} onChange={e => set("reason")(e.target.value)} rows={2} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: "flex", gap: 12 }}>
              <Btn onClick={handleTransfer} color={T.primary} icon={<ArrowRightLeft size={16} />} disabled={!form.toPerson || !form.toRegion}>Transfer & Generate Gate Pass</Btn>
              <Btn onClick={() => onNav("asset-list")} outline color={T.textMid}>Cancel</Btn>
            </div>
          </Card>
        </div>}
      </div>
    </div>
  );
}

// ============================================================
// GATE PASS LIST
// ============================================================
function GatePassList({ assets, transfers, onNav }) {
  const [selected, setSelected] = useState(null);
  const gatePasses = useMemo(() => {
    const initial = assets.map(a => ({ gatePassNo: a.gatePassNo, type: "Initial Issue", asset: a, transfer: null, date: a.createdAt, receivingPerson: a.assignedTo, receivingDesignation: a.designation, receivingOffice: a.office, receivingMobile: a.mobile, authorizedBy: "Siddharth Jain", authorizedDesignation: "Manager IT", authorizedOffice: "Corporate Office, Bhopal", authorizedMobile: "9876500000", place: "Bhopal", issuedToRegion: a.region, issuedToCircle: a.circle, issuedToDivision: a.division }));
    const transGPs = transfers.map(t => { const a = assets.find(x => x.id === t.assetId); return { gatePassNo: t.gatePassNo, type: "Transfer", asset: a, transfer: t, date: t.transferDate, receivingPerson: t.toPerson, receivingDesignation: t.toDesignation, receivingOffice: t.toOffice, receivingMobile: t.toMobile, authorizedBy: t.authorizedBy, authorizedDesignation: t.authorizedDesignation, authorizedOffice: t.authorizedOffice, authorizedMobile: t.authorizedMobile, place: t.place, issuedToRegion: t.toRegion, issuedToCircle: t.toCircle, issuedToDivision: t.toDivision }; });
    return [...initial, ...transGPs].sort((a, b) => String(b.gatePassNo).localeCompare(String(a.gatePassNo)));
  }, [assets, transfers]);

  if (selected) return <GatePassPrint gp={selected} onBack={() => setSelected(null)} />;

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}><h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Gate Passes</h2><p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>{gatePasses.length} gate passes generated</p></div>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ background: "#f8fafc", borderBottom: `2px solid ${T.border}` }}>{["Gate Pass No", "Type", "Device", "Serial No", "Issued To", "Office", "Date", "Action"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{gatePasses.map((gp, i) => (
            <tr key={gp.gatePassNo} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
              <td style={{ padding: "11px 14px", fontWeight: 700, color: T.primary }}>{gp.gatePassNo}</td>
              <td style={{ padding: "11px 14px" }}><Badge color="#fff" bg={gp.type === "Initial Issue" ? T.success : T.info} small>{gp.type}</Badge></td>
              <td style={{ padding: "11px 14px" }}><div style={{ fontWeight: 600 }}>{gp.asset?.deviceName}</div><div style={{ fontSize: 11, color: T.textLight }}>{gp.asset?.makeName} {gp.asset?.model}</div></td>
              <td style={{ padding: "11px 14px", fontFamily: "monospace", fontSize: 11 }}>{gp.asset?.serialNo}</td>
              <td style={{ padding: "11px 14px" }}><div style={{ fontWeight: 600 }}>{gp.receivingPerson}</div><div style={{ fontSize: 11, color: T.textLight }}>{gp.receivingDesignation}</div></td>
              <td style={{ padding: "11px 14px", fontSize: 12 }}>{gp.receivingOffice}</td>
              <td style={{ padding: "11px 14px", fontSize: 12, whiteSpace: "nowrap" }}>{formatDate(gp.date)}</td>
              <td style={{ padding: "11px 14px" }}><button onClick={() => setSelected(gp)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: T.primaryLight, border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, color: T.primary, fontWeight: 600 }}><Eye size={13} /> View / Print</button></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
}

// ============================================================
// GATE PASS PRINT (exact physical format + policy circular)
// ============================================================
function GatePassPrint({ gp, onBack }) {
  const printRef = useRef();

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>Gate Pass - ${gp.gatePassNo}</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:"Times New Roman",serif;font-size:11pt;background:#fff;color:#000;}@media print{body{margin:0;}}.gp{max-width:800px;margin:0 auto;padding:20px;}table{border-collapse:collapse;}td,th{border:1px solid #000;padding:5px 8px;font-size:10pt;vertical-align:top;}th{background:#f5f5f5;font-weight:bold;}h1{font-size:16pt;text-align:center;text-decoration:underline;font-weight:bold;}h2{font-size:13pt;text-align:center;text-decoration:underline;font-weight:bold;}</style></head><body><div class="gp">${content}</div></body></html>`);
    win.document.close();
    setTimeout(() => { win.print(); win.close(); }, 300);
  };

  const a = gp.asset;
  const issueDate = gp.date ? new Date(gp.date).toLocaleString("en-IN") : "-";

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#fff", border: `1.5px solid ${T.border}`, borderRadius: 8, fontSize: 13, cursor: "pointer" }}><ChevronLeft size={16} /> Back</button>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: 0 }}>Gate Pass — {gp.gatePassNo}</h2>
        <div style={{ marginLeft: "auto" }}><Btn onClick={handlePrint} color={T.primary} icon={<PrintIcon size={16} />}>Print Gate Pass</Btn></div>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.border}`, padding: 30, maxWidth: 820, margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <div ref={printRef}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ width: 70, height: 70, border: "2px solid #333", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><div style={{ textAlign: "center", fontSize: 7, fontWeight: 700, lineHeight: 1.3 }}><div>⚡</div><div>मप्र मध्य</div><div>क्षेत्र विद्युत</div><div>वितरण</div></div></div>
            <div style={{ textAlign: "center", flex: 1 }}>
              <h1 style={{ fontSize: 18, fontWeight: 900, textDecoration: "underline", letterSpacing: 1 }}>GATE PASS CERTIFICATE</h1>
              <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>As per Policy Circular No. {POLICY_CIRCULAR}</div>
            </div>
            <div style={{ width: 70 }}></div>
          </div>

          <div style={{ borderTop: "2px solid #000", borderBottom: "1px solid #000", padding: "8px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 30px", marginBottom: 14, fontSize: 11 }}>
            <div><strong>Gate Pass No:</strong> {gp.gatePassNo}</div>
            <div><strong>Issued to Region:</strong> {gp.issuedToRegion}</div>
            <div><strong>Issued to Circle:</strong> {gp.issuedToCircle || "None"}</div>
            <div><strong>Issued to Division:</strong> {gp.issuedToDivision || "None"}</div>
            <div><strong>Issued to Office:</strong> {gp.receivingOffice}</div>
            <div><strong>Issued to Person:</strong> {gp.receivingPerson}</div>
            <div><strong>Designation:</strong> {gp.receivingDesignation}</div>
            <div><strong>Issued on date & time:</strong> {issueDate}</div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginBottom: 14 }}>
            <thead><tr style={{ background: "#f5f5f5" }}>{["Gate Pass No", "Item Type", "Item Name", "Item Make", "Item Serial No", "Item Model No", "Warranty End Date"].map(h => <th key={h} style={{ border: "1px solid #000", padding: "5px 7px", fontSize: 10, fontWeight: 700, textAlign: "left" }}>{h}</th>)}</tr></thead>
            <tbody><tr>{[gp.gatePassNo, a?.deviceName, a?.deviceName, a?.makeName, a?.serialNo, a?.model, a?.warrantyEnd].map((v, i) => <td key={i} style={{ border: "1px solid #000", padding: "5px 7px", fontSize: 10 }}>{v}</td>)}</tr></tbody>
          </table>

          <div style={{ textAlign: "center", fontSize: 13, fontWeight: 700, textDecoration: "underline", marginBottom: 10 }}>- - - - - * * * * * - - - - -<br />Issuing-Recieving Detail</div>

          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginBottom: 12, fontSize: 11 }}>
            <tbody>
              {[["Receiving Person Name:", gp.receivingPerson, "Authorized Person Name:", gp.authorizedBy], ["Receiving Person Designation:", gp.receivingDesignation, "Authorized Person Designation:", gp.authorizedDesignation], ["Receiving Person Office:", gp.receivingOffice, "Authorized Person Office:", gp.authorizedOffice], ["Receiving Person Mobile No:", gp.receivingMobile, "Authorized Person Mobile No:", gp.authorizedMobile], ["Recieving-Date:", formatDate(gp.date), "Place:", gp.place || "Bhopal"]].map(([l1, v1, l2, v2], i) => (
                <tr key={i}><td style={{ border: "1px solid #000", padding: "5px 8px", width: "25%", fontWeight: 700 }}>{l1}</td><td style={{ border: "1px solid #000", padding: "5px 8px", width: "25%" }}>{v1}</td><td style={{ border: "1px solid #000", padding: "5px 8px", width: "25%", fontWeight: 700 }}>{l2}</td><td style={{ border: "1px solid #000", padding: "5px 8px", width: "25%" }}>{v2}</td></tr>
              ))}
              <tr><td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700 }}>Receiving Person Sign:</td><td style={{ border: "1px solid #000", padding: "35px 8px 5px" }}></td><td style={{ border: "1px solid #000", padding: "5px 8px", fontWeight: 700 }}>Authorized Person Sign:</td><td style={{ border: "1px solid #000", padding: "35px 8px 5px" }}></td></tr>
            </tbody>
          </table>

          <div style={{ fontSize: 10, marginTop: 10 }}>
            <strong>Note:-</strong>
            <p style={{ marginTop: 3 }}>The asset(s) are governed through MPMKVVCL's IT Equipment Policy Circular no. {POLICY_CIRCULAR}</p>
          </div>
          {a?.room && <div style={{ marginTop: 20, fontFamily: "cursive", fontSize: 16 }}>Room- {a.room}</div>}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// BUYBACK MODULE
// ============================================================
function BuybackModule({ assets, buybacks, onAddBuyback, user }) {
  const [form, setForm] = useState({ assetId: "", buybackType: "", buybackBy: "", amount: "", date: new Date().toISOString().split("T")[0], remarks: "" });
  const [saved, setSaved] = useState(false);
  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }));

  const eligibleAssets = assets.filter(a => buybackEligible(a.purchaseDate));
  const selectedAsset = assets.find(a => a.id === form.assetId);

  const handleSave = () => {
    if (!form.assetId || !form.buybackType || !form.buybackBy) return;
    onAddBuyback({ id: newId("BB-"), ...form, amount: parseFloat(form.amount) || buybackValue(selectedAsset?.bookValue), createdBy: user.fullName, createdAt: new Date().toISOString() });
    setForm({ assetId: "", buybackType: "", buybackBy: "", amount: "", date: new Date().toISOString().split("T")[0], remarks: "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Buyback Module</h2>
        <p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Assets eligible for buyback after 5 years at 10% of book value + 18% GST</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <Card style={{ marginBottom: 16, background: "#f0fdf4", border: `1px solid ${T.success}` }}>
            <SectionTitle>Buyback Policy</SectionTitle>
            <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}><CheckCircle size={16} color={T.success} style={{ flexShrink: 0, marginTop: 2 }} /><span><strong>Eligibility:</strong> Asset must be ≥5 years old from purchase date</span></div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}><CheckCircle size={16} color={T.success} style={{ flexShrink: 0, marginTop: 2 }} /><span><strong>Buyback Value:</strong> 10% of original Book Value + 18% GST</span></div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}><CheckCircle size={16} color={T.success} style={{ flexShrink: 0, marginTop: 2 }} /><span><strong>Vendor Buyback:</strong> OEM vendor purchases back the asset</span></div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}><CheckCircle size={16} color={T.success} style={{ flexShrink: 0, marginTop: 2 }} /><span><strong>IT Dept Buyback:</strong> MPMKVVCL IT team purchases asset internally</span></div>
              <div style={{ display: "flex", gap: 8 }}><CheckCircle size={16} color={T.success} style={{ flexShrink: 0, marginTop: 2 }} /><span><strong>Employee Buyback:</strong> Assigned employee purchases at buyback value</span></div>
            </div>
          </Card>

          {canEdit(user) && <Card>
            <SectionTitle>Register Buyback</SectionTitle>
            {saved && <div style={{ background: T.successLight, color: T.success, borderRadius: 8, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center", fontWeight: 600 }}><CheckCircle size={16} /> Buyback registered successfully!</div>}
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Select Eligible Asset *</label>
                <select value={form.assetId} onChange={e => { set("assetId")(e.target.value); const a = assets.find(x => x.id === e.target.value); set("amount")(a ? buybackValue(a.bookValue) : ""); }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                  <option value="">-- Select Asset (≥5 years old) --</option>
                  {eligibleAssets.map(a => <option key={a.id} value={a.id}>{a.gatePassNo} | {a.deviceName} {a.makeName} — {a.serialNo} ({yearsOld(a.purchaseDate).toFixed(1)} yrs)</option>)}
                </select>
              </div>
              {selectedAsset && <div style={{ background: "#f8fafc", borderRadius: 8, padding: 12, fontSize: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div><span style={{ color: T.textLight }}>Book Value: </span><strong>₹{(selectedAsset.bookValue || 0).toLocaleString("en-IN")}</strong></div>
                  <div><span style={{ color: T.textLight }}>Age: </span><strong>{yearsOld(selectedAsset.purchaseDate).toFixed(1)} years</strong></div>
                  <div style={{ gridColumn: "span 2" }}><span style={{ color: T.textLight }}>Buyback Value (10%+GST): </span><strong style={{ color: T.success, fontSize: 16 }}>₹{buybackValue(selectedAsset.bookValue).toLocaleString("en-IN")}</strong></div>
                </div>
              </div>}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Buyback Type *</label>
                <select value={form.buybackType} onChange={e => set("buybackType")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                  <option value="">-- Select Type --</option>
                  <option value="Vendor Buyback">Vendor Buyback (OEM)</option>
                  <option value="IT Department Buyback">IT Department Buyback</option>
                  <option value="Employee Buyback">Employee Buyback</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Buyback By (Name / Vendor) *</label>
                <input value={form.buybackBy} onChange={e => set("buybackBy")(e.target.value)} placeholder="Person name or vendor name" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Amount (₹)</label>
                  <input type="number" value={form.amount} onChange={e => set("amount")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Date</label>
                  <input type="date" value={form.date} onChange={e => set("date")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Remarks</label>
                <textarea value={form.remarks} onChange={e => set("remarks")(e.target.value)} rows={2} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <Btn onClick={handleSave} color={T.primary} icon={<CheckCircle size={16} />} disabled={!form.assetId || !form.buybackType || !form.buybackBy}>Register Buyback</Btn>
            </div>
          </Card>}
        </div>

        <div>
          <Card style={{ marginBottom: 16 }}>
            <SectionTitle>Eligible Assets ({eligibleAssets.length})</SectionTitle>
            <div style={{ maxHeight: 300, overflowY: "auto" }}>
              {eligibleAssets.length === 0 ? <p style={{ color: T.textLight, fontSize: 13, textAlign: "center", padding: 20 }}>No assets eligible yet</p>
                : eligibleAssets.map(a => (
                  <div key={a.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ width: 40, height: 40, background: T.successLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><DollarSign size={18} color={T.success} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{a.deviceName} — {a.makeName} {a.model}</div>
                      <div style={{ fontSize: 11, color: T.textLight }}>{a.assignedTo} | {yearsOld(a.purchaseDate).toFixed(1)} years old</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: T.success }}>₹{buybackValue(a.bookValue).toLocaleString("en-IN")}</div>
                      <div style={{ fontSize: 10, color: T.textLight }}>Buyback Value</div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          <Card>
            <SectionTitle>Buyback Records ({buybacks.length})</SectionTitle>
            {buybacks.length === 0 ? <p style={{ color: T.textLight, fontSize: 13, textAlign: "center", padding: 20 }}>No buybacks recorded yet</p>
              : buybacks.map(b => {
                const a = assets.find(x => x.id === b.assetId);
                return (
                  <div key={b.id} style={{ padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{a?.deviceName} — {a?.makeName}</span>
                      <Badge color="#fff" bg={T.success} small>{b.buybackType}</Badge>
                    </div>
                    <div style={{ fontSize: 11, color: T.textMid }}>{b.buybackBy} | ₹{b.amount?.toLocaleString("en-IN")} | {formatDate(b.date)}</div>
                    {b.remarks && <div style={{ fontSize: 11, color: T.textLight }}>{b.remarks}</div>}
                  </div>
                );
              })}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ACTIVITY LOG
// ============================================================
function ActivityLog({ history, assets }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => { let h = [...history].reverse(); if (search) h = h.filter(x => JSON.stringify(x).toLowerCase().includes(search.toLowerCase())); if (filter) h = h.filter(x => x.action === filter); return h; }, [history, search, filter]);
  const actionColors = { Created: T.success, Transferred: T.primary, "Status Changed": T.warning, Updated: T.info, Deleted: T.danger, "Bulk Import": T.accent };
  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}><h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Activity Log</h2><p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Complete audit trail of all actions</p></div>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
          <div style={{ position: "relative" }}><Search size={15} color={T.textLight} style={{ position: "absolute", left: 10, top: 11 }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: "10px 10px 10px 32px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} /></div>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "10px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}><option value="">All Actions</option>{[...new Set(history.map(h => h.action))].map(a => <option key={a} value={a}>{a}</option>)}</select>
        </div>
      </Card>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ background: "#f8fafc", borderBottom: `2px solid ${T.border}` }}>{["#", "Asset ID", "Action", "Details", "Performed By", "Timestamp"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: "center", padding: 40, color: T.textLight }}>No activity found</td></tr>}
            {filtered.map((h, i) => {
              const asset = assets.find(a => a.id === h.assetId);
              return <tr key={h.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                <td style={{ padding: "10px 14px", color: T.textLight, fontSize: 11 }}>{i + 1}</td>
                <td style={{ padding: "10px 14px" }}><div style={{ fontWeight: 700, fontSize: 12, color: T.primary }}>{h.assetId}</div>{asset && <div style={{ fontSize: 10, color: T.textLight }}>{asset.deviceName}</div>}</td>
                <td style={{ padding: "10px 14px" }}><Badge color="#fff" bg={actionColors[h.action] || T.primary} small>{h.action}</Badge></td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: T.textMid, maxWidth: 300 }}>{h.details}</td>
                <td style={{ padding: "10px 14px", fontSize: 12 }}>{h.performedBy}</td>
                <td style={{ padding: "10px 14px", fontSize: 11, color: T.textMid, whiteSpace: "nowrap" }}>{formatDateTime(h.timestamp)}</td>
              </tr>;
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ============================================================
// DOCUMENT REFERENCES
// ============================================================
function DocumentRefs({ assets }) {
  const allDocs = useMemo(() => { const d = []; assets.forEach(a => { (a.docReferences || []).forEach(doc => d.push({ ...doc, assetId: a.id, assetName: a.deviceName, assetMake: a.makeName })); }); return d; }, [assets]);
  const [search, setSearch] = useState("");
  const filtered = allDocs.filter(d => !search || JSON.stringify(d).toLowerCase().includes(search.toLowerCase()));
  const byType = useMemo(() => { const t = {}; allDocs.forEach(d => { t[d.type] = (t[d.type] || 0) + 1; }); return t; }, [allDocs]);
  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}><h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Document References</h2><p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>All circulars, orders and references attached to assets</p></div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {Object.entries(byType).map(([type, count]) => <div key={type} style={{ background: "#fff", borderRadius: 10, padding: "10px 16px", border: `1px solid ${T.border}`, display: "flex", gap: 10, alignItems: "center" }}><FileText size={16} color={T.primary} /><div><div style={{ fontSize: 11, color: T.textLight }}>{type}</div><div style={{ fontSize: 18, fontWeight: 800 }}>{count}</div></div></div>)}
      </div>
      <Card style={{ marginBottom: 16 }}><div style={{ position: "relative" }}><Search size={15} color={T.textLight} style={{ position: "absolute", left: 10, top: 11 }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search references..." style={{ width: "100%", padding: "10px 10px 10px 32px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} /></div></Card>
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ background: "#f8fafc", borderBottom: `2px solid ${T.border}` }}>{["Type", "Reference No", "Date", "Asset", "Notes"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={5} style={{ textAlign: "center", padding: 40, color: T.textLight }}>No documents found</td></tr>}
            {filtered.map((d, i) => <tr key={i} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
              <td style={{ padding: "10px 14px" }}><Badge color={T.primary} bg={T.primaryLight} small>{d.type}</Badge></td>
              <td style={{ padding: "10px 14px", fontWeight: 700 }}>{d.refNo}</td>
              <td style={{ padding: "10px 14px", fontSize: 12 }}>{formatDate(d.date)}</td>
              <td style={{ padding: "10px 14px" }}><div style={{ fontWeight: 600, fontSize: 12 }}>{d.assetName}</div><div style={{ fontSize: 10, color: T.textLight }}>{d.assetId}</div></td>
              <td style={{ padding: "10px 14px", fontSize: 12, color: T.textMid }}>{d.note || "-"}</td>
            </tr>)}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ============================================================
// REPORTS
// ============================================================
function Reports({ assets, transfers }) {
  const warrantyData = [{ name: "Within Warranty", value: assets.filter(a => !isWarrantyExpired(a.warrantyEnd)).length, color: T.success }, { name: "Beyond Warranty", value: assets.filter(a => isWarrantyExpired(a.warrantyEnd)).length, color: T.danger }, { name: "Expiring Soon", value: assets.filter(a => isWarrantyExpiringSoon(a.warrantyEnd)).length, color: T.warning }];
  const statusData = STATUS_OPTIONS.map(s => ({ name: s.replace("Warranty Period", "Warranty").replace("Within ", "✓").replace("Beyond ", "✗"), value: assets.filter(a => a.status === s).length })).filter(x => x.value > 0);
  const COLORS = [T.primary, T.info, T.success, T.warning, T.danger, T.accent];
  const exportCSV = () => {
    const headers = ["ID", "Gate Pass", "Device Type", "Make", "Model", "Serial No", "Purchase Date", "Warranty End", "Status", "Book Value", "Region", "Circle", "Division", "Assigned To", "Designation", "Transfers", "Buyback Eligible", "Buyback Value"];
    const rows = assets.map(a => [a.id, a.gatePassNo, a.deviceName, a.makeName, a.model, a.serialNo, a.purchaseDate, a.warrantyEnd, a.status, a.bookValue, a.region, a.circle, a.division, a.assignedTo, a.designation, a.transferCount, buybackEligible(a.purchaseDate) ? "Yes" : "No", buybackValue(a.bookValue)]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `MPMKVVCL_Assets_${new Date().toISOString().split("T")[0]}.csv`; a.click();
  };
  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Reports</h2><p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Analytics and exportable reports</p></div>
        <Btn onClick={exportCSV} color={T.success} icon={<Download size={16} />}>Export All Assets (CSV)</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card><SectionTitle>Warranty Status</SectionTitle><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={warrantyData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""} labelLine={false}>{warrantyData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card>
        <Card><SectionTitle>Asset Status</SectionTitle><ResponsiveContainer width="100%" height={200}><BarChart data={statusData} margin={{ left: -25, right: 10, top: 5, bottom: 5 }}><XAxis dataKey="name" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 10 }} /><Tooltip /><Bar dataKey="value" radius={[4, 4, 0, 0]}>{statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar></BarChart></ResponsiveContainer></Card>
        <Card><SectionTitle>Summary</SectionTitle><div style={{ display: "grid", gap: 12 }}>{[["Total Assets", assets.length, T.primary], ["Total Transfers", transfers.length, T.info], ["Beyond Warranty", assets.filter(a => isWarrantyExpired(a.warrantyEnd)).length, T.danger], ["Buyback Eligible", assets.filter(a => buybackEligible(a.purchaseDate)).length, T.success], ["Regions Covered", new Set(assets.map(a => a.region)).size, T.warning]].map(([label, val, color]) => <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}><span style={{ fontSize: 13, color: T.textMid }}>{label}</span><span style={{ fontSize: 20, fontWeight: 800, color }}>{val}</span></div>)}</div></Card>
      </div>
    </div>
  );
}

// ============================================================
// EQUIPMENT MASTER (Master Admin Only)
// ============================================================
function EquipmentMaster({ deviceTypes, makes, onUpdateDeviceTypes, onUpdateMakes }) {
  const [activeTab, setActiveTab] = useState("devices");
  const [newDevice, setNewDevice] = useState({ name: "" });
  const [newMake, setNewMake] = useState({ name: "", deviceCode: "" });
  const [editDevice, setEditDevice] = useState(null);
  const [editMake, setEditMake] = useState(null);

  const addDevice = () => {
    if (!newDevice.name) return;
    const code = Math.max(...deviceTypes.map(d => d.code)) + 1;
    onUpdateDeviceTypes([...deviceTypes, { code, name: newDevice.name }]);
    setNewDevice({ name: "" });
  };

  const addMake = () => {
    if (!newMake.name || !newMake.deviceCode) return;
    const code = Math.max(...makes.map(m => m.code)) + 1;
    onUpdateMakes([...makes, { code, name: newMake.name, deviceCode: parseInt(newMake.deviceCode) }]);
    setNewMake({ name: "", deviceCode: "" });
  };

  const deleteDevice = (code) => onUpdateDeviceTypes(deviceTypes.filter(d => d.code !== code));
  const deleteMake = (code) => onUpdateMakes(makes.filter(m => m.code !== code));

  const saveEditDevice = () => { onUpdateDeviceTypes(deviceTypes.map(d => d.code === editDevice.code ? editDevice : d)); setEditDevice(null); };
  const saveEditMake = () => { onUpdateMakes(makes.map(m => m.code === editMake.code ? { ...editMake, deviceCode: parseInt(editMake.deviceCode) } : m)); setEditMake(null); };

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Equipment Master</h2>
        <p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Manage device types and OEM makes — Master Admin only</p>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "#fff", borderRadius: 10, padding: 4, border: `1px solid ${T.border}`, width: "fit-content" }}>
        {[{ id: "devices", label: `Device Types (${deviceTypes.length})` }, { id: "makes", label: `OEM Makes (${makes.length})` }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "8px 20px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", background: activeTab === tab.id ? T.primary : "transparent", color: activeTab === tab.id ? "#fff" : T.textMid, transition: "all 0.15s" }}>{tab.label}</button>
        ))}
      </div>

      {activeTab === "devices" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
          <Card>
            <SectionTitle>Add New Device Type</SectionTitle>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Device Name</label>
              <input value={newDevice.name} onChange={e => setNewDevice({ name: e.target.value })} placeholder="e.g., Smart TV" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
            </div>
            <Btn onClick={addDevice} color={T.primary} small icon={<Plus size={14} />}>Add Device Type</Btn>
          </Card>
          <Card>
            <SectionTitle>All Device Types ({deviceTypes.length})</SectionTitle>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ background: "#f8fafc" }}><th style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid }}>Code</th><th style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid }}>Device Name</th><th style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid }}>Actions</th></tr></thead>
                <tbody>{deviceTypes.map(d => (
                  <tr key={d.code} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "8px 12px" }}><Badge color={T.primary} bg={T.primaryLight} small>{d.code}</Badge></td>
                    <td style={{ padding: "8px 12px" }}>{editDevice?.code === d.code ? <input value={editDevice.name} onChange={e => setEditDevice(p => ({ ...p, name: e.target.value }))} style={{ padding: "6px 10px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontSize: 13 }} /> : d.name}</td>
                    <td style={{ padding: "8px 12px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {editDevice?.code === d.code ? <><button onClick={saveEditDevice} style={{ background: T.successLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><CheckCircle size={13} color={T.success} /></button><button onClick={() => setEditDevice(null)} style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><X size={13} color={T.danger} /></button></>
                          : <><button onClick={() => setEditDevice(d)} style={{ background: T.infoLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><Edit size={13} color={T.info} /></button><button onClick={() => deleteDevice(d.code)} style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><Trash2 size={13} color={T.danger} /></button></>}
                      </div>
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "makes" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16 }}>
          <Card>
            <SectionTitle>Add New OEM / Make</SectionTitle>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Device Type</label>
              <select value={newMake.deviceCode} onChange={e => setNewMake(p => ({ ...p, deviceCode: e.target.value }))} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                <option value="">-- Select Device Type --</option>
                {deviceTypes.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Make / OEM Name</label>
              <input value={newMake.name} onChange={e => setNewMake(p => ({ ...p, name: e.target.value }))} placeholder="e.g., Apple" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
            </div>
            <Btn onClick={addMake} color={T.primary} small icon={<Plus size={14} />}>Add Make</Btn>
          </Card>
          <Card>
            <SectionTitle>All OEM Makes ({makes.length})</SectionTitle>
            <div style={{ maxHeight: 400, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ background: "#f8fafc" }}>{["Code", "Device Type", "Make Name", "Actions"].map(h => <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid }}>{h}</th>)}</tr></thead>
                <tbody>{makes.map(m => {
                  const dt = deviceTypes.find(d => d.code === m.deviceCode);
                  return <tr key={m.code} style={{ borderBottom: `1px solid ${T.border}` }}>
                    <td style={{ padding: "8px 12px" }}><Badge color={T.info} bg={T.infoLight} small>{m.code}</Badge></td>
                    <td style={{ padding: "8px 12px", fontSize: 12 }}>{editMake?.code === m.code ? <select value={editMake.deviceCode} onChange={e => setEditMake(p => ({ ...p, deviceCode: e.target.value }))} style={{ padding: "5px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontSize: 12 }}>{deviceTypes.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}</select> : dt?.name}</td>
                    <td style={{ padding: "8px 12px" }}>{editMake?.code === m.code ? <input value={editMake.name} onChange={e => setEditMake(p => ({ ...p, name: e.target.value }))} style={{ padding: "6px 10px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontSize: 13 }} /> : m.name}</td>
                    <td style={{ padding: "8px 12px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {editMake?.code === m.code ? <><button onClick={saveEditMake} style={{ background: T.successLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><CheckCircle size={13} color={T.success} /></button><button onClick={() => setEditMake(null)} style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><X size={13} color={T.danger} /></button></>
                          : <><button onClick={() => setEditMake(m)} style={{ background: T.infoLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><Edit size={13} color={T.info} /></button><button onClick={() => deleteMake(m.code)} style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer" }}><Trash2 size={13} color={T.danger} /></button></>}
                      </div>
                    </td>
                  </tr>;
                })}</tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ============================================================
// USER MANAGEMENT (Master Admin Only)
// ============================================================
function UserManagement({ users, onUpdateUsers }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ loginName: "", loginId: "", password: "Pass@123", fullName: "", role: "Circle User", accessLevel: 3, designation: "", mobile: "", empCode: "", status: "enabled", circleCode: 0, regionCode: 0 });
  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }));
  const roleColors = { "Master Admin": T.danger, "Corporate Admin": T.info, "Circle User": T.success };

  const addUser = () => {
    if (!form.loginId || !form.fullName) return;
    onUpdateUsers([...users, { ...form, id: Date.now(), accessLevel: parseInt(form.accessLevel) }]);
    setShowAdd(false);
    setForm({ loginName: "", loginId: "", password: "Pass@123", fullName: "", role: "Circle User", accessLevel: 3, designation: "", mobile: "", empCode: "", status: "enabled", circleCode: 0, regionCode: 0 });
  };

  const toggleStatus = (id) => onUpdateUsers(users.map(u => u.id === id ? { ...u, status: u.status === "enabled" ? "disabled" : "enabled" } : u));
  const deleteUser = (id) => { if (id === 1) return; onUpdateUsers(users.filter(u => u.id !== id)); };

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div><h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>User Management</h2><p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Manage portal users and access levels</p></div>
        <Btn onClick={() => setShowAdd(p => !p)} color={T.primary} icon={<UserPlus size={16} />}>Add User</Btn>
      </div>

      {showAdd && <Card style={{ marginBottom: 20, borderLeft: `4px solid ${T.primary}` }}>
        <SectionTitle>Add New User</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[["Login ID", "loginId"], ["Full Name", "fullName"], ["Login Name", "loginName"], ["Password", "password"], ["Designation", "designation"], ["Mobile", "mobile"], ["Employee Code", "empCode"]].map(([label, field]) => (
            <div key={field}><label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>{label}</label><input value={form[field]} onChange={e => set(field)(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} /></div>
          ))}
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Access Level</label>
            <select value={form.accessLevel} onChange={e => { set("accessLevel")(e.target.value); set("role")(e.target.value === "1" ? "Master Admin" : e.target.value === "2" ? "Corporate Admin" : "Circle User"); }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
              <option value={1}>1 — Master Admin</option>
              <option value={2}>2 — Corporate Admin</option>
              <option value={3}>3 — Circle User</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>Status</label>
            <select value={form.status} onChange={e => set("status")(e.target.value)} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <Btn onClick={addUser} color={T.primary} icon={<CheckCircle size={16} />}>Save User</Btn>
          <Btn onClick={() => setShowAdd(false)} outline color={T.textMid}>Cancel</Btn>
        </div>
      </Card>}

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ background: "#f8fafc", borderBottom: `2px solid ${T.border}` }}>{["#", "Full Name", "Login ID", "Role", "Designation", "Mobile", "Status", "Actions"].map(h => <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase" }}>{h}</th>)}</tr></thead>
          <tbody>{users.map((u, i) => (
            <tr key={u.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
              <td style={{ padding: "11px 14px", color: T.textLight }}>{i + 1}</td>
              <td style={{ padding: "11px 14px", fontWeight: 600 }}>{u.fullName}</td>
              <td style={{ padding: "11px 14px", fontFamily: "monospace", fontSize: 12 }}>{u.loginId}</td>
              <td style={{ padding: "11px 14px" }}><Badge color="#fff" bg={roleColors[u.role] || T.primary} small>{u.role}</Badge></td>
              <td style={{ padding: "11px 14px", fontSize: 12 }}>{u.designation || "-"}</td>
              <td style={{ padding: "11px 14px", fontSize: 12 }}>{u.mobile || "-"}</td>
              <td style={{ padding: "11px 14px" }}><Badge color="#fff" bg={u.status === "enabled" ? T.success : T.danger} small>{u.status}</Badge></td>
              <td style={{ padding: "11px 14px" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => toggleStatus(u.id)} title={u.status === "enabled" ? "Disable" : "Enable"} style={{ background: u.status === "enabled" ? T.warningLight : T.successLight, border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}>{u.status === "enabled" ? <Lock size={13} color={T.warning} /> : <CheckCircle size={13} color={T.success} />}</button>
                  {u.id !== 1 && <button onClick={() => deleteUser(u.id)} title="Delete" style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}><Trash2 size={13} color={T.danger} /></button>}
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
    </div>
  );
}

// ============================================================
// DROPDOWN SETTINGS (Master Admin Only — full customization)
// ============================================================
function DropdownSettings({ dropdownSettings, onUpdateDropdownSettings }) {
  const [activeSection, setActiveSection] = useState("designations");
  const [newItem, setNewItem] = useState("");
  const settings = dropdownSettings || { designations: DESIGNATIONS, docTypes: DOC_TYPES, statusOptions: STATUS_OPTIONS };

  const sections = [
    { id: "designations", label: "Designations", key: "designations" },
    { id: "docTypes", label: "Document Types", key: "docTypes" },
    { id: "statusOptions", label: "Status Options", key: "statusOptions" },
  ];

  const currentList = settings[activeSection] || [];

  const addItem = () => {
    if (!newItem.trim()) return;
    onUpdateDropdownSettings({ ...settings, [activeSection]: [...currentList, newItem.trim()] });
    setNewItem("");
  };

  const removeItem = (i) => onUpdateDropdownSettings({ ...settings, [activeSection]: currentList.filter((_, idx) => idx !== i) });

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}><h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Dropdown Settings</h2><p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Customize all dropdown options — Master Admin only</p></div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
        <Card style={{ padding: 8 }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{ width: "100%", padding: "10px 14px", textAlign: "left", background: activeSection === s.id ? T.primaryLight : "transparent", border: "none", borderRadius: 8, fontSize: 13, fontWeight: activeSection === s.id ? 700 : 500, color: activeSection === s.id ? T.primary : T.text, cursor: "pointer", marginBottom: 4 }}>{s.label} <span style={{ fontSize: 11, color: T.textLight }}>({(settings[s.id] || []).length})</span></button>
          ))}
        </Card>
        <Card>
          <SectionTitle>{sections.find(s => s.id === activeSection)?.label}</SectionTitle>
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <input value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Type new option and click Add" onKeyDown={e => e.key === "Enter" && addItem()} style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13, boxSizing: "border-box" }} />
            <Btn onClick={addItem} color={T.primary} small icon={<Plus size={14} />}>Add</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {currentList.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 8, padding: "8px 12px", border: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13, color: T.text }}>{item}</span>
                <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, flexShrink: 0 }}><X size={14} color={T.danger} /></button>
              </div>
            ))}
          </div>
          {currentList.length === 0 && <p style={{ color: T.textLight, fontSize: 13, textAlign: "center", padding: 20 }}>No items. Add some above.</p>}
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// HIERARCHY MANAGER (Master Admin Only)
// ============================================================
function HierarchyManager({ hierarchy, onUpdateHierarchy }) {
  const [tab, setTab] = useState("region");
  const [sel, setSel] = useState({ region: "", circle: "", division: "", subdivision: "" });
  const [input, setInput] = useState("");
  const [editVal, setEditVal] = useState("");
  const [editing, setEditing] = useState(null); // { level, key, oldName }
  const [saved, setSaved] = useState(false);

  const h = hierarchy;

  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 1800); };

  // ---- REGION ----
  const addRegion = () => {
    if (!input.trim() || h[input.trim()]) return;
    const n = { ...h, [input.trim()]: {} };
    onUpdateHierarchy(n); setInput(""); flash();
  };
  const deleteRegion = (r) => {
    if (!window.confirm(`Delete region "${r}" and ALL its circles/divisions/DCs?`)) return;
    const n = { ...h }; delete n[r];
    onUpdateHierarchy(n); setSel({ region: "", circle: "", division: "", subdivision: "" });
  };
  const renameRegion = (old, nw) => {
    if (!nw.trim() || nw === old) return;
    const entries = Object.entries(h);
    const n = Object.fromEntries(entries.map(([k, v]) => k === old ? [nw.trim(), v] : [k, v]));
    onUpdateHierarchy(n); setSel(p => ({ ...p, region: p.region === old ? nw.trim() : p.region })); setEditing(null);
  };

  // ---- CIRCLE ----
  const addCircle = () => {
    if (!sel.region || !input.trim()) return;
    if (h[sel.region][input.trim()]) return;
    const n = { ...h, [sel.region]: { ...h[sel.region], [input.trim()]: {} } };
    onUpdateHierarchy(n); setInput(""); flash();
  };
  const deleteCircle = (r, c) => {
    if (!window.confirm(`Delete circle "${c}" and ALL its divisions/DCs?`)) return;
    const n = { ...h, [r]: { ...h[r] } }; delete n[r][c];
    onUpdateHierarchy(n); setSel(p => ({ ...p, circle: "", division: "", subdivision: "" }));
  };
  const renameCircle = (r, old, nw) => {
    if (!nw.trim() || nw === old) return;
    const entries = Object.entries(h[r]);
    const updated = Object.fromEntries(entries.map(([k, v]) => k === old ? [nw.trim(), v] : [k, v]));
    onUpdateHierarchy({ ...h, [r]: updated }); setSel(p => ({ ...p, circle: p.circle === old ? nw.trim() : p.circle })); setEditing(null);
  };

  // ---- DIVISION ----
  const addDivision = () => {
    if (!sel.region || !sel.circle || !input.trim()) return;
    const n = { ...h, [sel.region]: { ...h[sel.region], [sel.circle]: { ...h[sel.region][sel.circle], [input.trim()]: {} } } };
    onUpdateHierarchy(n); setInput(""); flash();
  };
  const deleteDivision = (r, c, d) => {
    if (!window.confirm(`Delete division "${d}"?`)) return;
    const n = { ...h, [r]: { ...h[r], [c]: { ...h[r][c] } } }; delete n[r][c][d];
    onUpdateHierarchy(n); setSel(p => ({ ...p, division: "", subdivision: "" }));
  };
  const renameDivision = (r, c, old, nw) => {
    if (!nw.trim() || nw === old) return;
    const entries = Object.entries(h[r][c]);
    const updated = Object.fromEntries(entries.map(([k, v]) => k === old ? [nw.trim(), v] : [k, v]));
    onUpdateHierarchy({ ...h, [r]: { ...h[r], [c]: updated } }); setSel(p => ({ ...p, division: p.division === old ? nw.trim() : p.division })); setEditing(null);
  };

  // ---- SUBDIVISION ----
  const addSubdivision = () => {
    if (!sel.region || !sel.circle || !sel.division || !input.trim()) return;
    const n = { ...h, [sel.region]: { ...h[sel.region], [sel.circle]: { ...h[sel.region][sel.circle], [sel.division]: { ...(h[sel.region][sel.circle][sel.division] || {}), [input.trim()]: [] } } } };
    onUpdateHierarchy(n); setInput(""); flash();
  };
  const deleteSubdivision = (r, c, d, s) => {
    if (!window.confirm(`Delete sub-division "${s}"?`)) return;
    const n = { ...h, [r]: { ...h[r], [c]: { ...h[r][c], [d]: { ...h[r][c][d] } } } }; delete n[r][c][d][s];
    onUpdateHierarchy(n); setSel(p => ({ ...p, subdivision: "" }));
  };
  const renameSubdivision = (r, c, d, old, nw) => {
    if (!nw.trim() || nw === old) return;
    const entries = Object.entries(h[r][c][d]);
    const updated = Object.fromEntries(entries.map(([k, v]) => k === old ? [nw.trim(), v] : [k, v]));
    onUpdateHierarchy({ ...h, [r]: { ...h[r], [c]: { ...h[r][c], [d]: updated } } }); setSel(p => ({ ...p, subdivision: p.subdivision === old ? nw.trim() : p.subdivision })); setEditing(null);
  };

  // ---- DC ----
  const addDC = () => {
    if (!sel.region || !sel.circle || !sel.division || !sel.subdivision || !input.trim()) return;
    const current = (h[sel.region][sel.circle][sel.division][sel.subdivision] || []);
    if (current.includes(input.trim())) return;
    const n = { ...h, [sel.region]: { ...h[sel.region], [sel.circle]: { ...h[sel.region][sel.circle], [sel.division]: { ...h[sel.region][sel.circle][sel.division], [sel.subdivision]: [...current, input.trim()] } } } };
    onUpdateHierarchy(n); setInput(""); flash();
  };
  const deleteDC = (r, c, d, s, dc) => {
    const current = h[r][c][d][s] || [];
    const n = { ...h, [r]: { ...h[r], [c]: { ...h[r][c], [d]: { ...h[r][c][d], [s]: current.filter(x => x !== dc) } } } };
    onUpdateHierarchy(n);
  };
  const renameDC = (r, c, d, s, old, nw) => {
    if (!nw.trim() || nw === old) return;
    const current = h[r][c][d][s] || [];
    const n = { ...h, [r]: { ...h[r], [c]: { ...h[r][c], [d]: { ...h[r][c][d], [s]: current.map(x => x === old ? nw.trim() : x) } } } };
    onUpdateHierarchy(n); setEditing(null);
  };

  const TABS = [
    { id: "region", label: "Regions", icon: "🗺️" },
    { id: "circle", label: "Circles", icon: "⭕" },
    { id: "division", label: "Divisions", icon: "🏢" },
    { id: "subdivision", label: "Sub-Divisions", icon: "🏬" },
    { id: "dc", label: "Distribution Centres", icon: "⚡" },
  ];

  const selectors = [
    { show: tab !== "region", label: "Region", key: "region", options: Object.keys(h) },
    { show: ["division", "subdivision", "dc"].includes(tab), label: "Circle", key: "circle", options: sel.region ? Object.keys(h[sel.region] || {}) : [] },
    { show: ["subdivision", "dc"].includes(tab), label: "Division", key: "division", options: sel.region && sel.circle ? Object.keys((h[sel.region] || {})[sel.circle] || {}) : [] },
    { show: tab === "dc", label: "Sub-Division", key: "subdivision", options: sel.region && sel.circle && sel.division ? Object.keys(((h[sel.region] || {})[sel.circle] || {})[sel.division] || {}) : [] },
  ].filter(s => s.show);

  const getItems = () => {
    switch (tab) {
      case "region": return Object.keys(h);
      case "circle": return sel.region ? Object.keys(h[sel.region] || {}) : [];
      case "division": return sel.region && sel.circle ? Object.keys((h[sel.region] || {})[sel.circle] || {}) : [];
      case "subdivision": return sel.region && sel.circle && sel.division ? Object.keys(((h[sel.region] || {})[sel.circle] || {})[sel.division] || {}) : [];
      case "dc": return sel.region && sel.circle && sel.division && sel.subdivision ? (((h[sel.region] || {})[sel.circle] || {})[sel.division] || {})[sel.subdivision] || [] : [];
      default: return [];
    }
  };

  const handleAdd = () => {
    switch (tab) {
      case "region": addRegion(); break;
      case "circle": addCircle(); break;
      case "division": addDivision(); break;
      case "subdivision": addSubdivision(); break;
      case "dc": addDC(); break;
    }
  };

  const handleDelete = (item) => {
    switch (tab) {
      case "region": deleteRegion(item); break;
      case "circle": deleteCircle(sel.region, item); break;
      case "division": deleteDivision(sel.region, sel.circle, item); break;
      case "subdivision": deleteSubdivision(sel.region, sel.circle, sel.division, item); break;
      case "dc": deleteDC(sel.region, sel.circle, sel.division, sel.subdivision, item); break;
    }
  };

  const handleRename = (old, nw) => {
    switch (tab) {
      case "region": renameRegion(old, nw); break;
      case "circle": renameCircle(sel.region, old, nw); break;
      case "division": renameDivision(sel.region, sel.circle, old, nw); break;
      case "subdivision": renameSubdivision(sel.region, sel.circle, sel.division, old, nw); break;
      case "dc": renameDC(sel.region, sel.circle, sel.division, sel.subdivision, old, nw); break;
    }
  };

  const requiresContext = (tab === "circle" && !sel.region) ||
    (tab === "division" && (!sel.region || !sel.circle)) ||
    (tab === "subdivision" && (!sel.region || !sel.circle || !sel.division)) ||
    (tab === "dc" && (!sel.region || !sel.circle || !sel.division || !sel.subdivision));

  const items = getItems();

  return (
    <div style={{ padding: 24, fontFamily: "'Segoe UI',sans-serif", background: T.bg, minHeight: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: "0 0 4px" }}>Hierarchy Manager</h2>
        <p style={{ fontSize: 13, color: T.textMid, margin: 0 }}>Add / Edit / Remove Regions, Circles, Divisions, Sub-Divisions & Distribution Centres — Master Admin only</p>
      </div>

      {saved && (
        <div style={{ background: T.successLight, color: T.success, borderRadius: 8, padding: "10px 16px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center", fontWeight: 600, fontSize: 13 }}>
          <CheckCircle size={16} /> Changes saved successfully!
        </div>
      )}

      {/* Tab Bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "#fff", borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden", width: "fit-content" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setInput(""); setEditing(null); }} style={{ padding: "10px 20px", border: "none", borderRight: `1px solid ${T.border}`, background: tab === t.id ? T.primary : "transparent", color: tab === t.id ? "#fff" : T.textMid, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectors.length > 0 ? "260px 1fr" : "1fr", gap: 16 }}>
        {/* Context selectors */}
        {selectors.length > 0 && (
          <div>
            <Card style={{ padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.textMid, marginBottom: 12 }}>📍 Select Context</div>
              {selectors.map(({ label, key, options }) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, display: "block", marginBottom: 4 }}>{label}</label>
                  <select value={sel[key]} onChange={e => {
                    const v = e.target.value;
                    setSel(p => {
                      const u = { ...p, [key]: v };
                      if (key === "region") { u.circle = ""; u.division = ""; u.subdivision = ""; }
                      if (key === "circle") { u.division = ""; u.subdivision = ""; }
                      if (key === "division") { u.subdivision = ""; }
                      return u;
                    });
                    setInput(""); setEditing(null);
                  }} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${T.border}`, fontSize: 13 }}>
                    <option value="">-- Select {label} --</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              {/* Tree Summary */}
              <div style={{ marginTop: 12, background: T.primaryLighter, borderRadius: 8, padding: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.primary, marginBottom: 6 }}>📊 Hierarchy Stats</div>
                <div style={{ fontSize: 11, color: T.textMid }}>Regions: <strong>{Object.keys(h).length}</strong></div>
                <div style={{ fontSize: 11, color: T.textMid }}>Circles: <strong>{Object.values(h).reduce((a, r) => a + Object.keys(r).length, 0)}</strong></div>
                <div style={{ fontSize: 11, color: T.textMid }}>Divisions: <strong>{Object.values(h).reduce((a, r) => a + Object.values(r).reduce((b, c) => b + Object.keys(c).length, 0), 0)}</strong></div>
              </div>
            </Card>
          </div>
        )}

        {/* Main panel */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, borderBottom: `2px solid ${T.primaryLight}`, paddingBottom: 10 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>
              {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
              <span style={{ fontSize: 12, color: T.textLight, fontWeight: 500, marginLeft: 8 }}>({items.length} items)</span>
            </h3>
          </div>

          {requiresContext ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: T.textLight }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>👈</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Select a context on the left to manage {TABS.find(t => t.id === tab)?.label}</div>
            </div>
          ) : (
            <>
              {/* Add input */}
              <div style={{ display: "flex", gap: 10, marginBottom: 20, background: T.primaryLighter, borderRadius: 10, padding: 14 }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAdd()}
                  placeholder={`Type new ${TABS.find(t => t.id === tab)?.label.replace(/s$/, "")} name...`}
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: `2px solid ${T.primary}`, fontSize: 13, outline: "none" }}
                />
                <Btn onClick={handleAdd} color={T.primary} icon={<Plus size={16} />} disabled={!input.trim()}>
                  Add {TABS.find(t => t.id === tab)?.label.replace(/s$/, "")}
                </Btn>
              </div>

              {/* Items list */}
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 0", color: T.textLight, fontSize: 13 }}>
                  No {TABS.find(t => t.id === tab)?.label} found. Add one above.
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {items.map((item) => {
                    const isEditing = editing?.key === item;
                    return (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8fafc", borderRadius: 10, padding: "10px 14px", border: `1.5px solid ${isEditing ? T.primary : T.border}`, transition: "all 0.15s" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.primary, flexShrink: 0 }} />
                        {isEditing ? (
                          <>
                            <input
                              defaultValue={item}
                              id={`edit-${item}`}
                              autoFocus
                              onKeyDown={e => { if (e.key === "Enter") handleRename(item, e.target.value); if (e.key === "Escape") setEditing(null); }}
                              style={{ flex: 1, padding: "6px 10px", borderRadius: 6, border: `2px solid ${T.primary}`, fontSize: 13, outline: "none" }}
                            />
                            <button onClick={() => handleRename(item, document.getElementById(`edit-${item}`).value)} style={{ background: T.success, border: "none", borderRadius: 6, padding: "5px 10px", cursor: "pointer", color: "#fff", fontSize: 12, fontWeight: 600 }}>Save</button>
                            <button onClick={() => setEditing(null)} style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer" }}><X size={13} color={T.danger} /></button>
                          </>
                        ) : (
                          <>
                            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: T.text }}>{item}</span>
                            <button onClick={() => { setEditing({ key: item }); setEditVal(item); }} title="Rename" style={{ background: T.infoLight, border: "none", borderRadius: 6, padding: "5px 7px", cursor: "pointer" }}><Edit size={13} color={T.info} /></button>
                            <button onClick={() => handleDelete(item)} title="Delete" style={{ background: T.dangerLight, border: "none", borderRadius: 6, padding: "5px 7px", cursor: "pointer" }}><Trash2 size={13} color={T.danger} /></button>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function ITAssetManagement() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [transfers, setTransfers] = useState(INITIAL_TRANSFERS);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [buybacks, setBuybacks] = useState(INITIAL_BUYBACKS);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [deviceTypes, setDeviceTypes] = useState(INITIAL_DEVICE_TYPES);
  const [makes, setMakes] = useState(INITIAL_MAKES);
  const [dropdownSettings, setDropdownSettings] = useState({ designations: DESIGNATIONS, docTypes: DOC_TYPES, statusOptions: STATUS_OPTIONS });
  const [hierarchy, setHierarchy] = useState(() => JSON.parse(JSON.stringify(HIERARCHY)));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Keep module-level _H in sync with state so all dropdowns stay live
  useEffect(() => { syncHierarchy(hierarchy); }, [hierarchy]);

  const addLog = useCallback((assetId, action, details, performedBy) => {
    setHistory(prev => [...prev, { id: newId("H"), assetId, action, details, performedBy: performedBy || user?.fullName || "System", timestamp: new Date().toISOString() }]);
  }, [user]);

  const handleSaveAsset = useCallback((asset) => {
    setAssets(prev => { const exists = prev.find(a => a.id === asset.id); if (exists) { addLog(asset.id, "Updated", "Asset details updated", user?.fullName); return prev.map(a => a.id === asset.id ? asset : a); } else { addLog(asset.id, "Created", `Asset registered. Gate Pass: ${asset.gatePassNo}`, user?.fullName); return [...prev, asset]; } });
    setSelectedAsset(null);
  }, [addLog, user]);

  const handleBulkSave = useCallback((newAssets) => {
    setAssets(prev => [...prev, ...newAssets]);
    addLog("BULK", "Bulk Import", `${newAssets.length} assets imported`, user?.fullName);
  }, [addLog, user]);

  const handleTransfer = useCallback((transfer, oldAsset, updatedAsset) => {
    setTransfers(prev => [...prev, transfer]);
    setAssets(prev => prev.map(a => a.id === updatedAsset.id ? { ...updatedAsset, transferCount: (updatedAsset.transferCount || 0) + 1 } : a));
    addLog(transfer.assetId, "Transferred", `From ${transfer.fromOffice} to ${transfer.toOffice} (GP: ${transfer.gatePassNo})`, user?.fullName);
  }, [addLog, user]);

  const handleAddBuyback = useCallback((buyback) => {
    setBuybacks(prev => [...prev, buyback]);
    setAssets(prev => prev.map(a => a.id === buyback.assetId ? { ...a, status: "Disposed" } : a));
    addLog(buyback.assetId, "Buyback", `${buyback.buybackType} by ${buyback.buybackBy} at ₹${buyback.amount}`, user?.fullName);
  }, [addLog, user]);

  if (!user) return <LoginPage onLogin={setUser} users={users} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard assets={assets} transfers={transfers} history={history} onNav={setPage} user={user} />;
      case "asset-list": return <AssetList assets={assets} transfers={transfers} onNav={setPage} onSelectAsset={setSelectedAsset} user={user} />;
      case "add-asset": return <AddAsset editAsset={selectedAsset} onSave={handleSaveAsset} onNav={(p) => { setSelectedAsset(null); setPage(p); }} user={user} deviceTypes={deviceTypes} makes={makes} dropdownSettings={dropdownSettings} />;
      case "bulk-import": return <BulkImport onBulkSave={handleBulkSave} onNav={setPage} user={user} deviceTypes={deviceTypes} makes={makes} />;
      case "transfer": return <TransferAsset assets={assets} selectedAsset={selectedAsset} onTransfer={handleTransfer} onNav={(p) => { setSelectedAsset(null); setPage(p); }} user={user} />;
      case "gate-pass-list": return <GatePassList assets={assets} transfers={transfers} onNav={setPage} />;
      case "buyback": return <BuybackModule assets={assets} buybacks={buybacks} onAddBuyback={handleAddBuyback} user={user} />;
      case "history": return <ActivityLog history={history} assets={assets} />;
      case "documents": return <DocumentRefs assets={assets} />;
      case "reports": return <Reports assets={assets} transfers={transfers} />;
      case "equipment-master": return isMasterAdmin(user) ? <EquipmentMaster deviceTypes={deviceTypes} makes={makes} onUpdateDeviceTypes={setDeviceTypes} onUpdateMakes={setMakes} /> : <div style={{ padding: 40, textAlign: "center", color: T.danger }}>Access Denied — Master Admin Only</div>;
      case "user-management": return isMasterAdmin(user) ? <UserManagement users={users} onUpdateUsers={setUsers} /> : <div style={{ padding: 40, textAlign: "center", color: T.danger }}>Access Denied</div>;
      case "dropdown-settings": return isMasterAdmin(user) ? <DropdownSettings dropdownSettings={dropdownSettings} onUpdateDropdownSettings={setDropdownSettings} /> : <div style={{ padding: 40, textAlign: "center", color: T.danger }}>Access Denied</div>;
      case "hierarchy-manager": return isMasterAdmin(user) ? <HierarchyManager hierarchy={hierarchy} onUpdateHierarchy={setHierarchy} /> : <div style={{ padding: 40, textAlign: "center", color: T.danger }}>Access Denied</div>;
      default: return <Dashboard assets={assets} transfers={transfers} history={history} onNav={setPage} user={user} />;
    }
  };

  const pageTitles = { dashboard: "Dashboard", "asset-list": "Asset Registry", "add-asset": selectedAsset ? "Edit Asset" : "Add New Asset", "bulk-import": "Bulk Import", transfer: "Transfer Asset", "gate-pass-list": "Gate Passes", buyback: "Buyback Module", history: "Activity Log", documents: "Doc References", reports: "Reports", "equipment-master": "Equipment Master", "user-management": "User Management", "dropdown-settings": "Dropdown Settings", "hierarchy-manager": "Hierarchy Manager" };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI',sans-serif" }}>
      {sidebarOpen && <Sidebar current={page} onNav={setPage} user={user} />}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: 56, background: "#fff", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", paddingInline: 20, gap: 12, flexShrink: 0, zIndex: 10 }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6 }}><Menu size={20} color={T.textMid} /></button>
          <div style={{ height: 24, width: 1, background: T.border }} />
          <span style={{ fontSize: 14, color: T.textMid, fontWeight: 600 }}>{pageTitles[page] || "Dashboard"}</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 11, color: T.textMid, textAlign: "right" }}>
              <div style={{ fontWeight: 700 }}>{user.fullName}</div>
              <div style={{ color: { 1: T.danger, 2: T.info, 3: T.success }[user.accessLevel] }}>{user.role}</div>
            </div>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg,${T.primary},${T.accent})`, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{user.fullName[0]}</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", background: T.bg }}>{renderPage()}</div>
      </div>
    </div>
  );
}
