import { User } from "@/models/userModel.ts";
import type { Request, Response } from "express-serve-static-core";
import bcrypt, { compare } from "bcrypt";
import { ENV_VARS } from "@/configs/envVars.ts";
import { generateAccessToken, generateRefreshToken } from "@/utils/token.ts";
import jwt from "jsonwebtoken";
import { type LoginInput, type RegisterInput } from "@/validations/authSchema.ts";


export const register = async (req: Request<{}, {}, RegisterInput>, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Email already exists"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const login = async (req: Request<{}, {}, LoginInput>, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await compare(password, user.password))) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
            return;
        }

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const refreshToken = (req: Request, res: Response) => {
    const token = req.cookies.refreshToken as string;

    if (!token) {
        res.status(401).json({
            success: false,
            message: "No refresh token provided"
        })
        return;
    }
    try {
        jwt.verify(token, ENV_VARS.REFRESH_SECRET, async (err: any, decoded: any) => {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: "Invalid refresh token"
                })
                return;
            }

            const user = await User.findById(decoded.id)
                .select("-password")
                .lean();

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                })
                return;
            }

            const newAccessToken = generateAccessToken(decoded.id);
            res.status(200).json({
                success: true,
                accessToken: newAccessToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "Something went wrong"
        })
    }
}


export const logout = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken as string;

    if (!refreshToken) {
        res.status(400).json({
            success: false,
            message: "No active session found, user is already logged out"
        })
        return;
    }

    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV === "production"
    })

    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}