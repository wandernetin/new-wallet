const express = require('express');

const CategoryController = require('./controllers/categoryController');

const routes = express.Router();

routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.delete('/category', CategoryController.delete);
routes.put('/category', CategoryController.edit);

module.exports = routes;