const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;
console.log("SECRET_KEY:", SECRET_KEY); // Should print your secret

// 🔐 Hardcoded Admin Credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin1';
const ADMIN_ROLE = 'Admin';

// Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // ✅ Generate token using hardcoded admin values
      const token = jwt.sign(
        {
          email,
          name: ADMIN_NAME,
          role: ADMIN_ROLE
        },
        SECRET_KEY,
        { expiresIn: '1d' } // Token expires in 1 day
      );

      console.log("Generated token:", token);

      // ✅ Respond with token and user info
      return res.status(200).json({
        message: 'Admin login successful',
        token,
        admin: {
          email,
          name: ADMIN_NAME,
          role: ADMIN_ROLE
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;