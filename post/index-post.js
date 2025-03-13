const express = require('express');

const config = require('../config.js');;
const post = require('./components/post/network.js');
const errors = require('../network/errors.js');

const app = express();
app.use(express.json());


// Routing
app.use('/api/posts', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log(`Post service running at localhost:${config.post.port}`);
});