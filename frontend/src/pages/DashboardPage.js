import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchWidget from "../components/SearchWidget";
import api from "../config/axiosConfig";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  // Sample song playlist (in a real app, this could come from an API)
  const [playlist, setPlaylist] = useState([
    { id: 1, title: "Song 1", artist: "Artist 1" },
    { id: 2, title: "Song 2", artist: "Artist 2" },
    { id: 3, title: "Song 3", artist: "Artist 3" },
    { id: 4, title: "Song 4", artist: "Artist 4" },
  ]);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [userPlaylist, setUserPlaylist] = useState([]);

  // New song input state
  const [newSong, setNewSong] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("loginUser"));
    fetchUserPlaylist();
  }, []);

  const fetchUserPlaylist = async () => {
    try {
      // Make the API request to register the user
      await api
        .get(`/spotify/user-playlist`)
        .then(({ data }) => {
          setUserPlaylist(data);
        })
        .catch(({ response }) => {});
    } catch (err) {
      // Handle errors such as registration failures
      console.error(err);
    }
  };

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setNewSong(e.target.value);
  };

  // Handle adding a new song to the playlist
  const handleAddSong = () => {
    if (newSong.trim() === "") {
      return; // Don't add if the input is empty
    }

    const newSongData = {
      id: playlist.length + 1, // Generate a new id
      title: newSong,
      artist: "Unknown Artist", // You could modify this to get artist name as well
    };

    setPlaylist([...playlist, newSongData]);
    setNewSong(""); // Clear the search bar after adding the song
  };

  const handleSearch = async (query) => {
    setLoading(true);

    try {
      // Make the API request to register the user
      await api
        .get(`/spotify/search?q=${query}`)
        .then(({ data }) => {
          console.log(data);
          setOptions(data);
        })
        .catch(({ response }) => {
          setOptions([]);
        });
      setLoading(false);
    } catch (err) {
      // Handle errors such as registration failures
      console.error(err);
      setLoading(false);
    }
  };

  const handleAddToPlaylist = async (song) => {
    try {
      // Make the API request to register the user
      await api
        .post(`/spotify/add-song-to-playlist`, { ...song })
        .then(({ data }) => {
          fetchUserPlaylist();
        })
        .catch(({ response }) => {});
    } catch (err) {
      // Handle errors such as registration failures
      console.error(err);
    }
  };

  const handleClosePlaylistModal = () => {
    setShowPlaylistModal(false);
  };

  const handleCreateNewPlaylist = async () => {
    setShowPlaylistModal(false);

    try {
      // Make the API request to register the user
      await api
        .post(`/spotify/create-playlist`, { name: playlistName })
        .then(({ data }) => {
          setPlaylistName("");
          fetchUserPlaylist();
        })
        .catch(({ response }) => {});
    } catch (err) {
      // Handle errors such as registration failures
      console.error(err);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Welcome, {userName}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Container sx={{ mt: 3 }}>
        {/* Search Bar to add new song */}
        <SearchWidget
          options={options}
          onSearch={handleSearch}
          loading={loading}
          onClear={() => setOptions([])}
          addToPlaylist={handleAddToPlaylist}
        />

        {/* <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Search Song"
            variant="outlined"
            fullWidth
            value={newSong}
            onChange={handleSearchChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddSong}>
            Add Song
          </Button>
        </Box> */}

        <Typography variant="h4" gutterBottom>
          Song Playlist
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            onClick={() => setShowPlaylistModal(true)}
          >
            + Create New Playlist
          </Button>
        </Typography>

        {/* Playlist Section */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {userPlaylist.map((playlist) => (
            <Card key={playlist._id} sx={{ width: 200 }}>
              <CardContent>
                <Typography variant="h6">{playlist.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  No. of Songs: {playlist.songDetails.length}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Dialog open={showPlaylistModal} onClose={handleClosePlaylistModal}>
        <DialogTitle>Enter Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClosePlaylistModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateNewPlaylist} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
