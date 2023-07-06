import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import API from '../helpers/API.js';
import ProductContext from '../helpers/ProductContext.js';

const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

export default function ({support, setSupport}) {
    const [question, setQuestion] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [products, setProducts] = React.useState({});
    const [product, setProduct] = React.useContext(ProductContext);

    let askSupport = () => {
        setResponse('Loading...');
        API.GET_SUPPORT(question).then((response) => {
            let parsed = response.data;
            if(parsed.productIds && parsed.productIds.length > 0){
                let productImage = parsed.productIds.map((p) => API.GET_PRODUCT_STYLES(p));
                let productInfo = parsed.productIds.map((p) => API.GET_PRODUCT(p));
                Promise.all(productImage).then((imagesResponse) => {
                    let imageStorage = {};
                    for(let r of imagesResponse){
                        imageStorage[r.data.product_id] = {
                            id : r.data.product_id,
                            image : r.data.results[0].photos[0].thumbnail_url || 'https://cdn.dribbble.com/users/47195/screenshots/524523/media/e7e8bc8f4f2ced9334d4a439118a5fb4.jpg',
                            name : r.data.results[0].name,
                            price : r.data.results[0].original_price                            
                        };                  

                    }
                    Promise.all(productInfo).then((infoResponse) => {
                        //we could just hardcode this for the prezzy..
                        for(let r of infoResponse){
                            let target = r.data;
                            imageStorage[target.id].name = target.name;
                            imageStorage[target.id].price = target.default_price;
                        }
                        setProducts(imageStorage);
                    }).catch((error) => {

                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
            setResponse(parsed.response || parsed.message || 'Error parsing this response.');

        }).catch((error) => {
            setResponse('Error talking to support!');
        });
        setQuestion('');

    }

    let changeProduct = (productId) => {
        API.GET_PRODUCT(productId).then((response) => {
            setProduct(response.data);
            setSupport(false);

        }).catch((error) => {
            console.log(error);
            setResponse('Error getting the product!');
        });

    }
    return (
        <Modal
            open={support}
            onClose={() => setSupport(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5">
                    Customer Service<hr/>
                </Typography>
                <TextField
                            id="outlined-multiline-flexible"
                            label="Question for support"
                            multiline
                            fullWidth
                            maxRows={8}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            />
                    {
                        question.length > 0 && <Button variant="contained" onClick={askSupport} endIcon={<SendIcon />}>Ask</Button>
                    }
                    <hr/>
                    <br/>
                    <br/>
                    <Typography variant="h3">
                        {Object.keys(products).length > 0 && 
                        <ImageList sx={{ width: 700, height: 350 }} cols={3} rowHeight={164}>
                            {Object.keys(products).map((key) => (
                                <ImageListItem key={products[key].image}>
                                <img
                                    src={`${products[key].image}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${products[key].image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={products[key].name}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={products[key].name}
                                    subtitle={`$${products[key].price}`}
                                    actionIcon={
                                    <IconButton onClick={() => changeProduct(products[key].id)}
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${products[key].name}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                    }
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>}
                    </Typography>
                    <Typography variant="subtitle1">
                        {response}
                        <br/>
                    </Typography>
            </Box>
        </Modal>
    )
}