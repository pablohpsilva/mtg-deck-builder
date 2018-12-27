import React from "react";
import PropTypes from "prop-types";
import './styles.css'

function CardItem({
  className,
  viewCard,
  removeCard,
  quantityChange,
  type,
  card
}) {
  function triggerViewCard(card) {
    if (viewCard) {
      viewCard(card);
    }
  }

  function handleMouseOver(card) {
    return () => triggerViewCard(card);
  }

  function handleMouseOut() {
    triggerViewCard(null);
  }

  function handleRemoveCard(type, card) {
    return () => {
      if (removeCard) {
        removeCard(type, card);
      }
    };
  }

  function handleCardQuantityChange(type, card) {
    return event => {
      if (quantityChange) {
        quantityChange(type, card, event.target.value);
      }
    };
  }

  return (
    <div
      className={`${className || ''} carditem`}
      onMouseOver={handleMouseOver(card)}
      onMouseOut={handleMouseOut}>
      <img
        className="carditem__art"
        src={card.imageUrl}
        alt="card art" />
      <input
        className="carditem__input"
        onChange={handleCardQuantityChange(type, card)}
        value={card.__mtgdb_quantity}
        min={1}
        type="number"
      />
      <span
        className="carditem__name">
        {card.name}
      </span>
      <div className="carditem__deletewrapper">
        <button
          className="carditem__delete"
          onClick={handleRemoveCard(type, card)}>
          x
        </button>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  className: PropTypes.string,
  card: PropTypes.object.isRequired,
  viewCard: PropTypes.func,
  removeCard: PropTypes.func,
  quantityChange: PropTypes.func,
  type: PropTypes.string.isRequired
};

export default CardItem;
