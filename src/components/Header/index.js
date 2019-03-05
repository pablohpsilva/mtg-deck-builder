import React from 'react'
import PropTypes from 'prop-types';
import Input from '../Input'
import Select from '../Select'
import Share from '../Share';
import { Box } from '../Box'

import './styles.css'

const formats = [
    { value: 'Standard', text: 'Standard' },
    { value: 'Modern', text: 'Modern' },
    { value: 'Legacy', text: 'Legacy' },
    { value: 'Vintage', text: 'Vintage' },
    { value: 'Pauper', text: 'Pauper' },
    { value: 'Commander', text: 'Commander' },
    { value: 'Booster Draft', text: 'Booster Draft' },
    { value: 'Brawl', text: 'Brawl' },
    { value: 'Deck Seal', text: 'Deck Seal' },
    { value: 'Draft/Seal', text: 'Draft/Seal' },
    { value: 'Duel Commander', text: 'Duel Commander' },
    { value: 'Frontier', text: 'Frontier' },
    { value: 'THG', text: 'THG' },
    { value: 'Tiny Leaders', text: 'Tiny Leaders' },
    { value: 'Block', text: 'Block' },
    { value: 'Extended', text: 'Extended' },
    { value: 'Premodern', text: 'Premodern' },
    { value: 'Silverblack', text: 'Silverblack' }
]

const inputProps = {
    className: 'header__deckname',
    id: 'deckname',
    name: 'deck name',
    label: 'Deck name',
    placeholder: 'Write your deck name',
    type: 'text',
    onChange: (c) => console.log(c.target.value)
}

const selectProps = {
    className: "header__deckformat",
    id: "deckformat",
    name: "Deck format",
    label: "Deck format",
    options: formats
}


const Header = ({ render, renderInput, renderSelect, renderShare, ...elementProps }) => render(elementProps)

Header.propTypes = {
    className: PropTypes.string
};

const _Header = Box(Header)
    .contramap(() => ({
        render: Input
            .concat(Select)
            .concat(Share)
            .fold,
        inputProps,
        selectProps
    }))
    .map(T => (
        <div className="header">
        {T}
        </div>
    ))

export default _Header.fold
