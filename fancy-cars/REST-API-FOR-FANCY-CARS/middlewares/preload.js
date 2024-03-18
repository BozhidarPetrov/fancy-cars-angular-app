const { getById } = require('../services/carService');


module.exports = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const car = await getById(id).lean();
        // center._ownerId = center.owner;
        res.locals.car = car;
        next();
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: 'Record not found' });
    }
};