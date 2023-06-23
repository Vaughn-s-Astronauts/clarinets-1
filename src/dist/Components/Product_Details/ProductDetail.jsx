import React from 'react';
import Button from 'react-bootstrap/Button'

// bas
// makes another change

let ProductDetail = ({product}) => {
    return (
    <div>
    <h1>I am the product detail module test {product.name}</h1>
    <Button>Test Button</Button>
    </div>
)
};

export default ProductDetail;