const Router = require('express');

const {estadistica,estadistica2,estadistica3} = require('../../controladores/estadistica');

const router = Router();

router
    .get('/estadistica', estadistica)
    .get('/estadistica2', estadistica2)
    .get('/estadistica3', estadistica3);

module.exports = router;