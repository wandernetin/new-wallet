const category = require('../models/category');

module.exports = {
    async index(req, res) {
        const categories = await category.find();
        return res.json(categories);
    },

    async store(req, res) {
        var { description, type } = req.body;
        const newCategory = await category.create({
            description,
            type
        });
        return res.json(newCategory);
    },

    async edit(req, res) {
        var { _id, description } = req.body.category;
        await category.updateOne({ _id: _id }, { $set: { description: description } });
        const newCategory = await category.findById(_id);

        return res.status(200).json(newCategory);

    },

    async delete(req, res) {
        const success = await category.findByIdAndDelete(req.body.category._id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    }
}