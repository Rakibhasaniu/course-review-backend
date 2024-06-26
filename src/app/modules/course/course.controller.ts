import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { CourseServices } from "./course.service"


const createCourse = catchAsync(async (req, res) => {
    const courseData = req.body
    // console.log(req.user)

    const id = req.user.userId;
    // console.log(id)
    const result = await CourseServices.createCourseIntoDB(courseData,id)
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'course created successfully',
      data: result,
    })
  })
const getCourse = catchAsync(async (req, res) => {
  // console.log(req.user)
  
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
const getSingleCourse = catchAsync(async (req, res) => {
  const id=req.params.id;
  
    const result = await CourseServices.getCourseByIdFromDB(id)
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'single course retrieve successfully',
      data: result,
    })
  })
const getBestCourse = catchAsync(async (req, res) => {
  
    const result = await CourseServices.getBestCourseFromDB()
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'single course retrieve successfully',
      data: result,
    })
  })
  export const CourseController = {
    createCourse,
    getCourse,
    updateCourse,
    getSingleCourse,
    getBestCourse
    
  }