'use strict';

var _ = require('lodash');
var Store = require('./store.model');


var fs = require('fs');

// Get list of stores
exports.index = function(req, res) {
  Store.find(function (err, stores) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(stores);
  });
};


/*
* UPLOAD FILE PLUGIN
* https://github.com/danialfarid/ng-file-upload
*/


exports.upload = function(req, res) {
  console.log('UPLOAD FIILE');
  var storeId = req.body.storeId;
  console.log('STORE '+ storeId);
  //console.log(JSON.stringify(req.file));
  var data = _.pick(req.body, 'type')
        //uploadPath = path.normalize(cfg.data + '/uploads')
        , file = req.files.file;
        console.log(file.name); //original name (ie: sunset.png)
        console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
        //console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)


      fs.rename(file.path, '/tmp/'+storeId+'-'+file.name, function (err) {
        if (err) throw err;
        console.log('renamed complete');
      });


 Store.findById(storeId, function (err, store) {
    if (err) { return handleError(res, err); }
    if(!store) { return res.status(404).send('Not Found'); }
    



    console.log('updating '+store);
    //var updated = _.merge(store, req.body);
    var updated = store;
    updated.images.push({
        name: file.name,
        path: file.path
    });
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      
      //return res.json({satus:'ok'});    
      return res.status(200).json(updated);
    });

  });

  
};

exports.getImage = function(req, res) {

  console.log('GET IMAGE '+req.params.id);
     var img = fs.readFileSync('/tmp/'+req.params.id);
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');
}


// Get a single store
exports.show = function(req, res) {
  Store.findById(req.params.id, function (err, store) {
    if(err) { return handleError(res, err); }
    if(!store) { return res.status(404).send('Not Found'); }
    return res.json(store);
  });
};

// Creates a new store in the DB.
exports.create = function(req, res) {
  console.log(req);
  Store.create(req.body, function(err, store) { 
    if(err) { return handleError(res, err); }
    return res.status(201).json(store);
  });
};

// Updates an existing store in the DB.
exports.update = function(req, res) {
  console.log('API UPDATE '+req.body.name);
  if(req.body._id) { delete req.body._id; }
  Store.findById(req.params.id, function (err, store) {
    if (err) { return handleError(res, err); }
    if(!store) { return res.status(404).send('Not Found'); }
    var updated = _.merge(store, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(store);
    });
  });
};

// Deletes a store from the DB.
exports.destroy = function(req, res) {
  Store.findById(req.params.id, function (err, store) {
    if(err) { return handleError(res, err); }
    if(!store) { return res.status(404).send('Not Found'); }
    store.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}