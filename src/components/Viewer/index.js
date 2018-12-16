import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Card from './card';
import Deck from './deck';

function Viewer () {
    const [highlightCard, setHighlightCard] = useState('https://www.lmcorp.com.br/arquivos/up/cartas_bkp/images/pt140shm.jpg')
    function displayCard (card) {
        card && setHighlightCard(card.imageUrl)
    }
    return (
        <div>
            <Deck name="Main deck" viewCard={displayCard}/>
            {/* <Deck name="Side deck"/> */}
            <Card image={highlightCard}/>
        </div>
    )
}

Viewer.propTypes = {
    className: PropTypes.string
};

export default Viewer
