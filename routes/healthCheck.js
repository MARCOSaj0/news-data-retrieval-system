const router = require('express').Router();
const { healthCheck } = require('../controller/healthCheck');

router.get('/', healthCheck);

module.exports = router;