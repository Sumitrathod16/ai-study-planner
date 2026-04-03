const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_in_prod';

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Get Data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await req.db.execute({
      sql: `SELECT * FROM study_data WHERE user_id = ?`,
      args: [req.user.id]
    });
    const row = result.rows[0];
    if (!row) return res.json({ subjects: [], plan: [] });

    res.json({
      subjects: JSON.parse(row.subjects || '[]'),
      plan: JSON.parse(row.plan || '[]')
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Save Data
router.post('/', authMiddleware, async (req, res) => {
  const { subjects, plan } = req.body;
  const subjects_str = JSON.stringify(subjects || []);
  const plan_str = JSON.stringify(plan || []);

  try {
    const result = await req.db.execute({
      sql: `SELECT * FROM study_data WHERE user_id = ?`,
      args: [req.user.id]
    });
    const row = result.rows[0];

    if (row) {
      await req.db.execute({
        sql: `UPDATE study_data SET subjects = ?, plan = ? WHERE user_id = ?`,
        args: [subjects_str, plan_str, req.user.id]
      });
      res.json({ message: 'Data updated successfully' });
    } else {
      await req.db.execute({
        sql: `INSERT INTO study_data (user_id, subjects, plan) VALUES (?, ?, ?)`,
        args: [req.user.id, subjects_str, plan_str]
      });
      res.json({ message: 'Data saved successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;