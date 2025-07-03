import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached = (global as typeof globalThis & { mongoose?: MongooseCache }).mongoose;

if (!cached) {
  cached = (global as typeof globalThis & { mongoose?: MongooseCache }).mongoose = { conn: null, promise: null };
}

// Ensure cached is always defined
const safeCached: MongooseCache = cached || { conn: null, promise: null };

async function connect() {
  if (safeCached.conn) {
    return safeCached.conn;
  }
  if (!safeCached.promise) {
    safeCached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  safeCached.conn = await safeCached.promise;
  return safeCached.conn;
}

export default connect; 