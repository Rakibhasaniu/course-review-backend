import QueryBuilder from "../../builder/QueryBuilder";
import { TCategory } from "../category/category.interface";
import Review from "../review/review.schema";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import { CourseSearchAbleFields, durationCalculator, updateArray, updateObject } from "./course.utils";

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
    // const queryObj={...query}
    // let searchTerm ='';
    // if(query?.searchTerm){
    //     searchTerm=query?.searchTerm as string;
    // }
    // const searchQuery = Course.find({
    //     $or:CourseSearchAbleFields.map((field)=>({
    //         [field]:{$regex:searchTerm, $options:'i'}
    // }))    
    // });
    // const excludeFields =['searchTerm','sort','limit','page','fields']
    // excludeFields.forEach((el)=>delete queryObj[el] )
    // const filterQuery =  searchQuery.find(queryObj)
    // let sort='-price';
    // if(query?.sort){
    //     sort=query?.sort as string;
    // }
    // const sortQuery =  filterQuery.sort(sort)
    // let page=1;
    // let limit=5;
    // let skip=0;
    // if(query?.limit){
    //     limit=Number(query?.limit);
    
    // }

    // if(query?.page){
    //     page=Number(query?.page)
    //     skip=(page-1)*limit;
    // }
  
    // const paginateQuery =  sortQuery.skip(skip)
    // const limitQuery =  paginateQuery.limit(limit);
    // let fields='-__v';
    // if(query?.fields){
    //     fields=(query?.fields as string).split( ',').join(' ');

    // }
    // const fieldQuery = await limitQuery.select(fields);
    // return fieldQuery ;
    const studentQuery = new QueryBuilder(Course.find(),query).search(CourseSearchAbleFields).filter().sort().paginate().fields();
    const result = await studentQuery.modelQuery;
    return result;
}

const updateCourse = async(id:string,payload:Partial<TCourse>) => {
    const {details,tags,...remainingData} = payload;
    // console.log(tags)
    await Course.findByIdAndUpdate(
        id,
        remainingData,
        {
            new:true,
            runValidators:true
        }

    )
    if(details){
        const modifiedData = updateObject(details);
        // console.log(modifiedData)
        await Course.findByIdAndUpdate(id,modifiedData,{new:true})
    }
    if(tags && tags.length > 0){
        const modifiedTags:any =await updateArray(id,tags);
        // console.log(modifiedTags)
        await Course.findByIdAndUpdate(id,{tags:modifiedTags},{new:true})
    }
 
    const finalUpdatedData = await Course.findById(id, {
        averageRating: 0,
        totalRating: 0,
        reviewCount: 0,
        'tags._id': 0,
        'details._id': 0,
        __v: 0,
      })
      return finalUpdatedData
    // return updateBasicCourseInfo;
}

const getCourseByIdFromDB = async(id:string) => {
    const course = await Course.findById(id,{
        averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
    'tags._id': 0,
    'details._id': 0,
    __v: 0,
    })
    console.log(course?.id)
    const review = await Review.findById(id);
    console.log('course',course)
    console.log('review',review)
     
}



export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    updateCourse,
    getCourseByIdFromDB

}