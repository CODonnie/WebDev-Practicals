import express from "express";
import {
  createData,
  deleteData,
  readData,
	registerUser,
	loginUser,
	logoutUser,
} from "../controllers/dataController.js";

const dataRoutes = express.Router();

dataRoutes.post("/data", createData);
dataRoutes.get("/data", readData);
dataRoutes.delete("/data", deleteData);
dataRoutes.post("/auth/regUser", registerUser);
dataRoutes.post("/auth/user", loginUser);
dataRoutes.get("/auth/logout", logoutUser);

export default dataRoutes;
