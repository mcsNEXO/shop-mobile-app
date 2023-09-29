const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { validateEmail } = require("../validators");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    minlength: [6, "Email must be at least 6 characters long"],
    unique: [true, "This email address is already in use"],
    validate: [validateEmail, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  image: {
    type: String,
    default: "avatar.png",
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

userSchema.methods.generateAuthToken = function (userId) {
  const token = jwt.sign({ userId }, "jwtSecret");
  return token;
};

// userSchema.pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(user.password, salt);
//   user.password = hash;
//   next();
// });

// userSchema.methods = {
//   comparePassword(password) {
//     return bcrypt.compareSync(password, this.password);
//   },
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
