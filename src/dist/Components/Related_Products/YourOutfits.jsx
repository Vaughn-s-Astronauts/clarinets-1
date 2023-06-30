import React from 'react';
import API from '../../helpers/API.js';
import Carousel from './Carousel.jsx';

let YourOutfits = ({updateProduct, styles, relatedDetailed}) => {
    const [outfit, setOutfit] = React.useState({});

    React.useEffect(() => {
        API.GET_OUTFIT().then((response) => {
            setOutfit(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    
    return (<div className='container'>
            {Object.keys(outfit).length > 0 && <h2 class="text-left">YOUR OUTFIT</h2>}
            <hr/>
            {Object.keys(outfit).length > 0 && <Carousel updateProduct={updateProduct} styles={styles} products={outfit.outfit} identity={false}/>}
            </div>);
};

export default YourOutfits;