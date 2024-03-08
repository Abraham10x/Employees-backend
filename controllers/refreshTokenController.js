const User = require("../model/User");
const jwt = require("jsonwebtoken");
// userDB.setUsers([...userDB.users, newUser]);
// await fsPromises.writeFile(
//   path.join(__dirname, "..", "model", "users.json"),
//   JSON.stringify(userDB.users)
// );
// console.log(userDB.users);

const handleRequestToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Unauthorized
  // evalute jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ roles, accessToken });
  });
};

module.exports = { handleRequestToken };
