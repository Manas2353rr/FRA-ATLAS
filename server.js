const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001; // Changed port to 3001

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`FRA Atlas server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});