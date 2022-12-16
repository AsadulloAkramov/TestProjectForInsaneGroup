import express, { Request, Response } from 'express';
import userRoutes from '../../../modules/user/http/routes';
import authRoutes from '../../../modules/auth/http/routes';
import postRoutes from '../../../modules/post/http/routes';
import swaggerRoutes from '../../../shared/swagger';

const baseRoute = express.Router({ mergeParams: true });
baseRoute.get('/status', (req: Request, res: Response) => {
  console.log('App route handler is working');
  return res.json({ message: 'OK' });
});

baseRoute.use('/user', userRoutes);
baseRoute.use('/auth', authRoutes);
baseRoute.use('/post', postRoutes);
baseRoute.use('/api-docs', swaggerRoutes);

export default baseRoute;
