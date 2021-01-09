const bcrypt = require('bcrypt')

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.overview(app, db);
        this.usdbtc(app, db);
        this.approvedWallets(app, db);
        this.profile(app, db)
    }



    login(app, db) {
        app.post('/login', (req, res) => {

            let username = req.body.username;
            let password = req.body.password;

            username = username.toLowerCase();
            console.log(username)
            if (username.length > 100 || password.length > 100) {
                res.json({
                    success: false,
                    msg: 'An error occured, please try again!'
                })
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM cryptowallet.user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
                if (err) {
                    console.log(err)
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again!'
                    })


                    return;
                }

                // Found 1 user with this username
                if (data && data.length === 1) {
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                        if (verified) {

                            // Write into sessionlog table
                            db.query('INSERT INTO sessionlog (userid) VALUES (?)', data[0].userid, (err, data) => { console.log(err) })

                            req.session.userID = data[0].userid
                            res.json({
                                success: true,
                                username: data[0].username
                            })

                            return;
                        }

                        else {
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'User not found'
                    })
                }

            });
        })

    }

    logout(app, db) {

        app.post('/logout', (req, res) => {
            if (req.session.userID) {
                req.session.destroy();
                res.json({
                    success: true
                })
                return true;
            } else {
                res.json({
                    success: false,
                    msg: 'err 1'
                })
                return false;
            }
        })
    }

    isLoggedIn(app, db) {
        app.post('/isLoggedIn', (req, res) => {

            if (req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT * FROM cryptowallet.user WHERE userid = ? LIMIT 1', cols, (err, data, fields) => {

                    if (data && data.length === 1) {
                        res.json({
                            success: true,
                            username: data[0].username
                        })
                        return true;

                    } else {
                        res.json({
                            success: false
                        })
                    }
                });

            }

            else {
                res.json({
                    success: false
                })
            }
        });
    }

    overview(app, db) {
        app.post('/overview', (req, res) => {
            if (req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT * FROM cryptowallet.transactions WHERE walletid in (SELECT walletid from wallet where ownerid= ?)', cols, (err, data, fields) => {

                    if (data && data.length > 1) {
                        res.json({
                            success: true,
                            data: data
                        })
                        return true;

                    } else {
                        console.log(data)
                        res.json({
                            success: false
                        })
                    }
                });

            }
            else {
                console.log(data)
                res.json({
                    success: false
                })
            }
        });
    }

    usdbtc(app, db) {
        app.post('/usdbtc', (req, res) => {
            if (req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT date,rate FROM cryptowallet.usdrate where datetime > (Select creationdate from user where userid= ? ) LIMIT 1000;', cols, (err, data, fields) => {

                    if (data && data.length > 1) {
                        res.json({
                            success: true,
                            data: data
                        })
                        return true;

                    } else {
                        console.log(data)
                        res.json({
                            success: false
                        })
                    }
                });

            }
            else {
                console.log(data)
                res.json({
                    success: false
                })
            }
        });
    }

    approvedWallets(app, db) {
        app.post('/approvedWallets', (req, res) => {
            if (req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT address,approveDate FROM cryptowallet.approvedWallets where walletID in (SELECT walletid from wallet where ownerid = ? );', cols, (err, data, fields) => {

                    if (data && data.length > 0) {
                        res.json({
                            success: true,
                            data: data
                        })
                        return true;

                    } else {
                        console.log(data)
                        res.json({
                            success: false
                        })
                    }
                });

            }
            else {
                console.log("falsewallet")
                console.log(data)
                res.json({
                    success: false
                })
            }
        });
    }

    profile(app, db) {
        app.post('/profile', (req, res) => {
            if (req.session.userID) {
                let cols = [req.session.userID];
                db.query('SELECT firstname,lastname,mail,phone,creationdate,birthday,walletsec from user where userid = ?;', cols, (err, data, fields) => {

                    if (data && data.length === 1) {
                        res.json({
                            success: true,
                            data: data
                        })
                        return true;

                    } else {
                        console.log(data)
                        res.json({
                            success: false
                        })
                    }
                });

            }
            else {
                console.log(data)
                res.json({
                    success: false
                })
            }
        });
    }

}

module.exports = Router;