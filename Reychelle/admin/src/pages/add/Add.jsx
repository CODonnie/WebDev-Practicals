import { useState } from "react";
import "./Add.scss";
import { FaUpload } from "react-icons/fa6";
import axios from "axios";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [data, setData] = useState({
    name: "",
    price: "",
    discount: "",
    category: "Winter Wears",
    description: "",
    images: [],
    preview: [],
  });

  const dataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!e.target.files) {
      setData((currData) => ({ ...currData, [name]: value }));
    } else {
      const newImages = Array.from(e.target.files);
      const imagePreview = newImages.map((file) => URL.createObjectURL(file));
      setData((currData) => ({
        ...currData,
        images: [...currData.images, ...newImages],
      }));
      setData((prevData) => ({
        ...prevData,
        preview: [...(prevData.preview || []), imagePreview],
      }));
    }
  };

  const removeImage = (image) => {
    const updatedImages = data.preview.filter((file) => file !== image);
    setData((currData) => ({
      ...currData,
      preview: updatedImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("category", data.category);
    formData.append("description", data.description);
    data.images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await axios.post(`${url}/api/catalog/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response) {
      toast.success("ayaaaaa!");
      setData({
        name: "",
        price: "",
        discount: "",
        category: "Winter Wears",
        description: "",
        images: [],
        preview: [],
      });
    } else {
      toast.error("omo mess up");
    }
  };

  return (
    <div className="add">
      <form onSubmit={handleSubmit}>
        <div className="image-upload flexin">
          <label htmlFor="images">
            <FaUpload size="30" />
          </label>
          <input
            type="file"
            id="images"
            onChange={(e) => dataHandler(e)}
            multiple
            required
            hidden
          />
          <div className="uploads">
            {data.preview && data.preview.length ? (
              data.preview.map((image, index) => {
                return (
                  <div className="image" key={index}>
                    <img src={image} alt="images uploaded" />
                    <p onClick={() => removeImage(image)}>x</p>
                  </div>
                );
              })
            ) : (
              <p>Upload Images</p>
            )}
          </div>
        </div>
        <div className="name flexin">
          <input
            type="text"
            name="name"
            onChange={(e) => dataHandler(e)}
            value={data.name}
            placeholder="enter product name"
            required
          />
          <p>Product Name</p>
        </div>
        <div className="price-discount flexin">
          <div className="price">
            <input
              type="Number"
              name="price"
              onChange={(e) => dataHandler(e)}
              value={data.price}
              placeholder="$"
              required
            />
            <p>Product Price</p>
          </div>
          <div className="discount">
            <input
              type="Number"
              name="discount"
              onChange={(e) => dataHandler(e)}
              value={data.discount}
              placeholder="%"
            />
            <p>Product Discount</p>
          </div>
        </div>
        <div className="category flexin">
          <select
            name="category"
            onChange={(e) => dataHandler(e)}
            value={data.category}
          >
            <option value="Skirts">Skirts</option>
            <option value="Dinner Wears">Dinner Wears</option>
            <option value="Summers Suits">Summer Suits</option>
            <option value="Winter Wears">Winter Wears</option>
          </select>
        </div>
        <div className="description flexin">
          <textarea
            name="description"
            onChange={(e) => dataHandler(e)}
            value={data.description}
            rows="7"
            placeholder="enter product description"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Add;

Add.propTypes = {
  url: PropTypes.string,
};
