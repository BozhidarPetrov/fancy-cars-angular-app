const router = require('express').Router();
const api = require('../services/carService');
const { isAuth, isOwner } = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');

router.get('/all', async (req, res) => {
    const allCars = await api.getAll();
 
})

router.post('/create',  async (req, res) => {
    console.log(req);
    // isAuth(),

    const car = {
       brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine,
        horsepower: req.body.horsepower,
        fuel: req.body.fuel,
        color: req.body.color,
        year: req.body.year,
        image: req.body.image,
        owner: req.body.owner

    }
    try {

        console.log(req);
        const result = await api.create(car);
        res.status(201).json(result);

    } catch (err) {
        console.log(req);

        const errormsg = mapErrors(err);
      
         res.status(400).json( errormsg );
        
        
        
    }
});

router.get('/:id', preload(), (req, res) => {
 
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const carId = req.params.id;
    const car = {
        brand: req.body.brand,
        model: req.body.model,
        engine: req.body.engine,
        horsepower: req.body.horsepower,
        fuel: req.body.fuel,
        color: req.body.color,
        year: req.body.year,
        image: req.body.image,
    }

    try {
        const result = await api.update(carId, car);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const carId = req.params.id;

        await api.deleteById(carId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});
router.post('/:id/like', isAuth(), async (req, res) => {
    const carId = req.params.id;

    const userId = req.user._id;


    try {
        const result = await api.like(carId, userId);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }


})




module.exports = router;