import { Blog } from "@/models/blogModel.ts";
import { Comment } from "@/models/commentModel.ts";
import { type CreateCommentInput } from "@/validations/commentSchema.ts";
import { Request, Response } from "express-serve-static-core";


export const getAllComments = async (req: Request<{}, {}, {}, { isApproved?: boolean, page?: number, limit?: number }>, res: Response) => {

    const { isApproved } = req.query;
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    try {

        const comments = await Comment.find({ isApproved })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("blog", "title")
            .lean();

        const total = await Comment.countDocuments({ isApproved });
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: comments,
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


export const getApprovedCommentsForBlog = async (req: Request<{ blogId: string }>, res: Response) => {
    const { blogId } = req.params;

    try {

        const blogExists = await Blog.exists({ _id: blogId });
        if (!blogExists) {
            res.status(404).json({
                success: false,
                message: "Blog not found"
            })
            return;
        }

        const comments = await Comment.find({
            blog: blogId,
            isApproved: true
        }).sort({ createdAt: -1 })
            .lean()

        res.status(200).json({
            success: true,
            message: `${comments.length} approved comment(s) found`,
            data: comments
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const createComment = async (req: Request<{ blogId: string }, {}, CreateCommentInput>, res: Response) => {

    const { blogId } = req.params;
    const { name, content } = req.body;

    try {
        const blogExists = await Blog.exists({ _id: blogId });
        if (!blogExists) {
            res.status(404).json({
                success: false,
                message: "Blog not found"
            })
            return;
        }

        const comment = await Comment.create({
            blog: blogId,
            name,
            content
        })

        res.status(201).json({
            success: true,
            message: "Comment created successfully and pending approval",
            data: comment
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const deleteComment = async (req: Request<{ id: string }>, res: Response) => {

    const commentId = req.params.id;

    try {

        const comment = await Comment.findByIdAndDelete(commentId);
        if (!comment) {
            res.status(404).json({
                success: false,
                message: "Comment not found"
            })
            return;
        }

        res.status(200).json({
            success: true,
            data: comment,
            message: "Comment deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}