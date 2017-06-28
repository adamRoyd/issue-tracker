import { Router } from 'express';
import * as AssigneeController from '../controllers/assignee.controller';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/getAssignees').get(UserController.isLoggedIn,AssigneeController.getAssignees);

export default router;