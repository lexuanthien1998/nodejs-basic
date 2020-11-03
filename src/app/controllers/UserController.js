const User = require('../models/User');

const bcrypt = require('bcrypt');

//Login
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


class UserController {
    registerUser(req, res, next) {
        res.render('register-user');
    }
    postRegisterUser(req, res, next) {
        //hash password cách 1
        var createHash = function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
        }
        const userRegister = new User();
        userRegister.name = req.body.username;
        userRegister.email = req.body.email;
        userRegister.password = createHash(req.body.password);
        userRegister.save();

        res.redirect('/login');

        //hash password cách 2
        // bcrypt.genSalt(10,(err,salt)=> 
        // bcrypt.hash(userRegister.password,salt,
        //     (err,hash)=> {
        //         if(err) throw err;
        //             //save pass to hash
        //             newUser.password = hash;
        //         //save user
        //         newUser.save()
        //         .then((value)=>{
        //             console.log(value)
        //         res.redirect('/users/login');
        //         })
        //         .catch(value=> console.log(value));
                  
        //     }));
        // }
    }
    // loginUser(req, res) {
    //     res.render('login-user');
    // }
    // postLoginUser(req, res, next) {
    //     Passport.authenticate('local',{
    //         successRedirect : '/post',
    //         failureRedirect: '/user/login',
    //         failureFlash : true
    //     }); 
    // }
}

module.exports = new UserController;