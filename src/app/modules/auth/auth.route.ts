import { Router } from "express";
import { AuthController } from "./auth.controller";


const router = Router();

router.post('/register',AuthController.registerUser)
router.post('/login',AuthController.loginUser)

export const AuthRoutes = router;