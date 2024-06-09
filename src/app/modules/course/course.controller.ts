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
const getCourse = catchAsync(async (req, res) => {
  
    const result = await CourseServices.getAllCourseFromDB(req.query)
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'course retrieve successfully',
      data: result,
    })
  })
const updateCourse = catchAsync(async (req, res) => {
  const id=req.params.id;
  const courseData=req.body
  
    const result = await CourseServices.updateCourse(id,courseData)
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'course updated successfully',
      data: result,
    })
  })
  export const CourseController = {
    createCourse,
    getCourse,
    updateCourse
    
  }