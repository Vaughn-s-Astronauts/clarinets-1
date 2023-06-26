import React from 'react';
import ProductDetail from './Product_Details/ProductDetail.jsx';
import RelatedProducts from './Related_Products/RelatedProducts.jsx';
import QuestionsAnswers from './Questions_Answers/QuestionsAnswers.jsx';
import RatingsReviews from './Ratings_Reviews/RatingsReviews.jsx';


let Detail = ({ products, setProducts, product, setProduct, productInfo, setProductInfo, styles, setStyles, style, setStyle  }) => {
    return (
        <div>
            <ProductDetail product={product} setProduct={setProduct} products={products} setProducts={setProducts} productInfo={productInfo} styles={styles} setStyles={setStyles} style={style} setStyle={setStyle}/>
            products, setProducts, product, setProduct, productInfo, setProductInfo, style, setStyle
            <RelatedProducts product={product}/>
            <QuestionsAnswers product={product}/>
            <RatingsReviews product={product}/>
        </div>
    );
};

export default Detail;