import { Router } from 'express';
import * as IssueController from '../controllers/issue.controller';
import multer from 'multer';
const router = new Router();

router.route('/(:projectCode)/issues/(:filter)').get(IssueController.getIssues);

router.route('/(:projectCode)/issues/(:filter)').post(IssueController.addIssue);

router.route('/(:projectCode)/issues/(:filter)').put(IssueController.batchIssues);

router.route('/(:projectCode)/issues/(:filter)/(:id)').put(IssueController.saveIssue);

// router.post('/upload', multer({ dest: './uploads/'}).single('photo'), function(req,res){
//   console.log('----------------------FILE REQUEST')
// 	console.log(req.body.file); //form fields
// 	/* example output:
// 	{ title: 'abc' }
// 	 */
// 	console.log(req.file); //form files
// 	/* example output:
//             { fieldname: 'upl',
//               originalname: 'grumpy.png',
//               encoding: '7bit',
//               mimetype: 'image/png',
//               destination: './uploads/',
//               filename: '436ec561793aa4dc475a88e84776b1b9',
//               path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
//               size: 277056 }
// 	 */
// 	res.status(204).end();
// });

// router.get('/test', function (req, res) {
//     res.send('Birds home page')
// })

export default router;