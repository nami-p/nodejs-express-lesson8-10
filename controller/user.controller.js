import bcrypt from 'bcrypt';
import Users, { generateToken } from "../models/user.model.js";

export const SignIn = async (req, res) => {


    const { email, password } = req.body;

    const user = await Users.findOne({ email })

    if (user) {

        bcrypt.compare(password, user.password, (err, same) => {
            if (err)
                return res.send(new Error(err.message));

            if (same) {
                const token=generateToken(user);
                user.password = "****";
                return res.send({ user ,token});
            }


            return res.send({ message: 'Auth Failed', status: 401 })
        })
    }
    else {
        return res.send({ message: 'Auth Failed', status: 401 })
    }
}


export const SignUp = async (req,res) => {
    const { username, email, password } = req.body;

    try {
        const newuser = new Users({ username, email, password });
        
        await newuser.save();

        const token = generateToken(user);
        newuser.password="****";

        return res.status(201).json(newuser,token);
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }
}