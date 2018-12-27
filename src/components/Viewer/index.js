import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "../CardView";
import DeckEditor from "../DeckEditor";
import { isEmpty, isNil } from 'ramda'
import "./styles.css";

function updateLocalStorage (collection, deckName) {
  if (collection && deckName) {
    return (cardList) => {
      const localCollection = window.localStorage.getItem(collection)
      const collectionObjects = isEmpty(localCollection) || isNil(localCollection) ? {} : JSON.parse(localCollection)
      const storableItem = Object.assign({}, collectionObjects, { [deckName]: { ...cardList} })
      window.localStorage.setItem(collection, JSON.stringify(storableItem))
    }
  }
}

function readLocalStorage (collection) {
  if (collection) {
    return JSON.parse(window.localStorage.getItem(collection))
  }
}

function Viewer() {
  const [highlightCard, setHighlightCard] = useState(null);
  const collection = readLocalStorage('pablo')

  const mainDeck = (isEmpty(collection) || isNil(collection)) ? {} : collection['Main deck']
  const sideDeck = (isEmpty(collection) || isNil(collection)) ? {} : collection['Side deck']

  function displayCard(card) {
    card && setHighlightCard(card);
  }

  function handleUpdateDeck(collection, name) {
    return deck => updateLocalStorage(collection, name)(deck)
  }

  return (
    <div className="viewer">
      <DeckEditor
        className="viewer__deckmain"
        name="Main deck"
        viewCard={displayCard}
        deckCards={mainDeck}
        updateDeck={handleUpdateDeck('pablo', 'Main deck')}
      />
      <DeckEditor
        className="viewer__deckside"
        name="Side deck"
        viewCard={displayCard}
        deckCards={sideDeck}
        updateDeck={handleUpdateDeck('pablo', 'Side deck')}
      />
      {highlightCard ? <Card className="viewer__deckcard" image={highlightCard.imageUrl} text={highlightCard.text} /> : null }
    </div>
  );
}

Viewer.propTypes = {
  className: PropTypes.string
};

export default Viewer;
