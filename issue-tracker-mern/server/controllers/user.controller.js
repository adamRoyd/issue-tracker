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
    User.register(new User({ username : req.body.username, isClient: req.body.isClient }), req.body.password, (err, account) => {
        if (err) {
          return res.send('error');
        }
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                console.log('SIGNUP RESPONSE');
                console.log(res.json);
                res.redirect('/');
            });
        });
    });
};
