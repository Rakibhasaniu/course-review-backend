import { Router } from "express";
import { CourseController } from "./course.controller";


const router = Router();

router.post('/create-course',CourseController.createCourse)
router.get('/',CourseController.getCourse)

export const CourseRoutes = router;