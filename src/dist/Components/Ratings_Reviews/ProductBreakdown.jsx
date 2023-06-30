import React from 'react';
import Characteristic from './Characteristic.jsx';

let ProductBreakdown = ({chars}) => {
  let charKeys = [];
  if (chars) {
    charKeys = Object.keys(chars);
  }

  return (
    <div>
      <div>
        {charKeys.map((char, i) => (<Characteristic key={i} char={char} score={chars[char].value} />))}
      </div>
    </div>
  )
}

export default ProductBreakdown;