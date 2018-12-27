import React from 'react';
import PropTypes from 'prop-types';
import './styles.css'

function Field ({ className, id = 'deckname', children, label}) {
    return (
        <div className={`field ${className || ''}`}>
            <label
                className="field__label"
                htmlFor={id}>
                {label}
            </label>
            { children }
        </div>
    )
}

export const propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    children: PropTypes.any,
    label: PropTypes.string.isRequired,
}

Field.propTypes = propTypes;

export default Field