const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const passport = require('./passportAuthentication');
const authenticationRoute = require('./routes/authentication');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const cookieSession = require('cookie-session');
const log = console.log;

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // one day in miliseconds
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', authenticationRoute);
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => log('Server is starting ', PORT));