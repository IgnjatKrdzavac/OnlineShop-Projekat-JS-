const { sequelize, Users} = require('../models');
const express = require('express');

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


route.get('/users', (req, res) => {

    Users.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
    
});

route.get('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});


route.post('/users', (req, res) => {
    
    Users.create({email: req.body.email, password: req.body.password, firstname: req.body.firstname, lastname: req.body.lastname, phone: req.body.phone, admin: req.body.admin})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );

});

route.put('/users/:id', (req, res) => {
    
    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.email = req.body.email;
            usr.password = req.body.password;
            usr.firstname = req.body.firstname;
            usr.lastname = req.body.lastname;
            usr.phone = req.body.phone;
            usr.admin = req.body.admin;

            usr.save()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );

});

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.params.id } })
        .then( usr => {
            usr.destroy()
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;

