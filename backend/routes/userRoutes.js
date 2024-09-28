import express from 'express';
import { registerUser, login, logout,deleteUser, userDpUpload } from '../controllers/userControllers.js';
import protectRoute from '../middlewares/authMiddleware.js';
import upload from '../middlewares/fileUploadMiddleware.js';

const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(login);
userRoutes.route('/logout').post(logout); 
userRoutes.route('/delete').delete(protectRoute,deleteUser);
userRoutes.route('/uploadDP').put(protectRoute,userDpUpload);

export default userRoutes;