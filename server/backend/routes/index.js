const express = require('express');
const router = express.Router();

const postRoutes = require('./posts.routes');

// ✅ THIS LINE IS IMPORTANT
router.use('/posts', postRoutes);

module.exports = router;