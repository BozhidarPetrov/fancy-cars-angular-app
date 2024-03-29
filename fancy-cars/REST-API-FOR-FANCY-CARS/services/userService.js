const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const JWT_SECRET = "asoiducan93284c9rew";
const blacklist = [];

async function register(username, email, password) {
  const existing = await User.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });

  if (existing) {
    throw new Error("Email already exists");
  }

  const user = new User({
    username,
    email,
    hashedPassword: await bcrypt.hash(password, 10),
  });

  await user.save();

  return createSession(user);
}

async function login(email, password) {
  const user = await User.findOne({
    email: new RegExp(`^${email}$`, "i"),
  });

  if (!user) {
    throw new Error("Incorrect email!");
  }

  const match = await bcrypt.compare(password, user.hashedPassword);

  if (!match) {
    throw new Error("Incorrect password!");
  }

  return createSession(user);
}

function logout(token) {
  blacklist.push(token);
}

function createSession(user) {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    accessToken: jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      JWT_SECRET
    ),
  };
}
const attachCookie = (token, res) => {
  return res.cookie(process.env.COOKIE_NAME, token, {
    sameSite: "none",
    secure: true,
  });
};

function verifySession(token) {
  if (blacklist.includes(token)) {
    throw new Error("Token is invalidated");
  }

  const payload = jwt.verify(token, JWT_SECRET);

  return {
    email: payload.email,
    _id: payload._id,
    token,
  };
}
async function findUserById(id) {
  const existing = User.findById(id);

  if (!existing) {
    throw new Error("Cant find that user");
  }
  return existing.lean();
}

module.exports = {
  register,
  login,
  logout,
  verifySession,
  findUserById,
};
