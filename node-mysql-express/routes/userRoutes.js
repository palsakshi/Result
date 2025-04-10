const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { UserLogin } = require('../models'); // 🔁 Adjust path if needed
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// 🔐 Hardcoded Admin Credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME = 'Admin1';
const ADMIN_ROLE = 'admin';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // ✅ Check if admin exists in DB
      let adminUser = await UserLogin.findOne({ where: { email } });

      if (!adminUser) {
        // 🆕 If admin not in DB, create entry
        adminUser = await UserLogin.create({
          email,
          password,
          name: ADMIN_NAME,
          role: ADMIN_ROLE
        });
      } else {
        // 🔄 Update name and role if not set
        if (!adminUser.name || !adminUser.role) {
          await adminUser.update({
            name: ADMIN_NAME,
            role: ADMIN_ROLE
          });
        }
      }

      // ✅ Generate JWT
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

module.exports = router;
