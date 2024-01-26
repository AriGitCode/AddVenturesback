const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");


//Auth middleware
const checkAuth = (req, res, next) => {
    console.log("CheckAuth route reached");
    try {
      // const token = req.cookies.access_token; //exctract jwt cookie from request object.
      const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer Token'
      console.log(token);
      if (!token) {
        console.log("no token found, authentication failed.");
        return res.send("Access Denied");
      }
  
      //token found, now lets make sure its the right user
      const decodedToken = jwt.verify(token, JWT_SECRET);
  
      req.userId = decodedToken.userId; //adding a new key to the request object before passing it on through the pipeline
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Authentication failed' });
    }
  };
  
  module.exports = { checkAuth };