// auth_check.js
(function() {
    if (!localStorage.getItem('authenticated')) {
        window.location.href = '/login.html';
    }
})();