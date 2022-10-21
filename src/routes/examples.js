const router = require('express').Router();;
const examples = require('./controllers/examples');

//Recordar poner controladores
//TODO: Gets
router
    .route('/:idProduct')
    .get(examples.getAllByProduct);

router
    .route('/name/:idProduct/')
    .get(examples.getByName);

router
    .route('/:idProduct/:idExample')
    .get(examples.get);

//TODO: Posts
router
    .route('/:idProduct')
    .post(examples.post);

//TODO: Puts
router
    .route('/:idProduct/:idExample')
    .put(examples.put)

//TODO: Deletes
router
    .route('/:idProduct/:idExample')
    .delete(examples.delete)

module.exports = router;