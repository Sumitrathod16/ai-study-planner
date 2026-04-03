const express = require('express');
const cors = require('cors');
const { createClient } = require('@libsql/client');
const authRoutes = require('./routes/auth.js');
const dataRoutes = require('./routes/data.js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const dbUrl = process.env.TURSO_DATABASE_URL || 'libsql://ai-study-planner-sumit-rathod.aws-ap-south-1.turso.io';
const dbToken = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
  url: dbUrl,
  authToken: dbToken
});

const initializeDB = async () => {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      name TEXT
    )`);
    
    await db.execute(`CREATE TABLE IF NOT EXISTS study_data (
      user_id INTEGER PRIMARY KEY,
      subjects TEXT,
      plan TEXT
    )`);
    console.log("Database tables initialized");
  } catch (error) {
    if (dbToken) {
      console.error("Error initializing database:", error.message);
    } else {
      console.warn("Database initialization skipped: TURSO_AUTH_TOKEN is missing. Please add it to your .env file.");
    }
  }
};

initializeDB();

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
