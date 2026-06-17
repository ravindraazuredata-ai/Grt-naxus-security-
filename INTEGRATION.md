# GRT Nexus Security — Full-Stack Integration Guide

## Project Structure

```
grt-nexus-security/
├── backend/                      ← Express + MSSQL API
│   ├── src/
│   │   ├── server.js             ← Entry point
│   │   ├── config/database.js    ← MSSQL pool + schema
│   │   ├── models/               ← User, Device, Alert, Notification, AutomationRule
│   │   ├── routes/               ← auth, devices, alerts, surveillance, automation, notifications, users, about
│   │   ├── services/             ← websocket, deviceScanning, alertEngine, notificationService, automationService
│   │   ├── middleware/           ← auth (JWT), errorHandler
│   │   └── validators/           ← authValidator, deviceValidator
│   ├── .env.example
│   └── package.json
│
└── frontend/                     ← React + Vite
    └── src/
        ├── App.jsx               ← Root: auth gate + dashboard shell + routing
        ├── services/api.js       ← All API calls (auth, devices, alerts, etc.)
        ├── hooks/useWebSocket.js ← Authenticated WS with auto-reconnect
        ├── context/
        │   ├── AuthContext.jsx   ← Login/logout, session timer, role helpers
        │   └── NotificationContext.jsx ← Toast system + notification inbox
        ├── components/
        │   ├── SessionTimer.jsx      ← Circular countdown in top bar
        │   ├── NotificationBell.jsx  ← Bell icon + dropdown inbox
        │   ├── AutomationPanel.jsx   ← Rule list + create form
        │   └── DeviceScanModal.jsx   ← Subnet scanner with WS progress
        └── pages/
            └── AboutPage.jsx         ← Company page + live system health
```

---

## 1 — Backend Setup

```bash
cd backend
cp .env.example .env          # fill in DB_SERVER, DB_PASSWORD, SMTP_* etc.
npm install
npm run dev                   # nodemon src/server.js on port 5000
```

### Required environment variables
| Variable | Example |
|---|---|
| `DB_SERVER` | `localhost` |
| `DB_NAME` | `GRTSecurityDB` |
| `DB_USER` | `sa` |
| `DB_PASSWORD` | `YourStrong!Password` |
| `JWT_SECRET` | 32+ random chars |
| `JWT_REFRESH_SECRET` | different 32+ random chars |
| `SMTP_USER` | `alerts@yourco.com` |
| `SMTP_PASS` | Gmail app password |
| `CRITICAL_ALERT_EMAIL` | `admin@yourco.com` |

The server auto-creates all 7 MSSQL tables on first start via `initializeSchema()`.

---

## 2 — Frontend Setup

```bash
cd frontend
cp .env.example .env.local    # set VITE_API_URL and VITE_WS_URL
npm install
npm run dev                   # Vite dev server on port 5173
```

### Integration checklist
- [ ] Set `VITE_API_URL=http://localhost:5000/api`
- [ ] Set `VITE_WS_URL=ws://localhost:5000/ws`
- [ ] Wrap your root in `<AuthProvider><NotificationProvider>`
- [ ] Import `App.jsx` as your root component (replaces existing entry)
- [ ] Paste your existing dashboard panels into the `page === "devices"` / `"alerts"` / `"surveillance"` cases in `DashboardShell`

---

## 3 — Drop-in Integration for Existing Dashboard

In `App.jsx`, find `PlaceholderPage` references and replace with your existing components:

```jsx
// Before:
{page === "devices" && <PlaceholderPage name="devices" />}

// After — import your existing component:
import { DeviceRegistryPanel } from "./your-existing/DeviceRegistry";
{page === "devices" && <DeviceRegistryPanel devices={liveDevices} />}
```

### Connect real data to your existing components

```jsx
// Example: feed live device list to your existing DeviceCard grid
import { devices as devAPI } from "./services/api";
const [devList, setDevList] = useState([]);
useEffect(() => {
  devAPI.list({ limit: 100 }).then(d => setDevList(d.devices));
}, []);
```

---

## 4 — WebSocket Events

All events are defined in `src/hooks/useWebSocket.js`:

| Event | Payload | When |
|---|---|---|
| `device:status` | `{ device_id, ip_address, status }` | Every ping check |
| `device:discovered` | `{ ip_address }` | New IP found in subnet scan |
| `alert:created` | `{ alert_id, title, severity }` | New alert raised |
| `alert:updated` | `{ alert_id, severity, action }` | Alert acknowledged / escalated |
| `notification:new` | `{ id, type, title, message }` | New in-app notification |
| `scan:progress` | `{ pct, found, total }` | During subnet scan |
| `scan:complete` | `{ total_alive }` | Scan finished |

### Usage in any component:
```jsx
const { connected } = useWebSocket({
  "alert:created": (data) => {
    // update your alert list in real-time
    setAlerts(prev => [data, ...prev]);
  },
});
```

---

## 5 — Authentication & Roles

| Role | Permissions |
|---|---|
| `admin` | Full access: all routes + user management + delete |
| `operator` | Devices, alerts, surveillance, automation, notifications |
| `viewer` | Read-only: dashboard, alerts (no acknowledge), notifications |

Session auto-expires after 8 hours of inactivity (configurable in `AuthContext.jsx`).
The `SessionTimer` component shows a live countdown in the top navigation bar.

---

## 6 — Automation Rule Examples

### Alert severity → email
```json
{
  "trigger_type": "alert_severity",
  "trigger_config": { "severity": "critical" },
  "action_type": "send_email",
  "action_config": {
    "to": "admin@yourco.com",
    "subject": "CRITICAL: {{title}}",
    "body": "Alert triggered at {{category}}: {{title}}"
  }
}
```

### Device offline → in-app notification
```json
{
  "trigger_type": "device_offline",
  "trigger_config": {},
  "action_type": "send_notification",
  "action_config": { "title": "Device Down", "message": "A device went offline" }
}
```

### Scheduled daily summary
```json
{
  "trigger_type": "schedule",
  "trigger_config": { "cron_expr": "0 8 * * *" },
  "action_type": "send_email",
  "action_config": { "to": "team@yourco.com", "subject": "GRT Daily Security Report", "body": "Daily check-in." }
}
```

---

## 7 — Mobile / OS App Suggestions

Since the dashboard is a React PWA, you can:

1. **PWA** — add `vite-plugin-pwa` for installable mobile app with offline support
2. **Capacitor** — wrap the React build as a native iOS/Android app:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
   npx cap init && npx cap add android && npx cap add ios
   ```
3. **Electron** — wrap as a Windows/macOS/Linux desktop app:
   ```bash
   npm install electron electron-builder --save-dev
   ```
4. **Push Notifications** — use Firebase Cloud Messaging with `@capacitor/push-notifications`

---

## 8 — Production Deployment

```bash
# Backend
NODE_ENV=production npm start

# Frontend
npm run build                 # outputs dist/
# Serve dist/ via nginx / caddy / vercel

# Nginx reverse proxy (suggested)
# /api  →  http://localhost:5000
# /ws   →  ws://localhost:5000/ws  (upgrade required)
# /     →  dist/index.html
```

### nginx WebSocket config snippet
```nginx
location /ws {
  proxy_pass http://localhost:5000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "upgrade";
}
```

---

## 9 — Current Workspace Status

The current repository now includes a complete frontend and backend scaffold for the GRT Nexus terminal and security platform.

### Frontend structure
- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/index.html`
- `frontend/.env.example`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/services/api.js`
- `frontend/src/context/AuthContext.jsx`
- `frontend/src/context/NotificationContext.jsx`
- `frontend/src/components/Layout.jsx`
- `frontend/src/hooks/useWebSocket.js`
- `frontend/src/pages/LoginPage.jsx`
- `frontend/src/pages/DashboardPage.jsx`
- `frontend/src/pages/GRTNexusTerminal.jsx`
- `frontend/src/pages/PoliciesPage.jsx`
- `frontend/src/pages/AdminPage.jsx`
- `frontend/src/pages/StatCard.jsx`

### Backend structure
- `backend/package.json`
- `backend/.env.example`
- `backend/src/server.js`
- `backend/src/config/database.js`
- `backend/src/middleware/authMiddleware.js`
- `backend/src/routes/auth.js`
- `backend/src/routes/devices.js`
- `backend/src/routes/alerts.js`
- `backend/src/routes/policies.js`

### Database
- `database/schema.sql`

## 10 — Current Feature Status

- Frontend: React + Vite app with auth, protected routes, dashboard, policies, admin, and terminal views
- Backend: Express API with login, devices, alerts, and policies endpoints
- Database: MSSQL schema definitions for users, devices, alerts, notifications, automation rules, and policies
- Deployment: basic production build instructions and WebSocket proxy sample

## 11 — Next Implementation Steps

1. Install frontend and backend dependencies:
   - `cd frontend && npm install`
   - `cd backend && npm install`
2. Configure environment variables using `.env.example` files.
3. Set up MSSQL and run `database/schema.sql`.
4. Start backend:
   - `cd backend && npm run dev`
5. Start frontend:
   - `cd frontend && npm run dev`
6. Seed at least one user record in the database for login.
7. Verify API behavior for `/api/auth/login`, `/api/devices`, `/api/alerts`, `/api/policies`.
8. Improve terminal page by routing AI calls through a secure backend proxy and adding WebSocket event handling.

## 12 — Recommended Enhancements

- Add user registration and admin user management flows
- Add a WebSocket server in the backend for live device and alert updates
- Implement device scan workflows and automation rule execution
- Add responsive mobile UI and PWA support
- Add desktop/mobile wrappers via Electron or Capacitor
- Harden backend validation, authorization, and logging

