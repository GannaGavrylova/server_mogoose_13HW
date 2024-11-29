import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectToMyDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Conneted to Database:${connectToMyDB.connection.host} `);
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};
