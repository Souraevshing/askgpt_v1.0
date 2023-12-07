import mongoose, { disconnect } from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Connected to MongoDB`);
  } catch (err) {
    console.log(`Error connecting to MongoDB ${err}`);
  }
};

const disconnectFromDb = async () => {
  try {
    await disconnect();
    console.log(`Disconnected from MongoDB`);
  } catch (err) {
    console.log(`Error disconnecting from MongoDB ${err}`);
  }
};

export { connectToDb, disconnectFromDb };
