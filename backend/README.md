# AlphaDevs Portfolio — Backend API

Node.js + Express backend for the AlphaDevs portfolio site.

## What it does
- **POST /api/contact** — Receives contact form submissions, sends email to Venkat + auto-reply to the sender
- **GET /api/health** — Health check endpoint

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and fill in:
- `SMTP_PASS` — Gmail App Password (generate at https://myaccount.google.com/apppasswords)
- `FRONTEND_URL` — your local dev URL (e.g. `http://127.0.0.1:5500`)
- `FRONTEND_URL_PROD` — your live site URL (e.g. `https://alphadevs.in`)

### 3. Run
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

## Connect to frontend
In `script.js`, update the contact form submit handler to call:
```
POST http://localhost:5000/api/contact
Body: { name, email, subject, message }
```

## Deploy
Works on any Node.js host — Railway, Render, Fly.io, or a VPS.
Set the environment variables in your host's dashboard.
