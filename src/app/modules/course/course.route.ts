import { Router } from "express";
import { CourseController } from "./course.controller";


const router = Router();

router.post('/create-course',CourseController.createCourse)
router.get('/',CourseController.getCourse)
router.patch('/:id',CourseController.updateCourse)

export const CourseRoutes = router;