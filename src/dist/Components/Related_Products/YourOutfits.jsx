import React from 'react';
import API from '../../helpers/API.js';
import Carousel from './Carousel.jsx';

let YourOutfits = ({updateProduct, pageProduct}) => {
    const [outfit, setOutfit] = React.useState({});
    React.useEffect(() => {
        API.GET_OUTFIT().then((response) => {
            setOutfit(response.data);
            console.log(outfit);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    
    return (<div className='container'>
                {<h2 className="text-left">YOUR OUTFIT</h2>}
                <hr/>
                {<Carousel updateProduct={updateProduct} pageProduct={pageProduct} products={outfit.outfit || []} identity={false} outfit={outfit} setOutfit={setOutfit}/>}
            </div>);
};

export default YourOutfits;