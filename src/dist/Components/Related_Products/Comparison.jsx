import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
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
    console.log(product);
    console.log(relatedProduct);
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
    
      const renderCheckmark = (product, feature) => {
        if (product.features.includes(feature)) {
          return <CheckIcon align="right"/>;
        }
        return null;
      };
    
  if(relatedProduct.name && product.name){
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
                <Typography align="center" variant="h6">
                  {product.name}
                </Typography>
                <Typography align="right" variant="subtitle1">
                  {relatedProduct.name}
                </Typography>
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products[0].features.map((feature) => (
            <TableRow key={feature}>
              <TableCell colSpan={2}>{renderCheckmark(products[0], feature)}</TableCell>
              <TableCell>{feature}</TableCell>
              <TableCell colSpan={2}>{renderCheckmark(products[1], feature)}</TableCell>
            </TableRow>
          ))}
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