# AlphaDevs Portfolio

Personal portfolio website for **Venkat Makkalwar** — Founder of AlphaDevs. Built with vanilla HTML, CSS, and JavaScript on the frontend, and a Node.js + Express + MongoDB backend for contact form handling, reviews, and admin management.

**Live site:** [alphadevs.in](https://alphadevs.in)

---

## Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── style.css               # All styles
├── script.js               # Frontend JS (animations, forms, interactions)
├── reviews.js              # Reviews fetch + render logic
├── admin.html              # Admin panel (review moderation)
├── 404.html                # Custom 404 page
├── robots.txt              # SEO robots file
├── sitemap.xml             # XML sitemap
├── CNAME                   # Custom domain config (GitHub Pages)
├── render.yaml             # Render.com deployment config
├── images/                 # Logos, project screenshots, profile photo
├── projects/               # Individual project detail pages
│   ├── bikerentalhub.html
│   ├── sriganeshbikerental.html
│   ├── gaminghub.html
│   └── project.css
└── backend/                # Node.js API server
    ├── server.js
    ├── package.json
    ├── .env                # (not committed)
    ├── .env.example
    ├── config/
    │   ├── db.js           # MongoDB connection
    │   └── mailer.js       # Nodemailer SMTP setup
    ├── models/
    │   ├── Contact.js      # Contact form schema
    │   └── Review.js       # Review schema
    ├── routes/
    │   ├── contact.js      # POST /api/contact
    │   ├── reviews.js      # GET + POST /api/reviews
    │   └── admin.js        # Admin review management
    └── middleware/
        └── rateLimiter.js  # Rate limiting (5 req / 15 min)
```

---

## Frontend

Pure HTML, CSS, and JavaScript — no frameworks or build tools required.

### Sections
- **Hero** — Animated typing effect, particle canvas, aurora background
- **Tech Stack** — Tabbed tech cards (Frontend, Backend, Database, DevOps, Design)
- **Process** — 4-step development process timeline
- **Services** — Website Dev, Business Sites, UI/UX Design, Startup MVP
- **Projects** — Orbital animation showcasing live projects
- **Stats** — Animated counters (projects, clients, experience, coffee)
- **Testimonials** — Carousel with live reviews from MongoDB
- **Blog / Updates** — Recent project launches timeline
- **FAQ** — Accordion with common questions
- **Contact** — Contact form (POST to backend API) + WhatsApp + socials
- **Footer** — Links, socials, back to top

### Key Features
- Custom animated cursor (desktop)
- Scroll progress bar
- Glitch text animations on section headers
- 3D tilt on service cards (desktop)
- Magnetic hover on project cards (desktop)
- Intersection Observer scroll reveals
- Particle canvas with mouse interaction
- Mobile bottom navigation bar
- Floating WhatsApp button
- Dark / light theme support
- Fully responsive down to 320px

### Running the Frontend Locally
No build step needed. Just open with a local server:

```bash
# Using VS Code Live Server extension — open index.html and click "Go Live"

# Or using Python
python -m http.server 5500

# Or using Node.js
npx serve .
```

Then visit `http://localhost:5500`.

---

## Backend

Node.js + Express API server. Handles contact form submissions, review storage, and admin moderation.

### Tech Stack
- **Runtime:** Node.js >= 18
- **Framework:** Express.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Email:** Nodemailer with Gmail SMTP
- **Security:** Helmet, CORS, express-rate-limit

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check — returns server + DB status |
| POST | `/api/contact` | Submit contact form — saves to DB + sends emails |
| GET | `/api/reviews` | Fetch all approved reviews |
| POST | `/api/reviews` | Submit a new review |
| GET | `/api/admin/reviews` | Get all reviews including unapproved (admin only) |
| PATCH | `/api/admin/reviews/:id/toggle` | Approve / unapprove a review (admin only) |
| DELETE | `/api/admin/reviews/:id` | Delete a review (admin only) |

Admin routes require the `x-admin-token` header matching `ADMIN_SECRET` in `.env`.

### Rate Limiting
Contact and review submission endpoints are limited to **5 requests per 15 minutes** per IP.

### Setup

**1. Install dependencies**
```bash
cd backend
npm install
```

**2. Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:5500
FRONTEND_URL_PROD=https://alphadevs.in

MONGO_URI=your_mongodb_atlas_connection_string

ADMIN_SECRET=your_admin_password

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASS=your_gmail_app_password
CONTACT_RECEIVER=your_gmail@gmail.com
```

> For `SMTP_PASS`, generate a Gmail App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) — do NOT use your regular Gmail password.

**3. Run**
```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:5000`.

---

## Deployment

### Frontend
The frontend is a static site and can be hosted anywhere:
- **GitHub Pages** — push to `main`, enable Pages in repo settings. The `CNAME` file handles the custom domain.
- **Vercel / Netlify** — connect the repo and deploy the root directory.

### Backend
Configured for **Render.com** via `render.yaml`:

```yaml
services:
  - type: web
    name: alphadevs
    runtime: node
    rootDir: backend
    buildCommand: npm install
    startCommand: node server.js
```

Set these environment variables in the Render dashboard:
- `MONGO_URI`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER`
- `ADMIN_SECRET`

The backend also serves the frontend static files in production (`express.static`), so you can point your domain directly to the Render service.

---

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | `development` or `production` |
| `FRONTEND_URL` | Local frontend URL for CORS |
| `FRONTEND_URL_PROD` | Production frontend URL for CORS |
| `MONGO_URI` | MongoDB Atlas connection string |
| `ADMIN_SECRET` | Secret token for admin API routes |
| `SMTP_HOST` | SMTP host (smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (587) |
| `SMTP_USER` | Gmail address used to send emails |
| `SMTP_PASS` | Gmail App Password |
| `CONTACT_RECEIVER` | Email address that receives contact form submissions |

---

## Admin Panel

Visit `/admin.html` to manage reviews. You'll be prompted for the `ADMIN_SECRET` password. From there you can:
- View all submitted reviews (approved and pending)
- Approve or unapprove reviews
- Delete reviews

---

## Projects Showcased

| Project | URL |
|---------|-----|
| Bike Rental Hub | [bikerentalhub.co.in](https://bikerentalhub.co.in) |
| Sri Ganesh Bike Rental | [sriganeshbikerental.in](https://sriganeshbikerental.in) |
| Gaming Rental Hub | [gamingrentalhub.com](https://gamingrentalhub.com) |
| Interior Concepts | [gauri-interior.vercel.app](https://gauri-interior.vercel.app/) |

---

## Contact

- **Email:** vsmakkalvar@gmail.com
- **WhatsApp:** +91 6300003773
- **GitHub:** [github.com/VenkyCodeX](https://github.com/VenkyCodeX)
- **LinkedIn:** [linkedin.com/in/venkat-makkalwar-14b628286](https://www.linkedin.com/in/venkat-makkalwar-14b628286/)

---

© 2025 AlphaDevs. All rights reserved.
