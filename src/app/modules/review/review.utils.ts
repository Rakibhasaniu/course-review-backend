// import { ClientSession } from 'mongodb'
// import { TReview } from './review.interface'
// import Course from '../course/course.model'

// export const updateCourse = async (
//   newReview: TReview,
//   session: ClientSession | undefined,
// ) => {
//   const course = await Course.findById(newReview.courseId).select(
//     'totalRating averageRating reviewCount',
//   )
//   console.log(course)

//   if (course) {
//     course.totalRating = course?.totalRating + newReview.rating
//     course.reviewCount = course?.reviewCount + 1
//     course.averageRating = parseFloat(
//       (course?.totalRating / course?.reviewCount).toFixed(1),
//     )
//     const updatedCourse = await Course.findByIdAndUpdate(
//       newReview.courseId,
//       course,
//       { new: true, session },
//     )
//     return updatedCourse
//   }
// }
