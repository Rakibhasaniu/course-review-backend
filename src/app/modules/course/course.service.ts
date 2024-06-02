import { TCategory } from "../category/category.interface";
import { TCourse } from "./course.interface";
import Course from "./course.model";
import { durationCalculator } from "./course.utils";

const createCourseIntoDB = async(payload:TCourse) => {
    const duration = durationCalculator(payload.startDate,payload.endDate)
    // console.log(duration)
    payload.durationInWeeks=duration;
    const createCourse = await Course.create(payload);
    return createCourse;
}

export const CourseServices = {
    createCourseIntoDB,

}