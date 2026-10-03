# SafeSphere — Civic Intelligence & Disaster Safety Platform

SafeSphere is a comprehensive, full-stack emergency response and disaster safety platform connecting citizens with emergency operations centers (EOC) and civil defense administrators.

---

## 🏗️ System Architecture

The repository is organized into three distinct, decoupled sub-systems:

```text
safesphere/
├── backend/       # Express + TypeScript + Prisma API & Real-time Database Layer (Port 5000)
├── frontend/      # Citizen Safety & Tactical Emergency Portal (Port 3000)
├── admin/         # Dedicated Administrative & Operations Console (Port 3001)
├── README.md
└── ...
```

---

## 🚀 Quick Start Guide

### 1. Backend Server & Database
```bash
cd backend
npm install
npx prisma generate
npm run dev
```
*API Base URL*: `http://localhost:5000/api/v1`  
*Health Check*: `http://localhost:5000/api/v1/health`

### 2. Citizen Safety Portal
```bash
cd frontend
npm install
npm run dev
```
*Access URL*: `http://localhost:3000`

### 3. SafeSphere Admin & Operations Console
```bash
cd admin
npm install
npm run dev
```
*Access URL*: `http://localhost:3001` (or directly at `http://localhost:3001/login`)

---

## 🛡️ Default Seeded Credentials

| Role | Email / Identifier | Password | Permitted Portals |
| :--- | :--- | :--- | :--- |
| **Chief Admin** | `admin@safesphere.gov.in` | `SafeSphere@2026` | Admin Console (`:3001`), Citizen Portal (`:3000`) |
| **Disaster Operator** | `operator@gsdma.gov.in` | `SafeSphere@2026` | Admin Console (`:3001`), Citizen Portal (`:3000`) |
| **Public Citizen** | `citizen@safesphere.in` | `SafeSphere@2026` | Citizen Portal (`:3000`) |

---

## 🧪 Testing & Verification

- **Backend Unit & Integration Suite**:
  ```bash
  cd backend && npm test
  ```
- **Typecheck & Production Builds**:
  ```bash
  # Backend
  cd backend && npm run build
  # Citizen Frontend
  cd frontend && npm run build
  # Admin Application
  cd admin && npm run build
  ```