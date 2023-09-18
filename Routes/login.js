const express = require('express');
const router = express.Router()
const multer = require('multer'); 
const axios = require('axios');
const {isAuthenticated} = require('../Middlewares/middles')


const {showLogin, verifyAccount} = require('../Controllers/blogControllers');


router.get('/login',isAuthenticated, showLogin)

router.post('/login', verifyAccount)
 

module.exports = router




