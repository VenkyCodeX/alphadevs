const mongoose = require('mongoose');

let isConnecting = false;

const connectDB = async () => {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️  Retrying in 10s...');
    setTimeout(() => { isConnecting = false; connectDB(); }, 10000);
    return;
  }

  isConnecting = false;
};

mongoose.connection.on('disconnected', () => {
  if (!isConnecting) {
    console.log('⚠️  MongoDB disconnected — reconnecting in 5s...');
    setTimeout(() => { isConnecting = false; connectDB(); }, 5000);
  }
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

module.exports = connectDB;
