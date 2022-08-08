const { sequelize, Users} = require('../models');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

route.use(authToken);


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
    
    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
       if(usr.admin){

            Users.findOne({ where: { id: req.params.id } })
                .then( usr => {
                    usr.email = req.body.email;
                    usr.firstname = req.body.firstname;
                    usr.lastname = req.body.lastname;
                    usr.phone = req.body.phone;

                    usr.save()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
                })
                .catch( err => res.status(500).json(err) );


        }else{
            res.status(403).json({ msg: "Only admin can take this actions!!"});
        }
    })
    .catch( err => res.status(500).json(err) );

});


/*route.post('/orderdetails', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.admin) {
                OrderDetails.create({ name: req.body.name, price: req.body.price, sku: req.body.sku, quantity: req.body.quantity, orderId: req.body.orderId, productId: req.body.productId,userId: req.user.userId })
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Only admin can take this actions!!"});
            }
        })
        .catch( err => res.status(500).json(err) );
        
});*/

//id: req.params.id

route.delete('/users/:id', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
           if(usr.admin){

                Users.findOne({ where: { id: req.params.id } })
                    .then( usr1 => {
                        
                        usr1.destroy()
                        .then( rows => res.json(rows) )
                        .catch( err => res.status(500).json(err) );
                    
                    })
                    .catch( err => res.status(500).json(err) );

                        
                
            }else{
                res.status(403).json({ msg: "Only admin can take this actions!!"});
            }
                
            
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;

