const express = require("express");
const router = express.Router();

const {
  search,
  createPlaylist,
  addSongToPlaylist,
  userPlaylist,
} = require("../controllers/SpotifyController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.get("/search", authMiddleware, search);
router.post("/create-playlist", authMiddleware, createPlaylist);
router.patch("/add-song-to-playlist", authMiddleware, addSongToPlaylist);
router.get("/user-playlist", authMiddleware, userPlaylist);

module.exports = router;
