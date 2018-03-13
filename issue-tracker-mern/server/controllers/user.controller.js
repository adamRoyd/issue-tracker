import User from '../models/user';
const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import config from '../config';
import mail from '../handlers/mail';
import { promisify } from 'bluebird';

/**
 * Login user
 * @param req
 * @param res
 * @returns void
 */
export function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            return res.status(400).send({
                message: 'Please enter a correct username and password',
            });
        }

        req.login(user, function (err) {
            if (err) { return next(err); }
            res.status(301).send({
                user: req.user,
            });
        });
    })(req, res, next);
}
/**
 * Register user
 * @param req
 * @param res
 * @returns void
 */
export function signup(req, res, next) {
    let newUser;
    if (req.body.project) {
        newUser = new User({ username: req.body.username, usertype: req.body.usertype, project: req.body.project });
    } else {
        newUser = new User({ username: req.body.username, usertype: req.body.usertype });
    }
    User.register(newUser, 'Testing01', (err, user) => {
        if (err) {
            return res.send({
                message: 'An error occured. Please try again.',
                error: true,
            });
        } else {
            // send new user an email
            mail.send({
                username: req.body.username,
                subject: 'Welcome to BIT',
                html: `<p>Welcome to BIT. Your login details are:</p><p>Username: ${req.body.username}</p><p>Password: test</p><p>Select <a href='localhost:8000/' target='_blank'>here</a> to go to BIT</p>`,
            });
            // response
            res.send({
                message: `New ${req.body.usertype} user ${req.body.username} created. They will receive a welcome email shortly.`,
                error: false,
            });
        }
    });
}
/**
 * Logout user
 * @param req
 * @param res
 * @returns void
 */
export function logout(req, res) {
    // req.logOut();
    req.session.destroy();
}

export function isLoggedIn(req, res, next) {
    // check if user is authenticated
    if (req.isAuthenticated()) {
        next(); // carry on
        return;
    }
    // res.redirect(301,'/login');
    next();
}
export function getUser(req, res) {
    if (req.user) {
        res.status(201).send({
            user: req.user,
        });
    } else {
        res.status(201).send({
            user: {},
        });
    }
}
export function getAssignees(req, res) {
    User.find({}, { _id: 0, username: 1, usertype: 1, project: 1 }).exec((err, assignees) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ assignees });
        }
    });
}
export async function forgotPassword(req, res) {
    // See if user exists
    const user = await User.findOne({ username: req.body.email })

    if (!user) {
        return res.status(500).send({
            message: `No account with that email exists.`
        });
    }

    // Set reset tokens and expiry
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 36000000 // 10 hours
    await user.save();
    // Send them an email with the token
    const resetURL = `http://${req.headers.host}/reset/${user.resetPasswordToken}`;
    mail.send({
        username: user.username,
        subject: 'BIT password reset',
        html: `<p>Select <a href='${resetURL}' target='_blank'>here</a> to reset your password for BIT</p>`,
    });
    // Send success response.
    res.status(200).send({
        message: 'You have been emailed a password link.'
    })
}

export async function checkToken(req, res) {
    const user = await User.findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
        res.status(500).send({
            message: 'error'
        })
    }


    res.status(200).send({
        message: 'success'
    });
}

export async function resetPassword(req, res) {
    const user = await User.findOne({
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
        res.status(500).send({
            message: 'error'
        })
    }

    // TODO set the user's password here
    const setPassword = promisify(user.setPassword , user);
    await setPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    const updatedUser = await user.save();
    res.status(200).send({
        message: 'success'
    })
}