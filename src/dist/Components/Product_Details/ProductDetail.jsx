import React, {useState, useEffect} from 'react';
import API from '../../helpers/API.js';
import ImageGallery from './ImageGallery.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
    <div>
      <div className="row container p-5 my-5 bg-dark text-white">
        <div className="col-lg-6">
          <h1>logo</h1>
        </div>
        <div className="col-lg-6">
          <h1>search bar</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <h4><small>SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE / DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT</small></h4>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-2">
          <p>sidebar of veritical pics</p>
        </div>
        <div className="col-lg-6">

          <img src={state.currentPhoto} ></img>

        </div>
        <div className="col-lg-4">
          <p>star ratings</p>
          <p>Category</p>
          <p>{state.currentProduct.category}</p>
          <p>{state.currentProduct.default_price}</p>
          <p>STYLE {'>'} SELECTED STYLE</p>
        </div>
      </div>
    </div>
  )
};
