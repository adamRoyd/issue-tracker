import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

router.route('/(:projectCode)/issues/(:id)').get(CommentController.getComments);

export default router;