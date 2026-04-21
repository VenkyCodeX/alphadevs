require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const path     = require('path');
const connectDB = require('./config/db');

const contactRoute = require('./routes/contact');
const reviewsRoute = require('./routes/reviews');
const adminRoute   = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 5000;

// ========== CONNECT MONGODB ==========
connectDB();

// ========== MIDDLEWARE ==========
app.use(helmet({
  contentSecurityPolicy: false, // allow inline scripts/styles for portfolio
}));

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PROD,
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'https://venkycodex.github.io',
    'https://alphadevs.in',
    'https://www.alphadevs.in',
  ].filter(Boolean),
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ========== FORCE HTTPS ==========
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(301, 'https://' + req.headers.host + req.url);
  }
  next();
});

// ========== SERVE FRONTEND STATIC FILES ==========
app.use(express.static(path.join(__dirname, '../')));

// ========== API ROUTES ==========
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'ok',
    project: 'AlphaDevs Portfolio API',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contact', contactRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/admin',   adminRoute);

// ========== SERVE INDEX.HTML FOR ALL NON-API ROUTES ==========
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ========== START ==========
app.listen(PORT, () => {
  console.log(`\n🚀 AlphaDevs  →  http://localhost:${PORT}`);
  console.log(`   Health check →  http://localhost:${PORT}/api/health`);
  console.log(`   Contact API  →  POST http://localhost:${PORT}/api/contact`);
  console.log(`   Reviews API  →  GET/POST http://localhost:${PORT}/api/reviews\n`);
});
