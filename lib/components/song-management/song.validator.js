const Joi = require('joi');
const songAddBodySchema = Joi.object()
  .keys({
    body: Joi.object()
      .keys({
        title: Joi.string()
          .trim()
          .min(3)
          .required()
          .error((error) => {
            return error;
          }),
        singer: Joi.string()
          .trim()
          .min(3)
          .required()
          .error((error) => {
            return error;
          }),
        album: Joi.string()
          .trim()
          .min(3)
          .required()
          .error((error) => {
            return error;
          }),
        playTime: Joi.number()
          .min(3)
          .required()
          .error((error) => {
            return error;
          }),
      })
      .unknown(false),
  })
  .unknown(true);

const userPlayList = Joi.object()
  .keys({
    params: Joi.object()
      .keys({
        userId: Joi.string()
          .alphanum()
          .length(24)
          .required()
          .error(() => {
            return 'ID REQUIRED';
          }),
      })
      .unknown(false),
  })
  .unknown(true);

const playListId = Joi.object()
  .keys({
    params: Joi.object()
      .keys({
        playlistId: Joi.string()
          .alphanum()
          .length(24)
          .required()
          .error(() => {
            return 'ID REQUIRED';
          }),
      })
      .unknown(false),
  })
  .unknown(true);

const addPlayList = Joi.object()
  .keys({
    params: Joi.object()
      .keys({
        userId: Joi.string()
          .alphanum()
          .length(24)
          .required()
          .error(() => {
            return 'ID REQUIRED';
          }),
        name: Joi.string()
          .trim()
          .min(3)
          .required()
          .error((error) => {
            return error;
          }),
      })
      .unknown(false),
  })
  .unknown(true);

const addSongPlayList = Joi.object()
  .keys({
    params: Joi.object()
      .keys({
        playlistId: Joi.string()
          .alphanum()
          .length(24)
          .required()
          .error(() => {
            return 'ID REQUIRED';
          }),
        songId: Joi.string()
          .alphanum()
          .length(24)
          .required()
          .error(() => {
            return 'ID REQUIRED';
          }),
      })
      .unknown(false),
  })
  .unknown(true);

module.exports = {
  songAddBodySchema,
  userPlayList,
  playListId,
  addPlayList,
  addSongPlayList,
};
