var express = require ('express');
var router = express.Router();

var Controller = require('../../controllers/CloseReason/closeReasonController');

router.post('/create',Controller.closeReason);
router.get('/getreason',Controller.reason);

module.exports = router;