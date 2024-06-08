import { Router } from "express";
import { ReviewController } from "./review.controller";

const router = Router();

router.post('/create-review',ReviewController.giveReview)

export const ReviewRoutes = router;