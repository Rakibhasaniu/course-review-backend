import { Router } from "express";
import { CourseController } from "./course.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = Router();

router.post('/create-course',CourseController.createCourse)
router.get('/',auth(USER_ROLE.user),CourseController.getCourse)
router.patch('/:id',CourseController.updateCourse)
router.get('/:id',CourseController.getSingleCourse)

export const CourseRoutes = router;

const router2= Router();
router2.get('/',CourseController.getBestCourse)


export const BestRoutes = router2;