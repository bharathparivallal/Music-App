const express = require('express');
const route = express.Router();
const song = require('./song.controller');
const { songAddBodySchema, userPlayList, playListId } = require('./song.validator');
const catchAsync = require('../../utility/catch-async');
const { validate } = require('../../utility/input-validation');
const { authMiddleware: authentication } = require('../../../middleware/index');

// Songs Service
route.get('/', authentication, catchAsync(song.songList));
route.post('/add', authentication, validate(songAddBodySchema), catchAsync(song.addSong));

// PlayList Service
route.get('/playList/:userId', authentication, validate(userPlayList), catchAsync(song.playList));
route.get(
  '/playListView/:playlistId',
  authentication,
  validate(playListId),
  catchAsync(song.playListView),
);
route.post('/addPlayList', authentication, catchAsync(song.playListAdd));
route.put('/addSongPlaylist', authentication, catchAsync(song.addSongPlaylist));
route.put('/editSongPlaylist', authentication, catchAsync(song.addSongPlaylist));

module.exports = route;
