const express = require('express');
const path = require('path');
const app = express();

// Middleware to protect the site
const checkPassword = (req, res, next) => {
    const password = req.headers['password'] || req.query.password;
    const correctPassword = "DellSecret123"; // Change this to your desired password

    if (password === correctPassword) {
        return next(); // Allow access if password matches
    } else {
        return res.status(401).send("Unauthorized: Incorrect password");
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