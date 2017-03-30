'use strict';
import express from 'express';

// create router and set routes
const router = express.Router();

// set basic routes
router.get('/', (req, res, next) => {
  res.render('index');

});

// export router
module.exports = router;
