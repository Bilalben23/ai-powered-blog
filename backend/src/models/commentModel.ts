import { model, Schema, Types } from "mongoose";

export interface CommentDocument extends Document {
    blog: Types.ObjectId;
    name: string;
    content: string;
    isApproved: boolean
}


const commentSchema = new Schema<CommentDocument>({
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Comment = model("Comment", commentSchema);