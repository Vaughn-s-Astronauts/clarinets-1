import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function CarouselItem({ image }) {
  return (
      <Carousel.Item>
      <img
        className="d-block w-100"
        src={image.url}
      />
      <Carousel.Caption>
        <h3>Picture label</h3>
        <p>Some description</p>
      </Carousel.Caption>
    </Carousel.Item>
  )
}

