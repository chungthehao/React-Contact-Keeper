const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const User = require('../models/User')

// @route       POST api/users
// @desc        Register a user
// @access      Public
router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], (req, res) => {
    // Validate dữ liệu
    const errors = validationResult(req)
    if ( ! errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    res.send('passed')

    // res.send(req.body); // Phải setting middleware "extended: false" mới có tác dụng
});

module.exports = router;