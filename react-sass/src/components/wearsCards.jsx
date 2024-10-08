import { useContext } from "react";
import "./wearsCards.scss";
import { ItemContext } from "../context/itemContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function WearsCards({
  item_id,
  item_price,
  item_name,
  item_image,
}) {
  const { addToCart, minusFromCart, cart, setSelectedId, setChangeNav } =
    useContext(ItemContext);

  return (
    <div className="wear-cards">
      <div className="cards">
        <Link
          onClick={() => {
            setSelectedId(item_id);
            setChangeNav(null);
          }}
          to="/product"
        >
          <img src={item_image} alt="" />
        </Link>
        <div className="card-info">
          <div className="card-info-text">
            <p>{item_name}</p>
            <p>${item_price}</p>
          </div>
          <div className="icon-to-cart">
            {cart[item_id] > 0 ? (
              <>
                <p onClick={() => addToCart(item_id)} className="add">
                  +
                </p>
                <p>{cart[item_id]}</p>
                <p onClick={() => minusFromCart(item_id)} className="minus">
                  -
                </p>
              </>
            ) : (
              <>
                <p onClick={() => addToCart(item_id)} className="add">
                  +
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

WearsCards.propTypes = {
  item_id: PropTypes.string,
  item_price: PropTypes.number,
  item_name: PropTypes.string,
  item_image: PropTypes.any,
};
