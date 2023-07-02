import React from 'react';
import { useState } from 'react';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

export default function CarouselItem({ pic }) {
  return (

    <Ratio aspectRatio={120}>
      <Image
        className="d-block w-100"
        src={pic.url}
        rounded
        fluid
        style={{ height: 'auto', width: '100%' }}
      />
    </Ratio>

  )
}

