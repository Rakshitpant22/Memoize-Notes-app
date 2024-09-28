import express from 'express';
import { getNotes, createNote, deleteNote, updateNote } from '../controllers/noteControllers.js';
import protectRoute from '../middlewares/authMiddleware.js';

const noteRoutes = express.Router();

noteRoutes.route('/').get(protectRoute,getNotes).post(protectRoute,createNote);
noteRoutes.route('/:id').delete(protectRoute,deleteNote).put(protectRoute,updateNote);

export default noteRoutes;