import User from '../models/user';
const express = require('express');
const passport = require('passport');
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import config from '../config';
import mail from '../handlers/mail';

/**
 * Login user
 * @param req
 * @param res
 * @returns void
 */
export function login(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.status(400).send({
        message: "You must send the username and the password"
    }); }

    req.login(user, function(err) {
        if (err) { return next(err); }
        res.status(201).send({
            username: req.user.username
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
    User.register(new User({ username : req.body.username, usertype: req.body.usertype }), req.body.password, (err, account) => {
        if (err) {
          return res.send('error');
        }
        //send new user an email
        mail.send({
            username: req.body.username,
            subject: 'Welcome to BIT',
            html: `<p>Welcome to BIT. Your login details are:</p><p>Username: ${req.body.username}</p><p>Password: ${req.body.password}</p><p>Select <a href="localhost:8000/" target="_blank">here</a> to go to BIT</p>`
        })
    });
};
/**
 * Logout user
 * @param req
 * @param res
 * @returns void
 */
export function logout(req, res){
    console.log('logout user');
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