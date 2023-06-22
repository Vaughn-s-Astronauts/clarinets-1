import React from 'react';
import ProductDetail from './Product_Details/ProductDetail.jsx';
import RelatedProducts from './Related_Products/RelatedProducts.jsx';
import QuestionsAnswers from './Questions_Answers/QuestionsAnswers.jsx';
import RatingsReviews from './Ratings_Reviews/RatingsReviews.jsx';
import axios from 'axios';
import git_api from '../../../config.js';

let App = () => {
    //Pull the products from the API
    //Show list of products below
    //Make products clickable
    //onClick render the details for that product
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/`;
        axios.get(url, {headers:{
            'Authorization' : git_api()
        }}).then((response) => {
            setProducts(response.data);
            console.log(products);
            setProduct(products[0]);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    const [product, setProduct] = React.useState({});
    return (
        <div>
            <ProductDetail product={product}/>
            <RelatedProducts product={product}/>
            <QuestionsAnswers product={product}/>
            <RatingsReviews product={product}/>
        </div>
    );
};

export default App;