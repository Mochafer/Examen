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

//Obtener TODAS LAS EMPRESAS
router.get('/', function( req, res, next) {
    if(!data){
      fileModel.read(function(err, filedata){
        if(err){
          console.log(err);
          data = [];
          return res.status(500).json({'error':'Error al Obtener Data'});
        }
        data = JSON.parse(filedata);
        return res.status(200).json(data);
      });
    } else {
      return res.status(200).json(data);
    }
  });

  // Agregar Una Nueva Empresa
router.post('/new', function(req, res, next){
    var info = Object.assign({} , informacion, req.body);
    if(!data){
      data = [];
    }
    data.push(info);
    fileModel.write(data, function(err){
      if(err){
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Obtener Informacion' });
      }
      return res.status(200).json(info);
    });
  });

 /* router.put('/put/:rtn', function(req, res, next){
    var infoRTN = req.params.RTN;
    var infoUPD = req.body.Correo;
    var InfoUpdated = null;
    var newData = data.map(
      function(doc, i){
        if (doc._id == infoRTN){
          InfoUpdated = Object.assign(
            {},
            doc,
            {"done":true},
            infoUPD
            );
          return InfoUpdated;
        }
        return doc;
      }
    );
    
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json(_thingUpdated);
    });
  });
*/
  

router.delete('/delete/:RTN', function(req, res, next){
    var infoRTN = req.params.RTN;
    var newData = data.filter(
      function (doc, i) {
        if (doc._id == infoRTN) {
          return false;
        }
        return true;
      }
    );
    data = newData;
    fileModel.write(data, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ 'error': 'Error al Guardar Data' });
      }
      return res.status(200).json({"delete": infoRTN});
    });
  }); 
  
  fileModel.read(function(err , filedata){
    if(err){
      console.log(err);
    } else{
      data = JSON.parse(filedata);
    }
  });
  
  module.exports = router;