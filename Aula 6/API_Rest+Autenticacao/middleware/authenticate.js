import jwt from "jsonwebtoken";
const secret = process.env.SECRET_JWT;

const authenticate = (res, req, next)=>{
    console.log(req);
    const token = req.headers.authorization;
}

export default authenticate; 