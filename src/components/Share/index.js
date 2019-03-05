import React from "react";
import PropTypes from "prop-types";
import { Box } from '../Box'

import "./style.css";

function Share({ id, user }) {
  const defaultURL = `https://mtgdb.com/user/${user}/d/`;

  const handleChange = () => ({});

  return (
    <div className="share">
      <div className="share__link">
        <label className="share__linklabel" htmlFor="regularlink">
          Regular link
        </label>
        <input
          className="share__linkinput"
          id="regularlink"
          onChange={handleChange}
          value={`${defaultURL}${id}`}
        />
      </div>
      <div className="share__link">
        <label className="share__linklabel" htmlFor="shortlink">
          Short link
        </label>
        <input
          className="share__linkinput"
          id="shortlink"
          onChange={handleChange}
          value={`${defaultURL}${id}`}
        />
      </div>
      <div className="share__link">
        <label className="share__linklabel" htmlFor="iframe">
          iframe
        </label>
        <input
          className="share__linkinput"
          id="iframe"
          onChange={handleChange}
          value={`<iframe src="${defaultURL}${id}?iframe"/></iframe>`}
        />
      </div>
    </div>
  );
}

Share.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string
};

const defaultProps = { id: "1872631", user: "1iu2389127" }

export default Box(Share).contramap(props => ({ ...defaultProps, ...props }));
