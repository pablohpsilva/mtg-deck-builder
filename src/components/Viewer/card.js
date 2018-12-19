import React from "react";
import PropTypes from "prop-types";

function Card({ image, className }) {
  return (
    <div className={className}>
      <div
        style={{
          // height: "400px",
          // backgroundImage: `url(${image})`,
          // width: "280px",
          // backgroundSize: "cover",
          // backgroundPosition: "center"
        }}
        className="card"
      >
        <img style={{
          width: '100%'
        }} src={image} alt="card" />
      </div>
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string
};

export default Card;
