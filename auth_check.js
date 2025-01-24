// auth_check.js
(function() {
    // Assuming SITE_PASSWORD is available as an environment variable
    const correctPassword = process.env.SITE_PASSWORD;

    const storedPassword = localStorage.getItem('password');

    if (!storedPassword || storedPassword !== correctPassword) {
        window.location.href = '/login.html';
    }
})();
