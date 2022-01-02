import React from 'react';

import './loader.scss';

function Loader({
  containerClassName = '',
  className = '',
}) {
  return (
    <div className={`loader-container ${containerClassName}`}>
      <div className={`loader ${className}`}></div>
    </div>
    );
}

export default Loader;
