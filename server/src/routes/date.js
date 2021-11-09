const express = require('express');
const dateController = require('../controllers/date');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/:userID', dateController.createDate);
router.get('/:userID', dateController.readDates);
router.get('/:dateID', dateController.readDate);
router.put('/:userID/:dateID', dateController.updateDate);
router.delete('/:userID/:dateID', dateController.deleteDate);

module.exports = router;
