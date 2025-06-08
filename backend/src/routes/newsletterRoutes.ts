import { Router } from "express";
import * as NewsletterController from "@/controllers/newsletterController.ts";
import { authenticateJWT } from "@/middlewares/authenticateJWT";
import { validate } from "@/middlewares/validate";
import { subscribeSchema } from "@/validations/newsletterSchema";

const router = Router();


/**
 * @route POST /api/v1/newsletter/subscribe
 * @desc Subscribe a user to the newsletter
 * @access Public
 * @body { email: string } - email address to subscribe
 */
router.post(
    "/subscribe",
    validate({ body: subscribeSchema }),
    NewsletterController.subscribeToNewsletter
);


/**
 * @route GET /api/v1/newsletter/subscribes
 * @desc Get paginated list of newsletter subscribers
 * @access Private (requires JWT authentication)
 * @query { page?: number, limit?: number } - pagination parameters
 */
router.get(
    "/subscribers",
    authenticateJWT,
    NewsletterController.getSubscribers
)


export default router;