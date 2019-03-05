import React from 'react';
import PropTypes from 'prop-types';
import Field, { propTypes as fieldPropTypes } from '../Field'
import { Box } from '../Box'
import './styles.css'

const HTMLInputField = (props) => <input className="inputfield__input" {...props} />

function Input ({ className, id, label, render, ...htmlInputFieldProps }) {
    return (
        <Field
            {...{ className, id, label }}>
            {render(htmlInputFieldProps)}
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

const _HTMLInputField = Box(HTMLInputField);
const _Input = Box(Input);

// REMINDER: This shit below is NOT ok.
// const BoxHTMLInputField = Box(HTMLInputField).contramap(props => props)
// const BoxInput = Box(Input).contramap(props => Object.assign({}, props, { children: BoxHTMLInputField }))

export default _Input
    .contramap(({ inputProps }) => ({
        render: _HTMLInputField.fold,
        ...inputProps
    }))