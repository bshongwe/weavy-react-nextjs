const objDiv = document.getElementById("messageBody");
const mainMessages = document.getElementById("mainMessages");
const template = document.querySelector('#messageBlock');
const socket = new WebSocket('ws://your-backend-server-url'); // Replace with your backend server URL

objDiv.scrollTop = objDiv.scrollHeight;

// Create multiple entries in the left panel

for(i = 0; i <= 25; i++){
  fetch('https://869207bf536c4ba7b40310002663b32c.weavy.io')
    .then(response => response.json())
    .then(data => {
      let out = data.results[0];
      var clone = template.content.cloneNode(true);
      let img = clone.getElementById("personHeadshot");
      let personName = clone.getElementById("personName");
      let messagePreview = clone.getElementById("messagePreview");
      img.src = out.picture.thumbnail;
      personName.innerText = `${out.name.first} ${out.name.last}`;
      messagePreview.innerHTML = `${out.location.city} ${out.location.state} ${out.location.postcode} ${out.email}`;;
      mainMessages.appendChild(clone);
    });
}

// WebSocket event handlers
socket.onopen = function() {
  console.log('WebSocket connection established.');
};

socket.onmessage = function(event) {
  // Handle received messages from the server
  const message = JSON.parse(event.data);
  // Update the HTML with the new message
  // For example, create a new message element and append it to the chat container
  // You can use the message data to populate the content of the new element
  // Here's a basic example:
  const newMessageElement = document.createElement('div');
  newMessageElement.innerText = message.content;
  mainMessages.appendChild(newMessageElement);
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed.');
};

// Function to send a message to the server
function sendMessage(message) {
  socket.send(JSON.stringify({ content: message }));
}

// Example usage: Send a message when a button is clicked
const sendButton = document.getElementById('sendButton');
sendButton.addEventListener('click', function() {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;
  sendMessage(message);
  messageInput.value = ''; // Clear the input field
});
