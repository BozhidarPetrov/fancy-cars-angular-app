const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const URL_PATTERN = /^https?:\/\/(.+)$/;

const carSchema = new Schema({
  description: {
    type: String,
    required: [true, "Description is required!"],
    minlength: [10, "Description must be at least 10 characters long!"],
    maxlength: [20, "Description must be no more than 20 characters long!"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required!"],
    minlength: [3, "Brand must be at least 3 characters long!"],
  },
  model: {
    type: String,
    required: [true, "Model is required!"],
    minlength: [2, "Model must be at least 2 characters long!"],
  },
  engine: {
    type: String,
    required: [true, "Engine type is required!"],
    minlength: [2, "Engine type must be at least 2 characters long!"],
  },
  horsepower: { type: Number, required: [true, "Horsepower is required!"] },
  fuel: {
    type: String,
    required: [true, "Fuel is required!"],
    minlength: [3, "Fuel must be at least 3 characters long!"],
  },
  color: {
    type: String,
    required: [true, "Color is required!"],
    minlength: [3, "Color must be at least 3 characters long!"],
  },
  year: { type: Number, required: [true, "Year is required!"] },
  image: {
    type: String,
    required: [true, "Image URL is required!"],
    validate: {
      validator(value) {
        return URL_PATTERN.test(value);
      },
      message: "Image URL must start with http:// or https://!",
    },
  },
  likes: { type: [ObjectId], ref: "User", default: [] },
  owner: { type: ObjectId, ref: "User" },
});

const Car = model("Car", carSchema);

module.exports = Car;
