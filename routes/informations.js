const { sequelize, Informations,Users} = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/informations', (req, res) => {

    Informations.findAll({ include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/informations/:id', (req, res) => {

    Informations.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/products', (req, res) => {
    
    Products.create({name: req.body.name, price: req.body.price, weight: req.body.weight, shortDesc: req.body.shortDesc, sku: req.body.sku, userId: req.user.userId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});


route.post('/informations', (req, res) => {
    

      Informations.create({aboutUs: req.body.aboutUs, deliveryPriceList: req.body.deliveryPriceList, privacyProtection: req.body.privacyProtection, methodOfPayment: req.body.methodOfPayment, termsOfPurchase: req.body.termsOfPurchase, userId: req.user.userId })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
            
        
});

route.put('/informations/:id', (req, res) => {
    
    Informations.findOne({ where: { id: req.params.id } })
        .then( info => {
            info.aboutUs = req.body.aboutUs;
            info.deliveryPriceList = req.body.deliveryPriceList;
            info.privacyProtection = req.body.privacyProtection;
            info.methodOfPayment = req.body.methodOfPayment;
            info.termsOfPurchase = req.body.termsOfPurchase;
            info.userId = req.user.userId;

            info.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/informations/:id', (req, res) => {

    Informations.findOne({ where: { id: req.params.id } })
        .then( info => {
            info.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;