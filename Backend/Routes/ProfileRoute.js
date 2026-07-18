import express from 'express'
import { profile , uploadprofile , updateUserProfile } from '../Controllers/ProfileController.js';
import { verifyToken } from '../MiddleWare/authMiddleware.js';
import { storage } from '../Config/cloudinaryConfig.js';
import multer from 'multer';

const profileRouter = express.Router();

const upload = multer({ storage });

profileRouter.get('/userdata/:id',verifyToken ,profile)
profileRouter.post('/upload/:userId' , verifyToken  , upload.single("profileImage") , uploadprofile)
profileRouter.put("/profileupdate/:userId" , updateUserProfile);


export default profileRouter;