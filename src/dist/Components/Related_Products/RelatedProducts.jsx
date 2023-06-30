import React from 'react';
import API from '../../helpers/API.js';
import Product from './Product.jsx';
import { Grid } from '@mui/material';
import Carousel from './Carousel.jsx';

let RelatedProducts = ({product, updateProduct}) => {
    const [related, setRelated] = React.useState([]);
    const [relatedDetailed, setRelatedDetailed] = React.useState([]);
    const [styles, setStyles] = React.useState({});
    React.useEffect(() => {
        //load related products
        API.GET_PRODUCT_RELATED(product.id).then((response) => {
            setRelated(response.data.filter((relatedId, index) => response.data.indexOf(relatedId) === index));//updating related products list
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    console.log('RELATED HAS TO RENDER AGAIN!');
    React.useEffect(() => {
        let promised = related.map((product) => API.GET_PRODUCT(product));
        Promise.all(promised).then((resolution) => {
            //surely there is a better way of doing this.. :|
            setRelatedDetailed(resolution.map((d) => d.data));
            Promise.all(resolution.map((d) => API.GET_PRODUCT_STYLES(d.data.id))).then((resolve) => {
                let storage = {};
                resolve.map((r) => {
                    storage[r.data.product_id] = r.data.results;
                });
                setStyles(storage);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }, [related]);
    return (<div className='container'>
            <h2 class="text-left">RELATED PRODUCTS</h2>
            <hr/>
            {relatedDetailed.length > 0 && Object.keys(styles).length > 0 && <Carousel updateProduct={updateProduct} styles={styles} products={relatedDetailed}/>}
            {console.log('carousel render!')}
            </div>);
};

export default RelatedProducts;