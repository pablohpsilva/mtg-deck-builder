import React from 'react'
import PropTypes from 'prop-types';

function Share ({ id = '1872631', user = '1iu2389127' }) {
    const defaultURL = `https://mtgdb.com/user/${user}/d/`
    return (
        <div>
            <label htmlFor="regularlink">Regular link</label>
            <input
                id="regularlink"
                onChange={() => ({})}
                value={`${defaultURL}${id}`}/>
            <label htmlFor="shortlink">Short link</label>
            <input
                id="shortlink"
                onChange={() => ({})}
                value={`${defaultURL}${id}`}/>
            <label htmlFor="iframe">iframe</label>
            <input
                id="iframe"
                onChange={() => ({})}
                value={`<iframe src="${defaultURL}${id}?iframe"/></iframe>`}/>
        </div>
    )
}

Share.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
};

export default Share
