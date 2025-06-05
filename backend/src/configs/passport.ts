import passport from "passport";
import { User } from "@/models/userModel";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { ENV_VARS } from "./envVars";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV_VARS.JWT_SECRET
} as const

export const configurePassport = () => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id)
                .select("-password")
                .lean();
            if (user) return done(null, user);
            return done(null, false);
        }
        catch (err) {
            return done(err, false);
        }
    }))
}