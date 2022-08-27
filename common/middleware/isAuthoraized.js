const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const rbac = require("./rbac");

module.exports = (endPointName) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token, "shhhhh");
      if (!decoded) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
      req.user = decoded;
      const isAllowed = await rbac.can(decoded.role, endPointName);

      if (!isAllowed) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
      // console.log(req.user.role)
      next();
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "UNAUTHORIZED" });
    }

    //   console.log(decoded)
  }; 
};
