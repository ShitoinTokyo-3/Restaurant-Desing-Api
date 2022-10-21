const router = require('express').Router();;
const carousel = require('./controllers/carousel');

//Recordar poner controladores
//TODO: Gets
router
    .route('/')
    .get(carousel.getCarousel);


module.exports = router;