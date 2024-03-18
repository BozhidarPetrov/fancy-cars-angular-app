const carController = require('../controllers/carController')
const userController = require('../controllers/userController')



module.exports = (app) => {
    app.use(carController);
    app.use(userController);

}