import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected successfully");
  } catch (error) {
    throw new ApiError(500, "Database connection failed", error);
  }
};

export default connectDB;