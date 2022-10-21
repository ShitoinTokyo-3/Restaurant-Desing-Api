const router = require('express').Router();;
const services = require('./controllers/categories');

//Recordar poner controladores
//TODO: Gets
router
    .route('/')
    .get(services.getAll);

router
    .route('/queryname')
    .get(services.getByName);

router
    .route('/products/:id')
    .get(services.getWithProducts);

router
    .route('/:id')
    .get(services.get);

//TODO: Posts
router
    .route('/')
    .post(services.post);

//TODO: Puts
router
    .route('/:id')
    .put(services.put)

//TODO: Deletes
router
    .route('/:id')
    .delete(services.delete)

module.exports = router;