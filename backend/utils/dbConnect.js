import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
    process.exit(1);
  }
};

export default connectDb;
