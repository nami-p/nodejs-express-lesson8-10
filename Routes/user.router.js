import  express from "express";
import {SignIn, SignUp} from '../controller/user.controller.js';

const userRouter = express.Router();

//signIn
userRouter.post("/signIn",SignIn)
//signUp
userRouter.post("/signUp",SignUp)

export default userRouter;