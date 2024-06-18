import httpStatus from "http-status";
import { User } from "../user/user.model"
import { AppError } from "../../errors/AppError";

const createUser = async(payload:any) => {
    const user = await User.create(payload);
    return user;
}
const loginUser = async(payload:any) => {
    const {name,password}=payload;
   const user = await User.isUserExists(name);
//    console.log(user);

if(!user){
    throw new AppError(httpStatus.NOT_FOUND,'This User Is Not Found');
}
console.log(password,user.password)
    const isPassMatched = await User.isPasswordMatched(password,user.password);
    console.log(isPassMatched)
    if(!isPassMatched){
        throw new AppError(httpStatus.UNAUTHORIZED,'Password Is Incorrect');
    }
}

export const AuthServices = {
    createUser,
    loginUser

}