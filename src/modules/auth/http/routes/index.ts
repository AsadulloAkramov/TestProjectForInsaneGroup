import { Router } from 'express';
import { AuthController } from '../../controller/authController';
const ctrl = new AuthController();

const authRoutes = Router({ mergeParams: true });
authRoutes.route('/login').post((req, res) => ctrl.login(req, res));

export default authRoutes;
