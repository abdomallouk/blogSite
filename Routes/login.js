const express = require('express');
const router = express.Router()
const multer = require('multer'); 
const axios = require('axios')

const {showLogin, verifyAccount} = require('../Controllers/blogControllers');


router.get('/login', showLogin)

router.post('/login', verifyAccount)
 

module.exports = router




