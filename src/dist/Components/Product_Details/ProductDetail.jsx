import React, { useState, useEffect, Fragment } from 'react';
import API from '../../helpers/API.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import Ratio from 'react-bootstrap/Ratio';
import Dropdown from 'react-bootstrap/Dropdown'
import SearchBar from './SearchBar.jsx'

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
        <Col><h1>logo</h1></Col>
        <Col><SearchBar/></Col>
      </Row>

      <Row>
        <h5>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT</h5>
      </Row>

      <Row>
        <Col xs={1}>
          <Stack gap={3}>
            {state.photos.map((pic) => {
              return (
                <Ratio aspectRatio={90}>
                  <Image
                    src={pic.thumbnail_url}
                    thumbnail
                    style={{ height: 'auto', width: '100%' }}
                  />
                </Ratio>
              )
            })}
          </Stack>
        </Col>

        <Col xs={5}>
          <Carousel fade>
            {state.photos.map((pic) => {
              return (
                <Carousel.Item>
                  <Ratio aspectRatio={120}>
                    <Image
                      className="d-block w-100"
                      src={pic.url}
                      rounded
                      fluid
                      style={{ height: 'auto', width: '100%' }}
                    />
                  </Ratio>
                  <Carousel.Caption>
                    <h3>Picture label</h3>
                    <p>Some description</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Col>

        <Col xs={5}>
          <p>star ratings</p>
          <p>Category</p>
          <h5>{state.currentProduct.category}</h5>
          <p>${state.currentProduct.default_price}</p>
          <p>STYLE {'>'} SELECTED STYLE</p>
          <Row>
            {state.styles.map((oneStyle, index) => {
              return (
                <Col xs={3}>
                  <Ratio aspectRatio={100}>
                    <Image
                      src={oneStyle.photos[0].thumbnail_url}
                      roundedCircle
                      style={{ height: '70%', width: '70%' }}
                    />
                  </Ratio>
                  {/*{(index + 1) % 4 === 0 && <div class="w-100" style={{ width: '100%' }}></div>}*/}
                </Col>
              )
            })}
          </Row>

          <Row>
            <div>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                Default Dropdown
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                Default Dropdown
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </div>
          </Row>

        </Col>

      </Row>
      <p></p>
    </Container>
  )
};

