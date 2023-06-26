import React from 'react';
import API from '../../helpers/API.js';

let RelatedProducts = ({product}) => {
    const [related, setRelated] = React.useState([]);
    const [relatedDetailed, setRelatedDetailed] = React.useState([]);
    React.useEffect(() => {
        //load related products
        API.GET_PRODUCT_RELATED(product.id).then((response) => {
            setRelated(response.data);//updating related products list
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    React.useEffect(() => {
        let promised = related.map((product) => API.GET_PRODUCT(product));
        Promise.all(promised).then((resolution) => {
            //surely there is a better way of doing this.. :|
            setRelatedDetailed(resolution.map((d) => d.data));
        }).catch((error) => {
            console.log(error);
        });
    }, [related]);
    return (<div className='container' style={{border:'solid black 1px'}}>
            <h2>Items related to {product.name}</h2>
            <hr/>
            {relatedDetailed.length > 0 &&
                relatedDetailed.map((item) => {
                return <h4 key={item.id}>{item.name}</h4>;
                })
            }
            </div>);
};

export default RelatedProducts;