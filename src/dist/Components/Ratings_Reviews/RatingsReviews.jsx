import React from 'react';

let RatingsReviews = ({product}) => {
    console.log('product', product);
    return (<div>
        <h1>I am the ratings and reviews modules</h1>
        <div>Product name: {product.name}</div>
        <div>another change</div>
        </div>);
};

export default RatingsReviews;