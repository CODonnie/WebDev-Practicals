import express from "express";
import { addProduct, deleteProduct, listProduct } from "../Controllers/productController.js";
import { upload } from "../middleware/storageMiddleware.js";

const Routes = express.Router();

Routes.post("/add", upload.array("images", 5), addProduct);
Routes.get("/list", listProduct);
Routes.delete("/delete", deleteProduct);

export default Routes;
