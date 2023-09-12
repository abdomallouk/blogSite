const { body, validationResult } = require('express-validator');
const xss = require('xss');
const axios = require('axios')
const jwt = require('jsonwebtoken');



exports.createAccount = (req, res) => {

    const errors = validationResult(req);
    
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
  
      if (!req.body.name) {
          return res.status(400).json({
              error: ' your data is not valid'
          })
      }
    
      const { name, email, password } = req.body;
  
  
      const imagePath = `/uploads/${req.file.filename}`; 
  
      const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          imagePath, 
      };
  
      const sanitizedData = {
        name: xss(name),
        email: xss(email),
        password: xss(password),
      };
  
      axios.post('http://localhost:3000/users', newUser)
  
      res.redirect('/login')
  
}
  


exports.verifyAccount =  async (req, res) => {

    const {name, password}  = req.body;
  
    try {
  
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          name,
          password,
        },
      });
      
      const users = response.data;
  
      console.log("this is users", users)
  
      const user = users.find((user) => user.name === name && user.password === password);
  
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
  
      const token = jwt.sign({ name: user.name ,image: user.imagePath}, "strongSecret");
      res.cookie("token",token,{
          httpOnly:true
      })
      // return res.status(200).json({ token });
      res.redirect('/addBlog')  
    }
    catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  
  }


exports.showDashboard =  (req, res) => {
    const name = req.name;
    const iat = req.iat
    const image = req.image
    res.render('addBlog', { name,iat,image });
}
  


exports.showLogin = (req, res) => {
  res.render('login')
}


exports.showRegister = (req, res) => {
  res.render('register'); 
}