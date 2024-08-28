const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let songs = [
  { id: 1, title: "Song One", artist: "Artist One" },
  { id: 2, title: "Song Two", artist: "Artist Two" },
];

// Get all songs
app.get("/api/songs", (req, res) => {
  res.json(songs);
});

// Create a new song
app.post("/api/songs", (req, res) => {
  const newSong = {
    id: songs.length + 1,
    title: req.body.title,
    artist: req.body.artist,
  };
  songs.push(newSong);
  res.status(201).json(newSong);
});

// Update a song
app.put("/api/songs/:id", (req, res) => {
  const { id } = req.params;
  const songIndex = songs.findIndex((song) => song.id === parseInt(id));

  if (songIndex !== -1) {
    songs[songIndex] = { ...songs[songIndex], ...req.body };
    res.json(songs[songIndex]);
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// Delete a song
app.delete("/api/songs/:id", (req, res) => {
  const { id } = req.params;
  const songIndex = songs.findIndex((song) => song.id === parseInt(id));

  if (songIndex !== -1) {
    songs.splice(songIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Song not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
