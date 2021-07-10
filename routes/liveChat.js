const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    const { username } = req.body;

    // server validation
    if (!username || username.trim() === '')
    // 400 = bad request
        return res.status(400).send({ error: 'Username cannot be empty!' });

    // check for duplicates
    if (users.includes(username.trim()))
    // 409 = confict
        return res.status(409).send({ error: 'Username already exists.' });

    // no errors
    users.push(username.trim());
    req.session.user = username;
    res.status(200).send({ username: username.trim() });
})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    // This route is simple, just render the chat page.
    res.render('pages/pr12-chat', {
        title: 'Prove Assignment 12',
        path: '/proveAssignments/12',
        // Pass in the user saved in the session
        user: req.session.user,
    });
})

module.exports = router