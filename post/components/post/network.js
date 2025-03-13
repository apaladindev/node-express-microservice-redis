const express = require('express');

const secure = require('./secure');
const Controller = require('./index');
const response = require('./../../../network/response');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert)
router.put('/', secure('update'), upsert);


// Internal functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    if (!req.body.title) {
        response.error(req, res, 'Invalid title param', 409)
    }
    
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}



module.exports = router;