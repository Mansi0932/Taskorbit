const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAgent, listAgents } = require('../controllers/agentController');
router.post('/', auth(['admin']), createAgent);
router.get('/', auth(['admin']), listAgents);
module.exports = router;