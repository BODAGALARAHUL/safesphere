# SafeSphere Civic Intelligence & Emergency Management API Documentation

Base URL: `http://localhost:5000/api/v1`

---

## 1. System Health & Diagnostics

### `GET /api/v1/health`
- **Description:** Returns service operational status, uptime, environment, and database connectivity.
- **Auth:** None (Public)
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "SafeSphere API is operational",
  "data": {
    "status": "ok",
    "service": "SafeSphere API",
    "version": "1.0.0",
    "environment": "development",
    "database": "connected",
    "uptimeSeconds": 45,
    "timestamp": "2026-10-04T00:30:00.000Z"
  },
  "meta": {
    "timestamp": "2026-10-04T00:30:00.000Z",
    "requestId": "req_1a2b3c4d-5e6f"
  }
}
```

### `GET /api/v1/ready`
- **Description:** Readiness probe verifying database connection.
- **Auth:** None (Public)
- **Response (200 OK / 503 Service Unavailable):**
```json
{
  "success": true,
  "message": "SafeSphere API is ready",
  "data": {
    "status": "ready",
    "database": "connected"
  }
}
```

---

## 2. Authentication & Session

### `POST /api/v1/auth/register`
- **Description:** Register a new citizen account.
- **Auth:** None
- **Rate Limit:** 20 attempts / 15 min
- **Request Body:**
```json
{
  "name": "Citizen Name",
  "email": "citizen@example.com",
  "phone": "+919876543210",
  "password": "StrongPassword123!",
  "preferredLanguage": "en",
  "location": "Paldi, Ahmedabad",
  "latitude": 23.0125,
  "longitude": 72.5642
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Citizen account registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "citizen@example.com",
      "phone": "+919876543210",
      "role": "CITIZEN",
      "status": "ACTIVE",
      "profile": { ... }
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "random_hex_refresh_token"
    }
  }
}
```

### `POST /api/v1/auth/login`
- **Description:** Authenticate user and issue JWT access token & rotating refresh token.
- **Auth:** None
- **Rate Limit:** 20 attempts / 15 min
- **Request Body:**
```json
{
  "identifier": "citizen@example.com",
  "password": "StrongPassword123!"
}
```
- **Response (200 OK):** `{ "success": true, "data": { "user": { ... }, "tokens": { ... } } }`

### `POST /api/v1/auth/refresh`
- **Description:** Rotate refresh token and issue new access token. Detects token reuse.
- **Auth:** None
- **Request Body:** `{ "refreshToken": "..." }`
- **Response (200 OK):** `{ "success": true, "data": { "accessToken": "...", "refreshToken": "..." } }`

### `POST /api/v1/auth/logout`
- **Description:** Invalidate active refresh token.
- **Auth:** Bearer Token

### `GET /api/v1/auth/me`
- **Description:** Get authenticated user profile and emergency contacts.
- **Auth:** Bearer Token

---

## 3. Users & Profiles

### `GET /api/v1/users/me` & `PATCH /api/v1/users/me`
- **Description:** Get or update current user settings (email, phone, language).
- **Auth:** Bearer Token

### `GET /api/v1/profile` & `PATCH /api/v1/profile`
- **Description:** Get or update citizen demographic & medical assistance preferences.
- **Auth:** Bearer Token
- **Request Body (PATCH):**
```json
{
  "name": "Updated Name",
  "location": "Navrangpura, Ahmedabad",
  "accessibilityNeeds": "Wheelchair ramp required",
  "medicalNotes": "Diabetic, insulin refrigerated"
}
```

---

## 4. Emergency Contacts

### `GET /api/v1/emergency-contacts`
- **Description:** List current user's private emergency contacts.
- **Auth:** Bearer Token

### `POST /api/v1/emergency-contacts`
- **Description:** Add emergency contact.
- **Auth:** Bearer Token
- **Request Body:**
```json
{
  "name": "Priya Patel",
  "phone": "+919876500000",
  "relationship": "Sister",
  "priority": 1,
  "isPrimary": true
}
```

### `GET /api/v1/emergency-contacts/:id` & `PATCH /api/v1/emergency-contacts/:id` & `DELETE /api/v1/emergency-contacts/:id`
- **Description:** Get, update, or soft-delete emergency contact (strictly verifies user ownership).
- **Auth:** Bearer Token

---

## 5. Disasters Catalog

### `GET /api/v1/disasters` & `GET /api/v1/disasters/:id`
- **Description:** Public catalogue of disaster classifications (`FLOOD`, `CYCLONE`, `EARTHQUAKE`, `LANDSLIDE`, `FIRE`).
- **Auth:** Public

### `POST /api/v1/disasters`, `PATCH /api/v1/disasters/:id`, `DELETE /api/v1/disasters/:id`
- **Description:** Admin & operator classification management.
- **Auth:** Bearer Token (`DISASTER_OPERATOR`, `ADMIN`)

---

## 6. Disaster Alerts

### `GET /api/v1/alerts`
- **Description:** List disaster broadcast alerts with pagination and filters.
- **Auth:** Public
- **Query Params:** `disasterType`, `severity`, `status`, `location`, `search`, `page`, `limit`

### `GET /api/v1/alerts/active`
- **Description:** Get active broadcast alerts.
- **Auth:** Public

### `POST /api/v1/alerts` & `PATCH /api/v1/alerts/:id` & `POST /api/v1/alerts/:id/resolve`
- **Description:** Operator broadcast alert creation, updating, and resolution.
- **Auth:** Bearer Token (`DISASTER_OPERATOR`, `ADMIN`)

---

## 7. Disaster Survival Guidance

### `GET /api/v1/guidance` & `GET /api/v1/guidance/:disasterType`
- **Description:** Retrieve BEFORE, DURING, and AFTER emergency protocols and avoid checklists.
- **Auth:** Public

### `POST /api/v1/guidance`, `PATCH /api/v1/guidance/:id`, `DELETE /api/v1/guidance/:id`
- **Description:** Operator/Admin guidance authoring.
- **Auth:** Bearer Token (`DISASTER_OPERATOR`, `ADMIN`)

---

## 8. Safe Zones & Shelters

### `GET /api/v1/safe-zones`
- **Description:** Search safe shelters, hospitals, police, and fire stations with bounding-box geospatial radius filtering (`latitude`, `longitude`, `radiusKm`).
- **Auth:** Public

### `GET /api/v1/safe-zones/:id`
- **Description:** Safe zone details with calculated distance from user coordinates.
- **Auth:** Public

### `POST /api/v1/safe-zones`, `PATCH /api/v1/safe-zones/:id`, `DELETE /api/v1/safe-zones/:id`
- **Description:** Safe zone operational management.
- **Auth:** Bearer Token (`DISASTER_OPERATOR`, `ADMIN`)

---

## 9. SOS & Safety-Critical Emergency Events

### `POST /api/v1/emergency-events`
- **Description:** Trigger SOS emergency alert. Idempotent request prevents duplicate signals. Atomic database transaction logs audit event and sends notification.
- **Auth:** Bearer Token (`CITIZEN`, `DISASTER_OPERATOR`, `ADMIN`)
- **Request Body:**
```json
{
  "eventType": "SOS",
  "priority": "CRITICAL",
  "latitude": 23.0125,
  "longitude": 72.5642,
  "locationAddress": "Flat 302, Ankur Apts, Paldi",
  "description": "Rising flood water on ground floor",
  "idempotencyKey": "sos_unique_client_key_12345"
}
```

### `GET /api/v1/emergency-events/:id` & `POST /api/v1/emergency-events/:id/cancel`
- **Description:** Inspect or cancel active emergency signal (citizens can only access their own).
- **Auth:** Bearer Token

### `GET /api/v1/emergency-events` & `PATCH /api/v1/emergency-events/:id/status`
- **Description:** Dispatcher command center feed and validated status lifecycle transitions (`RECEIVED` -> `ACKNOWLEDGED` -> `DISPATCHED` -> `IN_PROGRESS` -> `COMPLETED` / `CANCELLED`).
- **Auth:** Bearer Token (`DISASTER_OPERATOR`, `ADMIN`)

---

## 10. Special Assistance Requests

### `POST /api/v1/assistance-requests`
- **Description:** Request specialized evacuation assistance (`ELDERLY`, `MOBILITY`, `OXYGEN_ICU`, `MATERNAL`, `PET`, `OTHER`).
- **Auth:** Bearer Token

### `GET /api/v1/assistance-requests/my` & `GET /api/v1/assistance-requests/:id` & `POST /api/v1/assistance-requests/:id/cancel`
- **Description:** Citizen assistance request tracking and cancellation.
- **Auth:** Bearer Token

### `GET /api/v1/assistance-requests` & `PATCH /api/v1/assistance-requests/:id/status`
- **Description:** Operator dispatch team assignment and status updates.
- **Auth:** Bearer Token (`DISASTER_OPERATOR`, `ADMIN`)

---

## 11. Preparedness Checklist

### `GET /api/v1/preparedness`
- **Description:** Retrieve preparedness template items combined with current user check states.
- **Auth:** Optional / Bearer Token

### `GET /api/v1/preparedness/progress` & `PATCH /api/v1/preparedness/:templateId`
- **Description:** Get user progress percentages and toggle item checked state.
- **Auth:** Bearer Token

---

## 12. In-App Notifications

### `GET /api/v1/notifications`
- **Description:** List notifications with unread count.
- **Auth:** Bearer Token

### `POST /api/v1/notifications/:id/read` & `POST /api/v1/notifications/read-all`
- **Description:** Mark one or all notifications as read (strictly verified by user ID).
- **Auth:** Bearer Token

---

## 13. Admin & Audit Controls

### `GET /api/v1/admin/users`, `PATCH /api/v1/admin/users/:id/role`, `PATCH /api/v1/admin/users/:id/status`
- **Description:** User moderation, account suspension, and role delegation (`CITIZEN`, `DISASTER_OPERATOR`, `ADMIN`).
- **Auth:** Bearer Token (`ADMIN` only)

### `GET /api/v1/admin/audit-logs`
- **Description:** Query immutable audit logs across security, authentication, and emergency operations.
- **Auth:** Bearer Token (`ADMIN` only)

### `GET /api/v1/admin/system-stats`
- **Description:** High-level operational metrics (users, active alerts, open emergencies, available shelters).
- **Auth:** Bearer Token (`ADMIN` only)
