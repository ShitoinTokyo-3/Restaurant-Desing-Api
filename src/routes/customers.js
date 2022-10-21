const router = require('express').Router();
const costumers = require('./controllers/customers');
const { checkRoleAuth } = require('./middleware/auth');

router
    .route('/')
    .get(checkRoleAuth(['admin']), costumers.getAll)

module.exports = router;
