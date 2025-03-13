const express = require('express');

const secure = require('./secure');
const Controller = require('./index');
const response = require('./../../../network/response');

const router = express.Router();

// Routes
router.get('/followers', secure('follow'), following);
router.post('/follow/:id', secure('follow'), follow);

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);



// Internal functions

function list(req, res, next) {
    Controller.list()
        .then((data) => {
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
    if (!req.body.name) {
        response.error(req, res, 'Invalid name param', 409)
    }
    
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function remove(req, res, next) {
    if (!req.params.id) {
        response.error(req, res, 'Invalid id param', 409)
    }
    
    Controller.remove(req.params.id)
        .then((id) => {
            response.success(req, res, `User ${id} deleted`, 200);
        })
        .catch(next);
}

function following(req, res, next) {    
    Controller.following(req.user.id)
        .then(data => {            
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function follow(req, res, next) {
    Controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}


module.exports = router;