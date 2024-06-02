import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.route'
import { CourseRoutes } from '../modules/course/course.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/category',
    route:CategoryRoutes,
  },
  {
    path: '/course',
    route:CourseRoutes,
  },
  
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
