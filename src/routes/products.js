const router = require('express').Router();;
const categories = require('./controllers/products');

//Gets
router
    .route('/:idCategory')
    .get(categories.getAllByCategory)

router
    .route('/:idCategory/:id')
    .get(categories.get)

router
    .route('/query/:idCategory/name/:name')
    .get(categories.getByName)

//Posts
router
    .route('/:idCategory')
    .post(categories.post)

router
    .route('/:idCategory/:id')
    .post(categories.postExamplesDescription)

//Puts
router
    .route('/:idCategory/:id')
    .put(categories.put)

//Deletes
router
    .route('/:idCategory/:id')
    .delete(categories.delete)

module.exports = router;
