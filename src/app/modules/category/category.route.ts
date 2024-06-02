import { Router } from "express";
import { CategoryController } from "./category.controller";



const router = Router();

router.post('/create',CategoryController.createCategory);
router.get('/',CategoryController.getAllCategory)

export const CategoryRoutes = router;