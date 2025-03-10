const SpotifyWebApi = require("spotify-web-api-node");

// Spotify API credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Authenticate with Spotify and get the access token
const authenticateSpotify = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    console.log("Successfully retrieved access token");
    spotifyApi.setAccessToken(data.body["access_token"]);
  } catch (err) {
    console.error("Error getting Spotify access token:", err);
  }
};

module.exports = { spotifyApi, authenticateSpotify };
