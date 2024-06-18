import { Router } from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";



const router = Router();

router.post('/create',auth(USER_ROLE.admin),CategoryController.createCategory);
router.get('/',CategoryController.getAllCategory)

export const CategoryRoutes = router;