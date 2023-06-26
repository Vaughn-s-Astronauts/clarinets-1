import React from 'react';
import Detail from './Detail.jsx';
import axios from 'axios';
import git_api from './../../config.js'; // dot removed to properly map my machine -bas
import github_token from './../../config.js';

let App = () => {
  //Pull the products from the API
  //Show list of products below
  //Make products clickable
  //onClick render the details for that product
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [productInfo, setProductInfo] = React.useState({});
  const [styles, setStyles] = React.useState({});
  const [style, setStyle] = React.useState({});

  React.useEffect(() => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products', { headers: { Authorization: github_token() } })
      .then((response) => {
        setProducts(response.data);
        setProduct(response.data[0]);  //make first product the default;
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${response.data[0].id}`, { headers: { Authorization: github_token() } })
      })
      .then((response) => {
        setProductInfo(response);
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${response.id}/styles`, { headers: { Authorization: github_token() } })
      })
      .then((response) => {
        setStyles(response)
        setStyle(response.results[0])
      })
      .catch((err) => {
        console.log('error in establishing default entries: ', err)
      });
  }, [])

  return (
    <div>
        <Detail products={products} setProducts={setProducts} product={product} setProduct={setProduct} productInfo={productInfo} setProductInfo={setProductInfo} styles={styles} setStyles={setStyles} style={style} setStyle={setStyle}/>
    </div>
  )
};

      export default App;