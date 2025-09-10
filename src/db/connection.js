import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn; // reuse existing connection

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB connected !! DB HOST: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    console.error("MONGODB connection FAILED", error);
    throw error; // don’t exit; let serverless handle retries
  }
};

export default connectDB;
