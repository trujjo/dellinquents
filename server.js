const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Password middleware - place this FIRST
const passwordProtect = (req, res, next) => {
    const userPassword = req.query.password;
    const correctPassword = process.env.PASSWORD;

    if (!correctPassword) {
        console.error('PASSWORD environment variable is not set!');
        return res.status(500).send('Server configuration error');
    }

    if (userPassword === correctPassword) {
        return next();
    }

    res.status(401).send(`
        <h1>Unauthorized</h1>
        <p>You must provide the correct password to access this site.</p>
        <form method="GET">
            <label>Password: <input type="password" name="password"></label>
            <button type="submit">Submit</button>
        </form>
    `);
};

// Apply password protection to all routes
app.use(passwordProtect);

// Then serve static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});