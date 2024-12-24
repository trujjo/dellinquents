const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// Password check endpoint
app.post('/check-password', (req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.SITE_PASSWORD;

    if (password === correctPassword) {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Incorrect password' });
    }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});