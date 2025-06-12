import type { Request, Response } from "express-serve-static-core";
import { Blog, type BlogCategory } from "@/models/blogModel.ts";
import { type CreateBlogInput, type UpdateBlogInput } from "@/validations/blogSchema.ts";
import { uploadImageAndGetOptimizedUrl } from "@/utils/uploadToImageKit.ts";
import { Comment } from "@/models/commentModel.ts";
type ExtendedCategory = BlogCategory | "all";


export const getBlogsForAuthor = async (req: Request<{}, {}, {}, { limit?: number, page?: number }>, res: Response) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const authorId = (req.user as { _id: string })._id;

        const totalBlogs = await Blog.countDocuments({ author: authorId });
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find({ author: authorId })
            .select("title isPublished createdAt")
            .sort({ createdAt: -1 })
            .skip(skip)
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


export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const authorId = (req.user as { _id: string })._id.toString();

        // Fetch author blog IDs and blog-related counts in parallel
        const [authorBlogIds, totalBlogs, totalDrafts] = await Promise.all([
            Blog.find({ author: authorId }).distinct("_id"),
            Blog.countDocuments({ author: authorId }),
            Blog.countDocuments({ author: authorId, isPublished: false })
        ]);

        const [totalComments, latestBlogs] = await Promise.all([
            Comment.countDocuments({ blog: { $in: authorBlogIds } }),
            Blog.find({ author: authorId })
                .sort({ createdAt: -1 })
                .limit(6)
                .select("title createdAt isPublished")
                .lean()
        ]);

        res.status(200).json({
            success: true,
            message: "Dashboard statistics fetched successfully",
            data: {
                totalBlogs,
                totalComments,
                totalDrafts,
                latestBlogs
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


export const getBlogsByCategory = async (req: Request<{ category: ExtendedCategory }, {}, {}, { limit?: number, page?: number }>, res: Response) => {
    try {
        const { category } = req.params;
        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const filter: Record<string, any> = { isPublished: true };

        if (category !== "all") {
            filter.category = category;
        }

        const totalBlogs = await Blog.countDocuments(filter);
        const totalPages = Math.ceil(totalBlogs / limit);

        const blogs = await Blog.find(filter)
            .select("title description category image")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        res.status(200).json({
            success: true,
            message: category === "all"
                ? `All blogs retrieved successfully`
                : `Blogs in category '${category}' retrieved successfully`,
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

        const blog = await Blog.findOne({ _id: blogId, isPublished: true })
            .select("-isPublished -__v -updatedAt")
            .populate("author", "name")
            .lean();

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
    console.log(req.body);
    try {
        const authorId = (req.user as { _id: string })._id.toString();
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
            data: {
                _id: blog._id,
                category: blog.category
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


export const togglePublish = async (req: Request<{ id: string }, {}, UpdateBlogInput>, res: Response) => {
    try {
        const authorId = (req.user as { _id: string })._id.toString();

        const blog = await Blog.findById(req.params.id);

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

        blog.isPublished = !blog.isPublished;
        await blog.save();

        res.status(200).json({
            success: true,
            message: `Blog ${blog.isPublished ? "published" : "unpublished"} successfully`,
            data: {
                _id: blog._id,
                category: blog.category,
                isPublished: blog.isPublished
            }
        });

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
        const authorId = (req.user as { _id: string })._id.toString();

        const blog = await Blog.findById(req.params.id);

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

        // Delete the blog
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        // Delete all comments related to this blog
        await Comment.deleteMany({ blog: blogId });

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: {
                _id: deletedBlog?._id,
                category: deletedBlog?.category
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