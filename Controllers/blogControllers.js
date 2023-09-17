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
  
      // console.log("this is users", users)
  
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


exports.showDashboard = async (req, res) => {
  const api = await axios.get('http://localhost:3000/blogs')
  const blogs = await api.data
    const name = req.name;
    const iat = req.iat
    const image = req.image
    res.render('addBlog', { name,iat,image,blogs });
}
  


exports.showLogin = (req, res) => {
  res.render('login')
}


exports.showRegister = (req, res) => {
  res.render('register'); 
}



exports.createBlog =  (req, res) => {

  const { title, content, author } = req.body;

  const imagePath = `/uploads/${req.file.filename}`; 


  const newBlog = {
    title,
    content,
    author,
    imagePath
  }
  
  axios.post('http://localhost:3000/blogs', newBlog);
  
  res.redirect('/addBlog')
   
}



exports.ShowAllblogs = async(req, res) => {
  
  try {
    const fetchBlog = await axios.get('http://localhost:3000/blogs');
    const blogs = fetchBlog.data;
    console.log(blogs)
    res.render('allBlogs', { blogs });
  }  catch (error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }

} 



exports.editBlog = async (req, res) => {
  const blogIdToEdit = req.params.id;

  try {
    const fetchedBlog = await axios.get(`http://localhost:3000/blogs/${blogIdToEdit}`);
    const editedBlog = fetchedBlog.data;
    res.render('editedBlog', { editedBlog });

  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send('Internal Server Error');
  }

}



exports.updateBlog = async (req, res) => {

  try {

    const { title, content, author } = req.body;
    // const imagePath = `/uploads/${req.file.filename}`; 
  
    const blogId = req.params.id
    console.log(blogId)
  
    const updatedBlog = {
      title,
      content,
      author
      // imagePath
    }
  
    await axios.patch(`http://localhost:3000/blogs/${blogId}`, updatedBlog);
    
    res.redirect('/addBlog')

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating the blog');
  }
}
  
  // try {
  //   await axios.patch(`http://localhost:3000/blogs/${blogId}`, updatedBlog);
  
  //   res.redirect('/addBlog')
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send('Error updating the blog');
  // }
 



exports.deleteBlog = async (req, res) => {

  const blogIdToDelete = req.params.id;

  try {
    const response = await axios.delete(`http://localhost:3000/blogs/${blogIdToDelete}`);

    res.redirect('/addBlog')

    // if (response.status === 200) {
    //   res.status(204).send(); 
      
    // } else {
    //   res.status(response.status).send(response.statusText);
    // }

  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send('Internal Server Error');
  }

}



exports.showBlog =  async (req, res) => {
    const blogId = req.params.id

  try {
    const fetchedBlog = await axios.get(`http://localhost:3000/blogs/${blogId}`);
    const oneBlog = fetchedBlog.data;
    res.render('oneBlog', { oneBlog });

  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send('Internal Server Error');
  }

}