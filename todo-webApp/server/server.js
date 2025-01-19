import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import dataRoutes from "./routes/dataRoutes.js";
import cookieParser from "cookie-parser";

//init
const app = express();
dotenv.config();
const port = process.env.PORT || 5171;
connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api", dataRoutes);

//error middleware
app.use(notFound);
app.use(errorHandler);

//server
app.listen(port, () => console.log(`server running on port ${port}`));
