import { TCategory } from "../category/category.interface";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import { durationCalculator } from "./course.utils";

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
const getAllCourseFromDB  = async() => {
    const courses = await Course.find();
    return courses;
}

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB
}