

import mongoose, { Types } from "mongoose";
import { TCategory } from "./category.interface"
import Category from "./category.model"


const createCategoryIntoDB = async(payload:TCategory,id:Types.ObjectId) => {
    payload.createdBy= id;

    const result = await Category.create(payload);
    const data = await Category.findById(result._id).select('-__v')
    return data;
}

const getAllCategoryFromDB = async() => {
    const result = await Category.find({},{__v:0}).populate({
        path: 'createdBy',
        select: '_id username email role',
    });
    return result;

}

export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoryFromDB

}