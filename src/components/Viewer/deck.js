import React, { useState } from "react";
import CardAutocomplete from "../CardAutocomplete";
import PropTypes from "prop-types";
import { groupBy } from "ramda";
import CardItem from "../CardItem";

const groupByType = groupBy(card => card.types);

function generateGroupedCards(cards) {
  return groupByType(cards);
}

function Deck({ name = "Main deck", className, viewCard }) {
  const [groupedCards, setGroupedCards] = useState([]);
  const deckCardsList = Object.values(groupedCards).reduce(
    (acc, curr) => acc.concat(curr),
    []
  );

  function triggerViewCard(card) {
    if (viewCard) {
      viewCard(card);
    }
  }

  function handleCardSelection(card) {
    const groupped = generateGroupedCards(
      deckCardsList.concat(createCard(card))
    );
    triggerViewCard(card);
    setGroupedCards(groupped);
  }

  function handleCardQuantityChange(type, card, value) {
    const deckCards = Object.assign([], groupedCards);
    const deckCardsByType = deckCards[type];
    const selectedCardIndex = deckCardsByType.indexOf(card);
    deckCards[type][selectedCardIndex].__mtgdb_quantity = value;
    setGroupedCards(deckCards);
  }

  function handleRemoveCard(type, card) {
    const deckCards = Object.assign([], groupedCards);
    const deckCardsByType = deckCards[type];
    const selectedCardIndex = deckCardsByType.indexOf(card);
    deckCards[type].splice(selectedCardIndex, selectedCardIndex + 1);
    if (!deckCards[type].length) {
      delete deckCards[type];
    }
    setGroupedCards(deckCards);
  }

  function createCard(card) {
    return Object.assign({}, card, { __mtgdb_quantity: 1 });
  }

  return (
    <div className={className}>
      <h3>
        {name} ({deckCardsList.length} cards)
      </h3>
      <div style={{ marginBottom: "20px" }}>
        <CardAutocomplete
          labelName="Card"
          format="Modern"
          selectCard={handleCardSelection}
        />
      </div>
      <div>
        {Object.keys(groupedCards).map(key => (
          <div key={key}>
            {groupedCards[key].map(card => (
              <CardItem
                {...{
                  key: card.id,
                  type: key,
                  card,
                  quantityChange: handleCardQuantityChange,
                  viewCard: triggerViewCard,
                  removeCard: handleRemoveCard
                }}
              />
              // <div key={card.id}>
              //   <input
              //     onChange={handleCardQuantityChange(key, card.id)}
              //     value={card.__mtgdb_quantity}
              //     min={1}
              //     type="number"
              //   />
              //   <span
              //     onMouseOver={handleMouseOver(card)}
              //     onMouseOut={handleMouseOut}
              //   >
              //     {card.name}
              //   </span>
              //   <button onClick={handleRemoveCard(key, card)}>x</button>
              // </div>
            ))}
            <span>
              {groupedCards[key].length} {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

Deck.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  cards: PropTypes.array,
  viewCard: PropTypes.func
};

export default Deck;
