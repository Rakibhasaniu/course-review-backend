import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { ReviewServices } from "./review.service"


const giveReview = catchAsync(async (req, res) => {
  const reviewData = req.body

  const result = await ReviewServices.giveReview(reviewData)

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
