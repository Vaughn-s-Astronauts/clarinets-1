import React, { useState, useEffect, Fragment } from 'react';
import API from '../../helpers/API.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image'
import Stack from 'react-bootstrap/Stack';
import Ratio from 'react-bootstrap/Ratio';
import CarouselItem from './CarouselItem.jsx';
import SearchBar from './SearchBar.jsx';
import Style from './Style.jsx';
import AddToCart from './AddToCart.jsx';
import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { FacebookShareButton, FacebookIcon } from 'react-share'
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { PinterestShareButton, PinterestIcon } from 'react-share';

export default function ProductDetail({ product, setProduct }) {

  const [state, setState] = useState({
    currentProduct: product,
    styles: [],
    currentStyle: {},
    currentStyleID: '',
    currentStylePhotos: [],
    currentSku: '',
    currentSize: '',
    currentQuantity: [1],
    currentReviews: [],
    currentAvgReview: 0,
    currentPhotoIndex: 0,
    currentPhotoCount: 0
  })

  useEffect(() => {
    API.GET_PRODUCT_STYLES(product.id)
      .then((response) => {
        setState({
          ...state,
          currentProduct: product,
          styles: response.data.results,
          currentStyle: response.data.results[0],
          currentStyleId: response.data.results[0].style_id,
          currentStylePhotos: response.data.results[0].photos,
          currentPhoto: response.data.results[0].photos[0].url,
          currentPhotoCount: response.data.results[0].photos.length
        })
      })
    API.GET_REVIEWS(product.id, 1, 1000)
      .then((response) => {
        let reviewCount = response.data.results.length;
        let startCount = 0;
        response.data.results.map(({rating}) => {
          startCount += rating;
        })
        setState({
          ...state,
          currentReviews: response.data.results,
          currentAvgReview: startCount/reviewCount
        })
      })

  }, [product])

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }

  let handleThumbnailClick = (evt) => {
    setIndex(Number(evt.currentTarget.getAttribute('data-index')));
  }

  let incrementCount = (evt) => {
    setState({
      ...state,
      currentPhotoIndex: state.currentPhotoIndex + 1
    })
  }

  let decrementCount = (evt) => {
    setState({
      ...state,
      currentPhotoIndex: state.currentPhotoIndex - 1
    })
  }

  return (
    <Container fluid>

      <Row>
        <Col><h1>logo</h1></Col>
        <Col>
          <input type='text' style={{ color: 'black', borderColor: 'black', borderRadius: '5px', borderWidth: 'thin', backgroundColor: 'white'}}></input>

          <button type="input" style={{ color: 'black', borderColor: 'black', borderRadius: '5px', borderWidth: 'thin', backgroundColor: 'white'}}>Search</button>
        </Col>
      </Row>

      <Row>
        <h6 style={{textAlign: 'center'}}>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT</h6>
      </Row>

      <Row>
        <Col xs={1}>
            <Stack gap={0}>
              {(state.currentPhotoCount > 7 && state.currentPhotoIndex > 0) && <i className="bi bi-chevron-compact-up" style={{fontSize: '3vw', color: 'gray', textAlign: 'center'}} onClick={decrementCount}></i>}
              {state.currentStylePhotos.map((pic, index) => {
                if (index >= state.currentPhotoIndex && index < (state.currentPhotoIndex + Math.min(state.currentPhotoCount, 7))) {
                  return (
                    <Ratio key={index}>
                      <Image
                        src={pic.url}
                        thumbnail
                        style={{objectFit: 'cover' }}
                        data-index={index}
                        onClick={handleThumbnailClick}
                      />
                    </Ratio>
                )}
              })}
              {(state.currentPhotoCount > 7 && ((state.currentPhotoIndex + 7) < state.currentPhotoCount)) && <i className="bi bi-chevron-compact-down" style={{fontSize: '3vw', color: 'gray', textAlign: 'center'}} onClick={incrementCount}></i>}
            </Stack>
            <p></p>
        </Col>

        <Col xs={5}>
          <Carousel activeIndex={index} onSelect={handleSelect} pause='hover' slide={true}>
            {state.currentStylePhotos.map((pic, index) => {
              return (
                <Carousel.Item key={index}>
                  <CarouselItem pic={pic}/>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Col>

        <Col xs={5}>
          <Stack direction='horizontal' gap={1}>
            <Rating name="half-rating-read" value={(state.currentAvgReview)} precision={0.25} readOnly/>
            {state.currentReviews.length > 0 && <a href="#jumpToRatings">Read all {state.currentReviews.length} reviews</a>}
          </Stack>
          <br></br>
          <h3>{state.currentProduct.category}</h3>
          <h2>{state.currentProduct.name}</h2>
          {state.currentStyle.sale_price ? <p>${state.currentStyle.sale_price} <s style={{color: 'red'}}>${state.currentStyle.original_price}</s></p> : <p>${state.currentStyle.original_price}</p>}
          {state.currentProduct.slogan && <h4>{state.currentProduct.slogan}</h4>}
          <p>STYLE {'>'} {state.currentStyle.name}</p>

          <Stack direction='horizontal' gap={3}>
            <p>SHARE THIS PRODUCT:</p>
            <FacebookShareButton
              url={'https://www.example.com'}
              quote={'You should purchase this!'}
              hashtag={`#${state.currentProduct.name}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={'https://www.example.com'}
              quote={'You should purchase this!'}
              hashtag={`#${state.currentProduct.name}`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <PinterestShareButton
              url={'https://www.example.com'}
              media={'https://www.galvanize.com/'}
              description={`#${state.currentProduct.name}`}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>
          </Stack>

          <Row>
            {state.styles.map((oneStyle, index) => {
              return (
                <Style key={index} oneStyle={oneStyle} index={index} state={state} setState={setState}/>
              )
            })}
          </Row>

          <Form id='cartForm'>
            {(Object.keys(state.currentStyle).length !== 0) && <AddToCart state={state} setState={setState}/>}
          </Form>

        </Col>

      </Row>
      <p></p>
    </Container>
  )
};

