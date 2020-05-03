let User = require('../../models/User');
let bcrypt = require('bcrypt');

export async function post(req, res, next) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    bcrypt.hash(password, 10).then( (hash) => {
        let newUser = new User({ 'username': username, 'password': hash, 'email': email});
        newUser.save(function(err) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    if (err.message.indexOf("email") !== -1) {
                        return res.json({"msg": "This email address already in use"});
                    } else {
                        return res.json({"msg": "This username already in use"});
                    }
                } else {
                    next(error);
                }
            }
            res.json({"msg": 1});
        })
    });
};