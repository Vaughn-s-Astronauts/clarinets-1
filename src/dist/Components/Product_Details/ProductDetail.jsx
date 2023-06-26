import React from 'react';
import axios from 'axios';
import github_token from './../../../config.js'
import useState from 'react';

let ProductDetail = ({ products, setProducts, product, setProduct, productInfo, setProductInfo, styles, setStyles, style, setStyle }) => {
  console.log('product: ', product);
  console.log('productInfo: ', productInfo);
  console.log('styles', styles);
  // axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', { headers: { Authorization: github_token() } })
  //   .then((response) => {
  //     setProducts(response.data);
  //     setProduct(response.data[0]) //make first product the default;
  //   })
  //   .then(() => {
  //     axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}`, { headers: { Authorization: github_token() } })
  //   })
  //   .then((response) => {
  //     setProductInfor(response)
  //   })
  //   .then(() => {
  //     axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${product.id}/styles`, { headers: { Authorization: github_token() } })
  //   })
  //   .then((response) => {
  //     setStyle(response)
  //   })
  //   .then(() => {
  //     console.log('products: ', products);
  //     console.log('default product: ', product);
  //     console.log('product info: ', productInfo);
  //     console.log('product styles: ', style)
  //   })
  //   .catch((err) => {
  //     console.log('error in establishing default entries: ', err)
  //   });
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


          {/* <!-- Carousel -->*/}
          <div id="demo" className="carousel slide" data-bs-ride="carousel">

            {/* <!-- Indicators/dots --> */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>

            {/* <!-- The slideshow/carousel --> */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="la.jpg" alt="Los Angeles" className="d-block w-100"></img>
              </div>
              <div className="carousel-item">
                <img src="chicago.jpg" alt="Chicago" className="d-block w-100"></img>
              </div>
              <div className="carousel-item">
                <img src="ny.jpg" alt="New York" className="d-block w-100"></img>
              </div>
            </div>

            {/* <!-- Left and right controls/icons --> */}
            <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>

        </div>
        <div className="col-lg-4">
          <p>star ratings</p>
          <p>Category</p>
          <p>{product.category}</p>
          <p>{product.default_price}</p>
          <p>STYLE {'>'} SELECTED STYLE</p>
        </div>
      </div>
    </div>
  )
};

export default ProductDetail;