const path = require('path');
const express = require('express').Router();

//HTML Routes
app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

//Home
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


//Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

module.exports = router;