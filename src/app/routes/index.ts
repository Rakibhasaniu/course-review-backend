import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.route'
import { BestRoutes, CourseRoutes } from '../modules/course/course.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { AuthRoutes } from '../modules/auth/auth.route'

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
  {
    path: '/review',
    route:ReviewRoutes,
  },
  {
    path: '/best',
    route:BestRoutes,
  },
  {
    path: '/auth',
    route:AuthRoutes,
  },
  
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
