import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
    role: { type: String, default: 'user', enum: ['admin', 'user'] }
})


userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, +process.env.BCRYPT_SALT, async (err, hashPass) => {
        if (err)
            throw new Error(err.message);

        this.password = hashPass;
        next()
    })
})

export const generateToken = (user) => {
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; 
    const data = { role: user.role, userId: user._id }; 
    const token = jwt.sign(data, privateKey, { expiresIn: '3h' }); 
    return token;
}


export default model('users', userSchema);