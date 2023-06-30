import React, {useState, useEffect} from 'react';
import API from '../../helpers/API.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import Ratio from 'react-bootstrap/Ratio';
import Style from './Style.jsx';

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
        <Col xs={1}>
          <Stack gap={3}>
            {state.photos.map((pic) => {
              return(
                <Ratio aspectRatio={70}>
                  <Image
                    src={pic.thumbnail_url}
                    thumbnail
                    style={{height: '100%', width: '100%'}}
                  />
                </Ratio>
              )
            })}
          </Stack>
        </Col>

        <Col xs={5}>
          <Carousel fade>
            {state.photos.map((pic) => {
              return(
                <Carousel.Item>
                  <Ratio aspectRatio={90}>
                    <Image
                      className="d-block w-100"
                      src={pic.url}
                      rounded
                      style={{height: '100%', width: '100%'}}
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
          <p>{state.currentProduct.category}</p>
          <p>{state.currentProduct.default_price}</p>
          <p>STYLE {'>'} SELECTED STYLE</p>
          <Stack direction="horizontal" gap={3}>
            {/*state.styles.map((style) => {
              return(
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
            })*/}
          </Stack>
        </Col>

      </Row>
      <p></p>
    </Container>
  )
};

