import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../context/itemContext";
import "./cart.scss";

export default function Cart() {
  const { wears_items, setChangeNav, remove, cart, setSelectedId } =
    useContext(ItemContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let new_total = 0;
    wears_items.forEach((item) => {
      if (cart[item.id] > 0) {
        new_total += item.price * cart[item.id];
      }
      setTotal(new_total);
    });
  }, [cart, wears_items]);

  return (
    <div className="cart">
      <h1>Cart Page</h1>
      <div className="column">
        <p>Product name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Sub-total</p>
      </div>
      <div className="items">
        {wears_items.map((item, index) => {
          if (cart[item.id] > 0) {
            return (
              <div key={index} className="carted-item">
                <Link
                  onClick={() => {
                    setChangeNav(null);
                    setSelectedId(item.id);
                  }}
                  to="/product"
                >
                  <img src={item.image} alt="" />
                </Link>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cart[item.id]}</p>
                <p>${item.price * cart[item.id]}</p>
                <h2 onClick={() => remove(item.id)}>x</h2>
              </div>
            );
          }
        })}
      </div>
      <div className="total">
        <h1>${total}</h1>
      </div>
    </div>
  );
}
