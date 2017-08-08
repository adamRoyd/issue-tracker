import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

router.route('/(:projectCode)/(:area)/(:filter)/(:id)').get(CommentController.getComments);

router.route('/addComment').post(CommentController.addComment);

export default router;