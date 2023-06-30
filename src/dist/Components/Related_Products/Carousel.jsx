import React, { useRef } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Rating } from '@mui/material';
import { ChevronLeft, ChevronRight, Star, Close } from '@mui/icons-material';

const Carousel = ({styles, products, updateProduct, identity}) => { 
  console.log(products);
  const carouselRef = useRef(null);
  const scrollToNextCard = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  const scrollToPreviousCard = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };
  let chooseDefault = (productId) => {
    let productStyle = styles[productId];
    if(!styles[productId]){
      return 'https://cdn.dribbble.com/users/47195/screenshots/524523/media/e7e8bc8f4f2ced9334d4a439118a5fb4.jpg';
    }
    let active = '';
    for(let style of productStyle){
        for(let pic of style.photos){
          if(style['default?'] && pic.thumbnail_url !== null){
            return pic.thumbnail_url;
          }
          if(pic.thumbnail_url !== null){
            active = pic.thumbnail_url;
          }          
      }
    }
    return (active !== '') ? active : 'https://cdn.dribbble.com/users/47195/screenshots/524523/media/e7e8bc8f4f2ced9334d4a439118a5fb4.jpg';
  }

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={scrollToPreviousCard} aria-label="Previous">
        <ChevronLeft fontSize="large" />
      </IconButton>
      <Box
        display="flex"
        overflow="hidden"
        padding="10px"
        maxWidth="100%"
        gap="10px"
        css={{
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        }}
        ref={carouselRef}
      >
        {products !== undefined && products.map((product, index) => (
          
          <Card key={index} sx={{ minWidth: 200, flex: '0 0 calc(33.3333% - 10px)' }}>
            {console.log(product)}
            <Box sx={{ position: 'relative' }}>
              <img src={chooseDefault(product.id ? product.id : -1)} alt={product.name ? product.name : '!!'} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  zIndex: 1,
                }}
              >
                        <Box
                        sx={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            zIndex: 1,
                        }}
                        >
                        <IconButton style={{background:'white'}}>
                            {identity ? <Star /> : < Close/>}
                        </IconButton>
                        </Box>
              </Box>
            </Box>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                {product.category ? product.category : '!!'}
              </Typography>
              <Typography variant="h6" component="h2">
                {product.name ? product.name : '!!'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ${product.default_price ? product.default_price : '!!'}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Rating name={`rating-${index}`} value={0} readOnly size="small" />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <IconButton onClick={scrollToNextCard} aria-label="Next">
        <ChevronRight fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default Carousel;