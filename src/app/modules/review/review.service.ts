import mongoose from 'mongoose';
import { TReview } from './review.interface';
import { AppError } from '../../errors/AppError';
import httpStatus from 'http-status';
import Review from './review.schema';
import Course from '../course/course.model';

const giveReview = async (reviewData: TReview) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Create the review
    const newReview = await Review.create([reviewData], { session });
    // console.log(newReview)
    // Find the corresponding course
    const courseId = newReview[0].id;
    const course = await Course.findById(courseId).select('totalRating averageRating reviewCount');
    // console.log(course)
    if (!course) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
    }

    // Update course statistics
    course.totalRating += newReview[0].rating;
    course.reviewCount += 1;
    course.averageRating = parseFloat((course.totalRating / course.reviewCount).toFixed(1));

    // Save the updated course
    const updatedCourse = await course.save({ session });

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();
    // console.log(newReview[0])
    // Return the created review
    return newReview[0];
  } catch (err) {
    // Abort transaction in case of error
    await session.abortTransaction();
    await session.endSession();
    
    // Throw an application error
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to review course');
  }
};

export const ReviewServices = {
  giveReview,
};
