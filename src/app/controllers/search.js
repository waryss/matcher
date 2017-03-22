'use strict';
import express from 'express';
import elasticsearch from 'elasticsearch';

// create router and set routes
const router = express.Router();

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4();
}

// set basic routes
router.get('/', (req, res, next) => {
  client.search({
    index: 'needs',
    type: 'need',
    body: {
      query: {
        query_string:{
          query: req.query.search
        }
      }
    }
  }).then(function (resp) {
    res.send(resp.hits.hits);
  }, function (err) {
    res.send(err);
    console.log(err.message);
  });
  res.render('search', {
    result: []
  });

});

// set basic routes
router.get('/search', (req, res, next) => {

});

router.post('/needs', (req, res, next) => {
  client.create({
    index: 'needs',
    type: 'need',
    id: guid(),
    body: req.body
  }, function (error, response) {
    if(error){
      res.send(error);
    } else {
      res.send(response);
    }
  });
});

// export router
module.exports = router;
