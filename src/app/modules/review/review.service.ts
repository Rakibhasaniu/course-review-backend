import mongoose from 'mongoose'
import { TReview } from './review.interface'

import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import Review from './review.schema'
import { updateCourse } from './review.utils'

const giveReview = async (reviewData: TReview) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const newReview = await Review.create([reviewData], { session })

    if (!newReview.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'review giving failed!')
    }
    // console.log(newReview)
    const updatedCourse = await updateCourse(newReview[0], session) //update course for new review
    // console.log('updatedData',updatedCourse)

    if (!updatedCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course rivew failed!')
    }
    await session.commitTransaction()
    await session.endSession()

    // const result = await Review.findById(newReview[0]._id).select('-__v')
    // return result
  } catch (err:any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const ReviewServices = {
  giveReview,
}
