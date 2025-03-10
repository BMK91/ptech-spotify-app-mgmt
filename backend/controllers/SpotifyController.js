const { spotifyApi } = require("../config/spotify");

const Playlist = require("../models/PlaylistModel");

const search = async (req, res) => {
  const query = req.query.q; // + "&type=playlist"; // Search query parameter

  if (!query) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  try {
    // Search Spotify API for songs
    const response = await spotifyApi.searchTracks(query);

    // Save results to MongoDB
    const tracks = response.body.tracks.items.map((track) => ({
      userId: req.user.userId,
      trackId: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      spotify_url: track.external_urls.spotify,
    }));

    // await Song.deleteMany({ userId: req.user.userId });

    // Save to MongoDB
    // const savedSongs = await Song.insertMany(tracks);

    // Return saved songs as response
    res.json(tracks);
  } catch (error) {
    console.error("Error searching Spotify", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createPlaylist = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if playlist already exists
    const playlistExists = await Playlist.findOne({ name });
    if (playlistExists) {
      return res.status(400).json({ error: "Playlist already exists" });
    }

    // Create a new playlist
    const newPlaylist = new Playlist({
      userId: req.user.userId,
      name,
      songDetails: [],
    });
    await newPlaylist.save();

    res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    console.error("Error creating playlist", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addSongToPlaylist = async (req, res) => {
  const { name, song } = req.body;

  try {
    // Check if playlist already exists
    const playlist = await Playlist.findOne({ name });
    if (!playlist) {
      return res.status(400).json({ error: "Playlist does not exists" });
    }

    const songExists = await Playlist.findOne({
      name,
      "songDetails.trackId": song.trackId,
    });

    if (songExists) {
      return res.status(400).json({ error: "Song already exists." });
    }

    await Playlist.findByIdAndUpdate(
      {
        _id: playlist._id,
      },
      {
        $push: {
          songDetails: song,
        },
      },
      { new: true } // Return the updated document
    );

    res.status(201).json({ message: "Playlist updated successfully" });
  } catch (error) {
    console.error("Error creating playlist", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userPlaylist = async (req, res) => {
  try {
    // Check if playlist already exists
    const playlist = await Playlist.find({ userId: req.user.userId });
    if (!playlist) {
      return res.status(200).json([]);
    }
    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error creating playlist", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { search, createPlaylist, addSongToPlaylist, userPlaylist };
