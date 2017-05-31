import User from '../models/user';
const express = require('express');
const passport = require('passport');
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
/**
 * Register user
 * @param req
 * @param res
 * @returns void
 */
export function signup(req, res, next) {
    console.log('PASSPORT CONTROLLER');
    User.register(new User({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.send('error');
        }

        passport.authenticate('local')(req, res, () => {
            console.log('PASSPORT AUTHENTICATING');
            console.log(req);
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};
