const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async(url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

// Login user to access chat room.
const login = async() => {
    // get username
    const username = usernameInput.value;
    // client-side validation
    errorContainer.innerHTML = '';
    if (!username || username.trim() === '') {
        errorContainer.innerHTML = 'Username cannot be empty';
        return;
    }
    // get JSON data
    const data = await postData('/login', { username });
    console.log(data);
    // check for errors from server
    if (data.error) {
        errorContainer.innerHTML = data.error;
        return;
    }

    // no errors, emit a newUser event and redirect to /chat
    socket.emit('newUser', username, getTime());
    window.location = '/chat';

};

// A simple function to format the time as a string
const getTime = () => {
    const d = new Date();

    // Use String.padStart to add leading zeroes
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');

    // Return the time as a string
    return `${hours}:${mins}`;
};