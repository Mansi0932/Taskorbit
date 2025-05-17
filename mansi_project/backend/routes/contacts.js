const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { uploadContacts, getAgentContacts, getAgentContactsByAgentId } = require('../controllers/contactController');

const upload = multer({ dest: 'uploads/' });
router.post('/upload', auth(['admin']), upload.single('file'), uploadContacts);
router.get('/my', auth(['agent']), getAgentContacts);
router.get('/agent/:agentId/contacts', auth(['admin']), getAgentContactsByAgentId);

module.exports = router;
