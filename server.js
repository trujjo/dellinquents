const express = require('express');
const app = express();
const path = require('path');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the current directory (not from 'public')
app.use(express.static(__dirname));

// Password check endpoint
app.post('/check-password', (req, res) => {
    const { password } = req.body;
    const correctPassword = process.env.SITE_PASSWORD;
    
    console.log('Password attempt received'); // Add logging
    
    if (password === correctPassword) {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Incorrect password' });
    }
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});