const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // console.log("Je suis req = ",req);
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      auth: false,
      token: null,
      message: "missing token, please login",
    });
  }
  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        auth: false,
        token: null,
        message: "no authorized",
      });
    }
    if (decoded.isAdmin == true) {
      req.user = decoded;
      next();
    } else {
      req.user = decoded;
      next();
    }
  });
}

module.exports = verifyToken;
