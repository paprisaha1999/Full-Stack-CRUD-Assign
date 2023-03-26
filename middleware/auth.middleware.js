const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    const decoded = jwt.verify(token, "masai"); // it will verify the token & store it inside "decoded"
    if (decoded) {
      //console.log(decoded)==>{userID:'641d822d0fc7f888b5212eee',iat:167965871 }
      req.body.userID = decoded.userID; // added automatically to the notes
      next(); // if already logged in it will go to next, means notesRouter
    } else {
      res.status(400).send({ msg: "Please Login First!" });
    }
  } else {
    res.status(400).send({ msg: "Please Login First!" });
  }
};

module.exports = { auth };
