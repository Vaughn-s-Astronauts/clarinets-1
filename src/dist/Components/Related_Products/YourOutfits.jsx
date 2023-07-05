import React from 'react';
import API from '../../helpers/API.js';
import Carousel from './Carousel.jsx';

let YourOutfits = () => {
    const [outfit, setOutfit] = React.useState({});
    React.useEffect(() => {
        pullOutfit();
    }, []);      
    let pullOutfit = () => {
        API.GET_OUTFIT().then((response) => {
            setOutfit(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };
    
    return (<div className='container'>
                {<h2 className="text-left">YOUR OUTFIT</h2>}
                <hr/>
                {<Carousel products={outfit.outfit || []} pullOutfit={pullOutfit} identity={false}/>}
            </div>);
};

export default YourOutfits;