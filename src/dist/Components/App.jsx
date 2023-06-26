import React from 'react';
import Detail from './Detail.jsx';
import API from '../helpers/API.js';

let App = () => {
    //Pull the products from the API
    //Show list of products below
    //Make products clickable
    //onClick render the details for that product
    const [products, setProducts] = React.useState([]);
    const [product, setProduct] = React.useState({});
    React.useEffect(() => {
        API.GET_PRODUCTS().then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
      });
  return (
    <div>
        <Detail products={products} setProducts={setProducts} product={product} setProduct={setProduct} productInfo={productInfo} setProductInfo={setProductInfo} styles={styles} setStyles={setStyles} style={style} setStyle={setStyle}/>
    </div>
  )
};

      export default App;