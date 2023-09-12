const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer'); 
const jwt = require('jsonwebtoken');
const xss = require('xss');
const jsonServer = require('json-server');
const axios = require('axios')
const cookies = require('cookie-parser')
const path = require('path');
const {createAccount, verifyAccount, showLogin, showRegister, showDashboard} = require('./Controllers/blogControllers');
const {logger} = require('./Middlewares/middles')



const app = express();
app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname+'uploads'))
app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/register', showRegister);


const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const  upload = multer({ storage: storage })


app.post('/register',upload.single('image'), createAccount);



app.get('/login', showLogin)



app.post('/login', verifyAccount)


app.get('/addBlog', logger, showDashboard);




app.post('/addBlog', upload.single('image'), (req, res) => {

  const { title, content, author } = req.body;

  const imagePath = `/uploads/${req.file.filename}`; 


  const newBlog = {
    title,
    content,
    author,
    imagePath
  }
    
  axios.post('http://localhost:3000/blogs', newBlog)

  res.redirect('/allBlogs')

    
})



app.get('/allBlogs', async(req, res) =>{
  
  try {
    const fetchBlog = await axios.get('http://localhost:3000/blogs');
    const blogs = fetchBlog.data;
    console.log(blogs)
    res.render('allBlogs', { blogs });
  }  catch (error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

});




app.listen(5500, () => {
  console.log('Server started on port 5500');
});
