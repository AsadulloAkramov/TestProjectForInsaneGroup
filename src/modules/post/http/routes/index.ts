import { Router } from 'express';
import { PostController } from '../../controller/PostController';

const ctrl = new PostController();
const postRoutes = Router({ mergeParams: true });

// Create new post route
postRoutes.route('/create').post((req, res) => ctrl.createPost(req, res));

// Get all posts with pagination route
postRoutes.route('/list').get((req, res) => ctrl.getAllPosts(req, res));

// Get post by id route
postRoutes.route('/:id').get((req, res) => ctrl.getPostById(req, res));



export default postRoutes;
