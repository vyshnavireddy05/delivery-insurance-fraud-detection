# Delivery Insurance Fraud Detection Prototype

This project is a frontend prototype built with React and Vite to demonstrate how a delivery insurance platform can detect suspicious claims using multi-layer risk checks instead of trusting GPS alone.

## Project Overview

In this scenario, delivery agents can try to fake claim eligibility by spoofing location data. A GPS-only validation model can be bypassed, so this prototype applies layered checks and a risk score before deciding whether a claim should be approved or flagged.

The app simulates three fraud signals:

- `fakeGPS`: possible GPS spoofing or route inconsistency
- `deviceMismatch`: suspicious change in device identity
- `abnormalBehavior`: unusual delivery pattern compared to expected behavior

The output is fully explainable and shows:

- check-by-check status
- total risk score
- risk level (`LOW`, `MEDIUM`, `HIGH`)
- final decision (`APPROVED` or `FLAGGED`)

## Why This Project Matters

- Demonstrates adversarial thinking against spoofing attacks
- Shows explainable risk scoring logic instead of black-box decisioning
- Balances fraud prevention and fairness for genuine users
- Presents a clean UI suitable for non-technical stakeholders

## Core Features Included

- Multi-layer fraud simulation for GPS, device, and behavior checks
- Weighted risk scoring model
- Risk classification bands
- Final claim decision logic
- Manual fraud toggles for testing different scenarios
- Visual risk meter and score breakdown
- Human-readable explanation panel for decision transparency
- Timestamped analysis results

## Risk Scoring Logic

Current scoring in `src/App.jsx`:

- Fake GPS: `+30`
- Device mismatch: `+25`
- Abnormal behavior: `+20`

Decision rule:

- `score > 50` => `FLAGGED`
- `score <= 50` => `APPROVED`

Risk levels:

- `0-40` => `LOW`
- `41-70` => `MEDIUM`
- `71+` => `HIGH`

## Adversarial Defense & Anti-Spoofing Strategy

### 1) Differentiation from GPS-only architecture

GPS-only systems are fragile because attackers can spoof coordinates with readily available apps. This prototype uses independent checks (GPS + device + behavior), forcing an attacker to bypass multiple controls at once.

### 2) Data used to detect fake coordinates

The design validates risk using multiple signal classes:

- route and movement plausibility
- device consistency and trust history
- behavioral pattern stability

A single suspicious event does not directly reject a claim. The final outcome depends on aggregate risk.

### 3) UX balance for honest users

The UX avoids harsh one-shot rejection:

- low risk is auto-approved
- medium risk is review-oriented
- high risk is flagged for investigation

This helps avoid penalizing users affected by transient network issues or weather-related signal instability.

## Tech Stack

- React 18
- Vite 4
- JavaScript (ES modules)
- CSS

## Try It Out

Live demo:

https://vyshnavireddy05.github.io/delivery-insurance-fraud-detection/

If the page shows 404 right after a push, wait 1-2 minutes for GitHub Actions deployment to complete.

## How To Run The Project

### Prerequisites

- Node.js 14+
- npm

### Local Setup

Run these commands in the folder that contains `package.json`:

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal, usually:

```text
http://localhost:5173/
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How To Use The App

1. Open the dashboard.
2. Optionally enable test toggles (`Fake GPS`, `Device Mismatch`, `Abnormal Behavior`).
3. Click `Claim Weather Insurance`.
4. Review the checks, risk score, risk level, and final decision.

## Example Test Scenarios

- All toggles OFF: expected mostly low-risk approvals
- One toggle ON: usually medium risk, often review-safe
- Two or more toggles ON: higher risk, likely flagged

## Project Structure

```text
guideware-phase1/
	index.html
	package.json
	vite.config.js
	src/
		App.jsx
		App.css
		main.jsx
		index.css
	README.md
```

## Current Limitations

- Frontend simulation only (no backend verification)
- No persistent claim history or user identity ledger
- No real telemetry or device fingerprint provider integration

## Future Improvements

- Add backend scoring API with audit logs
- Add real geospatial validation and geofencing checks
- Add investigator dashboard for flagged claims
- Add unit and integration tests for scoring boundaries
