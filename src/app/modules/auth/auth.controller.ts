import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const registerUser = catchAsync(async(req,res) => {
    const result = await AuthServices.createUser(req.body);


    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"User registered successfully",
        data:result

    })
})
const loginUser = catchAsync(async(req,res) => {
    // console.log(req.body)
    const result = await AuthServices.loginUser(req.body);


    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"User login successfully",
        data:result

    })
})

export const AuthController = {
    registerUser,
    loginUser
    
}