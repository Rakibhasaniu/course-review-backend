import jwt,{ Secret,  JwtPayload } from "jsonwebtoken";


export const createToken = (JwtPayload:{userId:string,role:string},secret:Secret,expiresIn:string)=>{
    return jwt.sign(JwtPayload,secret,{expiresIn})

}