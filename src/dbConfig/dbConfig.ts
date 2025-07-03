import mongoose from "mongoose";

export async function connect() {
  return new Promise((resolve, reject)=>{
    try {
      mongoose.connect(process.env.MONGO_URI!);
      
      const connection = mongoose.connection;
      
      connection.on("connected", () => {
        console.log("MongoDB connected successfully");
        resolve(true)
      });
  
      connection.on("error", (err) => {
        console.log("MongoDB connection failed", err);
        process.exit();
        reject()
      });
    } catch (error) {
      console.log("DB connection failed", error);
      reject()
    }
  })
}
