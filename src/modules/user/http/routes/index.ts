import { Router } from 'express';
import { UserController } from '../../controller/userController';
const ctrl = new UserController();

const userRoutes = Router({ mergeParams: true });

// Sign-up --> Create user account route
userRoutes.route('/sign-up').post((req, res) => ctrl.create(req, res));

// List of paginated user route
userRoutes.route('/').get((req, res) => ctrl.listUsers(req, res));

export default userRoutes;
