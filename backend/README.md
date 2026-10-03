# SafeSphere Backend API

Production-ready backend API service for SafeSphere built with Express, TypeScript, and Prisma ORM.

## Features
- **Authentication & RBAC**: JWT Access tokens, secure refresh token rotation, bcrypt password hashing, and role-based access control (`ADMIN`, `DISASTER_OPERATOR`, `CITIZEN`).
- **Domain Modules**:
  - `auth`: User registration, login, token refresh, logout, session inspection.
  - `users` & `profile`: Citizen profile management, accessibility parameters, emergency contacts.
  - `disasters` & `guidance`: Disaster types taxonomy, life-safety checklists (Before/During/After).
  - `alerts`: Broadcast disaster alert engine with severity filtering and resolution tracking.
  - `safe-zones`: Geolocation-aware emergency shelters, trauma centers, and safe havens.
  - `emergency-events`: Idempotent SOS emergency dispatch triage and status lifecycle.
  - `assistance`: Special assistance registration for vulnerable citizens (mobility, elderly, ICU).
  - `preparedness`: Interactive preparedness checklists and user progress tracking.
  - `notifications`: Push and in-app emergency notifications with read tracking.
  - `admin`: System-wide telemetry, user moderation, role updates, and comprehensive audit trail.
- **Security & Reliability**: Helmet, CORS, IP rate limiting, request tracking IDs, structured logging, and transactional database integrity.

## Development Commands
```bash
npm install
npx prisma generate
npm run dev
npm test
npm run build
```
