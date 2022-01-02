import React from 'react';

import './error.scss';

function Error({
  message = 'Something went wrong',
  containerClassName = '',
  messageClassName = '',
  heading = 'Uh Oh!',
  headingClassName = '',
}) {
  return (
    <div className={`absolute container ${containerClassName}`}>
      <h1 className={`h1 mb-16 text-center ${headingClassName}`}>{heading}</h1>
      <p className={`font-14 text-center ${messageClassName}`}>{message}</p>
    </div>
  )
}

export default Error;
