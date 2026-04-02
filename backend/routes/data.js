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
router.get('/', authMiddleware, (req, res) => {
  req.db.get(`SELECT * FROM study_data WHERE user_id = ?`, [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.json({ subjects: [], plan: [] });

    res.json({
      subjects: JSON.parse(row.subjects || '[]'),
      plan: JSON.parse(row.plan || '[]')
    });
  });
});

// Save Data
router.post('/', authMiddleware, (req, res) => {
  const { subjects, plan } = req.body;
  const subjects_str = JSON.stringify(subjects || []);
  const plan_str = JSON.stringify(plan || []);

  req.db.get(`SELECT * FROM study_data WHERE user_id = ?`, [req.user.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (row) {
      req.db.run(`UPDATE study_data SET subjects = ?, plan = ? WHERE user_id = ?`, [subjects_str, plan_str, req.user.id], (err) => {
         if (err) return res.status(500).json({ error: 'Database error' });
         res.json({ message: 'Data updated successfully' });
      });
    } else {
      req.db.run(`INSERT INTO study_data (user_id, subjects, plan) VALUES (?, ?, ?)`, [req.user.id, subjects_str, plan_str], (err) => {
         if (err) return res.status(500).json({ error: 'Database error' });
         res.json({ message: 'Data saved successfully' });
      });
    }
  });
});

module.exports = router;