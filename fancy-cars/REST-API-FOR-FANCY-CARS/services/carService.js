const Car = require('../models/Car');
const User = require('../models/User');



 function getAll() {
    return  Car.find().populate('owner').lean();
}

async function create(car) {
    const result = new Car(car);

    await result.save();

    return result;
}

function getById(id) {
    const car = Car.findById(id).lean()
    .populate('owner');

    if(!car){
        throw new Error('Wrong Car Id!');
    }

    return car;

}

async function update(id, car) {
    const existing = await Car.findById(id);

    existing.description = car.description;
    existing.brand = car.brand;
    existing.model = car.model;
    existing.engine = car.engine;
    existing.horsepower = car.horsepower;
    existing.fuel = car.fuel;
    existing.color = car.color;
    existing.year = car.year;
    existing.image = car.image;
    existing.owner = car.owner;
    

    await existing.save();

    return existing;
}

async function deleteById(carId) {

await Car.findByIdAndDelete(carId);

}


async function like(carId, userId){
    const car = await Car.findById(carId);
    
    if (car.likes.includes(userId)) {
        throw new Error('You have already liked that car!')
    }
    car.likes.push(userId);

    await car.save();
    

}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    like
};