const router = require('express').Router();;
const auth = require('./controllers/auth');

router
    .route('/loginOrRegister')
    .post(auth.loginOrRegister)

module.exports = router;
