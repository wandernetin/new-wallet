const Income = require("../models/income");

module.exports = {
  async index(req, res) {
    const income = await Income.find();
    return res.json(income);
  },

  async store(req, res) {
    var { description, value, category, date } = req.body;
    const newIncome = await Income.create({
      description,
      value,
      category,
      date,
    });
    return res.json(newIncome);
  },

  async edit(req, res) {
    var { _id, description, value, category, date } = req.body.income;
    await Income.updateOne(
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
    const newIncome = await Income.findById(_id);

    return res.status(200).json(newIncome);
  },

  async delete(req, res) {
    const success = await Income.findByIdAndDelete(req.body.income._id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  },

  async getCurrentMonthIncomes(req, res) {
    const date = new Date();
    const incomes = await Income.find({ //query today up to tonight
      date: {
        $gte: new Date(date.getFullYear(), date.getMonth(), 1),
        $lt: new Date(date.getFullYear(), date.getMonth() + 1, 0)
      }
    });
    return res.json(incomes);
  },
};
