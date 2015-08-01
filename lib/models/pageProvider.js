var fs = require('fs');
var path = require('path');
var PageProvider = function(){};
var Settings = require('../../settings')

PageProvider.prototype.findAll = function(uni, site, callback) {
  // TODO
  callback( "Not implemented", null )
}

PageProvider.prototype.findById = function(uni, site, id, callback) {
  filename = path.join(Settings.PROJECT_DIR, "data", uni, site, "id" + id + ".json");
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      console.log('Error: ' + err);
      callback(err, null);
      return;
    }
    semesters_filename = path.join(Settings.PROJECT_DIR, "data", uni, site, "semesters.json");
    fs.readFile(semesters_filename, 'utf8', function(err, semesters) {
      if (err) {
        console.log('Error: ' + err);
        callback(err, null);
        return;
      }
      callback(null, JSON.parse(data), JSON.parse(semesters));
    });
  });
}

module.exports = PageProvider;

