import React from 'react';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Ratio from 'react-bootstrap/Ratio';
import Image from 'react-bootstrap/Image';

export default function Style({oneStyle, index, state, setState}) {

  let handleStyleClick = (evt) => {
    document.getElementById('cartForm').reset();
    setState({
      ...state,
      currentStyle: JSON.parse(evt.currentTarget.getAttribute('data-style')),
      currentStyleId: JSON.parse(evt.currentTarget.getAttribute('data-style')).style_id,
      currentStylePhotos: JSON.parse(evt.currentTarget.getAttribute('data-style')).photos,
      currentSize: '',
      currentQuantity: [0],
      currentPhotoCount: JSON.parse(evt.currentTarget.getAttribute('data-style')).photos.length
    })
  }

  return (
    <Col xs={3}>
      {oneStyle.style_id === state.currentStyleId && <i className="bi bi-check-circle"></i>}
      <Ratio>
        <Image
          key={index}
          src={oneStyle.photos[0].url}
          roundedCircle
          style={{ height: '70%', width: '70%'}}
          data-style={JSON.stringify(oneStyle)}
          onClick={handleStyleClick}
        />
      </Ratio>
      {/*{(index + 1) % 4 === 0 && <div class="w-100" style={{ width: '100%' }}></div>}*/}
    </Col>
  )
}