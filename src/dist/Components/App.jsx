import React from 'react';
import Detail from './Detail.jsx';
import API from '../helpers/API.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Dial from './Dial.jsx';
import Support from './Support.jsx';
import ProductContext from '../helpers/ProductContext.js';

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
                <ProductContext.Provider value={[product, setProduct]}>
                    <Detail />
                </ProductContext.Provider>
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