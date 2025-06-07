import express from "express";
import cors from "cors";
import { ENV_VARS } from "./configs/envVars.ts";
import connectDB from "./configs/db.ts";
import { configurePassport } from "./configs/passport.ts";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoutes from "./routes/authRoutes.ts";
import blogsRoutes from "./routes/blogRoutes.ts";
import commentsRoutes from "./routes/commentRoutes.ts";

const app = express();
configurePassport();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to handle CORS
app.use(cors({
    origin: [ENV_VARS.FRONTEND_URI],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))
app.use(passport.initialize());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/comments", commentsRoutes);


app.listen(ENV_VARS.PORT, () => {
    console.log(`✅ App is running on http://localhost:${ENV_VARS.PORT}`);
    connectDB();
})