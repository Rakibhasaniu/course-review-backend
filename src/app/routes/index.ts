import { Router } from 'express'
import { CategoryRoutes } from '../modules/category/category.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/category',
    route:CategoryRoutes,
  },
  
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
