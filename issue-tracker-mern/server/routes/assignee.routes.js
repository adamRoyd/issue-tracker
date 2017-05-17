import { Router } from 'express';
import * as AssigneeController from '../controllers/assignee.controller';
const router = new Router();

router.route('/(:projectCode)').get(AssigneeController.getAssignees);

export default router;