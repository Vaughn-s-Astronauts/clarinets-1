const express = require('express');
const path = require('path');
const {token} = require('./config.js');
const axios = require('axios');




const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, './src/dist')));
app.use(express.json());


app.all('/api*', (req, res) => {
    //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe
    let targetUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe${req.url.replace('/api', '')}`;
    axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        headers:{
            'Authorization' : token
        }
    }).then((response) => {
        res.send(response.data);
    }).catch((error) => {
        res.send(error);
    });

});

app.listen(port, () => console.log(`app listening on port ${port}!`));