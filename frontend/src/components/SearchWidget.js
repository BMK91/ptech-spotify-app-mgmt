import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const SearchWidget = ({ options = [], onSearch, onClear, addToPlaylist, loading = false }) => {
  // Default empty array
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (value) {
      onSearch(value); // Trigger the search
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Search Music"
        variant="outlined"
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)} // Update state on input change
        onKeyDown={(e) => {
          if (e.key === "Enter" && value) {
            handleSearch(value); // Trigger the parent search handler on Enter
          }
        }}
        style={{ marginBottom: "20px" }}
      />

      {loading && (
        <Typography variant="body2" color="textSecondary">
          Loading results...
        </Typography>
      )}

      {options.length > 0 && (
        <>
          <Button onClick={onClear}>Clear</Button>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Song</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Album</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {options.length > 0 ? (
                  options.map((song, index) => (
                    <TableRow key={index}>
                      <TableCell>{song.name}</TableCell>
                      <TableCell>{song.artist}</TableCell>
                      <TableCell>{song.album}</TableCell>
                      <TableCell>
                        <a
                          href={song.spotify_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Listen
                        </a>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => addToPlaylist(song)}
                        >
                          + ADD
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default SearchWidget;
