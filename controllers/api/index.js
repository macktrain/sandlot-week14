const router = require('express').Router();

const blogsRoutes = require('./blogs-routes');
const commentsRoutes = require('./comments-routes');
const userRoutes = require('./user-routes');

router.use('/blogs', blogsRoutes);
router.use('/comments', commentsRoutes);
router.use('/user', userRoutes);

module.exports = router;
