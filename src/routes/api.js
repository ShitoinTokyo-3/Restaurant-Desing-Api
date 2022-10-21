const router = require('express').Router();
const api = require('./controllers/api')

router
    .route('/checkout')
    .post(api.post);


module.exports = router;