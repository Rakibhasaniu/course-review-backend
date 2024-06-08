import { ClientSession } from 'mongodb'
import { TReview } from './review.interface'
import Course from '../course/course.model'

export const updateCourse = async (
  newReview: TReview,
  session: ClientSession | undefined,
) => {
    // console.log(newReview)
    let newId =newReview.courseId 
    const course = await Course.findById(newReview.courseId, {
      averageRating: 0,
      totalRating: 0,
      reviewCount: 0,
      'tags._id': 0,
      'details._id': 0,
      __v: 0,
    })
  // const course = await Course.findById({newId:_id}).select(
  //   'totalRating averageRating reviewCount',
  // )
  console.log(course)
  if (course) {
    course.totalRating = course?.totalRating + newReview.rating
    course.reviewCount = course?.reviewCount + 1
    course.averageRating = parseFloat(
      (course?.totalRating / course?.reviewCount).toFixed(1),
    )
    const updatedCourse = await Course.findByIdAndUpdate(
      newReview.courseId,
      course,
      { new: true, session },
    )
    console.log('data',updatedCourse)
    return updatedCourse
  }
}
