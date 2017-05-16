import { Router } from 'express';
import * as ProjectController from '../controllers/project.controller';
const router = new Router();

//Get all projects
router.route('/selectproject').get(ProjectController.getProjects);

export default router;