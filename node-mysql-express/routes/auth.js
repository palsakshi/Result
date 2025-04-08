const express = require('express');
const router = express.Router();
// const { user_table } = require('../models'); // Sequelize model
const userlogin = require('../models/userlogin');

// 🔐 Admin Login Only
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Find admin by email
    const admin = await userlogin.findOne({ where: { email } });

    // ❌ Invalid email or password
    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // ✅ Login success
    res.json({
      message: 'Admin login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        password:admin.password
        // Avoid sending password back
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
