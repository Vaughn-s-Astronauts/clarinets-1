import React from 'react';
import Detail from './Detail.jsx';
import API from '../helpers/API.js';

let App = () => {
    //Pull the products from the API
    //Show list of products below
    //Make products clickable
    //onClick render the details for that product
    const [products, setProducts] = React.useState([]);
    const [product, setProduct] = React.useState({});
    React.useEffect(() => {
        API.GET_PRODUCTS().then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, []);

    const goBack = () => {
        setProduct({});
    }
    return (
        <div>
            {product.id !== undefined &&
            <div>
                <button onClick={goBack}>Back</button>
                <Detail product={product}/>
            </div>
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