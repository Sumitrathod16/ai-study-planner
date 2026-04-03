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

  try {
    const result = await db.execute({
      sql: `INSERT INTO users (email, password, name) VALUES (?, ?, ?)`,
      args: [email, hashedPassword, name]
    });
    const userId = Number(result.lastInsertRowid);
    const token = jwt.sign({ id: userId, name, email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: userId, name, email } });
  } catch (err) {
    if (err.message.includes('UNIQUE') || err.message.includes('UNIQUE constraint')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = req.db;

  try {
    const result = await db.execute({
      sql: `SELECT * FROM users WHERE email = ?`,
      args: [email]
    });
    
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
