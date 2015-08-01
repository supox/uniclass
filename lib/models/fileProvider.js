var fs = require('fs');
var path = require('path');
var FileProvider = function(){};
var Settings = require('../../settings')

FileProvider.prototype.getFilename = function(uni, site, id, filename, callback) {
  var jsonFilename = path.join(Settings.PROJECT_DIR, "data", uni, site, "files" + id + ".json");
  fs.readFile(jsonFilename, 'utf8', function(err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    var filesList = JSON.parse(data);
    if(!filesList[filename]) {
      callback("file " + filename + " not exists", null)
      return
    }    

    callback(null, {
      path: path.join(Settings.PROJECT_DIR, "data", uni, site, "ID" + id, "file" + filesList[filename]),
      name: filename
    });
  });
}

FileProvider.prototype.getYedaFilename = function(id, callback) {
  var filename = path.join(Settings.PROJECT_DIR, "data", "yeda", "filesList.json");
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    var filesList = JSON.parse(data);
    if(!filesList[id]) {
      callback("file not exists", null)
      return
    }    

    callback(null, {
      path: path.join(Settings.PROJECT_DIR, "data", "yeda", "file"+id),
      name: filesList[id]
    });
  });
}

module.exports = FileProvider;

