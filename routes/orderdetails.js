const { sequelize, OrderDetails,Users} = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/orderdetails', (req, res) => {

    OrderDetails.findAll({include: ['order'], include: ['product']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/orderdetails/:id', (req, res) => {

    OrderDetails.findOne({ where: { id: req.params.id }, include: ['order','product']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});







route.post('/orderdetails', (req, res) => {
 
       OrderDetails.create({ name: req.body.name, price: req.body.price, sku: req.body.sku, quantity: req.body.quantity, orderId: req.body.orderId, productId: req.body.productId,userId: req.user.userId })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );     
});




route.put('/orderdetails/:id', (req, res) => {
    
    OrderDetails.findOne({ where: { id: req.params.id }, include: ['order','product']})
        .then( orderdetail => {
            orderdetail.name = req.body.name,
            orderdetail.price = req.body.price,
            orderdetail.sku = req.body.sku,
            orderdetail.quantity = req.body.quantity,
            orderdetail.orderId = req.body.orderId,
            orderdetail.productId = req.body.productId
            order.userId = req.user.userId;

            orderdetail.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/orderdetails/:id', (req, res) => {

    OrderDetails.findOne({ where: { id: req.params.id }, include: ['order','product']})
        .then( order => {
            order.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;

