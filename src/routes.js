const express = require('express');

const CategoryController = require('./controllers/categoryController');

const routes = express.Router();

routes.get('/category/expense', CategoryController.getExpensesCategory);
routes.get('/category/income', CategoryController.getIncomeCategory);
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.delete('/category', CategoryController.delete);
routes.put('/category', CategoryController.edit);

module.exports = routes;