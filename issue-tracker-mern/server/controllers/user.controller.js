import User from '../models/user';
const express = require('express');
const passport = require('passport');
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../config';
import mail from '../handlers/mail';

/**
 * Login user
 * @param req
 * @param res
 * @returns void
 */
export function login(req, res, next) {
  console.log("LOGIN REQUEST")
  console.log(req);
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.status(400).send({
        message: "Please enter a correct username and password"
    }); }

    req.login(user, function(err) {
        if (err) { return next(err); }
        res.status(301).send({
            user: req.user
        });
    });
  })(req, res, next);
};
/**
 * Register user
 * @param req
 * @param res
 * @returns void
 */
export function signup(req, res, next) {
    let newUser;
    if(req.body.project){
        newUser = new User({ username : req.body.username, usertype: req.body.usertype, project: req.body.project })
    }   else{
        newUser = new User({ username : req.body.username, usertype: req.body.usertype})
    }
    User.register(newUser, 'Testing01', (err, user) => {
        if (err) {
            return res.send({
                message: `An error occured. Please try again.`,
                error: true
            });
        }   else{
            //send new user an email
            mail.send({
                username: req.body.username,
                subject: 'Welcome to BIT',
                html: `<p>Welcome to BIT. Your login details are:</p><p>Username: ${req.body.username}</p><p>Password: test</p><p>Select <a href="localhost:8000/" target="_blank">here</a> to go to BIT</p>`
            })
            //response
            res.send({
                message: `New ${req.body.usertype} user ${req.body.username} created.`,
                error: false
            });
        }
    });
};
/**
 * Logout user
 * @param req
 * @param res
 * @returns void
 */
export function logout(req, res){
    //req.logOut();
    req.session.destroy();
}

export function isLoggedIn(req,res,next){
    //check if user is authenticated
    if(req.isAuthenticated()){
        next(); //carry on
        return;
    }
    //res.redirect(301,'/login');
    next();
}
export function getUser(req,res){
    if(req.user){
        res.status(201).send({
            user: req.user
        });
    }   else{
        res.status(201).send({
            user: {}
        });        
    }
}
export function getAssignees(req, res) {
    User.find({},{_id: 0,username: 1,usertype: 1,project: 1}).exec((err, assignees) => {
    if (err) {
        res.status(500).send(err);
    }   else{
        res.json({ assignees });
    }
    });
}
export function forgotPassword(req, res) {
    console.log("Forgot password controller");
    const email = req.body.email;
    console.log(email)
    User.find({},{ username: email }).exec((err, user) => {
    if (err) {
        res.status(500).send(err);
    }   else{
        console.log("send an email here");
        res.json({ user });
    }
    });
}