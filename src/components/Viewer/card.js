import React from 'react'
import PropTypes from 'prop-types';

function Card ({ image }) {
    return (
        <>
            <div
                style={{
                    height: '400px',
                    backgroundImage: `url(${image})`,
                    width: '280px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className="card"/>
        </>
    )
}

Card.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string
};

export default Card
