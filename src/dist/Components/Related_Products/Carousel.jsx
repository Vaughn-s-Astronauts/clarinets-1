import React, { useRef, memo } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Rating } from '@mui/material';
import { ChevronLeft, ChevronRight, Star, Add } from '@mui/icons-material';
import API from '../../helpers/API.js';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Comparison from './Comparison.jsx';
import ProductContext from '../../helpers/ProductContext.js';



const Carousel = ({products, identity, pullOutfit}) => { 

  const carouselRef = useRef(null);
  const [product, setProduct] = React.useContext(ProductContext);
  const [ratings, setRatings] = React.useState({});
  const [styles, setStyles] = React.useState([]);
  const [compare, setCompare] = React.useState(false);
  const [compareRelated, setCompareRelated] = React.useState({});
  



  let updateRatings = () => {
    if(products){
      let promised = products.map((i) => API.GET_REVIEWS(i.id, 1, 1000));
      Promise.all(promised).then((resolve) => {
        let finalProduct = {};
        for(let r of resolve){
          let target = r.data;
          finalProduct[target.product] = {};
          let productRating = target.results.reduce((a, b) => a + b.rating, 0)/target.results.length;
          finalProduct[target.product].rating = productRating;
        }
        setRatings(finalProduct);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  React.useEffect(() => {
    //get ratings on mount
    updateRatings();
    Promise.all(products.map((d) => API.GET_PRODUCT_STYLES(d.id))).then((resolve) => {
      let storage = {};
      resolve.map((r) => {
          storage[r.data.product_id] = r.data.results;
      });
      setStyles(storage);
    }).catch((error) => {
        console.log(error);
    });
  },[product, products]);


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
  let checkOutfit = () => {
    if(products){
      for(let p of products) {
        if(product.id === p.id){
          return false;
        }
      }
    }
    return true;
  }
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

  let addAndGrab = () => {
    API.POST_OUTFIT(product).then((response) => {      
      pullOutfit();
    }).catch((error) => {
      console.log(error);
    })
  };

  let cardClick = (currentProduct) => {
    if(!identity) {
      API.PUT_OUTFIT(currentProduct).then((response) => {
        pullOutfit();
      }).catch((error) => {
        console.log(error);
      });
    }else{
      setCompareRelated(currentProduct);
      setCompare(true);
    }
  }
  

  return (
    <Box display="flex" alignItems="center">
      <Comparison opened={compare} setCompare={setCompare} relatedProduct={compareRelated}/>
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
          
          <Card elevation={12} key={index} sx={{ minWidth: 200, flex: '0 0 calc(33.3333% - 10px)' }}>
            <Box sx={{ position: 'relative' }}>
              <img src={chooseDefault(product.id)} alt={product.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'fill' }} />
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
                        <IconButton onClick={() => cardClick(product)}>
                            {identity ? <Star style={{color:'white', stroke: "#000000", strokeWidth: 2}}/> : <HighlightOffIcon style={{color:'white', stroke: "#000000", strokeWidth: 1}}/>}
                        </IconButton>
                        </Box>
              </Box>
            </Box>
            <CardContent style={{cursor:'pointer'}} onClick={() => setProduct(product)}>
              <Typography variant="subtitle2" color="textSecondary">
                {product.category}
              </Typography>
              <Typography variant="h6" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ${product.default_price}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Rating name={`rating-${index}`} value={ratings[product.id] ? ratings[product.id].rating : 0} readOnly size="small" />
              </Box>
            </CardContent>
          </Card>
        ))}
        {!identity && (checkOutfit()) &&
        <Card elevation={12} sx={{ minWidth: 200, flex: '0 0 calc(33.3333% - 10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardContent>
            <IconButton style={{ width: '100%', height: '100%' }} onClick={addAndGrab}>
              <Add fontSize="large" />
            </IconButton>
          </CardContent>
        </Card>}
      </Box>
      <IconButton onClick={scrollToNextCard} aria-label="Next">
        <ChevronRight fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default memo(Carousel);