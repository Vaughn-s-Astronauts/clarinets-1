const express = require('express');
const path = require('path');
const {token, configPort} = require('./config.js');
const axios = require('axios');
const { createClient } = require('redis');


//https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-22-04
//https://redis.io/docs/getting-started/installation/install-redis-on-windows/
//https://www.baeldung.com/redis-delete-data


const app = express();
const port = configPort || 3000;
const client = createClient();
client.connect().then((response) => {
    console.log('Connected to redis.');
}).catch((error) => {
    console.log(error);
});

app.use(express.static(path.join(__dirname, './src/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.all('/api*', (req, res) => {
    //https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe
    let targetUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe${req.url.replace('/api', '')}`;
    client.get(targetUrl).then((redisResponse) => {
        if(redisResponse !== null){
            console.log('loaded from the cache!');
            res.send(redisResponse);
        }else{
            axios({
                method: req.method,
                url: targetUrl,
                data: req.body,
                headers:{
                    'Authorization' : token
                }
            }).then((response) => {                
                if(req.method === 'GET' && targetUrl.startsWith('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products')){
                    client.set(targetUrl, JSON.stringify(response.data)).then((error) => {
                        console.log('Added data to cache!');
                    }).catch((error) => {
                        console.log('Error storing data in cache');
                    });
                }
                res.send(response.data);
            }).catch((error) => {
                //sending the error back contains the git token 0_0
                res.send('error!!');
            });
        }
    }).catch((error) => {
        res.send([]);
    });
});
    

app.get('/outfit', (req, res) => {
    client.get('outfit').then((response) => {
        res.send(response);
    }).catch((error) => {
        res.send(error);
    });

});
app.post('/outfit', (req, res) => {
    /*
    owner? may not be needed here, but if there's no owner then all connections share the same outfit list.
        [{id
        size?,
        category,
        name,
        price}]
    */
    client.get('outfit').then((response) => {
        let base = response ? JSON.parse(response) : {outfit:[]};
        base.outfit.push({...req.body});
        client.set('outfit', JSON.stringify(base)).then((response) => {
            res.send(response);
        }).catch((error) => {
            res.send(error);
        });
    }).catch((error) => {
        res.send(error);
    });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));