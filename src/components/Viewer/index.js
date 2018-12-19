import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "./card";
import Deck from "./deck";

import "./viewer.css";


function updateLocalStorage (deckName) {
  if (deckName) {
    return (cardList) => {
      window.localStorage.setItem(deckName, JSON.stringify(cardList))
    }
  }
}

function readLocalStorage (deckName) {
  if (deckName) {
    return JSON.parse(window.localStorage.getItem(deckName))
  }
}

function Viewer() {
  const [highlightCard, setHighlightCard] = useState(
    "https://www.lmcorp.com.br/arquivos/up/cartas_bkp/images/pt140shm.jpg"
  );

  const mainDeck = readLocalStorage('pablo')
  console.log(mainDeck)

  function displayCard(card) {
    card && setHighlightCard(card.imageUrl);
  }

  function handleUpdateDeck(name, deck) {
    updateLocalStorage(name)(deck)
  }

  return (
    <div className="viewer">
      <Deck
        className="viewer__deckmain"
        name="Main deck"
        viewCard={displayCard}
        deckCards={mainDeck}
        updateDeck={handleUpdateDeck}
      />
      <Deck
        className="viewer__deckside"
        name="Side deck"
        viewCard={displayCard}
      />
      <Card className="viewer__deckcard" image={highlightCard} />
    </div>
  );
}

Viewer.propTypes = {
  className: PropTypes.string
};

export default Viewer;
