import httpStatus from "http-status";
import { User } from "../user/user.model"
import { AppError } from "../../errors/AppError";
import { createToken } from "./auth.utils";
import bcrypt from 'bcrypt'

const createUser = async(payload:any) => {
    const user = await User.create(payload);
    return user;
}
const loginUser = async(payload:any) => {
    const {name,password}=payload;
   const user = await User.isUserExists(name);

if(!user){
    throw new AppError(httpStatus.NOT_FOUND,'This User Is Not Found');
}

    const isPassMatched = await bcrypt.compare(password,user?.password);
    // console.log(isPassMatched)  
    if(!isPassMatched){
            throw new AppError(httpStatus.UNAUTHORIZED,'Password Is Incorrect');
        }

    const jwtPayload = {
        userId:user._id,
        email:user?.email,
        role:user.role
    }
    const token = createToken(
        jwtPayload,
        // config.jwt_access_secret as string,
        // config.jwt_access_expires_in as string,
        'dgvdhtybvy',
        '15D'
      );
      const data = await User.findById(user._id).select(
        '-createdAt -updatedAt -__v -passwordChangedAt',
      )
      const result = {
        data,
        token,
      }
  
      return result
}

export const AuthServices = {
    createUser,
    loginUser

}