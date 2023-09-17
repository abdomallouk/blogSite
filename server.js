const express = require('express');
const jsonServer = require('json-server');
const cookies = require('cookie-parser')
const path = require('path');
const app = express();


const registerRouter = require('./Routes/register')
const loginRouter = require('./Routes/login')
const blogRouter = require('./Routes/blogs')


app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname+'uploads'))
app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use('/', registerRouter)



app.use('/', loginRouter)



app.use('/', blogRouter)




app.listen(5500, () => {
  console.log('Server started on port 5500');
});
