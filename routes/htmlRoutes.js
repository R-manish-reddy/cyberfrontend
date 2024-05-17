const path = require('path');
const express = require('express');
const router = express.Router();

function checkAuthentication(req, res, next) {
    const isAuthenticate = req.isAuthenticated();
    if (isAuthenticate) {
        if (req.url === '/') {
            return res.redirect('/detect');
        }
        return next();
    }

    if (!isAuthenticate && req.url === '/' ) {
        return next();
    }

    return res.redirect('/notauthorized');
}

// Secure Routes
router.get('/', checkAuthentication, function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'home.html'));
});

router.get('/profile', checkAuthentication, function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'profile.html'));
});

// New Secure Route for 'detect' page
router.get('/detect', checkAuthentication, function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'detect.html'));
});
// Public Routes
router.get('/helper', function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'helper.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'login.html'));
});

router.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'signup.html'));
});

router.get('/notauthorized', function (req, res) {
    res.sendFile(path.join(__dirname, '/../views', 'notauthorized.html'));
});



module.exports = router;