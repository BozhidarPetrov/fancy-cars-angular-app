const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const userController = require('./controllers/userController');
const carController = require('./controllers/carController')
const auth = require('./middlewares/auth');


const databaseConfiguration = require('./config/database');
start();

async function start() {

await databaseConfiguration();

    const app = express();
    app.use(express.json());
    app.use(cors());
    // app.use(auth());
    app.use('/cars', carController);
    app.use('/users', userController);

    app.get('/', (req, res) => res.json({ message: 'REST service operational'}));

    app.listen(3030, () => console.log('REST service started on port 3030'));
}