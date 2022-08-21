const mongoose = require('mongoose');
const Schemas = mongoose.Schema;
const { USER } = require('../../utility/constants');

const userSchemas = new Schemas(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
    },
    password: String,
  },
  { timestamps: true },
);
module.exports = mongoose.model(USER, userSchemas);
