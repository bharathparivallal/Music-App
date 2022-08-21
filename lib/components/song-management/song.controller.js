const songSchema = require('./song.model');
const playlistSchema = require('./playlist.model');

// Add Song
const addSong = async ({ body = {} }) => {
  try {
    const { title, singer, album, playTime } = body;
    const songData = {
      title,
      singer,
      album,
      playTime,
    };
    const songDetails = await songSchema.findOne(songData, { _id: 1 });
    if (songDetails)
      return {
        statusCode: 401,
        message: 'DUPLICATE SONG',
      };
    const songInsert = await songSchema.create(songData);
    if (!songInsert)
      return {
        statusCode: 400,
        message: 'FAILED TO ADD SONG',
      };
    return { statusCode: 200, message: 'SONG ADDED SUCCESSFULLY', data: songInsert };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

// Song List
const songList = async ({ query = {} }) => {
  try {
    const { searchKey } = query;
    const songQuery =
      searchKey && searchKey.length
        ? {
            $or: [
              { title: { $regex: searchKey, $options: 'i' } },
              { singer: { $regex: searchKey, $options: 'i' } },
              { album: { $regex: searchKey, $options: 'i' } },
            ],
          }
        : {};
    const songProject = {
      title: 1,
      singer: 1,
      album: 1,
      playTime: 1,
    };
    const songs = await songSchema.find(songQuery, songProject).sort({ _id: -1 }).lean();
    return {
      statusCode: 200,
      message: 'SONG LIST',
      data: songs,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

// PlayLists
const playList = async ({ params = {} }) => {
  try {
    const { userId } = params;
    const playListQuery = { userId };
    const playListProject = { name: 1, createAt: 1 };
    const playLists = await playlistSchema
      .find(playListQuery, playListProject)
      .sort({ _id: -1 })
      .lean();
    return {
      statusCode: 200,
      message: 'PLAYLIST',
      data: playLists,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

// PlayLists Create
const playListAdd = async ({ body = {} }) => {
  try {
    const { userId, name, songIds } = body;
    const playListData = { userId, name, songIds };
    const playListInsert = await playlistSchema.create(playListData);
    if (!playListInsert)
      return {
        statusCode: 400,
        message: 'FAILED TO CREATE PLAYLIST',
      };
    return {
      statusCode: 200,
      message: 'PLAYLIST',
      data: playListInsert,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

// PlayLists
const playListView = async ({ params = {}, query = {} }) => {
  try {
    const { playlistId } = params;
    const { searchKey, shuffle } = query;
    const playListQuery = { _id: playlistId };
    const playListProject = { name: 1, songIds: 1 };
    const playLists = await playlistSchema
      .findOne(playListQuery, playListProject)
      .sort({ _id: -1 })
      .lean();
    const songQuery =
      searchKey && searchKey.length
        ? {
            _id: { $in: playLists.songIds },
            $or: [
              { title: { $regex: searchKey, $options: 'i' } },
              { singer: { $regex: searchKey, $options: 'i' } },
              { album: { $regex: searchKey, $options: 'i' } },
            ],
          }
        : { _id: { $in: playLists.songIds } };
    const songListData = await songSchema.find(songQuery, {
      title: 1,
      singer: 1,
      album: 1,
      playTime: 1,
    });
    return {
      statusCode: 200,
      message: 'PLAYLIST',
      data: {
        ...playLists,
        ...{
          songs:
            shuffle && shuffle === 'yes'
              ? songListData.sort(() => 0.5 - Math.random())
              : songListData.sort((songElement) =>
                  playLists.songIds.findIndex(
                    (songIdElement) => songIdElement.toString() === songElement.toString(),
                  ),
                ),
        },
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

// PlayLists Adding Song
const addSongPlaylist = async ({ body = {} }) => {
  try {
    const { playlistId, songId } = body;
    const playListQuery = { _id: playlistId };
    const playListData = { $push: { songIds: songId } };
    const playListUpdate = await playlistSchema.updateOne(playListQuery, playListData);
    if (!playListUpdate)
      return {
        statusCode: 400,
        message: 'FAILED TO ADD SONG',
      };
    return {
      statusCode: 200,
      message: 'SONG ADDED',
      data: playListUpdate,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

// PlayLists Update Song
const editSongPlaylist = async ({ body = {} }) => {
  try {
    const { playlistId, songIds } = body;
    const playListQuery = { _id: playlistId };
    const playListData = { $set: { songIds } };
    const playListUpdate = await playlistSchema.updateOne(playListQuery, playListData);
    if (!playListUpdate)
      return {
        statusCode: 400,
        message: 'FAILED TO UPDATE PLAYLIST SONGS',
      };
    return {
      statusCode: 200,
      message: 'PLAYLIST SONGS UPDATED',
      data: playListUpdate,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(error);
    }
  }
};

module.exports = {
  addSong,
  songList,
  playList,
  playListAdd,
  playListView,
  addSongPlaylist,
  editSongPlaylist,
};
