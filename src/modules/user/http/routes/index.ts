import { Router } from 'express';
import { UserController } from '../../controller/userController';
const ctrl = new UserController();

const userRoutes = Router({ mergeParams: true });
userRoutes.route('/sign-up').post((req, res) => ctrl.create(req, res));

export default userRoutes;
