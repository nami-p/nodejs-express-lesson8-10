import jwt from 'jsonwebtoken';

export const auth = (req,res,next)=>{
    const { authorization } = req.headers;

    const [, token] = authorization.split(' ');

    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET'; 
    const data = jwt.verify(token, privateKey);
    

    req.userToken = data; 
    next(); 

}