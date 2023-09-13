const express = require('express');
const router = express.Router()
const multer = require('multer'); 


const {createAccount, showRegister} = require('../Controllers/blogControllers');



router.get('/register', showRegister);


const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const  upload = multer({ storage: storage })


router.post('/register',upload.single('image'), createAccount);



module.exports = router
