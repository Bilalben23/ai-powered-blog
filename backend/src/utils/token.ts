import { ENV_VARS } from "@/configs/envVars";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: "15m"
    })
}

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ id: userId }, ENV_VARS.REFRESH_SECRET, {
        expiresIn: "7d"
    })
}