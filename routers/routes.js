/*jshint esversion:6 */

//import Modules
const express = require('express');
const Product = require('../models/product');
const path = require('path');



//Create a router object
const router = express.Router();

//export our router
module.exports = router;

// pagina home
router.get('/',(req,res)=>{
    //res.status(200).send('Hola mundo soy home');
    res.render('home');
});

// INSERTAR DATOS
router.get('/insertProduct', (req,res)=>{
    res.render('product');
});

// Ezequiel Galván Rodríguez
// Consulta de todos los datos
router.get('/api/product', ( req, res )=>{

    Product.find({}, (err, products)=>{

        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}`
        });

        if(!products) return res.status(404).send({
            message: 'No existen Productos'
        });

       // res.status(200).send({ products: [products] });
       res.render('showproducts', {products});

    }).lean();

});

// Ezequiel Galván Rodríguez

// Consulta por filtro
router.get('/api/product/:datoBusqueda', (req, res) =>{

    let datoBusqueda = req.params.datoBusqueda;
    Product.findById(datoBusqueda, (err, products)=>{
    //Product.findOne({price:datoBusqueda}, (err,products) => {
        if(err) return res.status(500).send({
            message: `Error al realizar la petición ${err}`
        });

        if(!products) return res.status(404).send({
            message: 'El producto no existe'
        });

        //res.status(200).send({product:products});
        res.render('editar', {products});

    }).lean();

});

// Modificar Producto PUT
const putProduct = require('../controllers/putProduct');
router.put('/api/product/:productId', putProduct);

// Borrar un Registro DELETE
const delProduct = require('../controllers/delProduct');
router.delete('/api/product/:productId', delProduct);

// INSERTAR VALORES EN LA BD
router.post('/api/product', (req, res)=>{

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = (req.body.category).toLowerCase();
    product.description = req.body.description;

    console.log(req.body);

    product.save((err, productStored) =>{
        if (err) return res.status(500).send({
            message: `Error al realizar la petición ${err}` 
        });

       // res.status(200).send({product: productStored});
        res.redirect('/api/product');
    });

});

// Pagina login
const loginController = require('../controllers/login');
router.get('/auth/login', loginController);

const loginUserController = require('../controllers/loginUser');
router.post('/users/login', loginUserController);

// pagina para registro de nuevos usuarios
const newUser = require('../controllers/newUser')
router.get('/users/register', newUser);

// metodo POST para el registro
const newUserController = require('../controllers/storeUser');
router.post('/auth/register', newUserController);

// pagina 404 not found
router.use((req, res)=>{
    res.status(404).send('Página no encontrada');
});