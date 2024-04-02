import bcrypt from 'bcrypt';
import Users from "../models/user.model.js";

export const SignIn = async (req, res) => {


    const { email, password } = req.body;

    const user = await Users.findOne({ email })

    if (user) {

        bcrypt.compare(password, user.password, (err, same) => {
            if (err)
                return res.send(new Error(err.message));

            if (same) {
                return res.send({ user });
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
        return res.status(201).json(newuser);
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }
}