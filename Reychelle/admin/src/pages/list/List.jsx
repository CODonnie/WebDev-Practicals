import { useEffect, useState } from "react";
import "./List.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [productList, setProductList] = useState([]);

  const getProduct = async () => {
    const response = await axios.get(`${url}/api/catalog/list`);
    if (response.data.success) {
      setProductList(response.data.data);
    } else {
      toast.error("oops! no data found");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="list">
      <div className="product-grid">
        <div className="title">
          <h2>PRODUCTS</h2>
        </div>
        <div className="header">
          <p>Image</p>
          <p>Name</p>
          <p>Price</p>
          <p>discount</p>
          <p>category</p>
          <p>description</p>
        </div>
        {productList && productList.length ? (
          productList.map((product, index) => {
            return (
              <div key={index}>
                <div className="header-product">
                  <div className="image">
                    <img src={`${url}/images/`+ product.image[0]} />
                  </div>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <p>{product.discount}</p>
                  <p>{product.category}</p>
                  <p>{product.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No Product Found</h2>
        )}
      </div>
    </div>
  );
};

export default List;

List.propTypes = {
  url: PropTypes.String,
};
