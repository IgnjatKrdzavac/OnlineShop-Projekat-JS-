const { sequelize, Products} = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/products', (req, res) => {

    Products.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/products/:id', (req, res) => {

    Products.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});


route.post('/products', (req, res) => {
    
    Products.create({name: req.body.name, price: req.body.price, weight: req.body.weight, shortDesc: req.body.shortDesc, sku: req.body.sku})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/products/:id', (req, res) => {
    
    Products.findOne({ where: { id: req.params.id } })
        .then( prod => {
            prod.name = req.body.name;
            prod.price = req.body.price;
            prod.weight = req.body.weight;
            prod.shortDesc = req.body.shortDesc;
            prod.sku = req.body.sku;

            prod.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/products/:id', (req, res) => {

    Products.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;

