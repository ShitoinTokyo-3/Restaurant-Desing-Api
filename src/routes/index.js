const { Router } = require('express');
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const {
    FRONT_HOST
} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const api = require('./api');
const auth = require('./auth');
const customers = require('./customers');
const categories = require('./categories');
const products = require('./products');
const carousel = require('./carousel');
const examples = require('./examples');


const router = Router();
router.use(express.json());
router.use(cors({ origin: FRONT_HOST }));
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/api', api);
router.use('/auth',auth)
router.use('/customers',customers)
router.use('/categories',categories)
router.use('/products',products)
router.use('/carousel',carousel)
router.use('/examples',examples)

module.exports = router;