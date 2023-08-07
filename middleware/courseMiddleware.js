module.exports = (roles) => {
  return (req, res, next) => {
    const role = req.body.roles;
    if (roles.includes(role)) {
      next();
    } else {
      return res.status(401).send("Unfortunately failure");
    }
  };
};