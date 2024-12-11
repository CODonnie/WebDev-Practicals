//eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import './Promo.scss'

const Promos = ({ category, promoImages }) => {
  return (
    <div className="container">
      <div className="card-container">
        {promoImages && promoImages.length ? (
          promoImages.map((item) => {
            if (category === item.category) {
              return (
                <div key={item._id} className="card">
                  <img src={item.image} alt="" />
                  <p>{item.title}</p>
                </div>
              );
            }
          })
        ) : (
          <>no data</>
        )}
      </div>
    </div>
  );
};

export default Promos;

Promos.propTypes = {
  promoImages: PropTypes.array,
  category: PropTypes.string,
};
