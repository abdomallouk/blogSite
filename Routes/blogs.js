const express = require('express');
const router = express.Router()
const multer = require('multer'); 
const {logger} = require('../Middlewares/middles')


const {showDashboard, createBlog, ShowAllblogs, editBlog, updateBlog, deleteBlog, showBlog} = require('../Controllers/blogControllers');


const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const  upload = multer({ storage: storage })




router.get('/addBlog', logger, showDashboard);

router.post('/addBlog', upload.single('image'), createBlog)

router.get('/allBlogs', ShowAllblogs);

router.get('/editBlog/:id', editBlog)

router.post('/updatedBlog/:id', upload.single('image'), updateBlog)

router.get('/deleteBlog/:id', deleteBlog)

router.get('/showBlog/:id', showBlog)



module.exports = router
