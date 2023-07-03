import React from 'react';
import API from '../../helpers/API.js';
import Product from './Product.jsx';
import { Grid } from '@mui/material';
import Carousel from './Carousel.jsx';
import YourOutfits from './YourOutfits.jsx';

let RelatedProducts = ({product, updateProduct}) => {
    const [related, setRelated] = React.useState([]);
    const [relatedDetailed, setRelatedDetailed] = React.useState([]);

    
    React.useEffect(() => {
        //load related products
        API.GET_PRODUCT_RELATED(product.id).then((response) => {
            setRelated(response.data.filter((relatedId, index) => response.data.indexOf(relatedId) === index));//updating related products list
        }).catch((error) => {
            console.log(error);
        });

    }, [product]);
    React.useEffect(() => {
        let promised = related.map((product) => API.GET_PRODUCT(product));
        Promise.all(promised).then((resolution) => {
            //surely there is a better way of doing this.. :|
            setRelatedDetailed(resolution.map((d) => d.data));       
        }).catch((error) => {
            console.log(error);
        });
    }, [related]);
    return (<div className='container'>
            {relatedDetailed.length > 0 && <div><h2 className="text-left">RELATED PRODUCTS</h2><hr/><Carousel pageProduct={product} identity={true} updateProduct={updateProduct} products={relatedDetailed}/></div>}
            {<YourOutfits pageProduct={product} identity={false} updateProduct={updateProduct}/>}
            </div>);
};

export default RelatedProducts;