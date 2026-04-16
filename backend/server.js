require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const helmet   = require('helmet');
const connectDB = require('./config/db');

const contactRoute = require('./routes/contact');
const reviewsRoute = require('./routes/reviews');

const app  = express();
const PORT = process.env.PORT || 5000;

// ========== CONNECT MONGODB ==========
connectDB();

// ========== MIDDLEWARE ==========
app.use(helmet());

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL_PROD,
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
  ].filter(Boolean),
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ========== ROUTES ==========
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

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ========== START ==========
app.listen(PORT, () => {
  console.log(`\n🚀 AlphaDevs API  →  http://localhost:${PORT}`);
  console.log(`   Health check   →  http://localhost:${PORT}/api/health`);
  console.log(`   Contact API    →  POST http://localhost:${PORT}/api/contact`);
  console.log(`   Reviews API    →  GET/POST http://localhost:${PORT}/api/reviews\n`);
});
