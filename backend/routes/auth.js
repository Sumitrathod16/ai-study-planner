const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_change_in_prod';

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });

  const db = req.db;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(`INSERT INTO users (email, password, name) VALUES (?, ?, ?)`, [email, hashedPassword, name], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Database error' });
    }
    
    const token = jwt.sign({ id: this.lastID, name, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: this.lastID, name, email } });
  });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = req.db;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

module.exports = router;
