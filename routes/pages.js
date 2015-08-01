var path = require('path');
var express = require('express');
var router = express.Router();
var PageProvider = require('../lib/models/pageProvider');
var FileProvider = require('../lib/models/fileProvider');

router.get(/yeda\/(\d+)/, function(req, res) {
  var id = req.params[0];

  new FileProvider().getYedaFilename(id, function(err, descriptor) {
    if (err) {
      console.log(err)
      res.status(404).send('Sorry, we cannot find that!');
      return
    }
    
    // res.download(descriptor['path'], encodeURI(descriptor['name']))
    res.location(path.join("http://nodiclass.com", "yeda", id, encodeURI(descriptor['name'])))
  })
});

router.get(/(\w+)\/([a-z0-9]+)\/(\d+)\/file\/(.+)/, function(req, res) {
  var uni = req.params[0];
  var site = req.params[1];
  var page = req.params[2];
  var file = req.params[3];

  new FileProvider().getFilename(uni, site, page, file, function(err, descriptor) {
    if (err) {
      console.log(err)
      res.status(404).send('Sorry, we cannot find that!');
      return
    }

    res.download(descriptor['path'], encodeURI(descriptor['name']))
  })
});

var showPage = function(res, uni, site, page) {
  new PageProvider().findById(uni, site, page, function(err, page, semesters) {
    if (err) {
      console.log(err)
      res.status(404).send('Sorry, we cannot find that!');
      return
    }

    res.locals.uni = uni
    res.locals.site = site
    res.locals.semesters = semesters
    res.render('page', page);
  });
}

router.get(/(\w+)\/([a-z0-9]+)\/(\d+)$/, function(req, res) {
  var uni = req.params[0];
  var site = req.params[1];
  var page = req.params[2];
  showPage(res, uni, site, page);
});

router.get(/(\w+)\/([a-z0-9]+)$/, function(req, res) {
  res.redirect(req.params[0] + '/' + req.params[1] + '/');
});

router.get(/(\w+)\/([a-z0-9]+)\/$/, function(req, res) {
  var uni = req.params[0];
  var site = req.params[1];
  var page = 'main';
  showPage(res, uni, site, page);
});

module.exports = router;

