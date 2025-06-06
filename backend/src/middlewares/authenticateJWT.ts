import { NextFunction, Request, Response } from "express-serve-static-core";
import passport from "passport";

/**
 * Middleware to authenticate using JWT strategy with Passport
 */
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, (err: any, user: any) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error when authenticating"
            })
            return;
        }

        if (!user) {

            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
            return;
        }

        req.user = user;
        next()
    })(req, res, next)
}