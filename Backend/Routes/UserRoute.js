import express from 'express'
import { signup , login , fitnessdetail} from '../Controllers/UserController.js';
import { verifyToken } from '../MiddleWare/authMiddleware.js';

const userRouter = express.Router()

userRouter.post('/register' , signup);
userRouter.post('/login' , login);
userRouter.post('/details' , verifyToken  ,fitnessdetail)

export default userRouter;