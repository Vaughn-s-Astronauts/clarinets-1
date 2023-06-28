import React from 'react';
import ProductDetail from './Product_Details/ProductDetail.jsx';
import RelatedProducts from './Related_Products/RelatedProducts.jsx';
import QuestionsAnswers from './Questions_Answers/QuestionsAnswers.jsx';
import RatingsReviews from './Ratings_Reviews/RatingsReviews.jsx';
import API from '../helpers/API.js';


let Detail = ({product, updateProduct}) => {
    const [details, setDetails] = React.useState(product);//defaulted to the 'basic' details

    React.useEffect(() => {
        if(product.id){
            API.GET_PRODUCT(product.id).then((response) => {
                setDetails(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }

    }, []);
    React.useEffect(() => {//this is bad come back to this lol
        API.GET_PRODUCT(product.id).then((response) => {
            setDetails(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [product]);
    return (
        <div>
            <ProductDetail product={details}/>
            <RelatedProducts product={details} updateProduct={updateProduct}/>
            <QuestionsAnswers product={details}/>
            <RatingsReviews product={details}/>
        </div>
    );
};

export default Detail;