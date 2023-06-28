const express = require('express');
const path = require('path');
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, './src/dist')));
app.use(express.json());


app.listen(port, () => console.log(`app listening on port ${port}!`));