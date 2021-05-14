const express = require("express");

const CategoryController = require("./controllers/categoryController");
const ExpenseController = require("./controllers/expenseController");
const IncomeController = require('./controllers/incomeController');
const UserController = require('./controllers/userController');
const AuthController = require('./controllers/authController');

const verifyToken = require('./service/verifyTokenService');

const routes = express.Router();

routes.get("/category/expense", verifyToken, CategoryController.getExpensesCategory);
routes.get("/category/income", verifyToken, CategoryController.getIncomeCategory);
routes.get("/category", verifyToken, CategoryController.index);
routes.post("/category", verifyToken, CategoryController.store);
routes.delete("/category", verifyToken, CategoryController.delete);
routes.put("/category", verifyToken, CategoryController.edit);

routes.post("/expense/current/category", verifyToken, ExpenseController.getCurrentMonthExpensesByCategory);
routes.get("/expense/current", verifyToken, ExpenseController.getCurrentMonthExpenses);
routes.post("/expense", verifyToken, ExpenseController.store);
routes.get("/expense", verifyToken, ExpenseController.index);
routes.delete("/expense", verifyToken, ExpenseController.delete);
routes.put("/expense", verifyToken, ExpenseController.edit);

routes.get("/income/current", verifyToken, IncomeController.getCurrentMonthIncomes);
routes.post("/income", verifyToken, IncomeController.store);
routes.get("/income", verifyToken, IncomeController.index);
routes.delete("/income", verifyToken, IncomeController.delete);
routes.put("/income", verifyToken, IncomeController.edit);

routes.get("/user", verifyToken, UserController.index);
routes.post("/user", verifyToken, UserController.store);
routes.get("/user/:id", verifyToken, UserController.findUserByid);
routes.delete("/user/:id", verifyToken, UserController.deleteUser);

routes.post("/login", AuthController.login);
routes.get("/logout", AuthController.logout);
routes.post("/register", AuthController.register);

module.exports = routes;
