import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ value, onClick, className }) => {
  return (
    <button className={`btn ${className}`} onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
