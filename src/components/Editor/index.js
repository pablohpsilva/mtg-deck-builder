import React from 'react'
import PropTypes from 'prop-types';
import './styles.css'

function Editor() {
    return (
        <div className="editor">
            <div className="editor__title">
                <label
                    htmlFor="deckname">
                    Deck name
                </label>
                <input
                    name="deck name"
                    id="deckname" />
            </div>

            <div className="editor__format">
                <label
                    htmlFor="deckformat">
                    Deck format
                </label>
                <select>
                    <option></option>
                    <option val="Standard">Standard</option>
                    <option val="Modern">Modern</option>
                    <option val="Legacy">Legacy</option>
                    <option val="Vintage">Vintage</option>
                    <option val="Pauper">Pauper</option>
                    <option val="Commander">Commander</option>
                    <option val="Booster Draft">Booster Draft</option>
                    <option val="Brawl">Brawl</option>
                    <option val="Deck Seal">Deck Seal</option>
                    <option val="Draft/Seal">Draft/Seal</option>
                    <option val="Duel Commander">Duel Commander</option>
                    <option val="Frontier">Frontier</option>
                    <option val="THG">THG</option>
                    <option val="Tiny Leaders">Tiny Leaders</option>
                    <option val="Block">Block</option>
                    <option val="Extended">Extended</option>
                    <option val="Premodern">Premodern</option>
                    <option val="Silverblack">Silverblack</option>
                    </select>
            </div>
        </div>
    )
}

Editor.propTypes = {
    className: PropTypes.string
};

export default Editor
