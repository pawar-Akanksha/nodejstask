const authorize = (roles) => {
  console.log("incoming=>",roles)
    return (req, res, next) => {
      console.log("admin started creating products=>",req.user.role)
      if (!roles.includes(req.user.role)) return res.sendStatus(403);
      next();
    };
  };
  
  
  module.exports = authorize;