import { model, Schema, Types } from "mongoose";

export type BlogCategory = 'startup' | 'technology' | 'lifestyle' | 'finance';
const blogCategories: BlogCategory[] = ['technology', 'startup', 'lifestyle', 'finance'];

export interface IBlog extends Document {
    author: Types.ObjectId;
    title: string;
    subTitle: string;
    description: string;
    category: BlogCategory;
    image: string;
    isPublished: boolean
}


const blogSchema = new Schema<IBlog>({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: blogCategories,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Blog = model("Blog", blogSchema);
