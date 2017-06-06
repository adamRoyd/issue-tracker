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

    if (!user) { return res.json("loginError"); }

    req.logIn(user, function(err) {
        if (err) { return next(err); }

        res.status(201).send({
            id_token: createToken(user)
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
