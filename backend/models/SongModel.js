const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  artist: String,
  album: String,
  spotify_url: String,
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
