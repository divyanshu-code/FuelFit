import express from 'express'
import { verifyToken } from '../MiddleWare/authMiddleware.js';
import { getuserdata, tickmeal , getExercises} from '../Controllers/DashboardController.js';

const dashboardRouter = express.Router()

dashboardRouter.get('/data/:userId'  ,verifyToken, getuserdata)
dashboardRouter.post('/update/:userId' , verifyToken , tickmeal )
dashboardRouter.get("/exercise/:goal", getExercises)

export default dashboardRouter;