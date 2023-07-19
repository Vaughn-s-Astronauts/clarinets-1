import React from 'react';
import ProductDetail from './Product_Details/ProductDetail.jsx';
import RelatedProducts from './Related_Products/RelatedProducts.jsx';
import QuestionsAnswers from './Questions_Answers/QuestionsAnswers.jsx';
import RatingsReviews from './Ratings_Reviews/RatingsReviews.jsx';
import ProductContext from '../helpers/ProductContext.js';

let Detail = ({theme}) => {
    const [product] = React.useContext(ProductContext);
    return (
        <div className='container'>
            ${/*<ProductDetail theme={theme} product={product}/>*/}
            ${/*<RelatedProducts />*/}
            <QuestionsAnswers product={product}/>
            ${/*<RatingsReviews product={product}/>*/}
        </div>
    );
};

export default Detail;