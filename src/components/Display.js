import React from 'react';
import PropTypes from 'prop-types';

export const Display = ({ value }) => {
  return (
    <div id="display">
      {value}
    </div>
  );
};

Display.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
