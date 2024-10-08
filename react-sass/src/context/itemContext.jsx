import { createContext, useState } from "react";
import { wears_items } from "../assets/assets";
import Proptypes from "prop-types";

export const ItemContext = createContext(null);

const ItemContextProvider = (props) => {
  const [changeNav, setChangeNav] = useState(null); //navigation context
  const [selectedId, setSelectedId] = useState(); //product context
  const [cart, setCart] = useState({}); //cart context

  const addToCart = (itemId) => {
    if (!cart[itemId]) {
      setCart((currState) => ({ ...currState, [itemId]: 1 }));
    } else {
      setCart((currState) => ({
        ...currState,
        [itemId]: currState[itemId] + 1,
      }));
    }
  };

  const minusFromCart = (itemId) => {
    setCart((currState) => ({ ...currState, [itemId]: currState[itemId] - 1 }));
  };

  const remove = (itemId) => {
    setCart((currState) => ({ ...currState, [itemId]: 0 }));
  };

  const wearsContext = {
    wears_items,
    addToCart,
    minusFromCart,
    cart,
    remove,
    setCart,
    changeNav,
    setChangeNav,
    selectedId,
    setSelectedId,
  };

  return (
    <ItemContext.Provider value={wearsContext}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;

ItemContextProvider.propTypes = {
  props: Proptypes.any,
   children: Proptypes.element,
};
