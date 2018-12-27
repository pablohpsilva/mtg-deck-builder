import React, { useState } from "react";
import CardAutocomplete from "../CardAutocomplete";
import PropTypes from "prop-types";
import { groupBy } from "ramda";
import CardItem from "../CardItem";
import "./styles.css";

const groupByType = groupBy(card => card.types);

function generateGroupedCards(cards) {
  return groupByType(cards);
}

function countCards(cards) {
  return cards.reduce((acc, curr) => acc + Number(curr.__mtgdb_quantity), 0)
}

function Deck ({ name, className, viewCard, deckCards = {}, updateDeck}) {
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
    updateDeck(cards)
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
    <div className={`${className || ''} deck`}>
      <h3>
        {name} ({countCards(deckCardsList)} cards)
      </h3>

      <div className="deckeditor__autocompletewrapper">
        <CardAutocomplete
          labelName="Card"
          format="Modern"
          selectCard={handleCardSelection}
        />
      </div>

      <div className="deck__groupedcardswrapper">
        {Object.keys(groupedCards).map(key => (
          <div className="deck__groupedcards" key={key}>
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
            <span className="deck__groupedtype">
              {countCards(groupedCards[key])} {key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

Deck.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  cards: PropTypes.array,
  deckCards: PropTypes.object,
  updateDeck: PropTypes.func,
  viewCard: PropTypes.func
};

export default Deck;
