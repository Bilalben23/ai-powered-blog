import * as AuthController from "@/controllers/authController";
import { validate } from "@/middlewares/validate";
import { loginSchema, registerSchema } from "@/validations/authSchema";
import { Router } from "express";

const router = Router();


router.post("/register", validate({ body: registerSchema }), AuthController.register);

router.post("/login", validate({ body: loginSchema }), AuthController.login);

router.post("/refresh-token", AuthController.refreshToken);

router.post("/logout", AuthController.logout);


export default router;