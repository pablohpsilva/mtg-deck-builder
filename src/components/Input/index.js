import React from 'react';
import PropTypes from 'prop-types';
import Field, { propTypes as fieldPropTypes } from '../Field'
import './styles.css'

function Input ({ className, id, name, label, defaultValue, placeholder, value, onChange, type = 'text' }) {
    return (
        <Field
            className={className}
            id={id}
            label={label}>
            <input
                className="inputfield__input"
                name={name}
                id={id}
                defaultValue={defaultValue}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                type={type}/>
        </Field>
    )
}

Input.propTypes = {
    ...fieldPropTypes,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
};


export default Input