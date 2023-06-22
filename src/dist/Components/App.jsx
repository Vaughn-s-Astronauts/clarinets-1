import React from 'react';
import Detail from './Detail.jsx';
import axios from 'axios';
import git_api from '../../../config.js';

let App = () => {
    //Pull the products from the API
    //Show list of products below
    //Make products clickable
    //onClick render the details for that product
    const [products, setProducts] = React.useState([]);
    const [product, setProduct] = React.useState({});
    React.useEffect(() => {
        let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/`;
        axios.get(url, {headers:{
            'Authorization' : git_api()
        }}).then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);
    return (
        <div>
            {product.id !== undefined &&
                <Detail product={product}/>
            }
            {product.id === undefined && products.map((o) => {
                return <div key={o.id} onClick={(e) => setProduct(o)}style={{height:'150px', width:'150px', border:'solid black 1px', margin:'20px'}}>
                        {o.name}                        
                        </div>;
            })}
        </div>
    );
};

export default App;