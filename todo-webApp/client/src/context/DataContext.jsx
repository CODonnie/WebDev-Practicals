import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState();
  const [dataFilter, setDataFilter] = useState([]);
  const [selected, setSelected] = useState("home");
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const [stats, setStats] = useState("login");
  const url = "http://localhost:5170";

  const hashString = (str) => {
    return str.split("").reduce((hash, char) => {
      return hash + char.charCodeAt(0);
    }, 0);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/data`);
      const data = response.data.data;
      let filteredData = [];
      if (selected === "home") {
        filteredData = [...data.todos, ...data.notes].sort((a, b) => {
          return hashString(a._id) - hashString(b._id);
        });
      } else if (selected === "todo") {
        filteredData = data.todos;
      } else if (selected === "note") {
        filteredData = data.notes;
      }

      setDataFilter(filteredData);
      setLoading(false);
    } catch (error) {
      console.log(`omo! wetin sup bayi - ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selected]);

  const dataValue = {
    filterredData: dataFilter,
    show,
    setShow,
    filter,
    setFilter,
    selected,
    setSelected,
    fetchData,
    loading,
    auth,
    setAuth,
    stats,
    setStats,
  };

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };

DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
