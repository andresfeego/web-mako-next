import React from 'react';

const IconWrapper = ({ children, size = "1.4em", color = "inherit", className = "", style = {} }) => {
  return React.cloneElement(children, {
    size,
    color,
    className,
    style
  });
};

export default IconWrapper;