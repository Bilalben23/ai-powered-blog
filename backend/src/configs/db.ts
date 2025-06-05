import { connect } from "mongoose";
import { ENV_VARS } from "./envVars";


export default async function connectDB() {
    try {
        await connect(ENV_VARS.MONGO_URI);
        console.log("✅ Connected to MongoDB successfully");
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}