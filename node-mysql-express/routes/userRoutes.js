const express = require('express');
const router = express.Router();

// 🔐 Hardcoded Admin Credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123'; // You can make this more secure later

// Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      res.status(200).json({ message: 'Admin login successful', email });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;