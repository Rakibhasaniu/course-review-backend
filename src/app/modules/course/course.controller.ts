import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { CourseServices } from "./course.service"


const createCourse = catchAsync(async (req, res) => {
    const courseData = req.body
  
    const result = await CourseServices.createCourseIntoDB(courseData)
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'course created successfully',
      data: result,
    })
  })
  export const CourseController = {
    createCourse,
    
  }