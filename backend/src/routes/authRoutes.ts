import * as AuthController from "@/controllers/authController";
import { validate } from "@/middlewares/validate";
import { loginSchema, registerSchema } from "@/validations/authSchema";
import { Router } from "express";

const router = Router();

/**
 * @route POST /api/v1/auth/register
 * @desc register a new user
 * @access Public
 * @body { name: string, email: string, password: string }
 */
router.post(
    "/register",
    validate({ body: registerSchema }),
    AuthController.register
);

/**
 * @route POST /api/v1/auth/login
 * @desc Log in an existing user
 * @access Public
 * @body { email: string, password: string }
 */
router.post(
    "/login",
    validate({ body: loginSchema }),
    AuthController.login
);

/**
 * @route POST /api/v1/auth/refresh-token
 * @desc Refresh JWT access token using refresh token
 * @access Public (requires valid refresh token in cookie)
 */
router.post(
    "/refresh-token",
    AuthController.refreshToken
);

/**
 * @route POST /api/v1/auth/logout
 * @desc Log out user and clear refresh token cookie
 * @access Public
 */
router.post(
    "/logout",
    AuthController.logout
);


export default router;