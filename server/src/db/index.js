import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        throw new Error("Failed to connect to MongoDB");
    }
}

export default connectDB;