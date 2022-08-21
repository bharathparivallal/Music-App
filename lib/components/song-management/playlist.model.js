const mongoose = require('mongoose');
const Schemas = mongoose.Schema;
const { USER, PLAYLIST, SONG } = require('../../utility/constants');

const playListSchemas = new Schemas(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schemas.Types.ObjectId,
      ref: USER,
      required: true,
      sparse: true,
    },
    songIds: [
      {
        type: Schemas.Types.ObjectId,
        ref: SONG,
      },
    ],
  },
  { timestamps: true },
);
module.exports = mongoose.model(PLAYLIST, playListSchemas);
