import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


export async function connectDB() {
  try {
    await mongoose.connect(String("mongodb+srv://sneha:6i8uvLjxQjnNT5Pg@cluster0.lj5s95h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}