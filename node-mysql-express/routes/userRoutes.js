const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { UserLogin } = require('../models');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Hardcoded Admin Credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin1';
const ADMIN_ROLE = 'admin';

// ✅ Token verification middleware (inline)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return  res.status(401).json({ error: 'Token expired' })
       }
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      let adminUser = await UserLogin.findOne({ where: { email } });

      if (!adminUser) {
        adminUser = await UserLogin.create({
          email,
          password,
          name: ADMIN_NAME,
          role: ADMIN_ROLE
        });
      } else {
        if (!adminUser.name || !adminUser.role) {
          await adminUser.update({
            name: ADMIN_NAME,
            role: ADMIN_ROLE
          });
        }
      }

      const token = jwt.sign(
        {
          email,
          name: ADMIN_NAME,
          role: ADMIN_ROLE
        },
        SECRET_KEY,
        { expiresIn: '3d' }
      );

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

// ✅ Protected Dashboard Route
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Welcome to admin dashboard!',
    user: req.user
  });
});

module.exports = router;
