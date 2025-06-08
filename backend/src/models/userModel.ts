import { model, Schema, Document, Types } from "mongoose";


export interface IUser extends Document<Types.ObjectId> {
    name: string;
    email: string;
    password: string
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, { timestamps: true })


export const User = model("User", userSchema);