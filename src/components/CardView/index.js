import React from "react";
import PropTypes from "prop-types";
import './styles.css'

function Card ({ image, text, className }) {
  return (
    <div className={`cardview ${className || ''}`}>
      <div
        className="cardview__imagewrapper"
      >
        <img className="cardview__image" src={image} alt="card" />
      </div>
      <span className="cardview__text">{text}</span>
    </div>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  text: PropTypes.string
};

export default Card;
