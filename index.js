import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import hotelRoutes from './routes/hotels.js';
import roomRoutes from './routes/rooms.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import path from "path"

const app = express();
dotenv.config();

const connect = async () => {
  try{
    await mongoose.connect(process.env.MONGO) 
    console.log("Connected to mongoDB.")
  } catch(error){
    throw error;
  }
};

//midleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

app.use("api/uploads", express.static(path.join(path.resolve(), "uploads")));



app.listen(4001, () => {
  connect()
  console.log('connect to backend.');
});





