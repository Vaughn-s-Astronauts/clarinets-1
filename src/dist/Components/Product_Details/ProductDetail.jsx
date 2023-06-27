import React, {useState, useEffect} from 'react';
import axios from 'axios';
import github_token from './../../../config.js'

export default function ProductDetail({ product }) {

  const [catalog, setCatalog] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [itemInfo, setItemInfo] = useState({});
  const [itemStyles, setItemStyles] = useState({});
  const {currentStyle, setCurrentStyle} = useState({});

  let getCatalog = () => {
    axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products';
    axios.defaults.headers.common['Authorization'] = github_token();
    axios.get('/')
    .then((response) => {
      setCatalog(response.data)
      setCurrentItem(response.data[0])
      axios.get(`/${response.data[0].id}`)
      .then((response) => {
        setItemInfo(response.data);
        axios.get(`/${response.data.id}/styles`)
        .then((response) => {
          setItemStyles(response.data.results)
        })
      })
    })
  }

  useEffect(getCatalog, []);

  console.log('catalog: ', catalog);
  console.log('currentItem: ', currentItem);
  console.log('itemInfo: ', itemInfo);
  console.log('itemStyles: ', itemStyles);

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
