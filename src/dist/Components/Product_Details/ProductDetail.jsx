import React, {useState, useEffect} from 'react';
import API from '../../helpers/API.js';
import CarouselItem from './CarouselItem.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';


export default function ProductDetail({ product }) {

  const [state, setState] = useState({
    currentProduct: product,
    styles: [],
    currentStyle: {},
    photos: [],
    currentPhoto: ''
  })

  useEffect(() => {
    API.GET_PRODUCT_STYLES(product.id)
    .then((response) => {
      console.log(response.data);
      setState({
        ...state,
        styles: response.data.results,
        currentStyle: response.data.results[0],
        photos: response.data.results[0].photos,
        currentPhoto: response.data.results[0].photos[0].url
      })
    })
  }, [])

  return (
    <Container fluid>
      <Row>
        <Col>logo</Col>
        <Col>search bar</Col>
      </Row>

      <Row>
      SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT
      </Row>

      <Row>
        <Col>
          sidebar of veritical pics
        </Col>

        <Col>
          <Carousel fade>
            src={state.photos.map((pic) => {
              return(
                <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={pic.url}
                />
                <Carousel.Caption>
                  <h3>Picture label</h3>
                  <p>Some description</p>
                </Carousel.Caption>
              </Carousel.Item>
              )
            })}
          </Carousel>
        </Col>

        <Col>
          <p>star ratings</p>
          <p>Category</p>
          <p>{state.currentProduct.category}</p>
          <p>{state.currentProduct.default_price}</p>
          <p>STYLE {'>'} SELECTED STYLE</p>
        </Col>

      </Row>
    </Container>
  )
};
