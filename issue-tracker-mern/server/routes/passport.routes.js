import { Router } from 'express';
import * as PassportController from '../controllers/passport.controller';
const router = new Router();

router.route('/signup').post(PassportController.signup);

export default router;

// module.exports = function(passport){
// 	/* Handle Registration POST */
// 	// router.post('/signup', passport.authenticate('signup', {
// 	// 	successRedirect: '/home',
// 	// 	failureRedirect: '/test',
// 	// 	failureFlash : true
// 	// }));


// 	/* Handle Login POST */
// 	router.post('/login', passport.authenticate('login', {
// 		successRedirect: '/home',
// 		failureRedirect: '/',
// 		failureFlash : true  
// 	}));
    
// 	/* Handle Logout */
// 	router.get('/signout', function(req, res) {
// 		req.logout();
// 		res.redirect('/');
// 	});

// 	router.get('/test', function (req, res) {
// 		res.send('Birds home page')
// 	})

// 	return router;
// }





