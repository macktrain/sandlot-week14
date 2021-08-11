const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');

//routers for api endpoints
router.use('/api', apiRoutes);
//router for html pages
router.use('/', htmlRoutes);

module.exports = router;
