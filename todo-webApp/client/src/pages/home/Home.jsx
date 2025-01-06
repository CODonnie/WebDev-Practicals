import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import "./Home.scss";
import { MdGridView, MdViewList } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { filterredData, setFilter } = useContext(DataContext);
  const [grid, setGrid] = useState(true);
  const navigate = useNavigate();

  const editEntry = (arg) => {
    if (arg.type === "note") {
      navigate("/note", {
        state: { title: arg.title, textarea: arg.textarea },
      });
    } else {
      navigate("/todo", {
        state: { title: arg.title, todos: arg.todo, completed: arg.completed },
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="display">
        <MdGridView color="white" size={22} onClick={() => setGrid(true)} />
        <MdViewList color="white" size={22} onClick={() => setGrid(false)} />
      </div>

      <div className="cards">
        <div className={grid ? "grid-cards" : "list-cards"}>
          {filterredData ? (
            filterredData.map((data) => {
              if (data.type === "note") {
                return (
                  <div
                    key={data._id}
                    className="note-card card"
                    onClick={() => {
											editEntry(data);
											setFilter(null);
										}}
                  >
                    <h4>{data.title}</h4>
                    <p>{data.textarea}</p>
                    <p>{data.createdOn}</p>
                  </div>
                );
              }
              if (data.type === "todo") {
                return (
                  <div
                    key={data._id}
                    className="todo-card card"
                    onClick={() => {
											editEntry(data);
											setFilter(null);
										}}
                  >
                    <h4>{data.title}</h4>
                    {data.todo.map((todo, i) => (
                      <div key={i} className="todos">
                        <p>~{todo}</p>
                      </div>
                    ))}
                    <p>{data.completed.length} completed task</p>
                    <p>{data.createdOn}</p>
                  </div>
                );
              }

              return null;
            })
          ) : (
            <>no resources found</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
