import { Router } from "express";
import { CourseController } from "./course.controller";


const router = Router();

router.post('/create-course',CourseController.createCourse)
router.get('/',CourseController.getCourse)
router.patch('/:id',CourseController.updateCourse)
router.get('/:id',CourseController.getSingleCourse)

export const CourseRoutes = router;

const router2= Router();
router2.get('/',CourseController.getBestCourse)


export const BestRoutes = router2;