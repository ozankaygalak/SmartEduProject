const mongoose = require("mongoose");
const schema = mongoose.Schema;
var slugify = require("slugify");

const CategorySchema = new schema({
  name: {
    required: true,
    unique: true,
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
});
CategorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
