const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
  res.send('Get all users');
});

router.post('/users', (req, res) => {
  res.send('Create a user');
});

module.exports = router;
