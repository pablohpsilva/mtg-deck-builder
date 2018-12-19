import React, { useState } from "react";
import CardAutocomplete from "../CardAutocomplete";
import PropTypes from "prop-types";
import { groupBy } from "ramda";
import CardItem from "../CardItem";

const groupByType = groupBy(card => card.types);

function generateGroupedCards(cards) {
  return groupByType(cards);
}

function Deck ({ name = "Main deck", className, viewCard, deckCards = {}, updateDeck}) {
  const [groupedCards, setGroupedCards] = useState(deckCards);
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
    updateGroupedCards(groupped);
  }

  function updateGroupedCards (cards) {
    updateDeck('pablo', cards)
    setGroupedCards(cards);
  }

  function handleCardQuantityChange(type, card, value) {
    const deckCards = Object.assign([], groupedCards);
    const deckCardsByType = deckCards[type];
    const selectedCardIndex = deckCardsByType.indexOf(card);
    deckCards[type][selectedCardIndex].__mtgdb_quantity = value;
    updateGroupedCards(deckCards);
  }

  function handleRemoveCard(type, card) {
    const deckCards = Object.assign([], groupedCards);
    const deckCardsByType = deckCards[type];
    const selectedCardIndex = deckCardsByType.indexOf(card);
    deckCards[type].splice(selectedCardIndex, selectedCardIndex + 1);
    if (!deckCards[type].length) {
      delete deckCards[type];
    }
    updateGroupedCards(deckCards);
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
          <React.Fragment key={key}>
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
            ))}
            <span>
              {groupedCards[key].length} {key}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

Deck.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  cards: PropTypes.array,
  deckCards: PropTypes.object,
  updateDeck: PropTypes.func,
  viewCard: PropTypes.func
};

export default Deck;
