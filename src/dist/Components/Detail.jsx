import React from 'react';
import ProductDetail from './Product_Details/ProductDetail.jsx';
import RelatedProducts from './Related_Products/RelatedProducts.jsx';
import QuestionsAnswers from './Questions_Answers/QuestionsAnswers.jsx';
import RatingsReviews from './Ratings_Reviews/RatingsReviews.jsx';


let Detail = ({product}) => {
    return (
        <div>
            <ProductDetail product={product}/>
            <RelatedProducts product={product}/>
            <QuestionsAnswers product={product}/>
            <RatingsReviews product={product}/>
        </div>
    );
};

export default Detail;