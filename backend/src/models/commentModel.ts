import { model, Schema, Types, Document } from "mongoose";

export interface ICommentDocument extends Document<Types.ObjectId> {
    blog: Types.ObjectId;
    name: string;
    content: string;
    isApproved: boolean
}


const commentSchema = new Schema<ICommentDocument>({
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: [true, "Blog id is required"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 30
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
        maxlength: 1000
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Comment = model("Comment", commentSchema);