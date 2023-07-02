import React from 'react';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

export default function Style({oneStyle, index, state, setState}) {

  let handleStyleClick = (state, setState) => {

  }

  return (
    <Col xs={3}>
      <Ratio aspectRatio={100}>
        <Image
          src={oneStyle.photos[0].thumbnail_url}
          roundedCircle
          style={{ height: '70%', width: '70%' }}
          onClick={handleStyleClick}
        />
      </Ratio>
      {/*{(index + 1) % 4 === 0 && <div class="w-100" style={{ width: '100%' }}></div>}*/}
    </Col>
  )
}