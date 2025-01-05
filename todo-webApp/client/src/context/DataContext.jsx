import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { testData } from '../assets/data.js';

const DataContext = createContext();

const DataContextProvider = ({ children }) => {


  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState();
  const [selected, setSelected] = useState("home");

  const dataValue = {
		testData,
    show,
		setShow,
		filter,
		setFilter,
		selected,
		setSelected
  };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
