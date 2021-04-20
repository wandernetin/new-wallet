const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://developer:developer@cluster0-ca8t3.mongodb.net/wallet?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

// set port, listen for requests
const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});