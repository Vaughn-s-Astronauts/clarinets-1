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
import Button from '@mui/material/Button';


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9D695A',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#4a4e69',
    },
    background: {
      default: '#f2e9e4',
      paper: '#ede0d4',
    },
  },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#778da9',
        },
        secondary: {
            main: '#525B76',
        },
        text: {
            primary: '#FFFFFFFF',
        },
        background: {
            default: '#0d1b2a',
            paper: '#1b263b',
          },
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
    const [currentTheme, setCurrentTheme] = React.useState(lightTheme);

    React.useEffect(() => {
        API.GET_PRODUCTS(page).then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, [page]);

    const goBack = () => {
        setProduct({});
    }
    const updateProduct = (productId) => {
        API.GET_PRODUCT(productId).then((response) => {
            setProduct(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const setTheme = () => {
        {currentTheme.palette.mode === 'light' ? setCurrentTheme(darkTheme) :
         setCurrentTheme(lightTheme)}
    }
    return (
        <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <ProductContext.Provider value={[product, setProduct]}>
            {product.id !== undefined && product.features !== undefined &&
            <div>
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                <Button variant="contained" onClick={goBack}>Back</Button>
                <Button variant="contained" onClick={setTheme}>Change theme</Button>
                </div>
                
                <Detail theme={currentTheme} />
                
            </div>
            }
            
            <div className='container px-4'>
                <div className="row">
                {product.id === undefined && products.map((o) => {
                    return <div className="col text-center p-3" key={o.id} onClick={(e) => updateProduct(o.id)}style={{height:'150px', width:'150px', border:'solid black 1px', margin:'20px', cursor:'pointer'}}>
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
        </ProductContext.Provider>
        </ThemeProvider>
    );
};

      export default App;