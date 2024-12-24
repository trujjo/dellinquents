const express = require('express');
const path = require('path');
require('dotenv').config(); // To read environment variables

const app = express();

// Middleware to check for the correct password
app.use((req, res, next) => {
    const userPassword = req.query.password; // Extract password from query parameter
    const correctPassword = process.env.PASSWORD; // Retrieve the password from environment variable

    if (userPassword === correctPassword) {
        return next(); // Allow access if the password matches
    }

    // If no password or incorrect password, show an unauthorized message
    res.status(401).send(`
        <h1>Unauthorized</h1>
        <p>You must provide the correct password to access this site.</p>
        <form method="GET">
            <label>Password: <input type="password" name="password"></label>
            <button type="submit">Submit</button>
        </form>
    `);
});

// Serve static files (your website)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});