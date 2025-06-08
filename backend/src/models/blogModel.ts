import { model, Schema, Types, Document } from "mongoose";

export const blogCategories = ['startup', 'technology', 'lifestyle', 'finance'] as const;
export type BlogCategory = typeof blogCategories[number];

export interface IBlog extends Document<Types.ObjectId> {
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
        required: [true, "Author id is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    subTitle: {
        type: String,
        required: [true, "Subtitle is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        enum: blogCategories,
        required: [true, "Category is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    isPublished: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const Blog = model("Blog", blogSchema);
