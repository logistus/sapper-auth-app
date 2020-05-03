let User = require('../../models/User');
let bcrypt = require('bcrypt');
require('dotenv').config();

export function post(req, res) {
    let password = req.body.password;
    let username = req.body.username;

    User.findOne({ username: username }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(result => {
                if (result) {
                    req.session.username = username;
                    if (req.body.remember_me) {
                        req.session.cookie.maxAge = 15 * 24 * 60 * 60 * 1000;
                    }
                    res.json({ "username": username });
                } else {
                    res.json({ "msg": "Invalid username/password combination!" });
                }
            })
        } else {
            res.json({ "msg": "Invalid username/password combination!" });
        }
    }).catch(err => {
        console.error(err)
    })
}