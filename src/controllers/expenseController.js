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
    const success = await Expense.findByIdAndDelete(req.body.expense._id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  },

  async getCurrentMonthExpenses(req, res) {
    const date = new Date();
    const expenses = await Expense.find({ //query today up to tonight
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      }
    });
    return res.json(expenses);
  },
};
