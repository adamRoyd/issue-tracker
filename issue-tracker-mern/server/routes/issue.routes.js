import { Router } from 'express';
import * as IssueController from '../controllers/issue.controller';
const router = new Router();

// Get all Issues
router.route('/(:projectCode)/issues/(:filter)').get(IssueController.getIssues);

router.route('/(:projectCode)/issues/(:filter)').post(IssueController.addIssue);

export default router;