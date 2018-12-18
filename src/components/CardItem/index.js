import React from "react";
import PropTypes from "prop-types";

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
    <div className={className}>
      <input
        onChange={handleCardQuantityChange(type, card)}
        value={card.__mtgdb_quantity}
        min={1}
        type="number"
      />
      <span onMouseOver={handleMouseOver(card)} onMouseOut={handleMouseOut}>
        {card.name}
      </span>
      <button onClick={handleRemoveCard(type, card)}>x</button>
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
