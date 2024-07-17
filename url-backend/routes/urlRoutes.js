const express = require( 'express' );
const router = express.Router();


const { createTinyURL, getLongURL } = require('../controllers/urlController');

router.get('/', createTinyURL);
router.post('/:shortId', getLongURL);

module.exports = router;