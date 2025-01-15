import express from "express";
import {
  createData,
  deleteData,
  readData,
} from "../controllers/dataController.js";

const dataRoutes = express.Router();

dataRoutes.post("/data", createData);
dataRoutes.get("/data", readData);
dataRoutes.delete("/data", deleteData);

export default dataRoutes;
