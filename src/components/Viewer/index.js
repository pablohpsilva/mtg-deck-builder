import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "./card";
import Deck from "./deck";

import "./viewer.css";

function Viewer() {
  const [highlightCard, setHighlightCard] = useState(
    "https://www.lmcorp.com.br/arquivos/up/cartas_bkp/images/pt140shm.jpg"
  );
  function displayCard(card) {
    card && setHighlightCard(card.imageUrl);
  }
  return (
    <div className="viewer">
      <Deck
        className="viewer__deckmain"
        name="Main deck"
        viewCard={displayCard}
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
