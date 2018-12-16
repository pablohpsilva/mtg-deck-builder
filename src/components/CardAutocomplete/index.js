import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Autocomplete from 'react-autocomplete'
const mtg = require('mtgsdk')
let timeout;

function queryMTGOpenAPI (name, format) {
    return mtg.card
        .where({ name, legalities: { format } })
}

function debounce (callback, time = 500) {
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            timeout = null;
            callback.apply(context, args);
        }, time);
    }
}

function CardAutocomplete ({ labelName, format = 'Modern', value, selectCard }) {
    const [cards, setCards] = useState([])
    const [searchValue, setSearchValue] = useState(value)

    const queryDebounced = debounce((value, format) => {
        queryMTGOpenAPI(value, format)
            .then(result => {
                console.log(result)
                setCards(result)
            })
    })

    function handleChange (format) {
        return (_, value) => {
            setSearchValue(value)
            queryDebounced(value, format)
        }
    }

    return (
        <>
            {
                labelName
                    ? (<label
                        htmlFor="card">
                        {labelName}
                    </label>)
                    : null
            }
            <Autocomplete
                inputProps={{ id: 'states-autocomplete' }}
                wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                value={searchValue}
                items={cards}
                getItemValue={(item) => item.name}
                onSelect={(_, item) => {
                    setSearchValue('')
                    selectCard(item)
                    setCards([])
                }}
                onChange={handleChange(format)}
                renderMenu={children => (
                    <div className="menu">
                        {children}
                    </div>
                )}
                renderItem={(item, isHighlighted) => (
                    <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                        key={item.id}
                    >
                        {item.name}
                    </div>
                )}
            />
        </>
    )
}

CardAutocomplete.propTypes = {
    className: PropTypes.string,
    labelName: PropTypes.string,
    value: PropTypes.string,
    format: PropTypes.string.isRequired,
    selectCard: PropTypes.func.isRequired,
};

export default CardAutocomplete
