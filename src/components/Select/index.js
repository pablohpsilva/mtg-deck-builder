import React from 'react';
import PropTypes from 'prop-types';
import Field, { propTypes as fieldPropTypes } from '../Field'
import './styles.css'

function select ({ className, id, name, label, options, onChange }) {
    return (
        <Field
            className={className}
            id={id}
            label={label}>
            <select
                className="selectfield__select"
                name={name}
                id={id}
                onChange={onChange}>
                <option></option>
                {options.map(option => (<option key={option.value} val={option.value}>{option.text}</option>))}
            </select>
        </Field>
    )
}

select.propTypes = {
    ...fieldPropTypes,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
};


export default select