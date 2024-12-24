const express = require('express');
const path = require('path');
const app = express();

// Middleware to protect the site
const checkPassword = (req, res, next) => {
    const password = req.query.password;
    const correctPassword = "nelson"; // Change this to your desired password

    // Allow access to the password page and static assets without a password
    if (req.path === '/password.html' || req.path.startsWith('/style.css') || req.path.startsWith('/images/')) {
        return next();
    }

    if (password === correctPassword) {
        return next(); // Allow access if password matches
    } else {
        return res.redirect('/password.html'); // Redirect to password prompt if password is incorrect or not provided
    }
};

// Use middleware to protect static files
app.use(checkPassword);

// Serve static files (your website)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});