const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://appuag2429:Appu123@cluster0.c5xgx.mongodb.net/mymoney');

const connection = mongoose.connection;

connection.on('error', err => console.log(err));

connection.on('connected', () => console.log('Mongo DB Connection Successfull.'))