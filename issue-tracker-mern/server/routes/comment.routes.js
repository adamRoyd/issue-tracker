import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

router.route('/(:projectCode)/issues/(:filter)/(:id)').get(CommentController.getComments);

router.route('/(:projectCode)/issues/(:filter)/(:id)').post(CommentController.addComment);

export default router;