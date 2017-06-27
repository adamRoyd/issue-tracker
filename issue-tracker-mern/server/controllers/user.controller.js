import User from '../models/user';
const express = require('express');
const passport = require('passport');
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import config from '../config';


function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: "7d" });
}
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
        console.log('YOU"VE LOGGED IN ');
        console.log(req.isAuthenticated());
        console.log(req.isAuthenticated);
        res.status(201).send({
            id_token: createToken(user),
            username: req.user.username
        });
    });
  })(req, res, next);
};
// exports.login = passport.authenticate('local',{});
/**
 * Register user
 * @param req
 * @param res
 * @returns void
 */
export function signup(req, res, next) {
    User.register(new User({ username : req.body.username, isClient: req.body.isClient }), req.body.password, (err, account) => {
        if (err) {
          return res.send('error');
        }
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};
/**
 * Logout user
 * @param req
 * @param res
 * @returns void
 */
export function logout(req, res){
    req.logout();
}

export function isLoggedIn(req,res,next){
    console.log('IS LOGGED IN?');
    console.log(req.isAuthenticated());
    console.log(req.user);
    //check if user is authenticated
    if(req.isAuthenticated()){
        console.log('USER IS AUTHENTICATEEEED!');
        next(); //carry on
        return;
    }
    console.log('OOPS! YOU MUST BE LOGGED IN');
    next();
}