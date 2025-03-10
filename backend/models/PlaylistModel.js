const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  songDetails: [
    {
      trackId: { type: String, required: true },
      name: { type: String, required: true },
      artist: { type: String, required: true },
      album: { type: String, required: true },
      spotify_url: { type: String, required: true },
    },
  ],
});

module.exports = Playlist = mongoose.model("Playlist", playlistSchema);
