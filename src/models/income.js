const { Schema, model } = require("mongoose");
const category = require("./category").schema;

const incomeSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },

    category: {
      type: category,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

module.exports = model("Income", incomeSchema);