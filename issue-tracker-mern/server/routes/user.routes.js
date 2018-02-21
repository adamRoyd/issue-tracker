import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();
const passport = require('passport');

router.route('/signup').post(UserController.signup);

router.route('/login').post(UserController.login);

router.route('/logout').post(UserController.logout);

router.route('/user').get(UserController.getUser);

router.route('/assignees').get(UserController.getAssignees);

router.route('/forgotpassword').post(UserController.forgotPassword);


export default router;
