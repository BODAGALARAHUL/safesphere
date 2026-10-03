# SafeSphere Admin Command Console

The dedicated administration, disaster triage, and operational dispatch console for the **SafeSphere Civic Intelligence Platform**.

## Architecture & Ports

| Subsystem | Port | Default URL | Purpose |
| :--- | :--- | :--- | :--- |
| **Admin Console** | `3001` | `http://localhost:3001` | Incident command, user moderation, broadcast warning issuance |
| **Citizen Frontend** | `3000` | `http://localhost:3000` | Public alerts, safe zone map, SOS triggers, survival guides |
| **Backend API** | `5000` | `http://localhost:5000/api/v1` | Express + TypeScript API engine with Supabase PostgreSQL |

---

## Getting Started

### 1. Installation
```bash
cd admin
npm install
```

### 2. Environment Setup
Copy the example environment configuration:
```bash
cp .env.example .env.local
```

### 3. Running in Development
```bash
npm run dev
```
The console will start at `http://localhost:3001`.

### 4. Default Administrator Credentials
- **Admin Email**: `admin@safesphere.gov.in`
- **Master Password**: `SafeSphere@2026`

---

## Administrative Capabilities

- **Command Center Dashboard (`/dashboard`)**: Real-time platform telemetry, database probe status, active alert counters, and incident queue metrics.
- **User Directory (`/users`)**: Search registered citizens and operators, modify access roles (`CITIZEN` $\leftrightarrow$ `DISASTER_OPERATOR` $\leftrightarrow$ `ADMIN`), and suspend/deactivate accounts.
- **Disaster Alerts (`/alerts`)**: Broadcast emergency disaster warnings with impact radius, action steps, avoid rules, and resolve ongoing alerts.
- **Safe Zones & Shelters (`/safe-zones`)**: Register, update, and manage evacuation centers, hospital facilities, coordinates, and real-time occupancy.
- **Emergency SOS Triage (`/emergencies`)**: Monitor incoming citizen distress calls, assign response units, and transition response status (`RECEIVED` $\rightarrow$ `ACKNOWLEDGED` $\rightarrow$ `DISPATCHED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `COMPLETED`).
- **Special Assistance (`/assistance`)**: Prioritize evacuation dispatch for elderly, wheelchair/mobility, maternal, and oxygen/ICU dependent citizens.
- **Security Audit Trail (`/audit-logs`)**: Immutable logging of all administrative actions, IP addresses, resource IDs, and payload metadata.
- **System Settings (`/settings`)**: Inspect rate-limiting policies, token lifetime rules, latency probes, and active admin session details.
