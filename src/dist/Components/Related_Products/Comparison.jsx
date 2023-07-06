import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import ProductContext from '../../helpers/ProductContext.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function Comparison({opened, setCompare, relatedProduct}) {
  
    const [product] = React.useContext(ProductContext);
    const products = [
        {
          id: 1,
          name: 'Product A',
          features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
        },
        {
          id: 2,
          name: 'Product B',
          features: ['Feature 1', 'Feature 2', 'Feature 5', 'Feature 6'],
        },
      ];
    
      let renderCheckmark = (product, feature) => {
        if (product.features.includes(feature)) {
          return <CheckIcon align="right"/>;
        }
        return null;
      };

      let findFeature = (p, f) => {
        for(let i of p.features){
          if(i.feature === f){
            return i.value;
          }
        }
        return 'undefined';
      }
    
  if(relatedProduct.name && product.name){
    let relatedFeatures = relatedProduct.features.map((f) => f.feature);
    let productFeatures = product.features.map((f) => f.feature);
    return (
        <div>
        <Modal
            open={opened}
            onClose={() => setCompare(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>
              <Box display="flex" justifyContent="space-between">
                <Typography align="center" variant="h6">
                  Comparing<br/><hr/>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography align="left" variant="h6">
                  {product.name}
                </Typography>
                <Typography align="center" variant="h6">
                  FEATURES
                </Typography>
                <Typography align="right" variant="subtitle1">
                  {relatedProduct.name}
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.features && product.features.map((feature, i) => (
            <TableRow key={`${feature}${i}`}>
              <TableCell colSpan={2}>{feature.value}</TableCell>
              <TableCell style={{border:'2px solid black'}}>{feature.feature}</TableCell>
              <TableCell colSpan={2}>{relatedFeatures.includes(feature.feature) ? findFeature(relatedProduct, feature.feature) : <CloseIcon/>}</TableCell>
            </TableRow>
          ))}
          {relatedProduct.features && relatedProduct.features.map((feature, i) => {
              if (!productFeatures.includes(feature.feature)) {
                return (
                  <TableRow key={`${feature}${i}`}>
                    <TableCell colSpan={2}>
                      <CloseIcon/>
                    </TableCell>
                    <TableCell style={{border:'2px solid black'}}>{feature.feature}</TableCell>
                    <TableCell colSpan={2}>
                      {feature.value}
                    </TableCell>
                  </TableRow>
                );
              }
          })}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
        </Modal>
        </div>
    );
  }else{
    return (<div></div>);
  }
}