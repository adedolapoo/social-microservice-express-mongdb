const router = require('express').Router();
const usersRoute = require('./users');
const commentsRoute = require('./comments');

router.use('/users', usersRoute);
router.use('/comments', commentsRoute)

module.exports = router