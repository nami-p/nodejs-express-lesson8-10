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
                const token = generateToken(user);
                user.password = "****";
                return res.send({ user, token });
            }


            return res.send({ message: 'Auth Failed', status: 401 })
        })
    }
    else {
        return res.send({ message: 'Auth Failed', status: 401 })
    }
}


export const SignUp = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const newuser = new Users({ username, email, password });

        await newuser.save();

        const token = generateToken(newuser);
        newuser.password = "****";
        delete( newuser.__v);
        return res.status(201).send({newuser, token});
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = req.body;

    try {

        if (id !== updatedUser.id)
            return next({ message: 'user id conflict', status: 409 });
        
        else if (req.userToken.userId === id) {
            const u = await Users.findByIdAndUpdate(
                id,
                { $set: updatedUser },
                { new: true } 
            )
            return res.json(u);
        }
        else { 
            next({ message: `cannot update user: ${id}, you can update only your details`, status: 403 })
        }
    } catch (error) {
        next(error);
    }
};