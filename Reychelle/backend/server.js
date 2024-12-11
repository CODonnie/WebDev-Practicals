import express, {urlencoded} from "express";
import dotenv from "dotenv";
import cors from "cors"
import Routes from './Routes/productsRoutes.js';
import connectDB from './config/db.js';
import { NotFound, errorHandling } from './middleware/errorMiddleware.js'

//init
dotenv.config();
const port = process.env.PORT || 5050
connectDB()

//middlware use
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true  }));
app.use(cors());

//routes
app.use('/api/catalog', Routes)
app.use('/images', express.static('uploads'));

//error middleware
app.use(NotFound);
app.use(errorHandling);

//server
app.listen(port, () => console.log(`Server is running on localhost:${port}`));
