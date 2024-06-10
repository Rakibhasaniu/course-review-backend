import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { ReviewServices } from "./review.service"


const giveReview = catchAsync(async (req, res) => {
  const reviewData = req.body
  // console.log(reviewData)

  const result = await ReviewServices.giveReview(reviewData)
// console.log(result)
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

export const ReviewController = {
  giveReview,
}
