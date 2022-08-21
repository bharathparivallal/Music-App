const mongoose = require('mongoose');
const Schemas = mongoose.Schema;
const { SONG } = require('../../utility/constants');

const songSchemas = new Schemas(
  {
    title: {
      type: String,
      required: true,
      sparse: true,
    },
    singer: {
      type: String,
      required: true,
      sparse: true,
    },
    album: {
      type: String,
      required: true,
      sparse: true,
    },
    playTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model(SONG, songSchemas);
