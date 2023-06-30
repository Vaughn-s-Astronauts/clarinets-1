import React from 'react';
import Detail from './Detail.jsx';
import API from '../helpers/API.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Dial from './Dial.jsx';
const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  

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
    React.useEffect(() => {
        console.log("product was changed!", product);
    }, [product]);

    const goBack = () => {
        setProduct({});
    }
    return (
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
            {product.id !== undefined &&
            <div>
                <button onClick={goBack}>Back</button>
                <Detail product={product} updateProduct={setProduct}/>
            </div>
            }
            <div className='container px-4'>
                <div className="row">
                {product.id === undefined && products.map((o) => {
                    return <div className="col text-center p-3" key={o.id} onClick={(e) => setProduct(o)}style={{height:'150px', width:'150px', border:'solid black 1px', margin:'20px'}}>
                            {o.name}
                            </div>;
                })}
                </div>
            </div>
            
        </ThemeProvider>
    );
};

      export default App;