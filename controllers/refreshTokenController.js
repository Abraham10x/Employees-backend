const userDB = {
  user: require("../model/users.json"),
  setUser: function (data) {
    this.user = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRequestToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = userDB.user.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) return res.sendStatus(403); // Unauthorized
  // evalute jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRequestToken };
