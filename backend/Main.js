const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');
const { Console } = require('console');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'cryptowallet',
    //password: 'pumapuma',
    password: 'cryptow',
    database: 'cryptowallet'
});

db.connect(function (err) {
    if (err) {
        console.log('DB error');
        throw err;
        return false;
    }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);


app.use(session({
    key: 'jgfuohj8e9tj9384t',
    secret: 'gmdfiogdjfgmjuj449i',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);

app.get(['/', '/overview', '/wallet', '/profile'], function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));


});

app.listen(80);
console.log('Server started!')