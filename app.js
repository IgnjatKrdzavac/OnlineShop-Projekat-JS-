const express = require('express');
const { sequelize } = require('./models');

const usrRoutes = require('./routes/users');
const prodRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const orderDetRoutes = require('./routes/orderdetails');

const path = require('path');

const app = express();

app.use('/admin', usrRoutes);
app.use('/admin', prodRoutes);
app.use('/admin', orderRoutes);
app.use('/admin', orderDetRoutes);

app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.listen({ port: 7000 }, async () => {
    await sequelize.authenticate();
    console.log("Server started");
});