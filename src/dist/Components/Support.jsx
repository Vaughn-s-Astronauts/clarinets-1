import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import API from '../helpers/API.js';

const style = {
    position: 'absolute',
    top: '25%',
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
    const [products, setProducts] = React.useState([]);

    let askSupport = () => {
        setResponse('Loading...');
        API.GET_SUPPORT(question).then((response) => {
            let parsed = response.data;
            console.log(parsed);
            // if(parsed.productIds && parsed.productIds.length > 0){
            //     let productInfo = parsed.map((p) => API.GET_PRODUCT(p));
            //     Promise.all(productInfo).then((response) => {
            //         let results = [];
            //         response.map((d) => {
            //             results.push(d.data);
            //         });
            //         setProducts(results);
            //     }).catch((error) => {
            //         console.log(error);
            //     });
            // }
            setResponse(parsed.response || parsed.message || 'Error parsing this response.');

        }).catch((error) => {
            setResponse('Error talking to support!');
        });
        setQuestion('');

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
                        Our Response :<hr/>
                    </Typography>
                    <Typography variant="subtitle1">
                        {response}
                        <br/>
                        {
                            products.length > 0 && products.map((p) => {
                                return <h3>{p.default_price}|{p.name}</h3>
                            })
                        }
                    </Typography>
            </Box>
        </Modal>
    )
}