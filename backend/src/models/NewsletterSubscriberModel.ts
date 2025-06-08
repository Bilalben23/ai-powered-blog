import { model, Schema, Document, Types } from "mongoose";


export interface INewsletterSubscriber extends Document<Types.ObjectId> {
    email: string;
    subscribedAt: Date
}


const newsletterSubscriberSchema = new Schema<INewsletterSubscriber>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


export const NewsletterSubscriber = model("NewsletterSubscriber", newsletterSubscriberSchema);