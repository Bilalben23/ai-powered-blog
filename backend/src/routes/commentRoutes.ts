import * as CommentController from "@/controllers/commentController.ts";
import { authenticateJWT } from "@/middlewares/authenticateJWT";
import { validate } from "@/middlewares/validate.ts";
import { createCommentSchema } from "@/validations/commentSchema.ts";
import { Router } from "express";


const router = Router();


/**
 * @route GET /api/v1/comments
 * @desc Get all comments (optionally filter by approval status)
 * @access Private
 * @query ({ isApproved?: boolean, page?: number, limit?:number })
 */
router.get(
    "/",
    authenticateJWT,
    CommentController.getAllComments
)


/**
 * @route Get /api/v1/comments/blog/blogId
 * @desc Get all approved comments for a blog post
 * @access Public
 */
router.get(
    "/blog/:blogId",
    CommentController.getApprovedCommentsForBlog
)


/**
 * @route POST /api/v1/comments/:blogId
 * @desc Create a new comment for a blog post
 * @access Public 
 */
router.post(
    "/:blogId",
    validate({ body: createCommentSchema }),
    CommentController.createComment
);


/**
 * @route DELETE /api/v1/comments/:id
 * @desc Delete a comment
 * @access Private
 */
router.delete(
    "/:id",
    authenticateJWT,
    CommentController.deleteComment
)


export default router;