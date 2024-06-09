import { TCategory } from "../category/category.interface";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import { CourseSearchAbleFields, durationCalculator } from "./course.utils";

const createCourseIntoDB = async(payload:TCourse) => {
    const duration = durationCalculator(payload.startDate,payload.endDate)
    // console.log(duration)
    payload.durationInWeeks=duration;
    const createCourse = await Course.create(payload);
    const result = await Course.findById(createCourse._id, {
        averageRating: 0,
        totalRating: 0,
        reviewCount: 0,
        'tags._id': 0,
        'details._id': 0,
        __v: 0,
      })
      return result
    // console.log(createCourse)
    // return createCourse;
}
const getAllCourseFromDB  = async(query:Record<string ,unknown>) => {
    // console.log(query)
    const queryObj={...query}
    let searchTerm ='';
    if(query?.searchTerm){
        searchTerm=query?.searchTerm as string;
    }
    const searchQuery = Course.find({
        $or:CourseSearchAbleFields.map((field)=>({
            [field]:{$regex:searchTerm, $options:'i'}
    }))    
    });
    const excludeFields =['searchTerm','sort','limit']
    excludeFields.forEach((el)=>delete queryObj[el] )
    const filterQuery =  searchQuery.find(queryObj)
    let sort='-price';
    if(query?.sort){
        sort=query?.sort as string;
    }
    const sortQuery =  filterQuery.sort(sort)
    let limit=5;
    if(query?.limit){
        limit=query?.limit as  number;
    }

    const limitQuery = await sortQuery.limit(limit);
    return limitQuery ;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB
}