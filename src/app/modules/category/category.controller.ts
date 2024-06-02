import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";


const createCategory = catchAsync(async(req,res)=>{
    const category = await CategoryServices.createCategoryIntoDB(req.body);

    sendResponse(res,{
        statusCode:201,
        success:true,
        message:'Category created',
        data:category
    })
})
const getAllCategory = catchAsync(async(req,res)=>{
    const category = await CategoryServices.getAllCategoryFromDB();

    sendResponse(res,{
        statusCode:200,
        success:true,
        message:'Category retrieve successfully',
        data:category
    })
})

export const CategoryController = {
    createCategory,
    getAllCategory

}