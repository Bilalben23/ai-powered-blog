import { NewsletterSubscriber } from "@/models/NewsletterSubscriberModel.ts";
import { SubscribeInput } from "@/validations/newsletterSchema";
import type { Response, Request } from "express-serve-static-core";


export const subscribeToNewsletter = async (req: Request<{}, {}, SubscribeInput>, res: Response) => {
    const { email } = req.body;

    try {

        // check if already subscribed
        const existing = await NewsletterSubscriber.findOne({ email });
        if (existing) {
            res.status(400).json({
                success: false,
                message: "Email is already subscribed."
            })
            return;
        }

        // create new subscription
        const subscriber = new NewsletterSubscriber({ email });
        await subscriber.save();

        res.status(201).json({
            success: true,
            message: "Successfully subscribed to the newsletter."
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const getSubscribers = async (req: Request<{}, {}, {}, { page?: number, limit?: number }>, res: Response) => {
    try {

        const limit = Number(req.query.limit) || 10;
        const page = Number(req.query.page) || 1;
        const skip = (page - 1) * limit;

        const [total, subscribers] = await Promise.all([
            NewsletterSubscriber.countDocuments(),
            NewsletterSubscriber.find()
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean()
        ])

        const totalPages = Math.ceil(total / limit);

        res.json(200).json({
            success: true,
            message: "Subscribers fetched successfully.",
            data: subscribers,
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