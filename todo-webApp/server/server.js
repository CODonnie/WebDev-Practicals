import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConnect.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

//init
const app = express();
dotenv.config();
const port = process.env.PORT || 5171
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
	res.send("omo na to fetch water o!")
})

//error middleware
app.use(notFound);
app.use(errorHandler);

//server
app.listen(port, () => console.log(`server running on port ${port}`));
