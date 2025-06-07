import { Blog, BlogCategory } from "@/models/blogModel.ts";
import { CreateBlogInput, UpdateBlogInput } from "@/validations/blogSchema.ts";
import { Request, Response } from "express-serve-static-core";
import { uploadImageAndGetOptimizedUrl } from "@/utils/uploadToImageKit.ts";


export const getBlogsForAuthor = async (req: Request<{}, {}, {}, { limit?: number, page?: number }>, res: Response) => {
    try {

        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const authorId = (req.user as { _id: string })._id;

        const totalBlogs = await Blog.countDocuments({ author: authorId });
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find({ author: authorId })
            .select("title isPublished createdAt")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        res.status(200).json({
            success: true,
            message: `Fetched blogs for author - page ${page} of ${totalPages}`,
            data: blogs,
            pagination: {
                currentPage: page,
                totalPages,
                pageSize: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const getBlogsByCategory = async (req: Request<{ category: BlogCategory }, {}, {}, { limit?: number, page?: number }>, res: Response) => {
    try {
        const { category } = req.params;
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;

        const filter = { category, isPublished: true };

        const totalBlogs = await Blog.countDocuments(filter);
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find(filter)
            .select("title subTitle category image")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        res.status(200).json({
            success: true,
            message: "",
            data: blogs,
            pagination: {
                currentPage: page,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const getBlogById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId).lean();

        if (!blog) {
            res.status(404).json({
                success: false,
                message: "Blog not found"
            })
            return;
        }

        res.status(200).json({
            success: false,
            message: "Blog fetched successfully",
            data: blog
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const createBlog = async (req: Request<{}, {}, CreateBlogInput>, res: Response) => {
    try {
        const authorId = (req.user as { _id: string });
        const imageFile = req.file;

        if (!imageFile) {
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: [
                    {
                        field: "image",
                        msg: "Image is required"
                    }
                ]
            })
            return;
        }

        const optimizedImageUrl = await uploadImageAndGetOptimizedUrl(
            imageFile.buffer,
            imageFile.originalname
        )

        const blog = await Blog.create({
            author: authorId,
            image: optimizedImageUrl,
            ...req.body
        })

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const updateBlog = async (req: Request<{ id: string }, {}, UpdateBlogInput>, res: Response) => {
    try {
        const blogId = req.params.id;
        const authorId = (req.user as { _id: string })._id.toString();

        const blog = await Blog.findById(blogId);

        if (!blog) {
            res.status(404).json({
                success: false,
                message: "Blog not found"
            })
            return;
        }

        if (blog.author.toString() !== authorId) {
            res.status(403).json({
                success: false,
                message: "You are not authorized to update this blog"
            })
            return;
        }

        const imageFile = req.file;

        if (imageFile) {
            const optimizedImageUrl = await uploadImageAndGetOptimizedUrl(
                imageFile.buffer,
                imageFile.originalname
            )

            blog.image = optimizedImageUrl;
        }

        Object.assign(blog, req.body);

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: blog
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const deleteBlog = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const blogId = req.params.id;
        const userId = (req.user as { _id: string })._id.toString();

        const blog = await Blog.findById(blogId).lean();

        if (!blog) {
            res.status(404).json({
                success: false,
                message: "Blog not found"
            })
            return;
        }

        if (blog.author.toString() !== userId) {
            res.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog"
            })
            return;
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        res.status(200).json({
            success: true,
            data: deletedBlog,
            message: "Blog deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}