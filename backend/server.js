const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const authRoutes = require('./routes/auth.js');
const dataRoutes = require('./routes/data.js');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) console.error(err.message);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    name TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS study_data (
    user_id INTEGER PRIMARY KEY,
    subjects TEXT,
    plan TEXT
  )`);
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
