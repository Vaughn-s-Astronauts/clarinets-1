import React from 'react';
import Characteristic from './Characteristic.jsx';

let ProductBreakdown = ({chars}) => {
  let charKeys = [];
  if (chars) {
    charKeys = Object.keys(chars);
  }

  console.log('chars', charKeys);

  return (
    <div>
      Product Breakdown
      {/* <div>
        <Slider sx={{width: 100}} disabled defaultValue={chars.Size.value} aria-label="Disabled slider" />
      </div> */}
      {/* {chars && chars.Width && <div>Width {chars.Width.value}</div>}
      {chars && chars.Comfort && <div>Comfort {chars.Comfort.value}</div>}
      {chars && chars.Quality && <div>Quality {chars.Quality.value}</div>}
      {chars && chars.Length && <div>Length {chars.Length.value}</div>}
      
      {chars && chars.Fit && <div>Fit {chars.Fit.value}</div> */}

      <div>
        {charKeys.map((char, i) => (<Characteristic key={i} char={char} score={chars[char].value} />))}
      </div>
    </div>
  )
}


export default ProductBreakdown;