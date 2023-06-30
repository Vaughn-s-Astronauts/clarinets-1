import React from 'react';
import { useState } from 'react';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Carousel';
import Fragment from 'react';

export default function Style({oneStyle, state, setState}) {
  console.log('oneStyle: ', oneStyle.photos[0]);
  return (
    <Fragment>
      <Ratio aspectRatio={70}>
        {oneStyle.photos[0].length > 0 &&
          <Image>
            src={oneStyle.photos[0].thumbnail_url}
            roundedCircle
            style={{height: '100%', width: '100%'}}
          </Image>
        }
      </Ratio>
    </Fragment>
  )
}