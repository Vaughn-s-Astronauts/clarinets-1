import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import API from '../../helpers/API.js';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


let Product = ({styles, product, updateProduct}) => {
    const [productStyles, setProductStyles] = React.useState([]);
    const [defaultStyle, setDefaultStyle] = React.useState({});
    console.log(styles);
    return (
      <div style={{cursor:'pointer', height:'400px'}} onClick={() => updateProduct(product)}>
        <Card style={{height:'100%', width:'100%'}}>
              <CardMedia
                sx={{ height: 140 }}
                image={styles[0].photos[0].thumbnail_url !== null ? styles[0].photos[0].thumbnail_url : 'https://cdn.dribbble.com/users/47195/screenshots/524523/media/e7e8bc8f4f2ced9334d4a439118a5fb4.jpg'}
                title="product image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                ${product.default_price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
      </div>
    );
};

export default Product;