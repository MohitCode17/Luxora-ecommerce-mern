import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(`Database connected successfully`);
    });

    mongoose.connection.on("error", (err) => {
      console.log(`Failed to connect with db ${err}`);
    });

    await mongoose.connect(config.MONGODB_URL);
  } catch (error) {
    console.log(`Error connecting to db: ${error}`);
    process.exit(1);
  }
};
