import React from 'react';
import { useState } from 'react';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

export default function CarouselItem({ pic }) {
  return (

    <Ratio>
      <Image
        src={pic.url}
        rounded
        fluid
        style={{ objectFit: 'cover' }}
      />
    </Ratio>

  )
}

