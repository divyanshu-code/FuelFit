import express from 'express'
import { profile } from '../Controllers/ProfileController.js';
import { verifyToken } from '../MiddleWare/authMiddleware.js';

const profileRouter = express.Router();

profileRouter.get('/userdata/:id',verifyToken ,profile )


export default profileRouter;