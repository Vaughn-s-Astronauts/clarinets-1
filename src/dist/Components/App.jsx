import React from 'react';
import Detail from './Detail.jsx';
import API from '../helpers/API.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Dial from './Dial.jsx';
import Support from './Support.jsx';

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
    const [product, setProduct] = React.useState({
    "id": 37319,
    "campus": "hr-rfe",
    "name": "Summer Shoes",
    "slogan": "A risky call in the spring or fall",
    "description": "Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.",
    "category": "Kicks",
    "default_price": "59.00",
    "created_at": "2021-08-13T14:37:33.145Z",
    "updated_at": "2021-08-13T14:37:33.145Z",
    "features": [
        {
            "feature": "Sole",
            "value": "Rubber"
        },
        {
            "feature": "Material",
            "value": "FullControlSkin"
        },
        {
            "feature": "Mid-Sole",
            "value": "ControlSupport Arch Bridge"
        },
        {
            "feature": "Stitching",
            "value": "Double Stitch"
        }
    ]
});
    const [support, setSupport] = React.useState(false);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        console.log(page);
        API.GET_PRODUCTS(page).then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, [page]);

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
                    return <div className="col text-center p-3" key={o.id} onClick={(e) => setProduct(o)}style={{height:'150px', width:'150px', border:'solid black 1px', margin:'20px', cursor:'pointer'}}>
                            {o.name}
                            </div>
                            ;
                })}
                {product.id === undefined &&
                <Stack spacing={2} alignItems="center">
                    <Pagination count={203} color="primary" onChange={(e, paginationPage) => setPage(paginationPage || 1)}/>
                </Stack>}
                </div>
            </div>
        <Support setSupport={setSupport} support={support}/>
        <Dial setSupport={setSupport}/>
        </ThemeProvider>
    );
};

      export default App;