import { Router } from 'express';
import * as IssueController from '../controllers/issue.controller';
const router = new Router();

// Get all Issues
router.route('/(:projectCode)/issues').get(IssueController.getIssues);

router.route('/(:projectCode)/issues/(:id)').get(IssueController.getIssue);

export default router;