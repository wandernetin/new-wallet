const Expense = require("../models/expense");

module.exports = {
  async index(req, res) {
    const expenses = await Expense.find();
    return res.json(expenses);
  },

  async store(req, res) {
    var { description, value, category, date } = req.body;
    const newExpense = await Expense.create({
      description,
      value,
      category,
      date,
    });
    return res.json(newExpense);
  },

  async edit(req, res) {
    var { _id, description, value, category, date } = req.body.expense;
    await Expense.updateOne(
      { _id: _id },
      {
        $set: {
          description: description,
          value: value,
          category: category,
          date: date,
        },
      }
    );
    const newExpense = await Expense.findById(_id);

    return res.status(200).json(newExpense);
  },

  async delete(req, res) {
    const success = await Expense.findByIdAndDelete(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  },

  /* From same day last month to now */
  async getCurrentMonthExpenses(req, res) {
    const dateFrom = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - 1)
    const dateTo = new Date();
    const expenses = await Expense.find({
      date: {
        $gte: dateFrom,
        $lt: dateTo
      }
    }).sort({ date: 'asc' });
    return res.json(expenses);
  },

   /* From same day last month to now */
   async getCurrentMonthExpensesByCategory(req, res) {
    var { category } = req.body;
    const dateFrom = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - 1)
    const dateTo = new Date();
    const expenses = await Expense.find({ 
      date: {
        $gte: dateFrom,
        $lt: dateTo
      }, 
      category: category, 
    }).sort({ date: 'asc' });
    return res.json(expenses);
  },
};
