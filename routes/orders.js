const { sequelize, Orders} = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/orders', (req, res) => {

    Orders.findAll({  include: ['user'] })
        .then( orders => res.json(orders) )
        .catch( err => res.status(500).json(err) );
        
    
});

route.get('/orders/:id', (req, res) => {

    Orders.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.post('/orders', (req, res) => {

    Orders.create({ amount: req.body.amount, shipName: req.body.shipName, shipAdress: req.body.shipAdress, date: req.body.date, userId: req.user.userId })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/orders/:id', (req, res) => {
    
    Orders.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( order => {
            order.amount = req.body.amount,
            order.shipName = req.body.shipName,
            order.shipAdress = req.body.shipAdress,
            order.date = req.body.date,
            order.userId = req.user.userId;



            order.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/order/:id', (req, res) => {

    Orders.findOne({ where: { id: req.params.id }, include: ['user'] })
        .then( order => {
            order.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;

