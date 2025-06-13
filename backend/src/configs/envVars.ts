import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: (process.env.NODE_ENV || "development") as ("development" | "production"),
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/quickblog",
    FRONTEND_URI: process.env.FRONTEND_URI || "http://localhost:5173",
    JWT_SECRET: process.env.JWT_SECRET || "jwt_secret",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "refresh_secret",
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY || "",
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || "",
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || ""
} as const
