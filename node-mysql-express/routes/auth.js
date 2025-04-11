const express = require('express');
const router = express.Router();


 // You should store this in .env 
router.post('', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Userlogin.findOne({ where: { email } });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

  
    // ✅ Send token and basic user info (avoid sending password!)
    res.json({
      message: 'Login successful',
      token: token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;