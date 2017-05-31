import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();
const passport = require('passport');

router.route('/signup').post(UserController.signup);

router.post('/login', passport.authenticate('local', {  successRedirect: '/selectproject',
                                                        failureRedirect: '/fail',
                                                        failureFlash: true}), (req, res, next) => {
    req.session.save((err) => {
        console.log('SAVING SESSION');
        if (err) {
            console.log('SESSION ERROR');
            console.log(err);
            return next(err);
        }
        console.log(res);
    });
});

export default router;