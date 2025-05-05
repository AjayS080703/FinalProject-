const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

router.get('/user', protect , (req, res) => {
    res.json({ message: `Welcome User!` });
});

module.exports = router;
