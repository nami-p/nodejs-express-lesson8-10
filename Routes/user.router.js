import  express from "express";
import {SignIn, SignUp, updateUser} from '../controller/user.controller.js';
import { auth } from "../middle wares/auth.js";

const userRouter = express.Router();

//signIn
userRouter.post("/signIn",SignIn);
//signUp
userRouter.post("/signUp",SignUp);

userRouter.put("/update/:id",auth,updateUser);

export default userRouter;