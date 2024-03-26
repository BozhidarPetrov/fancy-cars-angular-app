const router = require("express").Router();
const api = require("../services/carService");

router.get("/all", async (req, res) => {
  const allCars = await api.getAll();
  res.json(allCars);
});

router.post("/create", async (req, res) => {
  const car = {
    description: req.body.description,
    brand: req.body.brand,
    model: req.body.model,
    engine: req.body.engine,
    horsepower: req.body.horsepower,
    fuel: req.body.fuel,
    color: req.body.color,
    year: req.body.year,
    image: req.body.image,
    owner: req.body.owner,
  };
  try {
    console.log(req);
    const result = await api.create(car);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/:id/edit", async (req, res) => {
  const carId = req.params.id;
  const car = {
    description: req.body.description,
    brand: req.body.brand,
    model: req.body.model,
    engine: req.body.engine,
    horsepower: req.body.horsepower,
    fuel: req.body.fuel,
    color: req.body.color,
    year: req.body.year,
    image: req.body.image,
    owner: req.body.owner,
  };

  try {
    const result = await api.update(carId, car);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.get("/:id/details", async (req, res) => {
  const carId = req.params.id;
  try {
    const car = await api.getById(carId);
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
});

router.get("/:id/delete", async (req, res) => {
  try {
    const carId = req.params.id;

    await api.deleteById(carId);
    res.status(204).end();
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
});

router.post("/:id/like", async (req, res) => {
  const carId = req.params.id;

  const userId = req.body.userId;

  try {
    const result = await api.like(carId, userId);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
});

module.exports = router;
