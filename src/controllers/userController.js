const User = require("../models/user");
var bcrypt = require('bcryptjs');

module.exports = {
    async index(req, res) {
        const users = await User.find();
        return res.json(users);
    },

    async store(req, res) {
        var { name, email, password } = req.body;
        var password = bcrypt.hashSync(password, 8);
        const newUser = await User.create({
            name,
            email,
            password,
        });
        return res.json(newUser);
    },

    findUserByid(req, res) {
        User.findById(req.params.id, (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            return res.json(user);
        });
    },

    deleteUser(req, res) {
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            res.status(200).send("User: " + user.name + " was deleted.");
        });
    }

}