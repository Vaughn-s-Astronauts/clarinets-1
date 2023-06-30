import React from 'react';


let Product = ({styles, product, updateProduct}) => {
    const [productStyles, setProductStyles] = React.useState([]);
    const [defaultStyle, setDefaultStyle] = React.useState({});
    console.log(styles);
    let chooseDefault = () => {
      let active = '';
      for(let style of styles){
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
      <div class="container"> 
        <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src={chooseDefault()} class="img-fluid rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-header bg-transparent">
                      <div class="float-start"><i class="bi-star"></i><i class="bi-star"></i><i class="bi-star"></i><i class="bi-star"></i><i class="bi-star"></i></div>
                      <div class="float-end" style={{cursor:'pointer'}}><i class="bi-star"></i></div><br/>
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">{product.name} <span class="badge bg-success">${product.default_price}</span><span class="badge bg-primary">{product.category}</span></h4>
                    <p class="card-text">{product.description}</p>
                  </div>
                </div>
                
              </div>
          </div>
          </div>
      
    );
};

export default Product;