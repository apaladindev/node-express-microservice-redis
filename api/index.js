const express = require('express');
const swaggerUI = require('swagger-ui-express');

const config = require('./../config.js');
const auth = require('./components/auth/network.js');
const user = require('./components/users/network.js');
const errors = require('./../network/errors.js');

const app = express();
app.use(express.json());

const swaggerDoc = require('./swagger.json');

// Routing
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
    console.log(`Server running at localhost:${config.api.port}`);
});