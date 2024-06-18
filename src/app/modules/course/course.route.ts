import { Router } from "express";
import { CourseController } from "./course.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.post('/create-course',auth(USER_ROLE.admin),CourseController.createCourse)
router.get('/',CourseController.getCourse)
router.patch('/:id',CourseController.updateCourse)
router.get('/:id',CourseController.getSingleCourse)

export const CourseRoutes = router;

const router2= Router();
router2.get('/',CourseController.getBestCourse)


export const BestRoutes = router2;