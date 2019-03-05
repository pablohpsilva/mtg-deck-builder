import React from 'react'

export const fnToClass = f => React.createClass({ render () { return f(this.props) } })

export const classToFn = C => (props) => <C {...props} />

export const Box = boxComp => ({
    fold: boxComp,
    contramap: func => Box(props => boxComp(func(props))),
    map: func => Box(props => func(boxComp(props))),
    concat: otherComp => Box(x => (
        <React.Fragment>
            {boxComp(x)}
            {otherComp.fold(x)}
        </React.Fragment>
    )),
})