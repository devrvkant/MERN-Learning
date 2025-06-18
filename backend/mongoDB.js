import mongoose from "mongoose";
import "dotenv/config";

const connectToMongoDB = async() => {
  try {
    const DB_URI = process.env.DB_URI;
    if (!DB_URI) throw new Error("Pleave provide correct MongoDB URI!");

    await mongoose.connect(DB_URI);
      
    console.log("MongoDB connected!")
  } catch (err) {
    console.error("Error connecting to MongoDB : ", err.message);
  }
};
export default connectToMongoDB;
