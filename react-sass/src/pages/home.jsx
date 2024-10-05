import { useState, useContext } from "react";
import { ItemContext } from "../context/itemContext.jsx";
import "./home.scss";
import WearsCards from "../components/wearsCards";

export default function Home() {
  const { wears_items } = useContext(ItemContext);
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("all");

  return (
    <div className="home">
      <h1>Home Page</h1>
      <div className="filter">
        <button
          className={showFilters === true ? "active" : "inactive"}
          onClick={() => {
            setShowFilters((currState) => !currState);
            setCategory("all");
          }}
        >
          Filter
        </button>
        {showFilters ? (
          <ul>
            <li onClick={() => setCategory("casual")}>
              Casual {category === "casual" ? <hr /> : <></>}
            </li>
            <li onClick={() => setCategory("formal")}>
              Formal{category === "formal" ? <hr /> : <></>}
            </li>
            <li onClick={() => setCategory("hybrid")}>
              Hybrid {category === "hybrid" ? <hr /> : <></>}
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
      <div className="home-cards">
        {wears_items.map((item, index) => {
          if (category === "all" || category === item.category) {
            return (
              <div className="hmc" key={index}>
                <WearsCards
                  item_id={item.id}
                  item_name={item.name}
                  item_desc={item.description}
                  item_image={item.image}
                  item_price={item.price}
                  item_category={item.category}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
