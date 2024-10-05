import "./wearsCards.scss";

export default function WearsCards({ item_price, item_name, item_image }) {
  return (
    <div className="wear-cards">
      <div className="cards">
        <img src={item_image} alt="" />
        <div className="card-info">
          <p>{item_name}</p>
          <p>${item_price}</p>
        </div>
      </div>
    </div>
  );
}
