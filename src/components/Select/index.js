import React from 'react';
import PropTypes from 'prop-types';
import Field, { propTypes as fieldPropTypes } from '../Field'
import { Box } from '../Box'
import './styles.css'

const HTMLOptionsFields = (options) => options.map(({value, text}) => (<option key={value} val={value}>{text}</option>))

const HTMLSelectField = ({ name, id, onChange, renderOptions, options }) => (
    <select
        className="selectfield__select"
        {...{ name, id, onChange}}>
        <option></option>
        {renderOptions(options)}
    </select>
)

const Select = ({ className, id, label, render, ...htmlSelectFieldProps }) => (
    <Field
        {...{ className, id, label }}>
        {render(htmlSelectFieldProps)}
    </Field>
)

Select.propTypes = {
    ...fieldPropTypes,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
};

const _HTMLOptionsFields = Box(HTMLOptionsFields)
const _HTMLSelectField = Box(HTMLSelectField)
const _Select = Box(Select)

export default _Select
    .contramap(({ selectProps }) => ({
        render: _HTMLSelectField.fold,
        renderOptions: _HTMLOptionsFields.fold,
        ...selectProps
    }))