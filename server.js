const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Initialise Chat
let response = await fetch(`$https://869207bf536c4ba7b40310002663b32c.weavy.io/api/apps/init`, {
  method: 'POST',
  headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer $wys_aZch9RwcSFLc1hVgvqfrI1bvKrnYTJ2yLA1m`
  },
  body: JSON.stringify({ app: { uid: "demochat", name: "Demo chat", type: "Chat" }, user: { uid: "demouser" } })
});

// Authenticate User

let response = await fetch(`$https://869207bf536c4ba7b40310002663b32c.weavy.io/api/users/demouser/tokens`, {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer $wys_aZch9RwcSFLc1hVgvqfrI1bvKrnYTJ2yLA1m`
    },
    body: JSON.stringify({ name: 'Demo User', expires_in: 7200 })
});

if (response.ok) {
    let resp = await response.json();
    let accessToken = resp.access_token
}

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming chat messages
  socket.on('chat message', (message) => {
    console.log('Message:', message);
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
