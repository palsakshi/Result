const express = require('express');
const router = express.Router();
const { User } = require('../models');

// POST - Create user
router.post('/add', async (req, res) => {
  try {
    const { first_name, last_name, email, password, token } = req.body;
    const user = await User.create({ first_name, last_name, email, password, token });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - All users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
