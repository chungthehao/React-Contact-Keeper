const express = require('express');
const { check, validationResult } = require('express-validator');

const User = require('../models/User')
const Contact = require('../models/Contact')

const auth = require('../middleware/auth')

const router = express.Router();

// @route       GET api/contacts
// @desc        Get all users contacts
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        // Get an array of contacts
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }) // -1: Make it the most recent contacts first

        res.json(contacts)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error.')
    }
});

// @route       POST api/contacts
// @desc        Add new contact
// @access      Private
router.post('/', (req, res) => {
    res.send('Add new contact');
});

// @route       PUT api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', (req, res) => {
    res.send('Update contact');
});

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', (req, res) => {
    res.send('Delete contact');
});

module.exports = router;