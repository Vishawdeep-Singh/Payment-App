const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken")

const authMiddleware=(req,res,next)=>{
    
    const token =req.headers.authorization
    const words = token.split(" ");
    const jwtToken = words[1];

    try{
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
       
        if (decodedValue) {
            req.user_id=decodedValue.userId
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
            msg: "Token has expired"
          });
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({
            msg: "Invalid token"
          });
        } else {
          return res.status(500).json({
            msg: "Internal server error"
          });
        }
      }
}
module.exports = authMiddleware