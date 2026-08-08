<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SIH1462 Frontend-First Prototype Rules

Project: SIH1462 — disaster awareness, preparedness, and emergency assistance platform.

Current development phase: Frontend-first prototype development.

Immediate goal: build and polish the frontend prototype within 3 days.

Critical restrictions:
- Do not implement the backend yet.
- Do not create backend folders, backend APIs, database schemas, Prisma models, authentication systems, server code, or database migrations at this stage.
- The frontend must be completed first.

## Project objective
Build a high-quality, modern, responsive disaster management prototype that helps citizens:
- Receive disaster alerts quickly
- Understand what to do before, during, and after disasters
- Find nearby safe locations
- Access emergency contacts
- Use emergency/SOS actions
- Prepare using an emergency checklist
- Navigate the application easily during stressful situations

Supported disaster types initially:
- Flood
- Cyclone
- Earthquake
- Landslide
- Fire

## Frontend-first rule
The entire frontend experience must be completed before backend development begins.

Use mock/local data wherever dynamic data is required.

Frontend architecture must be designed so mock data can later be replaced by backend APIs without rewriting the UI.

Preferred flow:
UI → service/data abstraction → mock data
Later:
UI → service/data abstraction → backend API → database

Do not tightly couple components directly to mock data when a service/data abstraction is appropriate.

## Existing project structure
The project already contains frontend routes/components and supporting directories.

Existing major areas include:
- alerts
- disasters
- emergency
- preparedness
- profile
- safe-zones
- components
- constants
- data
- hooks
- lib
- styles
- types

Preserve the existing project structure unless there is a clear technical reason to improve it.

Do not unnecessarily rewrite existing working code.

## Frontend features to complete

### 1. Home / emergency dashboard
Create a strong emergency-focused dashboard that clearly exposes:
- Active disaster alerts
- Current risk/status
- Emergency actions
- Find safe locations
- Emergency contacts
- Preparedness
- Important guidance

The most important actions must be immediately visible.

Avoid making users search through multiple screens during an emergency.

### 2. Disaster alerts
Support:
- Flood
- Cyclone
- Earthquake
- Landslide
- Fire

Alert UI should support:
- Disaster type
- Severity
- Location
- Date/time
- Description
- Recommended actions
- Things to avoid
- View details

Design states for:
- No active alerts
- Single alert
- Multiple alerts
- Critical alert
- Expired alert
- Loading
- Error

Use mock data for now.

### 3. Disaster guidance
Every disaster should support BEFORE, DURING, and AFTER guidance.

Guidance must be easy to scan using:
- Clear hierarchy
- Icons where useful
- Short actionable instructions
- Warning/avoid sections
- Emergency actions

Do not create large walls of text.

### 4. Safe locations
Build the complete frontend experience for:
- Emergency shelters
- Hospitals
- Fire stations
- Police stations
- Emergency centers

Include:
- Map UI
- Current location representation
- Location markers
- Location cards
- Distance
- Type
- Availability/open status
- Directions CTA

Mock location data is acceptable at this stage.

### 5. Emergency contacts
Make emergency contacts extremely easy to access.

Include relevant Indian emergency numbers such as:
- 112 — Emergency
- 108 — Ambulance
- 101 — Fire

Use prominent CALL NOW actions.

Mobile interaction should be optimized for quick use.

### 6. SOS experience
If an SOS feature exists in the current design, make the flow clear and safe.

Possible flow:
SOS → Emergency confirmation → Call emergency services → Share location → Find nearest safe location

Do not implement complex backend/location-sharing infrastructure yet.

The frontend interaction is the priority.

### 7. Preparedness
Create an interactive preparedness checklist, examples:
- Drinking water
- Food
- First-aid kit
- Torch
- Power bank
- Important documents
- Medicines
- Emergency contacts

Show progress such as: 6 / 8 completed.

The checklist should have useful visual feedback.

### 8. Profile / settings
Only implement profile/settings functionality useful to the prototype, such as:
- Location
- Notification preferences
- Language
- Accessibility
- Emergency preferences

Do not build authentication or account backend yet.

## UI / UX quality requirements
UI/UX quality is a major priority.

This should not look like a generic college CRUD application.

Target:
- Modern
- Professional
- Trustworthy
- Emergency-focused
- Accessible
- Fast to understand
- Visually polished

Design around the principle: users may be stressed or have very little time.

Therefore:
- Prioritize critical information
- Reduce unnecessary clicks
- Use strong visual hierarchy
- Use clear CTAs
- Keep emergency actions prominent
- Avoid clutter
- Avoid excessive animations
- Avoid unnecessary decorative UI
- Keep text concise
- Use consistent spacing
- Use consistent typography
- Maintain predictable navigation

## Responsive design
Mobile-first is mandatory.

The application must work properly on:
- Mobile
- Tablet
- Desktop

Do not simply shrink desktop layouts for mobile.

Pay special attention to:
- Touch targets
- Sticky emergency actions where appropriate
- Bottom navigation where appropriate
- Readability
- Map interaction
- Emergency call actions
- Scrolling
- Safe-area spacing
- Responsive cards
- Navigation behavior

## Accessibility
Use good accessibility practices:
- Semantic HTML
- Keyboard navigation
- Visible focus states
- Appropriate contrast
- Accessible buttons
- Accessible labels
- Do not rely only on color to communicate severity
- Reasonable font sizes
- Screen-reader-friendly labels

## Data / mock API rules
Backend does not exist yet.

Use mock/local data for the prototype.

Keep mock data centralized where practical.

Do not scatter large hardcoded datasets throughout UI components.

Prefer:
- data/
- services/
- types/
- or the existing project equivalents

Create typed interfaces/types for important entities such as:
- DisasterAlert
- DisasterGuide
- SafeLocation
- EmergencyContact
- PreparednessItem

The exact names can follow existing project conventions.

## Component rules
Create reusable components when UI patterns repeat.

Examples:
- AlertCard
- SeverityBadge
- DisasterCard
- EmergencyContactCard
- SafeLocationCard
- PreparednessItem
- SectionHeader
- EmptyState
- LoadingState
- ErrorState

Do not over-engineer tiny components used only once.

Do not duplicate large blocks of UI.

## State requirements
Important screens should account for:
- Loading
- Empty
- Error
- Success
- Active
- Inactive
- Critical
- Disabled

Do not build only the happy path.

## Implementation rules
Before modifying code:
1. Inspect the existing implementation.
2. Reuse existing components/utilities where appropriate.
3. Follow the existing project conventions.
4. Avoid unnecessary dependency additions.
5. Do not rewrite working features without a reason.
6. Keep changes focused on the current frontend phase.

Do not make unrelated refactors.

## Backend restriction
Until the frontend is explicitly declared complete:

Do not:
- Build backend
- Build API routes intended as backend services
- Create database schema
- Create Prisma models
- Create migrations
- Configure PostgreSQL
- Configure Redis
- Implement authentication backend
- Implement admin backend
- Implement notification infrastructure
- Implement real-time infrastructure

If a frontend feature appears to require backend functionality, first implement it using a clean mock/service abstraction.

Only implement backend after the frontend is reviewed and explicitly approved for backend development.

## Reference rule
If a design decision would materially affect the visual direction and no reference has been provided, ask for a reference instead of making a major assumption.

Useful references may include:
- Screenshots
- Figma designs
- Websites
- Mobile applications
- SIH references
- UI inspiration

Do not block small implementation decisions unnecessarily.

## 3-day prototype priority
Priority order:
- P0 — Dashboard, alerts, disaster guidance, safe locations, emergency contacts, preparedness, responsive navigation
- P1 — SOS experience, map interactions, strong empty/loading/error states, mobile polish, accessibility
- P2 — Advanced animations, extra personalization, advanced settings, non-essential visual effects

Never sacrifice P0 functionality for P2 features.

## Quality bar
Before declaring the frontend complete, verify:
- Every major route works
- Navigation works
- No dead buttons
- No broken links
- No obvious console errors
- Mobile layout works
- Desktop layout works
- Tablet layout is reasonable
- Mock data is consistent
- Loading states exist where appropriate
- Empty states exist where appropriate
- Error states exist where appropriate
- Emergency actions are easy to find
- Typography and spacing are consistent
- UI does not look like a generic template
- Main demo flow works from beginning to end

Primary demo flow:
Dashboard → Active Alert → Disaster Details → What To Do → Find Safe Location → Emergency Contact → Preparedness

This flow must feel complete and polished.

## Important development principle
Do not optimize for the number of features.

Optimize for:
1. Complete user flow
2. Excellent UI/UX
3. Reliability
4. Responsiveness
5. Clear emergency-focused experience
6. Easy future backend integration

The prototype should look like a serious product concept, not an unfinished hackathon demo.

## Agent operating instructions
- Follow the project structure already present in the workspace.
- Preserve working code unless there is a clear technical reason to alter it.
- Keep changes scoped to the current frontend prototype phase.
- Prefer typed mock data and service abstractions over hardcoded UI logic.
- Ensure all major flows remain mobile-first and emergency-focused.
- Do not introduce backend or persistence concerns during this phase.
- Treat the frontend as the prioritized deliverable and keep all implementation compatible with future backend integration.
