import "./product.scss";
import { ItemContext } from "../context/itemContext";
import { useContext } from "react";

export default function Product() {
  const { wears_items, selectedId, cart, addToCart, minusFromCart } =
    useContext(ItemContext);

  return (
    <div>
      <h1>Products page</h1>
      {wears_items
        .filter((item) => selectedId === item.id)
        .map((item, index) => (
          <div key={index}>
            <div className="cards">
              <img src={item.image} alt="" />
              <div className="card-info">
                <div className="card-info-text">
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                </div>
                <div className="icon-to-cart">
                  {cart[item.id] > 0 ? (
                    <>
                      <p onClick={() => addToCart(item.id)} className="add">
                        +
                      </p>
                      <p>{cart[item.id]}</p>
                      <p
                        onClick={() => minusFromCart(item.id)}
                        className="minus"
                      >
                        -
                      </p>
                    </>
                  ) : (
                    <>
                      <p onClick={() => addToCart(item.id)} className="add">
                        +
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
