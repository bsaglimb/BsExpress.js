const path = require('path');
const express = require('express');
const router = express.Router();

// API Route
router.get('/api/notes', (req, res) => {
  res.send('API Notes Page');
});

// HTML Routes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Home Route
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Wildcard Route
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;