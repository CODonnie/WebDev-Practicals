import express from "express";
import {
  createData,
  deleteData,
  readData,
	registerUser,
	loginUser,
	logoutUser,
} from "../controllers/dataController.js";
import protect from"../middlewares/authMiddleware.js"

const dataRoutes = express.Router();

dataRoutes.post("/data", protect, createData);
dataRoutes.get("/data", protect, readData);
dataRoutes.delete("/data", protect, deleteData);
dataRoutes.post("/auth/signup", registerUser);
dataRoutes.post("/auth/login", loginUser);
dataRoutes.get("/auth/logout", logoutUser);

export default dataRoutes;
