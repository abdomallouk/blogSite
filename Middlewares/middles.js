
const jwt = require('jsonwebtoken');


exports.logger = (req,res,next)=>{
    const token = req.cookies.token
  
    try{
        const verify_token = jwt.verify(token,"strongSecret")
        console.log('token',verify_token)
        const {name,iat,image} = verify_token
        req.name = name
        req.iat = iat
        req.image = image
        next()
  
    }catch{
        res.status(401).send('invalid credentials ')
    }
  }