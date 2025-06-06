import { Router } from "express";
import * as BlogController from "@/controllers/blogController";
import { authenticateJWT } from "@/middlewares/authenticateJWT";
import { validate } from "@/middlewares/validate";
import { createBlogSchema, updateBlogSchema } from "@/validations/blogSchema";

const router = Router();


/**
 * @route GET /api/v1/blogs/author
 * @desc Get all blogs created by the logged-in author (paginated)
 * @access Private
 * @query { limit? number, page?: number }
 */
router.get(
    "/author",
    authenticateJWT,
    BlogController.getBlogsForAuthor
);


/**
 * @route GET /api/v1/blogs/category/:category
 * @desc Get published blogs filtered by category (paginated)
 * @access Public
 * @params { category: BlogCategory }
 * @query { limit?:number, page?: number }
 */
router.get(
    "/category/:category",
    BlogController.getBlogsByCategory
);


/**
 * @route GET /api/v1/blogs/:id
 * @desc Get a single blog post by ID
 * @access Private
 * @params { id: string }
 */
router.get(
    "/:id",
    BlogController.getBlogById
);


/**
 * @route POST /api/v1/blogs
 * @desc Create a new blog post by an authenticated author
 * @access Private
 * @body { title, subTitle, description, category, image }
 */
router.post(
    "/",
    authenticateJWT,
    validate({ body: createBlogSchema }),
    BlogController.createBlog
);


/**
 * @route PUT /api/v1/blogs/:id
 * @desc Update a blog post by ID
 * @access Private (only the author can update)
 * @params { id: string }
 */
router.patch(
    "/:id",
    authenticateJWT,
    validate({ body: updateBlogSchema }),
    BlogController.updateBlog
);


/**
 * @route DELETE /api/v1/blogs/:id
 * @desc Delete a blog post by ID (only by its author)
 * @access Private
 * @params { id: string }
 */
router.delete(
    "/:id",
    authenticateJWT,
    BlogController.deleteBlog
)


export default router;