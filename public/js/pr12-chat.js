const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const chatBox = document.getElementById('chatBox')
const messageEl = document.getElementById('message')
const user = document.getElementById('user')
const date = new Date() // Date implementation

socket.on('newMessage', data => {
    addMessage(data, false)
})

// Post message to board
const postMessage = () => {
    const message = messageEl.value.trim();
    const from = user.value;
    const time = getTime();

    const data = { message, from, time };
    socket.emit('message', data); // emit message
    addMessage(data, true); // add message to page
    messageE1.value = ''; // clear input
}

// Add message from any user to chatbox, determine if added
// by current user.
const addMessage = (data = {}, user = false) => {
    chatBox.innerHTML += `
    <li class="message${user ? ' uMessage' : ''}">
        ${data.from} @${data.time}: ${data.message}
    </li>
    `;
}

// A simple function to format the time as a string
const getTime = () => {
    const d = new Date();

    // Use String.padStart to add leading zeroes
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');

    // Return the time as a string
    return `${hours}:${mins}`;
};