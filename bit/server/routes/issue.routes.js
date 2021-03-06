import { Router } from 'express';
import * as IssueController from '../controllers/issue.controller';
import multer from 'multer';
const router = new Router();

// Set up multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/');
    },
    filename(req, file, cb) {
        const extension = file.originalname.split('.')[1];
        const name = file.originalname.split('.')[0];
        cb(null, name + '-' + Date.now() + '.' + extension);
    },
});
const upload = multer({ storage });


router.route('/(:projectCode)/(:area)/(:filter)').get(IssueController.getIssues);

router.route('/issuesByUser/(:username)').get(IssueController.getIssuesByUser);

router.route('/addIssue').post(IssueController.addIssue);

router.route('/batchIssues').post(IssueController.batchIssues);

router.route('/saveIssue').put(IssueController.saveIssue);

router.post('/upload', upload.single('file'), function (req, res) {
    res.json(req.file);
});

export default router;
