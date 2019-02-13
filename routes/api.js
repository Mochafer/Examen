var express = require('express');
var router = express.Router();

var datosApi = require('./api/info');

router.use('/info', datosApi);

module.exports = router;