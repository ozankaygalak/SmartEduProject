const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new schema({
  name: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  roles : {
    type: String,
    enum : ['student','teacher','admin']
  }
});
UserSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
