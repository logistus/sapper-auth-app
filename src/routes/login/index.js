let User = require('../../models/User');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('dotenv').config();

export async function post(req, res) {
    let password = req.body.password;
    User.findOne({username: req.body.username}).then(user => {
        if (user) {
            bcrypt.compare(password, user.password).then(result => {
                if (result) {
                    jwt.sign({"username": req.body.username}, process.env.JWT_SECRET, (err, token) => {
                        if (err) {
                            console.log(err)
                            res.json({"error": err})
                        } else {
                            req.session.token = token;
                            if (req.body.remember_me) {
                                req.session.cookie.maxAge = 15 * 24 * 60 * 60 * 1000;
                            }
                            res.json({"token": token});
                        }
                    })
                } else {
                    res.json({"msg": "Invalid username/password combination!"});
                }
            })
        } else {
            res.json({"msg": "Invalid username/password combination!"});
        }
    }).catch(err => {
            console.error(err)
    })
}