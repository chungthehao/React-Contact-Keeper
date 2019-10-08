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
router.post('/', [
    auth,
    [
        check('name', 'Please add a name').not().isEmpty()
    ]
], async (req, res) => {
    // Validate dữ liệu
    const errors = validationResult(req)
    if ( ! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body

    try {
        const newContact = new Contact({
            name, email, phone, type,
            user: req.user.id
        })
        const contact = await newContact.save()

        res.json(contact)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server error')
    }
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