const express = require('express');
const router = express.Router()
const multer = require('multer'); 
const {logger, upload} = require('../Middlewares/middles')


const {showDashboard, createBlog, ShowAllblogs, editBlog, updateBlog, deleteBlog, showBlog} = require('../Controllers/blogControllers');



router.get('/addBlog', logger, showDashboard);

router.post('/addBlog', upload.single('image'), createBlog)

router.get('/allBlogs', ShowAllblogs);

router.get('/editBlog/:id', editBlog)

router.post('/updatedBlog/:id', upload.single('image'), updateBlog)

router.get('/deleteBlog/:id', deleteBlog)

router.get('/showBlog/:id', showBlog)



module.exports = router
