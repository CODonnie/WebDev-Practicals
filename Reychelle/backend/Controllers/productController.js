import asyncHandler from "express-async-handler";
import fs from "fs";
import wearsModel from "../models/wearModels.js";

//@desc - add product item to DB
//@route - POST/api/catalog/add
//@access - private-admin
const addProduct = asyncHandler(async (req, res) => {
  const image_filename = req.files.map((file) => file.filename);

  const wear = new wearsModel({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    discount: req.body.discount,
    image: image_filename,
  });
  try {
    await wear.save();
    res.json({ success: true, data: wear });
    console.log("Product added");
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: `Error on saving ${error.message}` });
  }
});

//@desc - list product(s) from the DB
//@route - GET/api/catalog/list
//@access - public
const listProduct = asyncHandler(async (req, res) => {
  const { name, price, category } = req.query;

  let wear;
  let query = {};
  if (name) query.name = name;
  if (price) query.price = price;
  if (category) query.category = category;

  if (Object.keys(query).length === 0) {
    wear = await wearsModel.find({});
  } else {
    wear = await wearsModel.find(query);
  }

  if (wear.length === 0) {
    return res
      .json({ success: false, message: "product not found" });
  }
  res.status(200).json({ success: true, data: wear });
	console.log("response ok");
});

//@desc - delete a product from DB
//@route - POST/api/catalog/delete
//@access - private
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) res.json({ success: false, message: "no id found" });

  const wear = await wearsModel.findById(id);
  if (!wear) res.json({ success: false, message: "product not found" });

  if (wear.image) {
    fs.unlink(`uploads/${wear.image}`, () => {});
  }

  await wearsModel.findByIdAndDelete(id);
  res.json({
    success: true,
    message: "product deleted",
  });
});

export { addProduct, listProduct, deleteProduct };
