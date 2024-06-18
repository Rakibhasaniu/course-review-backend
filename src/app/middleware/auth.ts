import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../modules/user/user.model";
import app from "../../app";
 

 const auth = (...requiredRole:string[])=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.headers.authorization;
        // console.log(token)
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
          }

        const decode = jwt.verify(token,'dgvdhtybvy') as JwtPayload;
        // console.log(decode)
        const { role, userId, iat } = decode;
        const userExist = await User.findById(userId)
        // console.log(userExist)
        if (!userExist) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
          }

          if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized Access')
          }
          req.user=decode as JwtPayload
          next();
    })
 }

 export default auth;