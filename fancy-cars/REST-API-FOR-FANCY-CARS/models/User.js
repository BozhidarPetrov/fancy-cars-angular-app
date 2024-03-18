const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const EMAIL_PATTERN = /^[a-zA-Z0-9\.\_]{6,}@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [4, "Username must be at least 4 characters!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    validate: {
      validator(value) {
        return EMAIL_PATTERN.test(value);
      },
      // message: 'Email must be valid and contain only english letters!'
    },
  },
  hashedPassword: { type: String, required: [true, "Password is required!"] },
});

// userSchema.index({ email: 1}, {
//     collation: {
//         locale: 'en',
//         strength: 1
//     }
// });
userSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
