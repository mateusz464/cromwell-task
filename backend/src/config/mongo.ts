import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.set("strictQuery", true);
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      socketTimeoutMS: 30000,
    });
    console.log("MongoDB connected");
  } catch (e) {
    process.exit(1);
  }
}