var express = require('express');
var router = express.Router();
var fileModel = require('./jsonmodel');
var data = null; 

var informacion = {
  'RTN':null,
  'Empresa':"",
  'Correo':'',
  'Rubro':"",
  'Direccion':"",
  'Telefono': null 
};



module.exports = router;
