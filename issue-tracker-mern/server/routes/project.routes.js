import { Router } from 'express';
import * as ProjectController from '../controllers/project.controller';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// Get all projects
router.route('/selectproject').get(ProjectController.getProjects);

router.route('/addproject').post(ProjectController.addProject);


export default router;
