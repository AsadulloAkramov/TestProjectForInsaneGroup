import { Router } from 'express';
import { PostController } from '../../controller/PostController';

const ctrl = new PostController();
const postRoutes = Router({ mergeParams: true });

postRoutes.route('/create').post((req, res) => ctrl.createPost(req, res));
postRoutes.route('/list').get((req, res) => ctrl.getAllPosts(req, res));

export default postRoutes;
