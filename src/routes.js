import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/Usercontroller';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);
routes.post('/products', uploads.single('file'), ProductController.store);

export default routes;